import React, { useState } from 'react'
import { Icon } from 'react-icons-kit'
import { view } from 'react-icons-kit/ikons/view'
import { view_off } from 'react-icons-kit/ikons/view_off'
import swal from 'sweetalert'

function App() {
    const [email, setEmail] = useState('')
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

    async function loginUser(event) {
        event.preventDefault()
        const result = await fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        const data = await result.json()
        console.log(data)

        if (data.user) {
            sessionStorage.setItem('token', data.token)
            swal({
                title: "",
                text: "Login Successful!",
                icon: "success",
                timer: 2000,
                showCancelButton: false,
                showConfirmButton: false,
                button: "Continue",
            }).then(() => { window.location.href = '/home' })
            // window.location.href = '/home'
        } else {
            swal({
                title: "Login Failed!",
                text: "Please check your email and password",
                icon: "error",
                button: "Continue",
            })
            // alert('Please check your email and password')
        }

        console.log(result)
    }

    return <div >
        <form onSubmit={loginUser} className='container' >
            <h1 className='Header'>Login</h1>
            <b>Email ID</b>
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email" placeholder="Email ID"
            /><br />
            <b>Password</b>
            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={type} placeholder="Password"
            />
            <span className='eye' onClick={handleToggle}><Icon icon={icon} /></span><br />
            <input className='button'
                type="submit" value="Login" /><br />
            <a href='/register' className='links'>Register</a>
        </form>
    </div >
}

export default App;
