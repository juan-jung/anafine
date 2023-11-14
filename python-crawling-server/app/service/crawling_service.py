import xml.etree.ElementTree as ET
import csv
import os
from app.util.request_util import get_response
import datetime
from dataclasses import dataclass, field


@dataclass
class PriceData:
    div: str
    price: str
    info: str

@dataclass
class TreatmentData:
    middle_category: str
    small_category: str
    detail_category: str
    price_datas: list[PriceData] = field(default_factory=list)

@dataclass
class HospitalData:
    hospital_id: str
    hospital_name: str
    treatment_datas: list[TreatmentData] = field(default_factory=list)


class CrawlingService:
    
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:   # 인스턴스가 아직 생성되지 않았다면
            cls._instance = super(CrawlingService, cls).__new__(cls)  # 새 인스턴스 생성
        return cls._instance  # 인스턴스 반환

    def __init__(self):
        self.running = False
    
    def crawl_hira(self, hospital_infos:list[dict]) -> list[HospitalData]|None:
        try:
            from app.service.hira_crawling_service import do_crawling
            import asyncio
            return asyncio.run(do_crawling(hospital_infos))
        except Exception as e:
            print(e)
            print("ERROR: 크롤링 중 에러가 발생했습니다.")
            return None