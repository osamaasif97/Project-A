import React, { useState } from "react";
import jwt from 'jsonwebtoken'
import { useHistory } from 'react-router-dom'
import swal from 'sweetalert'

const App = () => {
    const history = useHistory()
    const token = sessionStorage.getItem('token')
    const [name, setName] = useState('')
    const [number, setNumber] = useState()

    async function createContact(event) {
        event.preventDefault()
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
            alert(result.error)
        }
        if (token) {
            const user = jwt.decode(token)
            if (!user) {
                sessionStorage.removeItem('token')
                history.replace('/login')
            }
        }
    }
    return <div>
        <form onSubmit={createContact} className='container'>
            <h1 className="header" >Create new contact</h1>
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
                type="submit" value="Create Contact" /><br />
            <a href='/contact-list' style={{ float: "right", "text-decoration": 'rgb(145, 135, 135)' }}>Go back</a>
        </form>
    </div >

}

export default App;