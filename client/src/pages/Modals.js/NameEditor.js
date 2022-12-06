import React, { useState } from 'react'
import NameChange from '../functions/changeName'
import swal from 'sweetalert'

const NameEditor = ({ showModal, id, oldname }) => {
    const [name, setName] = useState('')

    return <>{showModal ? <form onSubmit={(e) => {
        e.preventDefault()
        const result = NameChange(name, id)
        if (result) {
            swal({
                title: "",
                text: "Name Updated!!",
                icon: "success",
                timer: 1000,
                showCancelButton: false,
                showConfirmButton: false,
                button: "Continue",
            }).then(() => { window.location.href = '/edit-profile' })
        }
    }}
        className='editContainer' >
        <h2 className='ModalHeader'>Name</h2>
        <input value={name}
            className="input" placeholder={oldname}
            onChange={(e) => {
                e.preventDefault()
                setName(e.target.value)
            }}
        />
        <button className='save'>Save</button>
    </form >
        : <div></div>
    }</>

}

export default NameEditor