async function DeleteProfile(password) {

    const result = await fetch('http://localhost:4000/delete-user', {
        method: 'DELETE',
        headers: {
            'x-access-token': sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password
        })
    }).then((req) => req.json())
    console.log(result)

    if (result.status === 'error') {
        setTimeout(function () {
            window.location.href = "/login"
        }, 2000)
        alert(result.error)
    }
    if (result.status === 'ok') {
        sessionStorage.removeItem('token')
        setTimeout(function () {
            window.location.href = "/register"
        }, 3000)
        alert(result.message)
    }
}

export default DeleteProfile