import React, { useState, } from 'react'
import { Icon } from 'react-icons-kit'
import { view } from 'react-icons-kit/ikons/view'
import { view_off } from 'react-icons-kit/ikons/view_off'

function App() {
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const token = sessionStorage.getItem('token')
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

    async function ChangePassword(event) {
        event.preventDefault()
        const result = await fetch('http://localhost:4000/change-password', {
            method: 'PATCH',
            headers: {
                'x-access-token': sessionStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                newPassword,
                password
            })
        })
        const data = await result.json()
        if (data.error) {
            alert(data.error)
        }
        if (data.status === 'ok') {
            setTimeout(function () {
                window.location.href = "/home"
            }, 3000)
            alert(data.message)
        }

        console.log(result)
    }

    if (!token) {
        return <div>
            <h1>Invalid token</h1>
            Redirecting....
            {setTimeout(function () {
                window.location.href = "/login"
            }, 3000)}
        </div>
    }

    return <div>
        <form onSubmit={ChangePassword} className='container'>
            <h1 className='Header'>Change password</h1>
            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password" placeholder="Old Password"
            />
            <span className='eye2' onClick={handleToggle}><Icon icon={icon} /></span>
            <input
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                type="password" placeholder="New Password"
            />
            <span className='eye' onClick={handleToggle}><Icon icon={icon} /></span><br />
            <input className='button'
                type="submit" value="Change Password" /><br />
            <a href='/home'>Go back</a>
        </form>
    </div>
}

export default App;
