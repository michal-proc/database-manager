import xlrd
import os
# print(sheet.row_values(1))
#
# @desc
#

def fetchSheets(filePath):
    #print(filePath)
    workingSheet = xlrd.open_workbook(filePath)              # extract file
    workingSheet = workingSheet.sheet_names()
    # dataList = workingSheet.row_values(0)  # extract column names
    dataRow ={}
    dataModel=[]
    for i in range(0,len(workingSheet)):
        dataRow={"value":workingSheet[i],'label':workingSheet[i]}
        dataModel.append(dataRow)
        pass
    #print(type(dataModel))
    return (dataModel)

def fetchModel(filePath, sheetName):
    workingSheet = xlrd.open_workbook(filePath)              # extract file
    workingSheet = workingSheet.sheet_by_name(sheetName)
    dataList = workingSheet.row_values(0)  # extract column names
    i = 0
    for d in dataList:
        if len(d) == 1:
            del list[i]
        i += 1
    dataModel = dict.fromkeys(dataList, '')
    return dataModel


def rowToJSON(filePath, sheetName):
    dataModel = fetchModel(filePath, sheetName)
    dataToSend = []
    workingSheet = xlrd.open_workbook(filePath)  # extract file
    sheetDatamode = workingSheet.datemode
    workingSheet = workingSheet.sheet_by_name(sheetName)
    for row in range(1, workingSheet.nrows):  # workingSheet.nrows
        workingRow = []
        for cell in range(0, workingSheet.ncols):
            if workingSheet.cell(row, cell).ctype == 3:
                y, m, d, mn, sec, hr = xlrd.xldate_as_tuple(
                    workingSheet.cell(row, cell).value, sheetDatamode)
                workingRow.append("{2}.{1}.{0}".format(y, m, d))
                pass
            else:
                workingCell = workingSheet.cell(row, cell)
                workingRow.append(str(workingCell.value))
                pass

            pass
        singleRow = dict(zip(dataModel, workingRow))

        dataToSend.append(singleRow)
    pass
    #print(str(dataToSend))
    return dataToSend
