const jwt = require('jsonwebtoken')

function Authenticated() {
    const token = localStorage.getItem('token')
    jwt.verify(token)
}

export default Authenticated