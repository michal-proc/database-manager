import SweetAlert from 'sweetalert2'
import { passwordChange } from './Options/passwordChange'
import { NewUser } from './Options/addUser'
export const userSettings = async (user) => {

    if (user.permissions === 'admin') {
        SweetAlert.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `<i class="fa fa-lock"/>`,
            denyButtonText: `<i class="fa fa-user-plus"/>`,
            denyButtonColor: "green",
            cancelButtonColor: "red",
            cancelButtonText: `<i class="fa fa-times  "/>`,

        }).then((result) => {
            console.log(result)
            if (result.isConfirmed) {
                passwordChange(user)
            } else if (result.isDenied) {
                NewUser()
            }
        })


    } else {
        passwordChange(user)
    }
}
