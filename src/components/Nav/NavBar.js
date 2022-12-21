import "./nav.css"
import logo from '../../assets/logo.svg'
import LoadingSpinner from '../LoadingSpinner';
import { Link } from 'react-router-dom'
import { Image, Dropdown } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { actionUserLogout } from '../../actions/UserAction';
import React from "react"

function Navigation() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { currentUserData } = useSelector((state) => state.UserReducer)

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

    function handleLogout() {
        dispatch(actionUserLogout())
        navigate("/login")
    }

    return (
        <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-basic">
                {currentUserData ? (
                    <div style={{ display: "flex", cursor: "pointer" }}>
                        <Image
                            src={currentUserData.image || logo}
                            alt="user img"
                            roundedCircle
                            thumbnail
                            style={{ width: "50px", height: "50px", objectFit: "cover" }}
                        />
                        <p className="my-auto ms-2 d-none d-md-block">{currentUserData.name.charAt(0).toUpperCase() + currentUserData.name.slice(1)}</p>
                    </div>
                ) : (
                    <LoadingSpinner />
                )}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item><Link to={"/profile-admin"} className="text-black text-decoration-none"><i className="bi bi-person-fill me-2"></i>Profile</Link></Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}><i className="bi bi-box-arrow-left me-2"></i>Logout</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default Navigation