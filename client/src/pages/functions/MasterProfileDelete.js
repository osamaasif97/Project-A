import swal from 'sweetalert'
async function MasterProfileDelete(id) {
    const result = await fetch(`http://localhost:4000/MasterProfileDelete`, {
        method: 'DELETE',
        headers: {
            'x-access-token': sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            profileID: id
        })
    }).then((req) => req.json())
    if (result.status === 'ok') {
        swal({
            title: "",
            text: result.message,
            icon: "success",
            timer: 2000,
            showCancelButton: false,
            showConfirmButton: false,
            button: "Continue",
        }).then(() => { window.location.href = '/masterAdmin' })
    }

    if (result.error) {
        // setTimeout(function () {
        //     window.location.href = "/masterAdmin"
        // }, 3000)
        console.log(result.error);
    }
}

export default MasterProfileDelete