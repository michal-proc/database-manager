import { React, useState, useContext } from 'react';


import 'bootstrap/dist/css/bootstrap.min.css'; //css
import "../styles/home.css";//css
//other 
import Table from './table'
import SheetsComponent from './sheets';
import SearchInput from './search';
import { uploadAlert } from './upload';
import { addRecord } from './addRecord'
import { UserContext } from './auth/userContext'
import { fileDownload } from './download'
import { dropTable } from './deleteTable'
import { clearTable } from './clearTable'
import { NewUser } from './auth/Options/addUser'
import { passwordChange } from './auth/Options/passwordChange'
import { RodAdd } from './addTable'

const HomeComponent = () => {
    //modals hooks
    const [refreshFire, setrefreshFire] = useState(0)
    const [Columns, setColumns] = useState([])
    const [SearchModalStatus, ChangeSearchModalStatus] = useState('');       //status for search
    const { user, Setuser } = useContext(UserContext) //contexr
    const [Sheet, setSheet] = useState('TG')
    document.title = `Patent Menager`;

    const userPermission = () => {
        if (user.permissions === 'admin') {
            return (
                <div className="navbar-nav ml-auto mt-2 mt-lg-0 miniNav">
                    <i title="Clear table" onClick={() => clearTable(Sheet)} className="fa fa-eraser  "></i>
                    <i title="Delete" onClick={() => dropTable(Sheet)} className="fa fa-trash"></i>
                    <i title="Add Table" onClick={() => RodAdd()} className="fa fa-table"></i>
                    <i title="Refresh" onClick={() => { setrefreshFire(refreshFire + 1) }} className="fa fa-refresh" />
                    <i title="Add Record" onClick={() => { addRecord(Columns, Sheet, setrefreshFire, refreshFire) }} className="fa fa-plus"></i>
                    <i title="Upload Sheet " onClick={() => uploadAlert()} className="fa fa-upload"></i>
                    <i title="Download sheet" onClick={() => fileDownload()} className="fa fa-download"></i>
                    <i title="User" onClick={() => passwordChange(user)} className="fa fa-user"></i>
                    <i title="Add user" onClick={() => NewUser(user)} className="fa fa-user-plus"></i>

                </div >
            )
        }
        else if (user.permissions === 'moderator') {
            return (
                <div className="navbar-nav ml-auto mt-2 mt-lg-0 miniNav">
                    <i title="Refresh" onClick={() => { setrefreshFire(refreshFire + 1) }} className="fa fa-refresh" />
                    <i title="Add Record" onClick={() => { addRecord(Columns, Sheet, setrefreshFire, refreshFire) }} className="fa fa-plus"></i>
                    <i title="Upload Sheet " onClick={() => uploadAlert()} className="fa fa-upload"></i>
                    <i title="Download sheet" onClick={() => fileDownload()} className="fa fa-download"></i>
                    <i title="User" onClick={() => passwordChange(user)} className="fa fa-user"></i>
                </div >
            )
        }
        else if (user.permissions === 'guest') {
            return (
                <div className="navbar-nav ml-auto mt-2 mt-lg-0 miniNav">
                    <i title="Refresh" onClick={() => { setrefreshFire(refreshFire + 1) }} className="fa fa-refresh" />
                    <i title="User" onClick={() => passwordChange(user)} className="fa fa-user"></i>
                </div>

            )
        }
    }

    return (
        <UserContext.Provider value={{ user, Setuser }} >
            <div className="wholePage d-flex flex-column" >
                <nav className="navbar navigatorSide navbar-expand-lg navbar-dark bg-dark">
                    <button className="navbar-toggler ml-2" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse toogleBar" id="navbarTogglerDemo01">
                        <SheetsComponent sheetValue={Sheet} sheet={setSheet} />
                        <SearchInput changeSearch={ChangeSearchModalStatus} />
                        {userPermission()}
                    </div>
                </nav>
                <div className="tableContainer flex-grow-1">
                    <Table className="table"
                        sheetToImport={Sheet} columnNames={setColumns} search={SearchModalStatus} refreshFire={refreshFire} />
                </div>

            </div >
        </UserContext.Provider>

    )
}

export default HomeComponent;