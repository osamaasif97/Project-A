async function allContacts(id) {
    // console.log(id);
    const result = await fetch(`http://localhost:4000/contact-list/allContacts?id=${id}`, {
        method: 'POST',
        headers: {
            'x-access-token': sessionStorage.getItem('token')
        }
    }).then((req) => req.json())
    // console.log(result);
    if (result.message === 'ok') {
        // console.log(result.data)
        return result
    }
}

export default allContacts