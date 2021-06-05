from serverModules.DBConnect import con


def tablesToShow ():
    cur = con.cursor()
    tablesList = []
    cur.execute("SELECT * FROM information_schema.tables WHERE table_schema='public' AND NOT table_name='pg_stat_statements'")
    tables = cur.fetchall()

    for tab in tables:
        tablesObject = {}
        tablesObject['value'] = tab[2]
        tablesObject['label'] = tab[2]
        tablesList.append(tablesObject)

    return tablesList