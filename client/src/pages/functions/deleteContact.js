import swal from 'sweetalert'

async function deleteContact(id) {
    if (id.length >= 1) {
        const result = await fetch('http://localhost:4000/contact-list/bulkDelete', {
            method: 'DELETE',
            headers: {
                'x-access-token': sessionStorage.getItem('token'),
                'id': id
            }
        }).then((req) => req.json())
        if (result.status === 'ok') {
            swal({
                title: "",
                text: `${id.length} Contacts DELETED!!!`,
                icon: "success",
                timer: 2000,
                showCancelButton: false,
                showConfirmButton: false,
                button: "Continue",
            }).then(() => { window.location.href = '/contact-list' })
        }
    } else if (id.length === 1) {
        const result = await fetch('http://localhost:4000/contact-list/delete', {
            method: 'DELETE',
            headers: {
                'x-access-token': sessionStorage.getItem('token'),
                'id': id
            }
        }).then((req) => req.json())
        if (result.status === 'ok') {
            swal({
                title: "",
                text: "Contact DELETED!!!",
                icon: "success",
                timer: 2000,
                showCancelButton: false,
                showConfirmButton: false,
                button: "Continue",
            }).then(() => { window.location.href = '/contact-list' })
        }
    }
}

export default deleteContact