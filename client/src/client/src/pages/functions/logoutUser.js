
async function logoutUser() {
    const result = await fetch('http://localhost:4000/logout', {
        method: 'POST'
    })
    const data = await result.json()

    if (data.status === 'ok') {
        sessionStorage.removeItem('token')
        setTimeout(function () {
            window.location.href = "/login"
        }, 500)
    } else {
        alert('error')
    }
}
export default logoutUser