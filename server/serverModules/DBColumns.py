from serverModules.DBConnect import con

def readColumns(tableName):
    cur = con.cursor()
    cur.execute("SELECT column_name FROM information_schema.columns WHERE table_name = '"+tableName+"'")
    records = cur.fetchall()
    columns = []

    for rec in records:
        column = str(rec[0])
        columns.append(column)

    return columns