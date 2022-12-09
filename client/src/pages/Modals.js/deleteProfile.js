import React, { useState } from 'react'
import DeleteProfile from '../functions/deleteProfile'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'

const AdminProfileDelete = ({ showModal }) => {
    const [type, setType] = useState('password')
    const [icon, setIcon] = useState(faEyeSlash)
    const [password, setPassword] = useState('')

    const handleToggle = () => {
        if (type === 'password') {
            setIcon(faEye)
            setType('text')
        }
        else {
            setIcon(faEyeSlash)
            setType('password')
        }
    }

    return <>{showModal ? <form className='editContainer' onSubmit={(e) => {
        e.preventDefault()
        DeleteProfile(password)
    }}>
        <h2 className='ModalHeaderD'>Delete Profile</h2>
        <input value={password}
            type={type}
            className="input"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password" />
        <span className='eyes' onClick={handleToggle}><FontAwesomeIcon icon={icon} /></span>
        <button className='save' style={{ backgroundColor: 'red' }}>Delete</button>
    </form >
        : <div></div>
    }</>
}

export default AdminProfileDelete