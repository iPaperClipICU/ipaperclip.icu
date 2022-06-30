import os, json

PAGE = 30

def paging(data):
    '''
    分页
    '''
    if len(data) > PAGE:
        # 分页
        returnData = []
        for i in range(0, len(data), PAGE):
            returnData.append(data[i:i+PAGE])
        return {
            'pages': True,
            'data': returnData
        }
    else:
        return {
            'pages': False,
            'data': data
        }

def main():
    with open('./FilesData_data.json', 'r', encoding='UTF-8') as r:
        FilesData_data = json.load(r)['data']
    r.close()
    FilesData = {}
    SearchData = {}
    
    for i in FilesData_data:
        tag = len(i) == 2
        tmp = {}
        
        if (tag):
            # 有Tag
            for tagName in i[1]:
                for root, dirs, files in os.walk('..\\iPaperClipICU\\'+i[0]+'\\'+tagName):
                    # SearchData
                    for ii in files:
                        SearchData[ii] = [i[0], tagName]
                    
                    # FilesData
                    tmp[tagName] = paging(files)
                    break
        else:
            # 无Tag
            for root, dirs, files in os.walk('..\\iPaperClipICU\\'+i[0]):
                # SearchData
                for ii in files:
                    SearchData[ii] = [i[0]]
                tmp = paging(files)
                break
        
        FilesData[i[0]] = tmp
    
    FilesData = {
        'menuData': FilesData_data,
        'searchData': SearchData,
        'data': FilesData
    }

    with open('./FilesData.json', 'w', encoding='UTF-8') as w:
        json.dump(FilesData, w)
    w.close()

if __name__ == '__main__':
    main()
