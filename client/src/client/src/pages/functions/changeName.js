async function NameChange(name) {

    const result = await fetch(`http://localhost:4000/change-name`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': sessionStorage.getItem('token')
        },
        body: JSON.stringify({
            name
        })
    }).then((req) => req.json())
    if (result.status === 'ok') {
        // console.log(result.data)
        return result.data

    }
}

export default NameChange