import SweetAlert from 'sweetalert2'
import axios from 'axios'


export const NewUser = async () => {
    SweetAlert.mixin({
        confirmButtonText: 'Next &rarr;',
        showCancelButton: true,
        progressSteps: ['1', '2', '3', '4', '5']
    }).queue([
        {
            title: 'Username',
            input: 'text',
            inputPlaceholder: "username"
        },
        {
            title: 'E-mail',
            input: 'email',
            inputPlaceholder: "email"
        },
        {
            title: "Role ?",
            input: 'select',
            inputOptions: {
                admin: "admin",
                moderator: "moderator",
                guest: "guest"
            },
            inputPlaceholder: 'Select Role',
        },
        {
            title: "Password",
            input: "password",
            inputPlaceholder: "password"
        },
        {
            title: "Confirm password",
            input: "password",
            inputPlaceholder: "confirm password "

        }
    ]).then((result) => {
        console.log(result.value)
        if (result.value) {
            if (result.value[0] && result.value[1] && result.value[2] && result.value[3] && result.value[4])
                if (result.value[3] === result.value[4]) {
                    try {
                        axios({
                            method: 'POST',
                            url: "http://localhost:5000/register",
                            headers: {
                                "Access-Control-Allow-Origin": "*",
                            },
                            data: {
                                username: result.value[0],
                                email: result.value[1],
                                permissions: result.value[2],
                                password: result.value[3],
                            }
                        }).catch((err) => {
                            SweetAlert.fire({
                                title: "Sorry",
                                text: "Something went wrong1",
                                icon: "error"
                            })
                        })
                            .then((res) => {
                                if (res.data)
                                    if (res.data.success)
                                        SweetAlert.fire({
                                            title: "Your user has successfully been registered ",
                                            icon: "success"
                                        })
                                    else
                                        if (res.data.message)
                                            SweetAlert.fire({
                                                title: "Sorry",
                                                text: "User already exists",
                                                icon: "error"
                                            })
                                        else
                                            SweetAlert.fire({
                                                title: "Sorry",
                                                text: "Something went wrong",
                                                icon: "error"
                                            })
                                else
                                    SweetAlert.fire({
                                        title: "Sorry",
                                        text: "Something went wrong",
                                        icon: "error"
                                    })

                            })
                    } catch (error) {
                        SweetAlert.fire({
                            title: "Sorry",
                            text: "Something went wrong",
                            icon: "error"
                        })
                    }
                } else {
                    SweetAlert.fire({
                        title: "Sorry",
                        text: "Passwords are not equal",
                        icon: "error"
                    })
                }
            else
                SweetAlert.fire({
                    title: "Sorry",
                    text: "All fileds are required",
                    icon: "error"
                })
        }
    })

}