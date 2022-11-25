import React, { useEffect, useState, useRef } from "react";
import jwt from 'jsonwebtoken'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faSignOut, faSortAlphaAsc, faSortAlphaDesc } from '@fortawesome/free-solid-svg-icons'
import { UpdateModal } from './Modals.js/update'
import { DeleteModal } from './Modals.js/delete'
import { CreateModal } from './Modals.js/create-contact'
import deleteContact from '../pages/functions/deleteContact'
import logoutUser from '../pages/functions/logoutUser'
import addressBook from '../pages/functions/addressBook'
import swal from 'sweetalert'
import ReactPaginate from 'react-paginate'

const Home = () => {
    const history = useHistory()
    const token = sessionStorage.getItem('token')
    const [data, setData] = useState()
    const [showModal, setShowModal] = useState("close")
    const [ModalData, setModalData] = useState()
    const testData = useRef()

    const [isChecked, setIsChecked] = useState([])

    const handleCheck = (e) => {
        const { value, checked } = e.target
        if (checked) {
            setIsChecked([...isChecked, value])
        } else {
            setIsChecked(isChecked.filter((e) => e !== value))
        }
    }

    const alldelete = async => {
        // console.log(isChecked);
        const response = deleteContact(isChecked)
    }

    const updateModal = async (dat) => {
        setModalData(dat)
        // console.log(dat)
        testData.current = dat
        setShowModal("update")
    }
    const deleteModal = (id) => {
        setModalData(id)
        setShowModal("delete")
    }
    const createModal = () => {
        setShowModal("create")
    }

    useEffect(() => {
        if (token) {
            const user = jwt.decode(token)
            if (!user) {
                sessionStorage.removeItem('token')
                history.replace('/login')
            }
            else {
                async function fetchData() {
                    const contacts = await addressBook()
                    setData(contacts)
                }
                fetchData()
            }
        }
    }, [])

    let data1
    if (data !== undefined) {
        data1 = Array.isArray(data) ? data.map(({ _id,
            name, number }) => { return { _id, name, number } }) : []
    }
    const user = jwt.decode(token)
    var idM
    const ID = sessionStorage.getItem('id')

    if (!token) {
        return <div>
            <h1>Invalid token</h1>
            Redirecting....
            {setTimeout("location.href = '/login';", 3000)}
        </div>
    }

    function Datatable({ data = [] }) {

        const [dataR, setDataR] = useState(data)
        const [query, setQuery] = useState("")
        const [sort, setSort] = useState("ASC")
        const [sortIcon, setSortIcon] = useState(faSortAlphaAsc)

        data.sort((a, b) => {
            if (a.name > b.name) return 1
            else if (a.name < b.name) return -1
            else return 0
        })

        const sorting = () => {
            if (sort === "ASC") {
                const sorted = dataR.sort((a, b) =>
                    a.name > b.name ? 1 : -1
                )
                setDataR(sorted)
                setSort("DES")
            }
            else if (sort === "DES") {
                const sorted = [...dataR].sort((a, b) =>
                    a.name < b.name ? 1 : -1
                )
                setDataR(sorted)
                setSort("ASC")
            }
        }

        return (
            <div>
                <input type="text" value={query} placeholder="Filter"
                    onChange={(e) => {
                        setQuery(e.target.value)
                    }
                    } />


                <table className="listx">
                    <tr>
                        <th style={{ width: '1rem', textAlign: 'center' }}>#</th>
                        <th onClick={() => {
                            if (sort === "ASC") setSortIcon(faSortAlphaAsc)
                            else if (sort === "DES") setSortIcon(faSortAlphaDesc)
                            sorting()
                        }}>Name
                            <FontAwesomeIcon icon={sortIcon} fixedWidth style={{ float: "right" }} />
                        </th>
                        <th>Number</th>
                        <th>Edit</th>
                    </tr>
                    {dataR.filter(dat => dat.name.toLowerCase().includes(query) ||
                        dat.number.includes(query))
                        .map((dat, index) => (
                            <tr key={index} >
                                <td>
                                    <input
                                        type="checkbox"
                                        value={dat._id}
                                        checked={dat.isChecked}
                                        onChange={(e) => handleCheck(e)}
                                    />
                                </td>
                                <td> {dat.name}</td>
                                <td> {dat.number}</td>
                                <td>
                                    <a onClick={() => {
                                        updateModal(dat)
                                    }} className="modals" style={{ color: "limegreen", paddingLeft: "5px", paddingRight: "10px" }}
                                        value={dat._id}>
                                        <FontAwesomeIcon icon={faPenToSquare} fixedWidth />
                                    </a>
                                    <a></a>
                                    <a
                                        onClick={() => {
                                            deleteModal(dat._id)
                                        }} className="modals" style={{ color: "red" }}

                                    >
                                        <FontAwesomeIcon icon={faTrashCan} fixedWidth />
                                    </a>
                                </td>
                            </tr>
                        )
                        )}
                </table>
                <UpdateModal showModal={showModal === "update"} setShowModal={setShowModal}
                    DATA={testData} />
            </div >
        )
    }

    return <>
        <div className="navbar">
            <a href="/home">Home</a>
            <a onClick={() => createModal()}>Create contact</a>
            <a href='/weather'>Weather</a>
            <a href='/chat'>Chat</a>
            <CreateModal showModal={showModal === "create"} setShowModal={setShowModal} />
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
        <div style={{ padding: "20px" }}>
            <h1 >Welcome {user.name}</h1>
            <button className="deleteContact" onClick={alldelete}>Delete</button>
            {data1 !== undefined ?
                data1.length !== 0 ?
                    <div >
                        <h3>Total contacts: {data1.length}</h3>
                        <Datatable className="listx"
                            data={data1}
                        />
                        <DeleteModal showModal={showModal === "delete"} setShowModal={setShowModal} id={ModalData} />
                    </div> : <div>
                        No contacts....
                    </div>
                : null
            }
        </div>
    </>
}


export default Home