import asyncio
from playwright.async_api import async_playwright, Playwright, Page, ElementHandle
from app.service.crawling_service import HospitalData, TreatmentData, PriceData
import re
from app.util.log_util import get_logger
from dataclasses import asdict
        
logger = get_logger(__name__)

LONG_LOADING_WAITING_TIME = 1500
LOADING_WAITING_TIME = 1000
DEFAULT_WAITING_TIME = 200


async def find(page:Page, selector:str, outline:ElementHandle|Page=None, no_warning=False) -> ElementHandle:
    if outline is None:
        outline = page
    target = await outline.query_selector(selector)
    if not target :
        if not no_warning:
            logger.warning(f"대상이 존재하지 않습니다 - {selector}")
        else :
            logger.debug(f"대상이 존재하지 않습니다 - {selector}")
    return target

async def click(page:Page, target:ElementHandle, wait_time:int=DEFAULT_WAITING_TIME) -> None:
    if not target:
        return
    await target.click()
    logger.debug(f"clicked - {target}")
    await page.wait_for_timeout(wait_time)

async def fill(page:Page, target:ElementHandle, keyword:str, wait_time:int=DEFAULT_WAITING_TIME) -> None:
    if not target:
        return
    await target.fill(keyword)
    logger.debug(f"filled - {keyword}")
    await page.wait_for_timeout(wait_time)

async def get_content_from_grid(grid:ElementHandle, col_index:int, no_warning=False) -> str: #hira 맞춤형 함수
    if not grid:
        return
    try :
        middle_column = await grid.query_selector(f'div[aria-colindex="{col_index}"]')
        logger.debug(f"find middle_column - {middle_column}")
        middle_category = await middle_column.query_selector('div.cl-text')
        logger.debug(f"find middle_category - {middle_category}")
        text = await middle_category.text_content()
        logger.debug(f"find text - {text}")
        return text
    except :
        if not no_warning:
            logger.warning(f"해당 칸에 데이터가 없습니다. - {grid}, {col_index}")
        else :
            logger.debug(f"해당 칸에 데이터가 없습니다. - {grid}, {col_index}")
        return ""



