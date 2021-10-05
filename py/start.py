import os
import hashlib
import json

jsonPath = 'config.json'
name = ''
url = '.\\'+name+'\\'
config_url = 'https://file.hsyhx.top/'+name+'/'
config_type = 'video'
config_time = '2021.09.27'

config_json = {}

def fName():
    for root, dirs, files in os.walk('.'):
        if root == url:
            return files
        else:
            continue

def fJson():
    for i in fName():
        print(i) #deBug
        hash = hashlib.md5()
        hash.update(i.encode(encoding='utf-8'))
        print(hash.hexdigest()) #deBug
        size = os.path.getsize(url+i)
        if size<float(1024*1024):
            size = str(round((size/float(1024)), 2))+' KB'
        elif size >= float(1024*1024) and size < float(1024*1024*1024):
            size = str(round((size/float(1024*1024)), 2))+' MB'
        else:
            size = str(round((size/float(1024*1024*1024)), 2))+' GB'
        print(size) #deBug
        config_json['ID'+hash.hexdigest()] = {
            "name": i,
            "id": 'ID'+hash.hexdigest(),
            "url": config_url+i,
            "type": config_type,
            "time": config_time,
            "size": size
        }
        print('--------') #deBug

fJson()
print(config_json) #deBug
try:
    with open(jsonPath, 'rb') as f:
        params = json.load(f)
        params=config_json
        # 修改内容
        dict = params
    f.close()
except:
    print('读失败')
try:
    with open(jsonPath, 'w') as r:
        json.dump(dict, r)
    r.close()
except:
    print('写失败')
