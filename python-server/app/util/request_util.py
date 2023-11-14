import requests


def get_response(api_url:str, type="GET", json:str=None) -> str:
    if type == "GET":
        response = requests.get(api_url)
    elif type == "POST":
        response = requests.post(api_url, json=json)
    
    if response.status_code == 200:
        return response.text 
    else:
        raise Exception(f"HTTP Error: {response.status_code}")
