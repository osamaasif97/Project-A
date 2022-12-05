// import env from "react-dotenv"
import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOut, } from '@fortawesome/free-solid-svg-icons'
import swal from 'sweetalert'
import logoutUser from '../functions/logoutUser'
import Authenticator from '../functions/Authenticator'
import NameEditor from '../Modals.js/NameEditor'
import PasswordEditor from '../Modals.js/changePassword'
import DeleteProfile from '../Modals.js/deleteProfile'

import './editProfile.css'

const editProfile = () => {
    const [showModal, setShowModal] = useState(" ")
    const history = useHistory()
    const token = sessionStorage.getItem('token')
    const user1 = jwt.decode(token)

    useEffect(() => {
        Authenticator(user1)
    })
    if (!user1) {
        sessionStorage.removeItem('token')
        history.replace('/login')
    }

    if (token) {

        return <div >
            <div className='navbar'>
                <a href="/home" >Home</a>
                <div className="dropdown">
                    <button className='dropbtn'>Contacts
                    </button>
                    <div className="dropdown-content">
                        <a href="/contact-list">All Contacts</a>
                        <a href="/contact-list/create">Create Contact</a>
                    </div>
                </div>
                <a href='/weather'>Weather</a>
                <a href='/chat'>Chat</a>
                <b onClick={() => {
                    swal({
                        title: "Logging Out ",
                        text: "Success!!",
                        icon: "success",
                        timer: 2000,
                        showCancelButton: false,
                        showConfirmButton: false,
                        button: "Continue",
                    }).then(() => logoutUser())
                }} className="signout">
                    <FontAwesomeIcon icon={faSignOut} />
                </b>
            </div>

            <div className='sidebar'>
                <span onClick={() => setShowModal("name")}>Name</span>
                <span onClick={() => setShowModal("password")}>Password</span>
                <span onClick={() => setShowModal("delete")}>Delete Profile</span>
            </div>

            <NameEditor showModal={showModal === "name"} />
            <PasswordEditor showModal={showModal === "password"} />
            <DeleteProfile showModal={showModal === "delete"} />
        </div >
    }
}

export default editProfile