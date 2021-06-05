from flask import Flask, app ,request,json , send_file
from flask_cors import CORS
from serverModules.DBShow import dataToShow
from serverModules.DBTables import tablesToShow
from serverModules.DBUpdate import *
from serverModules.saveExcel import exportExcel
import os
from werkzeug.utils import secure_filename
from flask_pymongo import PyMongo
from pymongo import MongoClient
import bcrypt


app=Flask(__name__)
CORS(app)

app.config['MONGO_DBNAME'] = 'ABBDB'
app.config['MONGO_URI'] = 'mongodb+srv://admin:JTFnA3sCD5uwp50y@abbdb.kvxcj.mongodb.net/ABBDB?retryWrites=true&w=majority'


mongo = PyMongo(app)



path = os.getcwd()
UPLOAD_FOLDER = os.path.join(path, 'temp')
app.config['./temp'] = UPLOAD_FOLDER


@app.route('/sheets')
def index():
    xd = tablesToShow()
    #print(xd)
    return json.dumps(xd)


@app.route('/fetchColumn', methods=['POST'])
def fetchColumn():
    data = request.json
    beforeJson = dataToShow(data['sheet'])
    return json.dumps(beforeJson,sort_keys=False)
    return request.json


@app.route('/fileImport', methods=['POST'])
def fileImport():
    try:
        file=request.files['file']
        file.save(os.path.join('./temp','temp.xls'))
        updatingByFile('temp/temp.xls')
        return ({'message':"Sucessfull upload","success":"true"})
    except:
        return({'message':"Something went wrong :(","success":"false"})



@app.route('/fileExport', methods=['GET'])
def fileExport():
    try:
        exportExcel()
        return send_file("temp/raport.xls", as_attachment=True, attachment_filename="raport.xls")
    except:
        return({"success":False})


@app.route('/newLine', methods=['POST'])  # adding row
def newRecord():
    add = request.json
    ifSuccess = updatingOneLine(add)
    if ifSuccess == 1:
        return ({"message": "succeded", "success": True})
    else:
        return ({'message': "Something went wrong :(", "success": False})


@app.route('/editRow', methods=['POST'])  # edtowanie
def editRecord():
    ed = request.json
    ifSuccess = edit(ed)
    if ifSuccess == 1:
        return ({"success": True})
    else:
        return ({"success": False})


@app.route('/deleteRow', methods=['POST'])  # edtowanie
def deleteRow():
    try:
        rem = request.json
        #print(rem)
        delete(rem)
        return ({"success": True})
    except:
        return ({"success": False})

@app.route('/newTable', methods=['POST'])  # edtowanie
def newTable():
    tableInObject = request.json
    tableInList = []
    for col in tableInObject:
        tableInList.append(tableInObject[col])
    createTable(tableInList)
    try:
        return ({"success": True})
    except:
        return ({"success": False})

@app.route('/deleteTable', methods=['POST'])  # edtowanie
def deleteTable():
    try:
        toDelete = request.json
        #print(toDelete)
        delTable(toDelete['sheet'])
        return ({"success": True})
    except:
        return ({"success": False})

@app.route('/clearTable', methods=['POST'])  # edtowanie
def clearTable():
    try:
        toClear = request.json
        clTable(toClear['sheet'])
        return ({"success": True})
    except:
        return ({"success": False})

#login


@app.route('/login', methods=['POST'])
def login():
    users = mongo.db.ABBDB
    print(request.json)
    login_user = users.find_one({'username' : request.json['username']})
    print(login_user)
    if login_user != None:
        if bcrypt.hashpw(request.json['password'].encode('utf-8'), login_user['password'].encode('utf-8')) == login_user['password'].encode('utf-8'):
            return ({'success':True,'user':{'username':login_user['username'],'email':login_user['email'],'permissions':login_user['permissions']}})
        else:
            return ({'success':False,'message':'Invalid username/password combination'})
    else:
        return ({'success':False,'message':'Invalid username/password combination'})

@app.route('/register',methods=['POST'])
def register():
    try:
        users = mongo.db.ABBDB
        existing_user = users.find_one({'username' : request.json['username']})
        print(existing_user)
        print(request.json)
        
        if existing_user is None:
            try:
                hashpass = bcrypt.hashpw(request.json['password'].encode('utf-8'), bcrypt.gensalt())
                users.insert({
                'username' : request.json['username'],
                'password' : hashpass.decode("utf-8"),
                'email':request.json['email'],
                'permissions':request.json['permissions'],
                })        
                return ({'success':True})
            except:
                    return({'success':False})
        else:
            return({"success":False,'message':'user exisits'})
    except:
        return({'success':False})


if __name__ == "__main__":
    app.run(debug=True)