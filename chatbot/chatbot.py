import os
from dotenv import load_dotenv
# .env 파일 불러오기
load_dotenv()

# 환경 변수 사용하기
openai_api_key = os.getenv('OPENAI_API_KEY')
serpapi_api_key = os.getenv('SERPAPI_API_KEY')
papago_client_id = os.getenv('PAPAGO_CLIENT_ID')
papago_client_secret = os.getenv('PAPAGO_CLIENT_SECRET')


from langchain.agents import load_tools
from langchain.agents import initialize_agent
from langchain.agents import AgentType
from langchain.llms import OpenAI
from langchain.chains import ConversationChain
from transformers import pipeline
from langchain.chains.conversation.memory import ConversationBufferMemory

llm = OpenAI(temperature=0)

tools = load_tools(["serpapi", "llm-math"], llm=llm)

agent = initialize_agent(tools, llm, agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION, verbose=True)

import requests

def translate_text(text, source_lang, target_lang, client_id, client_secret):
    url = "https://openapi.naver.com/v1/papago/n2mt"
    headers = {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "X-Naver-Client-Id": client_id,
        "X-Naver-Client-Secret": client_secret
    }
    data = {
        "source": source_lang,
        "target": target_lang,
        "text": text
    }
    
    response = requests.post(url, headers=headers, data=data)
    if response.status_code == 200:
        translated_text = response.json().get('message', {}).get('result', {}).get('translatedText', '')
        return translated_text
    else:
        print("Error Code:", response.status_code)
        return None

def get_search_results(query, api_key, language="en"):
    params = {
        "engine": "google",
        "q": query,
        "api_key": api_key,
        "hl": language
    }
    
    try:
        response = requests.get("https://serpapi.com/search", params=params)
        response.raise_for_status()
        search_results = response.json()
        return search_results
    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")
    except Exception as err:
        print(f"An error occurred: {err}")
    return None

def preprocess_prompt(prompt):
    # 모델에 입력할 수 있는 토큰의 최대 수
    MAX_TOKENS = 4096
    # prompt를 토큰으로 변환 (공백 기준으로 나눔)
    tokens = prompt.split()
    # 토큰의 길이가 최대 토큰 수를 초과하는지 확인
    if len(tokens) > MAX_TOKENS:
        # 초과한다면 최대 길이에 맞춰 줄임
        return ' '.join(tokens[:MAX_TOKENS])
    else:
        # 초과하지 않는다면 그대로 반환
        return prompt



while True:
    #사용자 성별 입력 받기
    user_sex = input("당신의 성별을 알려주세요 ex) 여자 : ")
     # 사용자 나이 입력 받기
    user_age = input("당신의 나이를 알려주세요 ex) 28 : ")
    # 아픈 부위 입력 받기
    user_pain_area = input("아픈 부위를 알려주세요 ex) 왼쪽 아랫 배 : ")
    # 증상 입력 받기
    user_symptoms = input("증상을 입력해주세요 ex) 아픔, 콕콕 쑤심, 찌릿함 : ")

    # 원인과, 의심되는 병으로 나누어서 구글 검색
    user_input_cause = f"{user_age}, {user_sex},  {user_pain_area},  {user_symptoms}, 원인"
    user_input_disease = f"{user_age}, {user_sex},  {user_pain_area},  {user_symptoms}, 의심 병"

    translated_input_cause = translate_text(user_input_cause, "ko", "en", papago_client_id, papago_client_secret)
    translated_input_disease = translate_text(user_input_disease, "ko", "en", papago_client_id, papago_client_secret)

    # 영어로 검색하여 응답 받기
    english_search_results_cause = get_search_results(translated_input_cause, serpapi_api_key, language="en")
    english_search_results_disease = get_search_results(translated_input_disease, serpapi_api_key, language="en")

    # 한국어로 검색하여 응답 받기
    korean_search_results_cause = get_search_results(user_input_cause, serpapi_api_key, language="ko")
    korean_search_results_disease = get_search_results(user_input_disease, serpapi_api_key, language="ko")

    # 영어 검색 결과에서 organic_results 부분 추출
    english_results_text_cause = ' '.join([result['snippet'] for result in english_search_results_cause.get('organic_results', [])])
    english_results_text_disease = ' '.join([result['snippet'] for result in english_search_results_disease.get('organic_results', [])])

    # 한국어 검색 결과에서 'organic_results' 부분 추출
    korean_results_text_cause = ' '.join([result['snippet'] for result in korean_search_results_cause.get('organic_results', [])])
    korean_results_text_disease = ' '.join([result['snippet'] for result in korean_search_results_disease.get('organic_results', [])])
    # 검색 결과를 통합
    combined_results = english_results_text_cause+" "+ english_results_text_disease + " " + korean_results_text_cause + " " + korean_results_text_disease

    # 문자열 데이터로부터 전처리된 프롬프트를 생성
    preprocessed_prompt = preprocess_prompt(combined_results)
    # 통합된 검색 결과를 LLM에게 전달하여 분석
    llm_response = agent.run({"input": preprocessed_prompt})

    # 최종적으로 분석된 결과 출력
    print(llm_response)
    keep_going = input("계속하시겠습니까? : ")
    if(keep_going == "아니오"):
        break