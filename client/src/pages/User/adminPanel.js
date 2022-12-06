// import env from "react-dotenv"
import React, { useEffect, useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPenToSquare, faObjectGroup } from '@fortawesome/free-regular-svg-icons'
import { faSignOut, } from '@fortawesome/free-solid-svg-icons'
import swal from 'sweetalert'
import logoutUser from '../functions/logoutUser'
import Authenticator from '../functions/Authenticator'
import './adminPanel.css'
import ProfileEditor from '../Modals.js/ProfileEditor'

const adminPanel = () => {
    const [Data, setData] = useState()
    const [showModal, setShowModal] = useState("close")
    const [id, setId] = useState()
    const [verifyToken, setVerifyToken] = useState("")
    const token = sessionStorage.getItem('token')
    // const [check, setCheck] = useState()
    const check = useRef()

    useEffect(() => {
        admin()
    }, [])

    async function checker(data) {
        if (data.power === 1) {
            // setCheck(true)
            setId({ ...data, check })
            check.current = true
        } else {
            // setCheck(false)
            setId({ ...data, check })
            check.current = false
        }
    }


    async function admin() {
        // event.preventDefault()
        const result = await fetch('http://localhost:4000/adminPanel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': sessionStorage.getItem('token')
            }
        })
        const data = await result.json()
        if (data.error) {
            console.log('ERROR', data.error);
            setTimeout(function () {
                window.location.href = "/login"
            }, 3000)
        }
        if (data.message === 'ok') {
            setData(data.data)
            console.log(data);
            setVerifyToken(data.user.id)
        }
        else if (data.message === 'not ok') {
            setTimeout(function () {
                window.location.href = "/home"
            }, 3000)
        }
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
        </div>
        {/* <div style={{ padding: "1rem" }}> */}
        {token ? <div>
            <div className='sidebara'>
                <span >Admin Panel</span>
            </div>
            {Data ? <div>
                <h3 style={{ position: 'relative', left: '178px' }}>
                    All Users
                </h3>
                <table className='lista'>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Admin Power</th>
                    <th style={{ textAlign: 'center' }}>Edit</th>
                    {Data.map((data, index) => (
                        <tr key={index}>
                            <td>{data._id}</td>
                            <td>{data.name}</td>
                            <td>{data.email}</td>
                            <td style={{ textAlign: 'center' }}>{data.power}</td>
                            {data.power !== 2 ? <td>
                                <span onClick={() => {
                                    setShowModal("UPDATE")
                                    checker(data)
                                }}
                                    className="modals" style={{ color: "limegreen", paddingLeft: "5px", paddingRight: "10px" }}
                                    value={data._id}>
                                    <FontAwesomeIcon icon={faPenToSquare} fixedWidth />
                                </span>
                                <span className="modals" style={{ color: "red" }} >
                                    <FontAwesomeIcon icon={faTrashCan} fixedWidth />
                                </span>
                            </td> : <td></td>
                            }
                        </tr>
                    ))}
                    <ProfileEditor showModal={showModal === "UPDATE"} setShowModal={setShowModal} id={id} />
                </table> </div> : <div style={{ position: 'relative', left: '178px' }}>
                <h2>Unauthorized Access!!</h2>
                <h2>Access LEVEL 2 Required.</h2>
                <h2>Redirecting...</h2>
                <a href='/home'>Go back</a>
            </div>
            }
        </div> : <div>
            <h1>Invalid Token</h1>
            <h5>Redirecting......</h5>
            {setTimeout(function () {
                window.location.href = "/login"
            }, 3000)}
        </div >
        }
    </div >

}

export default adminPanel