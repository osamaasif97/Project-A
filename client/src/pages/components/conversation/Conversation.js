import React, { useEffect, useState } from "react";
import { getUser } from '../../../api/ChatRequest'

const Conversation = ({ data, currentUserId, online }) => {
    const [userData, setUserData] = useState(null)
    // console.log(online);
    useEffect(() => {
        const userId = data.members.find((id) => id !== currentUserId)
        const getUserData = async () => {
            try {
                const { data } = await getUser(userId)
                setUserData(data.data)
            } catch (error) {
                console.log(error)
            }
        }
        getUserData()
    }, [])

    // console.log(userData)
    return (
        <>
            <div className="follower conversation" >
                <div >
                    <div>
                        {online && <div className="online-dot"></div>}
                    </div>
                    <img src="https://mozillausercontent.com/00000000000000000000000000000000" alt=""
                        className="followerImage" style={{ width: '50px', height: '50px' }}></img>
                    <div className="Namebody" style={{ fontSize: "0.8rem" }}>
                        <span>{userData !== null ?
                            <div className="name">
                                {userData.name}
                            </div> : <div>
                                none
                            </div>
                        } </span>
                        <span>{online ? "Online" : "Offline"}</span>
                    </div>
                </div>
            </div>
            <hr style={{ width: '85%', border: '0.1px solid #ececec' }} />
        </>
    )
}

export default Conversation