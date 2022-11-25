import React, { useState, useLayoutEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import swal from 'sweetalert'

export const UpdateModal = ({ showModal, setShowModal, DATA }) => {
    const [name, setName] = useState("")
    const [number, setNumber] = useState("")
    const [id, setId] = useState("")

    useLayoutEffect(() => {
        if (showModal === true) {
            setName(DATA.current.name)
            setNumber(DATA.current.number)
            setId(DATA.current._id)
        }
    }, [])

    async function updateContact() {
        const result = await fetch('http://localhost:4000/contact-list/update', {
            method: 'PATCH',
            headers: {
                'x-access-token': sessionStorage.getItem('token'),
                'Content-Type': 'application/json',
                'id': id
            },
            body: JSON.stringify({
                name,
                number
            })
        }).then((req) => req.json())
        if (result.status === 'ok') {
            swal({
                title: "",
                text: `${result.message}!!`,
                icon: "success",
                timer: 2000,
                showCancelButton: false,
                showConfirmButton: false,
                button: "Continue",
            }).then(() => { window.location.href = '/contact-list' })
        }
        if (result.status === 'error') {
            swal({
                title: "Error",
                text: `${result.error}!!`,
                icon: "warning",
                timer: 2000,
                showCancelButton: false,
                showConfirmButton: false,
                button: "Continue",
            })
            // alert(result.error)
        }
    }

    return <>{showModal ? <div className='test' >
        <form onSubmit={(e) => {
            updateContact(e.preventDefault())
        }} className='container'>
            <FontAwesomeIcon icon={faTimesCircle} fixedWidth className='closemodalbutton'
                onClick={() => {
                    setShowModal("close")

                }} />
            <h2 className='Header'>Contact Editor</h2>
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
            /><br />
            <input
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                type="text"
            /><br />
            <input className='button' type="submit" value="Update" /><br />
        </form>

    </div> : null
    }</>

}