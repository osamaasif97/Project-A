import React from 'react'
import MasterProfileDelete from '../functions/MasterProfileDelete'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'

const adminDelete = ({ showModal, setShowModal, id }) => {
    return <>
        {showModal ? <div className='test'>
            <div className='container'>
                <FontAwesomeIcon icon={faTimesCircle} fixedWidth className='closemodalbutton'
                    onClick={() => {
                        setShowModal("close")
                    }} />
                <h2 style={{ textAlign: 'center' }}>Delete Profile</h2>
                {/* <input value={password}
                    type={type}
                    className="login"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password" />
                <span className='eye' style={{ bottom: '88px' }} onClick={handleToggle}><FontAwesomeIcon icon={icon} /></span> */}
                <button className='save' style={{ backgroundColor: 'red' }}
                    onClick={() => MasterProfileDelete(id)}>Delete</button>
            </div> </div> : <div></div>}
    </>
}

export default adminDelete