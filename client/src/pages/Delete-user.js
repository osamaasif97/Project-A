import React, { useState } from 'react'
import jwt from 'jsonwebtoken'
import { Icon } from 'react-icons-kit'
import { view } from 'react-icons-kit/ikons/view'
import { view_off } from 'react-icons-kit/ikons/view_off'

const token = sessionStorage.getItem('token')

function App() {

    const [password, setPassword] = useState('')

    const [type, setType] = useState('password')
    const [icon, setIcon] = useState(view)

    const handleToggle = () => {
        if (type === 'password') {
            setIcon(view)
            setType('text')
        }
        else {
            setIcon(view_off)
            setType('password')
        }
    }

    async function deleteUser(e) {
        // e.preventDefault()
        const result = await fetch('http://localhost:4000/delete-user', {
            method: 'DELETE',
            headers: {
                'x-access-token': sessionStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password
            })
        }).then((req) => req.json())
        console.log(result)

        if (result.status === 'error') {
            setTimeout(function () {
                window.location.href = "/login"
            }, 2000)
            alert(result.error)
        }
        if (result.status === 'ok') {
            sessionStorage.removeItem('token')
            setTimeout(function () {
                window.location.href = "/register"
            }, 3000)
            alert(result.message)
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
                deleteUser()
            }
        }
    }
    return <div>
        <form onSubmit={(e) => test(e.preventDefault())} className='container'>
            <h2 className='Header'>Enter password to Delete User</h2>
            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={type} placeholder="Password"
            /><span className='eye' onClick={handleToggle}><Icon icon={icon} /></span><br />
            <input className='delete' type="submit" value="DELETE User" /><br />
            <a href='/home'>Go back</a>
        </form>
    </div>
}

export default App;
