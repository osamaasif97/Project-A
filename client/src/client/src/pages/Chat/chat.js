import React, { useEffect, useRef, useState } from 'react'
import './chat.css'
import { userChats } from '../../api/ChatRequest'
import Conversation from '../components/conversation/Conversation'
import ChatBox from '../components/ChatBox/ChatBox'
import io from 'socket.io-client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOut } from '@fortawesome/free-solid-svg-icons'
import swal from 'sweetalert'
import logoutUser from '../functions/logoutUser'

const Chat = () => {

    const user = useRef()
    const [USER, setUser] = useState([])
    const [onlineUser, setOnlineUsers] = useState([])
    const [sendMessage, setSendMessage] = useState(null)
    const [receivedMessage, setReceivedMessage] = useState(null)
    const socket = useRef()

    async function getChat() {
        const result = await fetch('http://localhost:4000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: sessionStorage.getItem('token')
            })
        })
        const data = await result.json()
        setUser(data.user)
    }

    useEffect(() => {
        if (user.current === undefined) {
            getChat()
        }
    }, [])

    useEffect(() => {
        socket.current = io('http://localhost:4001')
        if (USER.id) {
            socket.current.emit("new-user-add", USER.id)
            socket.current.on("get-users", (users) => {
                setOnlineUsers(users)
            })
        }
    }, [USER])

    //sending the message to the socket server
    useEffect(() => {
        if (sendMessage !== null) {
            socket.current.emit('send-message', sendMessage)
        }
    }, [sendMessage])



    //reveiving message from socket server
    useEffect(() => {
        socket.current.on("recieveMessage", (data) => {
            setReceivedMessage(data)
        })
    }, [])

    useEffect(() => {
        const getChats = async () => {
            try {
                const { data } = await userChats(USER.id)
                setChat(data)
            } catch (error) {
                console.log(error)
            }
        }
        getChats()
    }, [USER])

    const [chat, setChat] = useState([])
    const [currentChat, setCurrentChat] = useState(null)

    const checkOnlineStatus = (chat) => {
        const chatMember = chat.map((chats) => {
            const chatMemberDestructure = chats.members.filter((member => member !== USER.id))
            const online = chatMemberDestructure.map((chatM) => {
                const Fonline = onlineUser.filter((user) => user.userId === chatM)
                return Fonline.map((o) => o.userId ? true : false)
            })
            return online
        })
        return chatMember
    }


    return (
        <>
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
                <b onClick={() => {
                    swal({
                        title: "Logging Out ",
                        text: "Success!!",
                        icon: "success",
                        timer: 2000,
                        showCancelButton: false,
                        showConfirmButton: false,
                        button: "Continue",
                    }).then(() => logoutUser())
                }} className="signout">
                    <FontAwesomeIcon icon={faSignOut} />
                </b>
            </div>


            <div className='Chat'>
                <div className='Left-side-chat'>
                    <div className='Chat-container'>
                        <h2> Chats</h2>
                        <div className='Chat-list'>
                            {chat.map((chats, index) => (
                                <div key={index} onClick={() => setCurrentChat(chats)}>
                                    <Conversation data={chats} currentUserId={USER.id}
                                        online={checkOnlineStatus(chat)} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='Right-side-chat' >

                    <div >
                        {currentChat !== null ?
                            <ChatBox chat={currentChat} currentUser={USER.id}
                                setSendMessage={setSendMessage} receivedMessage={receivedMessage} />
                            : <div className='empty-chat'>Select a conversation to start</div>}</div>

                </div>
            </div>
        </>
    )
}

export default Chat