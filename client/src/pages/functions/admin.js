
async function Power(checkID) {
    const result = await fetch(`http://localhost:4000/adminPower`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': sessionStorage.getItem('token')
        },
        body: JSON.stringify({
            checkID
        })
    }).then((req) => req.json())
    console.log(result)
    if (result.error) {
        // setTimeout(function () {
        //     window.location.href = "/masterAdmin"
        // }, 3000)
        console.log(result.error);
    }
}

export default Power