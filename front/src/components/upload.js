import "bootstrap/dist/css/bootstrap.min.css";
import SweetAlert from 'sweetalert2';
import axios from 'axios'



export const uploadAlert = async () => {
    const { value: file } = await SweetAlert.fire({
        title: 'Upload file',
        text: "your file needs to be saved as XLS or XLSX",
        input: 'file',
        inputAttributes: {
            'accept': '.xlsx,.xls', //TODO remove second condition
            'aria-label': 'Upload your file'
        }
    })
    if (file) {
        if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel') { //TODO remove second condition
            try {
                let data = new FormData()
                data.append('file', file)
                axios({
                    method: "POST",
                    url: "http://localhost:5000/fileImport",
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        'Content-Type': 'multipart/form-data'

                    },
                    data: data
                }).catch((err) => {
                    return SweetAlert.fire({
                        title: "Ooops",
                        text: "unexpected error occurred while uploading your file",
                        icon: 'error',

                    })
                })
                    .then((res) => {
                        if (res.data !== undefined && res.data.success) {
                            SweetAlert.fire({
                                title: res.data.message,
                                icon: 'success',

                            })
                        }
                    })
            } catch (error) {
                SweetAlert.fire({
                    title: "Ooops",
                    text: "unexpected error occurred while uploading your file",
                    icon: 'error',

                })
            }

        } else {
            SweetAlert.fire({
                title: "Wrong file type",
                text: "Please upload only XLSX",
                icon: 'error',

            })
        }
    }
}

