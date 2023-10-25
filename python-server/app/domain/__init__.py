from sqlalchemy import Column, String, create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os


username = os.environ.get('DB_USERNAME')
password = os.environ.get('DB_PASSWORD')
host = os.environ.get('DB_SERVER_URL')
db_name = os.environ.get('DB_DATABASE_NAME')
engine = create_engine(f'mysql+pymysql://{username}:{password}@{host}/{db_name}')

Base = declarative_base()
import app.domain.entity as entity #table들 import
#기존 테이블 삭제 : commit 없이도 바로 삭제된다. 
Base.metadata.drop_all(engine)
# 테이블 생성 : 이는 commit 없이도 바로 생성된다, (같은 이름의 테이블이 이미 있다면 넘어간다)
Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)


