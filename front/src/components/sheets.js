import { React, useState } from 'react'
import axios from 'axios'
import Select from 'react-select'
import "bootstrap/dist/css/bootstrap.min.css";


function SheetsComponent({ sheet, close, sheetValue }) {
    const [sheets, setSheets] = useState([])
    const sheetsGetter = async () => {
        axios({
            method: "get",
            url: "http://localhost:5000/sheets",
            headers: {
                "Access-Control-Allow-Origin": "*",
            },

        })
            .then((res) => {
                setSheets(res.data)
            })
    }
    return (

        <Select
            placeholder="select sheet"
            onMenuOpen={sheetsGetter}
            isSearchable={true}
            options={sheets}
            name="sheetName"
            defaultOptions={true}
            className="SheetSelect m-2"
            onChange={e => { sheet(e.value) }}
        />


    )
}

export default SheetsComponent;
