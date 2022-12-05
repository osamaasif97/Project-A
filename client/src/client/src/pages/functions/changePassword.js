import swal from 'sweetalert'

async function PasswordChange(password, newPassword, confirmNewPassword) {
    console.log(password, newPassword, confirmNewPassword);
    const result = await fetch('http://localhost:4000/change-password', {
        method: 'PATCH',
        headers: {
            'x-access-token': sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password,
            newPassword,
            confirmNewPassword
        })
    })
    const data = await result.json()
    if (data.error) {
        swal({
            title: "Error",
            text: data.error,
            icon: "warning",
            timer: 2000,
            showCancelButton: false,
            showConfirmButton: false,
            button: "Continue",
        })
    }
    if (data.status === 'ok') {
        swal({
            title: "",
            text: data.message,
            icon: "success",
            timer: 2000,
            showCancelButton: false,
            showConfirmButton: false,
            button: "Continue",
        }).then(() => { window.location.href = '/edit-profile' })
    }

    console.log(result)
}

export default PasswordChange