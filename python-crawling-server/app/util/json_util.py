import json

name = dict()
# name['type'] = ('key_name', 'value_name')


def to_json(data, type="default") -> str:
    if type == "default":
        return json.dumps(data, ensure_ascii=False)
        
    key_name, value_name = name[type]
    
    res_list = []
    for key, value in data.items():
        res_list.append({key_name: key, value_name: value})

    return to_json(res_list)


def load_json_from_file(file_path: str, encoding='utf-8') :
    with open(file_path, 'r', encoding=encoding) as f:
        return json.load(f)