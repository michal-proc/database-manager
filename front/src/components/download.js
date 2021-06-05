import axios from "axios";
import SweetAlert from 'sweetalert2'

export const fileDownload = async () => {
    SweetAlert.fire({
        title: "Do you want to download data sheet",
        showCancelButton: true,
        cancelButtonText: "No",
        cancelButtonColor: "red",
        confirmButtonText: "Yes",
        icon: 'question'
    }).then((result) => {
        if (result.isConfirmed) {
            axios({
                method: 'get',
                url: "http://localhost:5000/fileExport",
                responseType: 'blob',
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'raport.xls');
                document.body.appendChild(link);
                link.click();
            })
        }
    })

}

