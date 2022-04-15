import os, json,random

class ramNum:
    def __init__(self, sort: list, list: list):
        self.sortNum = sort
        self.listNum = list
        self.sortData = []
    
    def sort(self):
        '''
        生成分类ID
        '''
        self.listData = []
        [min, max] = self.sortNum
        while True:
            tmp = random.randint(min, max)
            if tmp not in self.sortData:
                self.sortData.append(tmp)
                break
        self.s = str(tmp)
    
    def list(self) -> str:
        '''
        生成文件ID
        '''
        [min, max] = self.listNum
        while True:
            tmp = random.randint(min, max)
            if tmp not in self.listData:
                self.listData.append(tmp)
                break
        return self.s+str(tmp)

def getData(path: str) -> json:
    '''
    获取Data
    {
        '分类名 回形针PaperClip': [[
            'name': 'Vol.001',
            'url': 'https://Vol.001'
        ], [
            'name': 'Vol.002',
            'url': 'https://Vol.002'
        ], ...]
    }
    '''
    '''
    {
        '一级分类 回形针PaperClip': {
            'def': 'Vol',
            'data': {
                '二级分类 Vol': [[
                    'name': 'Vol.001',
                    'url': 'https://Vol.001'
                ], [
                    'name': 'Vol.002',
                    'url': 'https://Vol.002'
                ], ...]
            }
        }
    }
    '''
    tmp = {}
    for root, dirs, files in os.walk(path):
        if root != path:
            for i in files:
                fileUrl = (root+'/'+i).replace(r'//', r'/').replace('\\', r'/').split(path)[1].split('/')
                if len(fileUrl) == 2:
                    tag2 = 'None'
                else:
                    tag2 = fileUrl[1]
                tag1 = fileUrl[0] #分类名
                url = 'https://file.hsyhx.top/video/'
                for ii in fileUrl:
                    url += ii+'/'
                url = url[:-1]
                if tag1 not in tmp:
                    tmp[tag1] = {
                        'def': tag2,
                        'data': {}
                    }
                if tag2 not in tmp[tag1]['data']:
                    tmp[tag1]['data'][tag2] = []
                tmp[tag1]['data'][tag2].append({
                    'name': i,
                    'url': url
                })
    
    return tmp

def clearData(data: json) -> list:
    '''
    整理Data
    [{
        'name': '回形针PaperClip',
        'list': [[
            'name': 'Vol.001',
            'url': 'https://Vol.001'
        ], [
            'name': 'Vol.002',
            'url': 'https://Vol.002'
        ], ...]
    }, ...]
    '''
    '''
    [{
        'name': '回形针PaperClip',
        'def': 'Vol',
        'list': {
            '二级分类 Vol': [[
                'name': 'Vol.001',
                'url': 'https://Vol.001'
            ], [
                'name': 'Vol.002',
                'url': 'https://Vol.002'
            ], ...]
        }
    }, ...]
    '''
    tmp = []
    for i in data:
        tmp.append({
            'name': i,
            'def': data[i]['def'],
            'list': data[i]['data']
        })
    return tmp

def addID(data: list) -> list:
    '''
    添加ID
    [{
        'name': '回形针PaperClip',
        'id': '1',
        'list': [[
            'name': 'Vol.001',
            'id': '11',
            'url': 'https://Vol.001'
        ], [
            'name': 'Vol.002',
            'id': '12',
            'url': 'https://Vol.002'
        ], ...]
    }, ...]
    
    [{
        'name': '回形针PaperClip',
        'id': '1',
        'list': {
            '二级分类 Vol': [[
                'name': 'Vol.001',
                'id': '11',
                'url': 'https://Vol.001'
            ], [
                'name': 'Vol.002',
                'id': '12',
                'url': 'https://Vol.002'
            ], ...]
        }
    }, ...]
    '''
    ramID = ramNum([10, 99], [100, 999]) #生成分类ID
    for i in data:
        ramID.sort()
        for ii in i['list']:
            for iii in i['list'][ii]:
                iii['id'] = ramID.list()
        i['id'] = ramID.s
    
    return data

def paging(data: list, pageSize: int) -> list:
    '''
    分页
    [{
        'name': '回形针PaperClip',
        'id': '1',
        'list': [
        [[
            'name': 'Vol.001',
            'id': '11',
            'url': 'https://Vol.001'
        ], [
            'name': 'Vol.002',
            'id': '12',
            'url': 'https://Vol.002'
        ]], [[
            'name': 'Vol.004',
            'id': '13',
            'url': 'https://Vol.004'
        ], [
            'name': 'Vol.005',
            'id': '14',
            'url': 'https://Vol.005'
        ]], ...]
    }, ...]
    '''
    tmp = []
    for i in data:
        list = {}
        for ii in i['list']:
            pages = [] #集合
            tmpNum = 1 #计数
            while tmpNum < len(i['list'][ii]):
                page = [] #单页
                maxTmpNum = tmpNum+pageSize-1
                while tmpNum <= maxTmpNum:
                    if tmpNum > len(i['list'][ii]):
                        break
                    page.append(i['list'][ii][tmpNum-1])
                    tmpNum += 1
                pages.append(page)
            list[ii] = pages
        tmp.append({
            'name': i['name'],
            'id': i['id'],
            'def': i['def'],
            'list': list
        })
    
    return tmp

def getSearchMap(data: list) -> json:
    '''
    获取searchMap
    {
        'name': 'id'
    }
    '''
    tmp = {}
    for i in data:
        for ii in i['list']:
            for iii in i['list'][ii]:
                tmp[iii['name']] = iii['id']
    
    return tmp

def saveJson(data: json, path: str):
    '''
    保存json
    '''
    with open(path, 'w', encoding='UTF-8') as w:
        json.dump(data, w)
    w.close()

def main():
    print('------------------------------------------------------')
    print('获取Data')
    data = getData('./iPaperClipICU/')
    print('整理Data')
    data = clearData(data)
    print('添加ID')
    data = addID(data)
    tmpData = data
    print('分页')
    data = paging(data, 20)
    print('生成searchMap')
    searchMap = getSearchMap(tmpData)
    data = {
        'data': data
    }
    print('save: data')
    saveJson(data, './data/data.json')
    print('save: searchMap')
    saveJson(searchMap, './data/searchMap.json')
    print('------------------------------------------------------')

if __name__ == '__main__':
    main()
