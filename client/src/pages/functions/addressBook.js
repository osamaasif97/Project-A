async function addressBook() {
    const result = await fetch(`http://localhost:4000/contact-list`, {
        method: 'GET',
        headers: {
            'x-access-token': sessionStorage.getItem('token')
        }
    }).then((req) => req.json())
    if (result.status === 'ok') {
        // console.log(result.data)
        return result.data
    }
}

export default addressBook