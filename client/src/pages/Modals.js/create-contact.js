import React, { useState } from 'react'
import jwt from 'jsonwebtoken'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import swal from 'sweetalert'

export const CreateModal = ({ showModal, setShowModal, }) => {
    const history = useHistory()
    const [name, setName] = useState('')
    const [number, setNumber] = useState()
    const token = sessionStorage.getItem('token')

    async function createContact() {
        console.log('here')
        const result = await fetch('http://localhost:4000/contact-list/create', {
            method: 'POST',
            headers: {
                'x-access-token': sessionStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                number
            })
        }).then((res) => res.json())
        if (result.status === 'ok') {
            swal({
                title: "",
                text: "Contact created Successfully!!",
                icon: "success",
                timer: 2000,
                showCancelButton: false,
                showConfirmButton: false,
                button: "Continue",
            }).then(() => { window.location.href = '/contact-list' })
            // alert('Contact created Successfully!!')
            // window.location.href = '/contact-list'
        }
        if (result.status === 'error') {
            swal({
                title: "Error",
                text: result.error,
                icon: "warning",
                timer: 2000,
                showCancelButton: false,
                showConfirmButton: false,
                button: "Continue",
            })
            // alert(result.error)
        }
        if (token) {
            const user = jwt.decode(token)
            if (!user) {
                sessionStorage.removeItem('token')
                history.replace('/login')
            }
        }
    }

    return <>{showModal ? <div className='test'>
        < div className="container">
            <FontAwesomeIcon icon={faTimesCircle} fixedWidth className='closemodalbutton'
                onClick={() => setShowModal("close")} />
            <form onSubmit={(e) => createContact(e.preventDefault())} >
                <h1 className="Header" >Create new contact</h1>
                <input
                    value={name} className="Input"
                    onChange={(e) => setName(e.target.value)}
                    type="text" placeholder="Name"
                /><br />
                <input
                    value={number} className="Input"
                    onChange={(e) => setNumber(e.target.value)}
                    type="text" placeholder="Number"
                /><br />
                <input className="button"
                    type="submit" value="Create Contact" />
            </form>
        </div >

    </div> : null
    }</>

}