import logging
import os
# 로깅 기본 설정
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# 로그 레벨 설정
LOG_MODE = os.environ.get('LOG_MODE')

# 로거 객체 가져오기
logger = logging.getLogger(__name__)
logger.setLevel(getattr(logging, LOG_MODE))
