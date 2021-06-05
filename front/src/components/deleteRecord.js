import SweetAlert from 'sweetalert2'
import axios from 'axios'
const deleteRecord = (Insertindex, data, setData, editTrigger, seteditTrigger, sheet) => {
    let index = data.findIndex((x) => {
        return x.id === Insertindex
    })
    const Toast = SweetAlert.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 500,
    })
    SweetAlert.fire({
        icon: 'warning',
        title: `Delete row ?`,
        text: "This action is permament \n Your data is going to be  deleted forever",
        showCancelButton: true,
        cancelButtonColor: "green",
        confirmButtonColor: "red"
    }).then((result) => {
        if (result.isConfirmed) {
            //TODO axios
            axios({
                method: "post",
                url: "http://127.0.0.1:5000/deleteRow",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
                data: {
                    ...data[index],
                    sheet: sheet,
                    id: data[index].id
                }
            }).catch((err) => {
                return SweetAlert.fire({
                    title: "Ooops",
                    text: "Could not connect to server",
                    icon: 'error',
                })
            }).then((res) => {
                try {
                    if (res.data.success) {
                        try {
                            new Promise(async () => {
                                let newData = data
                                newData.splice(index, 1)
                                await setData(newData)
                                await await Toast.fire({
                                    icon: 'success',
                                    title: 'Row has been deleted'
                                })
                                await seteditTrigger((editTrigger + 1))
                            })
                        } catch (err) {
                            return SweetAlert.fire({
                                title: "Ooops",
                                text: "unexpected error occurred deleting row in your table",
                                icon: 'error',
                            })
                        }
                        SweetAlert.fire(
                            'Deleted!',
                            'Your row has been deleted.',
                            'success'
                        )
                    }
                } catch (err) {
                    return SweetAlert.fire({
                        title: "Ooops",
                        text: "unexpected error occurred deleting row in your table",
                        icon: 'error',
                    })
                }
            })
        }
    })
}
export default deleteRecord