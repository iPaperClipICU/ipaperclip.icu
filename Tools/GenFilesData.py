import os, json

def main():
    with open('./FilesData_data.json', 'r', encoding='UTF-8') as r:
        FilesData_data = json.load(r)['data']
    r.close()
    FilesData = []
    
    for i in FilesData_data:
        tag = len(i) == 2
        tmp = []
        
        if (tag):
            # 有Tag
            for tagName in i[1]:
                for root, dirs, files in os.walk('..\\iPaperClipICU\\'+i[0]+'\\'+tagName):
                    tmp.append({
                        'name': tagName,
                        'data': files
                    })
                    break
        else:
            # 无Tag
            for root, dirs, files in os.walk('..\\iPaperClipICU\\'+i[0]):
                tmp = files
                break
        
        FilesData.append({
            'name': i[0],
            'tag': tag,
            'data': tmp
        })

    with open('./FilesData.json', 'w', encoding='UTF-8') as w:
        json.dump(FilesData, w)
    w.close()

if __name__ == '__main__':
    main()
