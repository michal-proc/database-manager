from serverModules.DBConnect import con
from serverModules.DBColumns import readColumns

def dataToShow (table):
    cur = con.cursor()
    cur2 = con.cursor()
    valuesList = []

    cur.execute('SELECT * FROM public."' + table + '" ORDER BY "id"')
    records = cur.fetchall()

    for rec in records:
        valuesObject = {}
        columns = readColumns(table)
        i = 0
        for col in columns:
            checkValue = str(rec[i])
            if (len(checkValue) == 10 and checkValue[4]=="-" and checkValue[7]=="-") or (len(checkValue) == 10 and checkValue[2]=="." and checkValue[5]==".") or (len(checkValue) == 9 and checkValue[1]=="." and checkValue[4]==".") or (len(checkValue) == 9 and checkValue[2]=="." and checkValue[4]==".") or (len(checkValue) == 8 and checkValue[1]=="." and checkValue[3]=="."):
                # Make beauty date
                if len(checkValue) == 10 and checkValue[4] == "-" and checkValue[7] == "-":
                    dd = checkValue[-2] + checkValue[-1]
                    mm = checkValue[-5] + checkValue[-4]
                    rrrr = checkValue[0] + checkValue[1] + checkValue[2] + checkValue[3]
                if len(checkValue) == 10 and checkValue[2]=="." and checkValue[5]==".":
                    dd = checkValue[0] + checkValue[1]
                    mm = checkValue[3] + checkValue[4]
                    rrrr = checkValue[6] + checkValue[7] + checkValue[8] + checkValue[9]
                if len(checkValue) == 9 and checkValue[1]=="." and checkValue[4]==".":
                    dd = '0' + checkValue[0]
                    mm = checkValue[2] + checkValue[3]
                    rrrr = checkValue[5] + checkValue[6] + checkValue[7] + checkValue[8]
                if len(checkValue) == 9 and checkValue[2]=="." and checkValue[4]==".":
                    dd = checkValue[0] + checkValue[1]
                    mm = '0' + checkValue[3]
                    rrrr = checkValue[5] + checkValue[6] + checkValue[7] + checkValue[8]
                if len(checkValue) == 8 and checkValue[1]=="." and checkValue[3]==".":
                    dd = '0' + checkValue[0]
                    mm = '0' + checkValue[2]
                    rrrr = checkValue[4] + checkValue[5] + checkValue[6] + checkValue[7]

                if mm == "01": mm = "Jan"
                if mm == "02": mm = "Feb"
                if mm == "03": mm = "Mar"
                if mm == "04": mm = "Apr"
                if mm == "05": mm = "May"
                if mm == "06": mm = "Jun"
                if mm == "07": mm = "Jul"
                if mm == "08": mm = "Aug"
                if mm == "09": mm = "Sep"
                if mm == "10": mm = "Oct"
                if mm == "11": mm = "Nov"
                if mm == "12": mm = "Dec"

                setValue = dd + ' ' + mm + ' ' + rrrr
            else:
                setValue = rec[i]
            if str(setValue) == 'None':
                setValue = ''
            if not str(setValue).count("\\n") == 0:
                setValue = setValue.replace("\\n"," ")
            valuesObject[col] = setValue
            i += 1
        valuesList.append(valuesObject)

    columns = readColumns(table)
    valuesObject = {}
    for col in columns:
        valuesObject[col]=''
    valuesList.append(valuesObject)

    return valuesList



