// import env from "react-dotenv"
import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { useHistory } from 'react-router-dom'
import { Icon } from 'react-icons-kit'
import { user } from 'react-icons-kit/ikons/user'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faUser } from '@fortawesome/free-regular-svg-icons'
import { faSignOut, } from '@fortawesome/free-solid-svg-icons'
import swal from 'sweetalert'
import Weather from './Weather/Weather-widget'
import logoutUser from './functions/logoutUser'
import Authenticator from './functions/Authenticator'
import getUser from './functions/getUser'

const Home = () => {
    const [icon, setIcon] = useState(user)
    const history = useHistory()
    const token = sessionStorage.getItem('token')
    const user1 = jwt.decode(token)
    const [data, setData] = useState()

    async function Power() {
        const power = await getUser(user1.id)
        setData(power)
    }

    useEffect(() => {
        Authenticator(user1)
        Power()
    }, [])
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
            </div>

            <div id='sidebar' className='sidenav'>
                <span className="closebtn" onClick={() => {
                    document.getElementById('sidebar').style.width = "0"
                }}>&times;</span>
                <a href="/edit-profile">
                    <FontAwesomeIcon icon={faPenToSquare} style={{ marginRight: '10px' }} />
                    Profile</a>
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
                {data ? data.power >= 1 ? <a href='/masterAdmin'>
                    <FontAwesomeIcon icon={faUser} style={{ marginRight: '10px' }} />
                    Admin Panel</a>
                    : <div></div>
                    : <div></div>}
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
}

export default Home