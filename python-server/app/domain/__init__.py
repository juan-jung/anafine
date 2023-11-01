from sqlalchemy import Column, String, create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os

Base = declarative_base()
import app.domain.entity as entity #table들 import

username = os.environ.get('DB_USERNAME')
password = os.environ.get('DB_PASSWORD')
host = os.environ.get('DB_SERVER_URL')
db_name = os.environ.get('DB_DATABASE_NAME')
engine = create_engine(f'mysql+pymysql://{username}:{password}@{host}/{db_name}')
Session = sessionmaker(bind=engine)



