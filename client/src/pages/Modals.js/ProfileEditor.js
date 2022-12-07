import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import Power from '../functions/admin'
import NameChange from '../functions/changeName'
import swal from 'sweetalert'

const ProfileEditor = ({ showModal, setShowModal, id }) => {
    const [name, setName] = useState('')
    const username = useRef()
    const checked = useRef()
    // const { name } = id
    // if (id) {
    //     console.log(Object.entries(id));
    // }
    if (id) {
        if (id.check.current === true) {
            checked.current = true
        } else {
            checked.current = false
        }
        username.current = id.name
    }

    const [isChecked, setIsChecked] = useState([])
    const handleCheck = (e) => {
        const { value, checked } = e.target
        setIsChecked({ ID: value, checked })
    }

    useEffect(() => {
        if (isChecked) {
            Power(isChecked)
        }
    }, [isChecked])

    async function submitter(event) {
        event.preventDefault()
        if (name) {
            const result = await NameChange(name, id._id)
            if (result) {
                swal({
                    title: "",
                    text: "Updated!!",
                    icon: "success",
                    timer: 1000,
                    showCancelButton: false,
                    showConfirmButton: false,
                    button: "Continue",
                }).then(() => { window.location.href = '/masterAdmin' })
            }
        } else {
            setTimeout(function () {
                window.location.href = "/masterAdmin"
            }, 500)
        }
    }

    return <>{showModal ? <div className='back'>
        <form className='container'>
            <FontAwesomeIcon icon={faTimesCircle} fixedWidth className='closemodalbutton'
                onClick={() => {
                    setShowModal("close")

                }} />
            <h2 className='Header'>Profile Editor</h2>
            <b>Name:</b>
            <input
                value={name} className="editorInput"
                onChange={(e) => setName(e.target.value)}
                type="text" placeholder={username.current}
            /><br />
            <b>Admin Power: </b>
            <input
                type="checkbox"
                onChange={(e) => handleCheck(e)}
                value={id._id}
                checked={id.isChecked}
                defaultChecked={checked.current}
            /><br />
            <button className='button' onClick={submitter}>Done</button>
        </form>
    </div>
        : <div></div>
    }</>

}

export default ProfileEditor