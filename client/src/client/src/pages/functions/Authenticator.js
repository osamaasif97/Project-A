
import React from 'react'

async function Authenticator(token) {
    const now = Date.now().valueOf() / 1000
    const tokenTime = token.exp
    if (now > tokenTime || !token) {
        return <div>
            <h1>Invalid token</h1>
            Redirecting....
            setTimeout(function () {
                window.location.href = "/login"
            }, 3000)
        </div>
    }
}

export default Authenticator