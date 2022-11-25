import React, { useState, useEffect, useRef } from "react";
import { getUser } from '../../../api/ChatRequest'
import { addMessage, getMessages } from '../../../api/MessageRequest'
import { format } from 'timeago.js'
import InputEmoji from "react-input-emoji";
import './chatbox.css'

const ChatBox = ({ chat, currentUser, setSendMessage, receivedMessage }) => {
    const [userData, setUserData] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")

    const scroll = useRef()

    useEffect(() => {
        const userId = chat.members.find((id) => id !== currentUser)
        const getUserData = async () => {
            try {
                const { data } = await getUser(userId)
                setUserData(data.data)
                // console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
        if (chat !== null) getUserData()
    }, [chat, currentUser])

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data } = await getMessages(chat._id)
                setMessages(data)
            } catch (error) {
                console.log(error);
            }
        }
        if (chat !== null) fetchMessages()
    }, [chat])

    const handleChange = (newMessage) => {
        setNewMessage(newMessage)
    }

    const handleSend = async (e) => {
        e.preventDefault()
        const message = {
            senderId: currentUser,
            text: newMessage,
            chatId: chat._id
        }
        const receiverId = chat.members.find((id) => id !== currentUser)
        setSendMessage({ ...message, receiverId })

        try {
            const { data } = await addMessage(message)
            // console.log(data)
            setMessages([...messages, data])
            setNewMessage("")
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        // console.log(receivedMessage)
        if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
            setMessages([...messages, receivedMessage])
        }
    }, [receivedMessage])

    useEffect(() => {
        if (scroll.current) {
            scroll.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages])

    return (
        <div className="ChatBox-container">
            <>
                <div className="chat-header">
                    <div className="follower">
                        <div >
                            <img src="https://mozillausercontent.com/00000000000000000000000000000000" alt=""
                                className="followerImage" style={{ width: '50px', height: '50px' }}></img>
                            <div className="name" style={{ fontSize: "0.8rem" }}>
                                <span>{userData !== null ?
                                    <div >
                                        {userData.name}
                                    </div> : <div>
                                        none
                                    </div>
                                } </span>
                            </div>
                        </div>
                    </div>
                    <hr style={{ width: '85%', border: '0.1px solid white' }} />
                </div>
                <div className="chat-body">
                    {messages.map((message, index) => (
                        <>
                            <div key={index} className={message.senderId === currentUser ? "message own" : "message"}>
                                {message.s}
                                <span style={{ paddingLeft: '5px' }}>
                                    <div ref={scroll}></div>
                                    {message.text}
                                </span>
                                <span style={{ fontSize: 'small', fontWeight: '600', paddingLeft: '5px' }}>{format(message.createdAt)}</span>
                            </div>
                        </>
                    ))}
                </div>

                <div className="chat-sender">
                    {/* <div>+</div> */}
                    <InputEmoji
                        value={newMessage}
                        onChange={handleChange}
                        placeholder="Type a message"
                    />
                    <div className="send-button" onClick={handleSend}>Send</div>
                </div>

            </>
        </div>
    )
}

export default ChatBox