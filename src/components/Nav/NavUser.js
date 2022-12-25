import imgLogo from '../../assets/logo.svg';
import axios from 'axios';
import io from "socket.io-client";
import moment from 'moment';
import { Container, Image, Nav, Navbar, NavDropdown, Offcanvas, Dropdown } from "react-bootstrap";
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actionUserLogout } from '../../actions/UserAction';
import LoadingSpinner from '../LoadingSpinner';
import React, { useEffect, useState } from "react"
import { AirplanemodeActive, NotificationsNone } from '@mui/icons-material';

export default function NavUser() {
    const [notification, setNotification] = useState([]);
    const [socket, setSocket] = useState(null);
    const [count, setCount] = useState(0)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { currentUserData } = useSelector((state) => state.UserReducer)

    function handleLogout() {
        dispatch(actionUserLogout())
        navigate("/login")
    }

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <div
            ref={ref}
            onClick={e => {
                e.preventDefault();
                onClick(e);
            }}
        >
            {children}
        </div>
    ));

    // useEffect(() => {
    //     setSocket(io(`${process.env.REACT_APP_BASE_URL}`))
    // }, [])

    // useEffect(() => {
    //     const token = localStorage.getItem("token")

    //     axios({
    //         method: 'GET',
    //         url: `${process.env.REACT_APP_BASE_URL}/v1/user/notify`,
    //         timeout: 120000,
    //         headers: {
    //             "Authorization": `Bearer ${token}`
    //         }
    //     })
    //         .then((res) => {
    //             socket?.emit("lts notify", res.data)
    //         })
    //         .catch((err) => {
    //             console.log(err.message)
    //         })

    //     socket?.on("show notify", body => {
    //         setNotification(body.data)
    //         const filtering = body.data.filter((notify) => !notify.isRead)
    //         setCount(filtering.length)
    //     });
    // }, [socket, notification])

    const onReadHandler = (id) => {
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_BASE_URL}/v1/notify/${id}`,
            timeout: 120000
        })
            .then(() => console.log("Success read process"))
            .catch((err) => console.log(err))
    }

    return (
        <>
            <Navbar key="lg" expand="lg" style={{ background: 'transparent' }}>
                <Container>
                    <Link to={"/"} className="navbar-brand">
                        <AirplanemodeActive className="brand-icon" />
                        <p>GarudaNih</p>
                    </Link>
                    <div className="d-flex justify-content-end">
                        <Dropdown className="my-auto me-2" align="end">
                            <Dropdown.Toggle as={CustomToggle} id="dropdown-basic">
                                {currentUserData ? (
                                    <button className="btn--notification">
                                        <span className="position-absolute translate-middle badge rounded-pill bg-danger" style={{ fontSize: "9px", top: 8, left: 35 }}>{count}</span>
                                        <NotificationsNone />
                                    </button>
                                ) : (
                                    <LoadingSpinner />
                                )}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {notification.length !== 0 ? (
                                    notification.map((item, index) => {
                                        return item.isRead !== true ? (
                                            <>
                                                <div key={index} className="d-flex px-2">
                                                    <div style={{ width: "200px" }}>
                                                        <p className="mb-0" style={{ fontSize: "12px" }}>{item.desc}</p>
                                                        <p className="text-muted">{moment(item.createdAt).startOf('hour').fromNow()}</p>
                                                    </div>
                                                    <button onClick={() => onReadHandler(item.id)}>Read</button>
                                                </div>
                                                <Dropdown.Divider />
                                            </>
                                        ) : (
                                            <>
                                                <div key={index} className="d-flex px-2 bg-secondary">
                                                    <div style={{ width: "200px" }}>
                                                        <p className="mb-0" style={{ fontSize: "12px" }}>{item.desc}</p>
                                                        <p className="text-white">{moment(item.createdAt).startOf('hour').fromNow()}</p>
                                                    </div>
                                                </div>
                                                <Dropdown.Divider />
                                            </>
                                        )
                                    })
                                ) : ""}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-lg`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                                    Offcanvas
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="pe-3">
                                    <Link to={"ticket"} className="navbar-link my-auto">Ticket</Link>
                                    <Link to={"transaction"} className="navbar-link my-auto">History</Link>
                                    <NavDropdown
                                        id={`offcanvasNavbarDropdown-expand-lg`}
                                        title={
                                            <div className="user-image d-flex">
                                                {currentUserData ? (
                                                    <>
                                                        <Image
                                                            src={currentUserData.image || imgLogo}
                                                            alt="user img"
                                                            roundedCircle
                                                            thumbnail
                                                            style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                                        />
                                                        <p className="my-auto ms-2">{currentUserData.name.charAt(0).toUpperCase() + currentUserData.name.slice(1)}</p>
                                                    </>
                                                ) : (
                                                    <LoadingSpinner />
                                                )}
                                            </div>
                                        }
                                    >
                                        <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </div>
                </Container>
            </Navbar>
        </>
    );
}