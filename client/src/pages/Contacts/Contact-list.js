import React, { useEffect, useState, useRef } from "react";
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faSignOut, faSortAlphaAsc, faSortAlphaDesc } from '@fortawesome/free-solid-svg-icons'
import { UpdateModal } from '../Modals.js/update'
import { DeleteModal } from '../Modals.js/delete'
import { CreateModal } from '../Modals.js/create-contact'
import deleteContact from '../functions/deleteContact'
import logoutUser from '../functions/logoutUser'
import addressBook from '../functions/addressBook'
import swal from 'sweetalert'
import ReactPaginate from 'react-paginate'
import './pagination.css'
import jwt from 'jsonwebtoken'
import Authenticator from '../functions/Authenticator'

const Home = () => {
    const history = useHistory()
    const token = sessionStorage.getItem('token')
    const [data, setData] = useState()
    const [showModal, setShowModal] = useState("close")
    const [ModalData, setModalData] = useState()
    const testData = useRef()


    const updateModal = async (dat) => {
        setModalData(dat)
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

    async function fetchData() {
        const contacts = await addressBook()
        setData(contacts)
    }

    useEffect(() => {
        if (token) {
            const user = jwt.decode(token)
            if (!user) {
                sessionStorage.removeItem('token')
                history.replace('/login')
            }
            else {
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
    useEffect(() => {
        Authenticator(token)
    })

    function Datatable({ data = [] }) {

        const dataS = data.sort((a, b) => {
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
            else if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
            else return 0
        })

        const [dataR, setDataR] = useState(dataS)
        const [query, setQuery] = useState("")
        const [sort, setSort] = useState("ASC")
        const [sortIcon, setSortIcon] = useState(faSortAlphaAsc)
        const [ItemsPerPage, setItemsPerPage] = useState(dataR.length)
        const [pageNumber, setPageNumber] = useState(0)
        const pagesVisited = pageNumber * ItemsPerPage

        if (ItemsPerPage === "" || ItemsPerPage === 0) {
            setItemsPerPage(dataR.length)
        }

        const pageCount = Math.ceil(dataR.length / ItemsPerPage)

        const displayItems = dataR
            .slice(pagesVisited, pagesVisited + ItemsPerPage)

        const handlePageClick = async (data) => {
            setPageNumber(data.selected)
        }

        const [isChecked, setIsChecked] = useState([])
        const alldelete = async => {
            deleteContact(isChecked)
        }

        const handleCheck = (e) => {
            const { value, checked } = e.target
            if (checked) {
                setIsChecked([...isChecked, value])
            } else {
                setIsChecked(isChecked.filter((e) => e !== value))
            }
        }

        const sorting = () => {
            if (sort === "ASC") {
                const sorted = displayItems.sort((a, b) =>
                    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
                )
                setDataR(sorted)
                setSort("DES")
            }
            else if (sort === "DES") {
                const sorted = [...displayItems].sort((a, b) =>
                    a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1
                )
                setDataR(sorted)
                setSort("ASC")
            }
        }

        return (
            <div>
                <button className="deleteContact" onClick={alldelete}>Delete</button>
                <input value={query} placeholder="Filter"
                    onChange={(e) => {
                        setQuery(e.target.value)
                    }
                    } className="filter" />
                <div className="PageSelector">
                    <span className="ContactNo"> Contacts per Page: </span>
                    <input placeholder="5"
                        onChange={(e) => {
                            setItemsPerPage(e.target.value)
                        }
                        } className="page-selector"
                    />
                </div>
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
                    {displayItems.filter(dat => dat.name.toLowerCase().includes(query) ||
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
                                    <span onClick={() => {
                                        updateModal(dat)
                                    }} className="modals" style={{ color: "limegreen", paddingLeft: "5px", paddingRight: "10px" }}
                                        value={dat._id}>
                                        <FontAwesomeIcon icon={faPenToSquare} fixedWidth />
                                    </span>
                                    <span
                                        onClick={() => {
                                            deleteModal(dat._id)
                                        }} className="modals" style={{ color: "red" }}

                                    >
                                        <FontAwesomeIcon icon={faTrashCan} fixedWidth />
                                    </span>
                                </td>
                            </tr>
                        )
                        )}
                </table>
                <UpdateModal showModal={showModal === "update"} setShowModal={setShowModal}
                    DATA={testData} />
                <ReactPaginate
                    previousLabel={"<<"}
                    nextLabel={">>"}
                    disableInitialCallback={true}
                    onPageChange={handlePageClick}
                    pageCount={pageCount}
                    containerClassName={"pagination"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    // previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    // nextLinkClassName="page-link"
                    activeClassName={"active"}
                />
            </div >
        )
    }
    return <>
        <div className="navbar">
            <a href="/home">Home</a>
            <span className="spans" onClick={() => createModal()}>Create contact</span>
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