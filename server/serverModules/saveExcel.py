import xlwt
import random
from serverModules.DBShow import dataToShow
from serverModules.DBTables import tablesToShow

def exportExcel ():
    raport = xlwt.Workbook(encoding="utf-8")
    tables = tablesToShow()
    sheetNames = []
    for table in tables:
        sheetNames.append(table['value'])

    for tableName in sheetNames:
        sheet = raport.add_sheet(tableName)
        raportColor = random.choice(["green","red","blue","violet","ocean_blue","black"])
        if raportColor == 'black':
            secondColor = 'silver_ega'
        elif raportColor == 'green':
            secondColor = 'light_green'
        elif raportColor == 'red':
            secondColor = 'coral'
        elif raportColor == 'blue':
            secondColor = 'light_blue'
        elif raportColor == 'ocean_blue':
            secondColor = 'sky_blue'
        elif raportColor == 'violet':
            secondColor = 'pink'
        #print(raportColor)
        #print(secondColor)
        header = xlwt.easyxf(
            'font: bold 1, name Calibri, height 160, color white;'
            'align: vertical top, horizontal left, wrap on;'
            'borders: top_color white, bottom_color white, right_color white, left_color white, left thin, right thin, top thin, bottom thin;'
            'pattern: pattern solid, pattern_fore_colour '+raportColor+', pattern_back_colour '+raportColor+''
        )
        normie = xlwt.easyxf(
            'font: bold off, name Calibri, height 160;'
            'align: vertical top, horizontal left, wrap on;'
            'borders: top_color '+raportColor+', bottom_color '+raportColor+', right_color '+raportColor+', left_color '+raportColor+', left thin, right thin, top thin, bottom thin;'
        )
        normie2 = xlwt.easyxf(
            'font: bold off, name Calibri, height 160;'
            'align: vertical top, horizontal left, wrap on;'
            'borders: top_color ' + raportColor + ', bottom_color ' + raportColor + ', right_color ' + raportColor + ', left_color ' + raportColor + ', left thin, right thin, top thin, bottom thin;'
            'pattern: pattern solid, pattern_fore_colour ' + secondColor + ', pattern_back_colour ' + secondColor + ''
        )
        allData = dataToShow(tableName)
        documentRows = 1

        documentColumns = 0
        try:
            for headline in allData[0]:
                if not headline == 'id':
                    sheet.write(0,documentColumns,headline,header)
                    documentColumns += 1
        except:
            print('')

        try:
            for object in allData:
                documentColumns = 0
                for data in object:
                    if not data == 'id':
                        if documentRows%2 == 1:
                            sheet.write(documentRows,documentColumns,object[data],normie)
                        else:
                            sheet.write(documentRows, documentColumns, object[data], normie2)

                        documentColumns += 1
                documentRows += 1
        except:
            print('')

    raport.save('temp/raport.xls')