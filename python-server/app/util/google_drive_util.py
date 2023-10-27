import gdown
import os

def download_from_google_drive(output_path:str, file_id:str):
    google_path = f'https://drive.google.com/uc?id={file_id}'
    
    # Ensure the output directory exists
    output_directory = os.path.dirname(output_path)
    if not os.path.exists(output_directory):
        os.makedirs(output_directory)
    
    gdown.download(google_path, output_path, quiet=False)
