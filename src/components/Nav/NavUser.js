import imgLogo from '../../assets/logo.svg';
import { Container, Image, Nav, Navbar, NavDropdown, Offcanvas } from "react-bootstrap";
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actionUserLogout } from '../../actions/UserAction';
import LoadingSpinner from '../LoadingSpinner';
import { AirplanemodeActive } from '@mui/icons-material';

export default function NavUser() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { currentUserData } = useSelector((state) => state.UserReducer)

    function handleLogout() {
        dispatch(actionUserLogout())
        navigate("/login")
    }

    return (
        <Navbar key="lg" style={{ background: 'transparent' }}>
            <Container>
                <Link to={"/"} className="navbar-brand">
                    <AirplanemodeActive className="brand-icon" />
                    <p>GarudaNih</p>
                </Link>
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
                            <Link to={"ticket"} className="navbar-link">Ticket</Link>
                            <Link to={"transaction"} className="navbar-link">History</Link>
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
                                                <p className="my-auto ms-2 d-none d-md-block">{currentUserData.name.charAt(0).toUpperCase() + currentUserData.name.slice(1)}</p>
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
    );
}