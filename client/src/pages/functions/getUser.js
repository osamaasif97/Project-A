
async function getUser(ID) {
    const result = await fetch(`http://localhost:4000/info/${ID}`, {
        method: 'GET'
    }).then((req) => req.json())
    // console.log(result);
    if (result.message === 'ok') {
        return result.data
    }
    if (result.error) {
        // setTimeout(function () {
        //     window.location.href = "/masterAdmin"
        // }, 3000)
        console.log(result.error);
    }
}

export default getUser