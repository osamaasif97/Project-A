
import React from 'react'
import swal from 'sweetalert'
import jwt from 'jsonwebtoken'

async function Authenticator(token) {
    const user = jwt.decode(token)

    const now = Date.now().valueOf() / 1000
    const tokenTime = user.exp
    if (now > tokenTime || !token) {
        return <div>
            <h1>Invalid token</h1>
            Redirecting....
            {swal({
                title: "ERROR ",
                text: "Invalid Token",
                icon: "warning",
                timer: 2000,
                showCancelButton: false,
                showConfirmButton: false,
                button: "Continue",
            }).then(() => {
                sessionStorage.removeItem('token')
                setTimeout(function () {
                    window.location.href = "/login"
                }, 1000)
            })}
        </div>
    }
}

export default Authenticator