import SweetAlert from 'sweetalert2'
import axios from 'axios'

export const passwordChange = async (user) => {
    const { value: formValues } = await SweetAlert.fire({
        title: `Settings for ${user.username}`,
        html: `<label for="SweetAlert-email">Email</label>
            <input id="SweetAlert-email" class="swal2-input" placeholder='${user.email}' value='${user.email}'>
            <label for="SweetAlert-password">New Password</label>
            <input id="SweetAlert-password" class="swal2-input" placeholder="New Password" type="password">
            `,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            return [
                document.getElementById('SweetAlert-password').value,
                document.getElementById('SweetAlert-email').value
            ]
        }
    })
    if (formValues) {

        if (formValues[0] !== '' || formValues[1] !== user.email) {
            axios({
                url: "http://localhost:5000/changeUsrData",
                method: "POST",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
                data: {
                    username: user.username,
                    password: formValues[0],
                    email: formValues[1]
                }
            }).catch((err) => {
                return SweetAlert.fire({
                    title: "Ooops",
                    text: "unexpected error occurred while changing your data ",
                    icon: 'error',
                })
            }).then((res) => {
                if (res)
                    if (res.data)
                        if (res.data.success)
                            SweetAlert.fire({
                                title: "Data successfully changed",
                                icon: 'success',
                            })
                        else
                            return SweetAlert.fire({
                                title: "Ooops",
                                text: "unexpected error occurred while changing your data ",
                                icon: 'error',
                            })
                    else
                        return SweetAlert.fire({
                            title: "Ooops",
                            text: "unexpected error occurred while changing your data ",
                            icon: 'error',
                        })
                else
                    return SweetAlert.fire({
                        title: "Ooops",
                        text: "unexpected error occurred while changing your data ",
                        icon: 'error',
                    })
            })
        }

    }
}