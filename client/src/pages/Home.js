
import React, { useState } from 'react'
import jwt from 'jsonwebtoken'
import { useHistory } from 'react-router-dom'
import { Icon } from 'react-icons-kit'
import { user } from 'react-icons-kit/ikons/user'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faSignOut, } from '@fortawesome/free-solid-svg-icons'
import swal from 'sweetalert'
import Weather from './Weather-widget'
import logoutUser from './functions/logoutUser'

const Home = () => {
    const [icon, setIcon] = useState(user)
    const history = useHistory()
    const token = sessionStorage.getItem('token')

    if (token) {
        const user1 = jwt.decode(token)
        if (!user1) {
            sessionStorage.removeItem('token')
            history.replace('/login')
        }
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
            </div>

            <div id='sidebar' className='sidenav'>
                <span className="closebtn" onClick={() => {
                    document.getElementById('sidebar').style.width = "0"
                }}>&times;</span>
                <a href="/change-password">
                    <FontAwesomeIcon icon={faPenToSquare} style={{ marginRight: '10px' }} />
                    Change Password</a>
                <a href="/delete-user">
                    <i ></i>
                    <FontAwesomeIcon icon={faTrashCan} style={{ marginRight: '10px' }} />
                    Delete Account</a>
                <span onClick={() => {
                    swal({
                        title: "Logging Out ",
                        text: "Success!!",
                        icon: "success",
                        timer: 2000,
                        showCancelButton: false,
                        showConfirmButton: false,
                        button: "Continue",
                    }).then(() => logoutUser())
                }}>
                    <FontAwesomeIcon icon={faSignOut} style={{ marginRight: '5px' }} />
                    Logout
                </span>
            </div>
            <span className='user' onClick={() => {
                document.getElementById('sidebar').style.width = "250px"
            }}><Icon icon={icon} /></span>

            <section>
                <h1 className='welcome' >Welcome {user1.name}</h1>
                <Weather />
                {/* <img src='https://www.w3schools.com/howto/img_band_la.jpg' style={{ width: '100%', height: '40%', zIndex: -1 }}></img> */}
            </section>
        </div >
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
}

export default Home