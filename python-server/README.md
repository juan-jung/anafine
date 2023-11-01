
## ※ 주의사항: .env 파일이 python-server의 상위 폴더에 존재해야한다.
 
**python-server 폴더에서 명령창을 연 뒤 아래 명령어 입력**

### 1. python 종속성 설치 방법



```python
#종속성 설치
python install_dependencies.py
```
 
 
### 2. python dev 서버 실행 방법

```python
#develop 서버 실행
python run.py
```
 
 
### 3. python 배포 서버 실행 방법

```python
#deploy 서버 실행
gunicorn --timeout 600 -w 1 --threads 2 -b 0.0.0.0:5000 run:app
```