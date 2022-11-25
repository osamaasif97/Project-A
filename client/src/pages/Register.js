import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Icon } from 'react-icons-kit'
import { view } from 'react-icons-kit/ikons/view'
import { view_off } from 'react-icons-kit/ikons/view_off'
import swal from 'sweetalert'

function App() {
  const history = useHistory()
  const [name, setName] = useState('')
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

  async function registerUser(event) {
    event.preventDefault()
    const result = await fetch('http://localhost:4000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    })
    const data = await result.json()
    console.log(data.message)
    if (data.status === 'ok') {
      swal({
        title: "",
        text: data.message,
        icon: "success",
        timer: 2000,
        showCancelButton: false,
        showConfirmButton: false,
        button: "Continue",
      }).then(() => { history.push('/login') })
    }
    else {
      swal({
        title: "Error",
        text: data.error,
        icon: "error",
        button: "Continue",
      })
      // alert(data.error)
    }
  }

  return <div >
    <form onSubmit={registerUser} className='container' >
      <h1 className='Header'>Register</h1>
      <b>Name</b>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text" placeholder="Name"
      /><br />
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
        type="submit" value="Register" /><br />
      <a href='/login' className='links'>Login</a>
    </form> <br />
  </div>
}

export default App;
