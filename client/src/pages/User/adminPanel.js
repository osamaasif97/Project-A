// import env from "react-dotenv"
import React, { useEffect, useState } from 'react'
import Authenticator from '../functions/Authenticator'
import './adminPanel.css'
import AdminPanel from '../Modals.js/AdminPanel'

const adminPanel = () => {
    const [showModal, setShowModal] = useState()
    const token = sessionStorage.getItem("token")
    useEffect(() => {
        Authenticator(token)
    }, [])

    return <>
        <div style={{ overflowX: 'hidden' }}>
            <div className='navbar' >
                <a href="/home" >Home</a>
                <div className="dropdown">
                    <button className='dropbtn'>Contacts
                    </button>
                    <div className="dropdown-content">
                        <a href="/contact-list">All Contacts</a>
                        <a href="/contact-list/create">Create Contact</a>
                    </div>
                </div>
            </div>
            {token ? <>
                <div className='sidebara'>
                    <span onClick={() => setShowModal("admin")}>Admin Panel</span>
                    <span onClick={() => setShowModal("ok")}>Test</span>
                </div>
                <AdminPanel showModal={showModal === "admin"} />\
            </>
                : <div>
                    <h1>Invalid Token</h1>
                    <h5>Redirecting......</h5>
                    {setTimeout(function () {
                        window.location.href = "/login"
                    }, 3000)}
                </div >
            }
        </div >
    </ >

}

export default adminPanel