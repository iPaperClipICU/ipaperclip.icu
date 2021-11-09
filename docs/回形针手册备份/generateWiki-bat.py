import json
import os

# <修改>
JSONPATH = 'all.json' #输入路径
OUT = 'out.bat' #输出路径
URL = '.\\全部条目'
# </修改>

json_all={} #参数json
out_bat='' #输出内容
def check_name(url, name):
    for root, dirs, files in os.walk(URL):
        for i in files:
            if (name+'.md') in i:
                return ''
    return 'copy nul ' +url + '\\' + name + '.md\n'

#读取参数
try:
    with open(JSONPATH, 'rb') as f:
        json_all = json.load(f)
    f.close()
except:
    print('文件读失败')

for i in json_all:
    i_title = json_all[i]['title']
    for ii in json_all[i]['data']:
        ii_name = json_all[i]['data'][ii]['name']
        for iii in json_all[i]['data'][ii]['data']:
            iii_name = json_all[i]['data'][ii]['data'][iii]['name']
            url_wjj = '全部条目\\'+i+'\\'+ii_name+'\\'+iii_name
            out_bat = out_bat + 'mkdir ' + url_wjj + '\n' #生成文件夹
            for iiii in json_all[i]['data'][ii]['data'][iii]['data']:
                iiii_name = json_all[i]['data'][ii]['data'][iii]['data'][iiii]['name']
                #全部条目\A.农林牧渔\农业\谷物种植\1-1-1.稻谷种植.md
                out_bat = out_bat + check_name(url_wjj, iiii_name)

out_bat = '@ECHO OFF\n' + out_bat

try:
    with open(OUT, 'w',encoding='ANSI') as r:
        r.write(out_bat)
    r.close()
except:
    print('写失败')

print('OK')