async def run(playwright: Playwright, hos_info:dict, user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36") -> HospitalData:
    chromium = playwright.chromium
    browser = await chromium.launch(timeout = 10000000, headless=True)
    page = await browser.new_page(user_agent=user_agent, record_har_mode='minimal')
    url = 'https://www.hira.or.kr/npay/index.do?pgmid=HIRAA030009000000#app%2Frb%2FnpayDamtInfoList'
    
    keyword = hos_info.get('hospital_name')
    address = hos_info.pop('hospital_address')
    hospital_data = HospitalData(**hos_info)
    
    logger.info(f"크롤링을 시작합니다 : {keyword}")
    # 페이지 로드하기
    await page.goto(url)
    await page.wait_for_timeout(LONG_LOADING_WAITING_TIME)
    # print("INFO: 페이지를 로드했습니다 - ", url)
    
    # 명령어 모음으로 변경 예정
    check_box = await find(page,'div.cl-checkbox-icon[aria-label="위의 사항을 확인하였습니다"]')
    await click(page, check_box) # 체크박스 선택 및 클릭
    close_btn = await find(page,'text=닫기')
    await click(page, close_btn) # 팝업창 닫기 버튼 클릭
    search_window_open_btn = await find(page,'a.cl-text-wrapper[aria-label="보고싶은 의료기관 전체 항목 검색하기"]')
    await click(page, search_window_open_btn, LOADING_WAITING_TIME) # '보고 싶은 의료기관 조회' 버튼 선택 및 클릭
    search_box = await find(page,'input.cl-text[aria-label="검색어"]')
    await fill(page, search_box, keyword) # 검색창에 keyword 입력
    search_btn = await find(page,'a.cl-text-wrapper[aria-label="검색"]')
    await click(page, search_btn, LOADING_WAITING_TIME) # 검색버튼 클릭
    
    hos_link_boxs = await page.query_selector_all('div.cl-layout-content.form-list[data-role="content-pane"] > div.form-list')
    for hos_link_box in hos_link_boxs :
        if await find(page, f'text={address}', hos_link_box, no_warning=True) :
            keyword_link = await find(page,f"text={keyword}")
            await click(page, keyword_link, LONG_LOADING_WAITING_TIME) # 검색결과 페이지에서 {keyword} 링크 클릭
            break
    else :
        logger.warning(f"검색결과가 없습니다 - {keyword}")

    while True :
        # div.cl-grid의 aria-label*="비급여 진료비용 검색으로 의료기관명"
        grid_selector = 'div.cl-grid[aria-label*="비급여 진료비용 검색으로 의료기관명"]'
        grid_origin = await find(page, grid_selector)
        grids = await grid_origin.query_selector_all("div.cl-grid-cell-inherit > div[role='row']")
        for row_grid in grids[2:12] :
            
            middle_category_value = await get_content_from_grid(row_grid, 5)
            small_category_value = await get_content_from_grid(row_grid, 6)
            detail_category_value = await get_content_from_grid(row_grid, 7)
            treatment_data = TreatmentData(middle_category_value, small_category_value, detail_category_value)
            hospital_data.treatment_datas.append(treatment_data)
            
            b_column = await find(page, 'div[aria-colindex="8"]', row_grid)
            button = await find(page, 'div.cl-button', b_column)
            await click(page, button, LOADING_WAITING_TIME)
            
            pop_up_window = await find(page, 'div.cl-dialog[aria-label="비급여 세부정보"]')
            pop_up_grids = await pop_up_window.query_selector_all("div.cl-grid-cell-inherit > div[role='row']")
            
            for pop_row in pop_up_grids[2:-2] :
                div_value = await get_content_from_grid(pop_row, 1)
                price_value = await get_content_from_grid(pop_row, 2)
                info_value = await get_content_from_grid(pop_row, 3)
                price_data = PriceData(div_value, price_value, info_value)
                treatment_data.price_datas.append(price_data)
            
            pop_up_exit_btn = await find(page, 'text=닫기', pop_up_window)
            await click(page, pop_up_exit_btn)
        
        current_page_btn = await find(page, 'div[aria-label*="현재 페이지"]', no_warning=True)
        if current_page_btn:
            current_page_btn_label = await current_page_btn.get_attribute('aria-label')
            current_page_number = int(re.search(r'\d+', current_page_btn_label).group())
            next_page_number = current_page_number + 1
            
            next_page_btn = await find(page, f'div[aria-label="{next_page_number}페이지"]', no_warning=True)
            if next_page_btn :
                await click(page, next_page_btn, LONG_LOADING_WAITING_TIME)
                logger.debug(f"다음 페이지로 이동 - {next_page_number}")# 다음 페이지로 이동
                continue
            
            elif not await find(page, 'div.cl-pageindexer-next.cl-disabled') :
                next_button = await find(page, 'div.cl-pageindexer-next')
                await click(page, next_button, LONG_LOADING_WAITING_TIME)
                logger.debug(f"다음 페이지로 이동 - {next_page_number}")# 다음 페이지로 이동
                continue
            
            logger.info("마지막페이지입니다. 종료합니다.")
            break  # 마지막 페이지에 도달함

    logger.info(f"크롤링을 종료합니다 - {keyword}")
    logger.debug(f"{keyword} : {hospital_data}")
    await browser.close()
    
    return asdict(hospital_data) #HospitalData를 asdict()로 변환


async def do_crawling(hospital_infos:list[dict]) -> list[dict] : #dict는 HospitalData를 asdict()로 변환
    async with async_playwright() as playwright:
        
        #동시 실행할 태스크의 최대 수 설정
        semaphore = asyncio.Semaphore(4)
        
        async def sem_task(hospital_info):
            async with semaphore:
                return await run(playwright, hospital_info)
        
        tasks = [sem_task(hospital_info) for hospital_info in hospital_infos]
        results = await asyncio.gather(*tasks)
        return results
    

if __name__ == '__main__':
    asyncio.run(do_crawling([{'hospital_id': 1, 'hospital_name': '서울대학교병원', 'hospital_address':'서울특별시 종로구 대학로 101'}]))