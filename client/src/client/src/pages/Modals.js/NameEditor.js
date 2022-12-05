import React, { useState } from 'react'
import NameChange from '../functions/changeName'

const NameEditor = ({ showModal }) => {
    const [name, setName] = useState('')

    return <>{showModal ? <form onSubmit={(e) => {
        e.preventDefault()
        NameChange(name)
    }}
        className='editContainer' >
        <h2 className='ModalHeader'>Name</h2>
        <input value={name}
            className="input" placeholder='Name'
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