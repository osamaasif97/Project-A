
import React from 'react'
import swal from 'sweetalert'
import jwt from 'jsonwebtoken'

async function Authenticator(token) {
    if (token) {
        const user = jwt.decode(token)
        const now = Date.now().valueOf() / 1000
        const tokenTime = user.exp
        if (now > tokenTime || !token) {
            return <div>
                {swal({
                    title: "ERROR ",
                    text: "UnAuthorized, Invalid Token",
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
    } else {
        swal({
            title: "ERROR ",
            text: "UnAuthorized",
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
        })
    }
}

export default Authenticator