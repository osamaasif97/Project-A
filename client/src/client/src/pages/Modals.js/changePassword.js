import React, { useState } from 'react'
import PasswordChange from '../functions/changePassword'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'


const PasswordEditor = ({ showModal }) => {
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')

    const [type, setType] = useState('password')
    const [icon, setIcon] = useState(faEyeSlash)

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
        PasswordChange(password, newPassword, confirmNewPassword)
    }}>
        <h2 className='ModalHeader'>Password</h2>
        <input value={password}
            type={type}
            className="input"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Old Password" />
        <span className='eyes' onClick={handleToggle}><FontAwesomeIcon icon={icon} /></span>
        <input value={newPassword}
            type={type}
            className="input"
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password" />
        <span className='eyes' onClick={handleToggle}><FontAwesomeIcon icon={icon} /></span>
        <input value={confirmNewPassword}
            type={type}
            className="input"
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            placeholder="Confirm Password" />
        <span className='eyes' onClick={handleToggle}><FontAwesomeIcon icon={icon} /></span>
        <button className='save'>Change Password</button>
    </form >
        : <div></div>
    }</>

}

export default PasswordEditor