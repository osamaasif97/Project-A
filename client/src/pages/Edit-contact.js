import React, { useState } from 'react'
import jwt from 'jsonwebtoken'

const token = sessionStorage.getItem('token')

function App() {

    const [name, setName] = useState('')
    const [number, setNumber] = useState('')

    console.log(name, number)
    async function EditContact(e) {
        // e.preventDefault()
        const id = window.location.search.split("=")[1]
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
        console.log(result)

        if (result.status === 'ok') {
            setTimeout(function () {
                window.location.href = "/login"
            }, 3000)
            alert(result.message)
        }

        if (result.status === 'error') {
            alert(result.error)
        }
    }


    function test() {
        if (token) {
            const user = jwt.decode(token)
            if (!user) {
                sessionStorage.removeItem('token')
                // history.replace('/login')
            }
            else {
                EditContact()
            }
        }
    }
    return <div>
        <form onSubmit={(e) => test(e.preventDefault())} className='container'>
            <h2 className='Header'>Contact Editor</h2>
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text" placeholder="Name"
            /><br />
            <input
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                type="text" placeholder="Number"
            /><br />
            <input className='button' type="submit" value="Update" /><br />
            <a href='/contact-list'>Go back</a>
        </form>
    </div>
}

export default App;
