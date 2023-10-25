#.env 파일 속 PUBLIC_DATA_API_KEY 불러오기
from dotenv import load_dotenv
load_dotenv(verbose=True)


from app import app


if __name__ == '__main__':
    app.run(debug=True, threaded=True)

