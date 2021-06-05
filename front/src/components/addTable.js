import SweetAlert from 'sweetalert2'
import axios from 'axios'
export const RodAdd = async () => {
    let dataObject = {}
    SweetAlert.fire({
        title: "Table name",
        input: 'text',
        inputAttributes: {
            required: true,
        },
        showCancelButton: true,
    }).then(async (res) => {
        if (res.isConfirmed) {
            dataObject['table_name'] = res.value
            await SweetAlert.fire({
                title: 'How many rows',
                icon: 'question',
                input: 'range',
                showCancelButton: true,
                inputLabel: 'Column Ammount',
                inputAttributes: {
                    min: 1,
                    max: 255,
                    step: 1
                },
                inputValue: 6
            }).then(async (result) => {
                if (result.isConfirmed) {
                    dataObject['col_num'] = result.value
                    let queueArray = []
                    for (let i = 1; i <= dataObject.col_num; i++) {
                        queueArray.push({ title: `Column ${i}` })
                    }
                    SweetAlert.mixin({
                        input: 'text',
                        confirmButtonText: 'Next &rarr;',
                        inputAttributes: {
                            required: true,
                        },
                        showCancelButton: true,
                    }).queue(queueArray).then((result) => {
                        if (result.isConfirmed)
                            if (result.value) {
                                let dataToSend = [dataObject['table_name'], ...result.value]
                                axios({
                                    method: "post",
                                    url: "http://localhost:5000/newTable",
                                    headers: {
                                        "Access-Control-Allow-Origin": "*",
                                    },
                                    data: {
                                        ...dataToSend
                                    }
                                }).catch((err) => {
                                    return SweetAlert.fire({
                                        title: "Ooops",
                                        text: "Could not connect to server",
                                        icon: 'error',
                                    })
                                }).then((res) => {
                                    try {
                                        if (res.data.success)
                                            SweetAlert.fire({
                                                icon: 'success',
                                                title: "Table successfully created",
                                            })
                                        else
                                            SweetAlert.fire({
                                                icon: 'warning',
                                                title: "Sorry",
                                                text: "We could't create your table please try again"
                                            })
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
            })
        }
    })
}