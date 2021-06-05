import { React, useState } from 'react'
import SweetAlert from 'sweetalert2'
import "bootstrap/dist/css/bootstrap.min.css";
// import Input from 'react-select/src/components/input';
import "../styles/searchStyle.css";//css

const SearchInput = (props) => {
    const [InputValue, setInputValue] = useState('')
    return (
        <div className="input-group SheetSelect csText  m-2">
            <input type="text"
                className="form-control customTextInput"
                placeholder="Search..."
                onChange={(e) => { setInputValue(e.target.value) }}
            />
            <div className="input-group-apend colorChange">
                <span className="input-group-text cstomInputText fa fa-search" onClick={() => { props.changeSearch(InputValue) }} />
            </div>
        </div>
    )

}
export default SearchInput;