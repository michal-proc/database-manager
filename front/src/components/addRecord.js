import "bootstrap/dist/css/bootstrap.min.css";
import SweetAlert from 'sweetalert2';
import axios from 'axios'

export const addRecord = async (Columns, sheet, setrefreshFire, refreshFire) => {
    let htmlContent = ''
    for (let i = 0; i < Columns.length; i++) {
        if (Columns[i] !== 'id')
            htmlContent += `<div class="form-group m-3 d-flex  flex-row">  <label class="d-inline-block mr-auto w-50  col-form-label"  for="$Columns[i]">${Columns[i]}</label><Input class="newRowInput w-50 ml-autow form-control" type="text" id="${i}" name="${Columns[i]}" required/></div>`
    }

    await SweetAlert.fire({
        showCancelButton: true,
        title: "Add record",
        html: htmlContent,
        preConfirm: () => {
            try {
                let object = {}
                Columns = Columns.pop()
                let valueToCollect = document.querySelectorAll('.newRowInput')
                for (let i = 0; i < valueToCollect.length; i++) {
                    object[valueToCollect[i].name] = valueToCollect[i].value
                }
                axios({
                    method: "POST",
                    url: "http://localhost:5000/newLine",
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                    },
                    data: {
                        ...object,
                        sheet: sheet
                    },
                }).catch((err) => {
                    return SweetAlert.fire({
                        title: "Oops",
                        text: "unexpected error occurred while reading your data \n Please try one more time",
                        icon: 'error',
                    })
                })
                    .then((res) => {
                        console.log(res)
                        if (res.data !== undefined) {
                            if (res.data.success) {
                                SweetAlert.fire({
                                    title: "Success",
                                    text: "Record successfully added  ",
                                    icon: 'success',
                                })
                                setrefreshFire(refreshFire + 1)
                            }
                            else
                                SweetAlert.fire({
                                    title: "Error",
                                    text: "unexpected error occurred while adding your data \n Please try one more time",
                                    icon: 'error',
                                })
                        } else {
                            SweetAlert.fire({
                                title: "Error",
                                text: "unexpected error occurred while adding your data \n Please try one more time",
                                icon: 'error',
                            })
                        }
                    })
            }
            catch (err) {
                return SweetAlert.fire({
                    title: "Oops",
                    text: "unexpected error occurred while reading your data \n Please try one more time",
                    icon: 'error',
                })
            }
        }
    })
}