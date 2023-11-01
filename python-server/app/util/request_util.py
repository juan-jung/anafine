import requests


def get_response(api_url:str):
    response = requests.get(api_url)
    
    if response.status_code == 200:
        return response.text 
    else:
        raise Exception(f"HTTP Error: {response.status_code}")
