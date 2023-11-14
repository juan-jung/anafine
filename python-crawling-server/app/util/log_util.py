import logging
import os

# 로그 레벨 설정
LOG_MODE = os.environ.get('LOG_MODE', 'INFO')  # 환경 변수가 없을 경우 기본값으로 'INFO' 설정

def get_logger(name):
    logger = logging.getLogger(name)
    logger.setLevel(getattr(logging, LOG_MODE, logging.INFO))
    return logger

