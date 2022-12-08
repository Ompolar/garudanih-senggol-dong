import '../styles/App.css';
import logo from '../assets/logo.svg'
import LoadingSpinner from './LoadingSpinner';
import { Link } from 'react-router-dom'
import { Container, Nav, Navbar, NavDropdown, Offcanvas } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { actionUserLogout } from '../actions/UserAction';

function Navigation() {
    const currentPath = window.location.pathname

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { currentUserData } = useSelector((state) => state.UserReducer)
    
    function handleLogout() {
        dispatch(actionUserLogout())
        navigate("/login")
    }

    return (
        <Navbar key="lg" expand="lg" fixed="top" style={{ background: '#F1F3FF' }}>
            <Container>
                <Link to={"/"} className="navbar-brand">bcr</Link>
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
                        <Nav className="justify-content-end flex-grow-1 pe-3 align-items-center">
                            <Link to="/about" className="nav-link">About</Link>
                            <Link to="/blog" className="nav-link">Blog</Link>
                            {currentPath === "/" &&
                                <>
                                    <Nav.Link href="#our-services">Our Services</Nav.Link>
                                    <Nav.Link href="#why-us">Why Us</Nav.Link>
                                    <Nav.Link href="#testimonial">Testimonial</Nav.Link>
                                    <Nav.Link href="#faq">FAQ</Nav.Link>
                                </>
                            }
                            <NavDropdown
                                id={`offcanvasNavbarDropdown-expand-lg`}
                                title={
                                    <div className="user-image">
                                        {currentUserData ? (
                                            <>
                                                <img width="50"
                                                    src={logo}
                                                    alt="user img"
                                                />
                                                {currentUserData.name.charAt(0).toUpperCase() + currentUserData.name.slice(1)}
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
            </Container>
        </Navbar>
    )
}

export default Navigation