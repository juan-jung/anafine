import pymysql
import os
from dotenv import load_dotenv
load_dotenv(verbose=True)


SERVER_URL = os.environ.get('SERVER_URL')
DB_PORT = int(os.environ.get('DB_PORT'))
DB_USER = os.environ.get('DB_USER')
DB_PASSWORD = os.environ.get('DB_PASSWORD')
DATABASE_NAME = os.environ.get('DATABASE_NAME')

connection = pymysql.connect(host=SERVER_URL,
                             port=DB_PORT,
                             user=DB_USER,
                             password=DB_PASSWORD,
                             database=DATABASE_NAME)

cursor = connection.cursor()
cursor.execute("INSERT INTO hospital(name) VALUES ('testname');")
connection.commit()

connection.close()