import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import deleteContact from '../functions/deleteContact'

export const DeleteModal = ({ showModal, setShowModal, id }) => {

    return <>{showModal ? <div className='test'>

        < div className="container">
            <FontAwesomeIcon icon={faTimesCircle} fixedWidth className='closemodalbutton'
                onClick={() => setShowModal("close")} />
            <h2 className='Header'>Press confirm to delete the contact</h2>
            <button className="delete" onClick={(e) => deleteContact(id)}>DELETE</button><br />
        </div >

    </div> : null}</>

}