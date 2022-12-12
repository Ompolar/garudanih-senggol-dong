import NavBar from '../components/Nav/NavBar'
import SideBar from '../components/Nav/SideBar'
import Dashboard from "../components/Home/Admin/Dashboard"
import User from "../components/Home/Admin/User"
import { useState } from "react"
import { Routes, Route, Outlet } from "react-router-dom"

export default function HomeAdmin() {
    const [isOpen, setIsOpen] = useState(false)

    const handleTrigger = () => setIsOpen(!isOpen)

    return (
        <div>
            <SideBar show={isOpen} />
            <div className={`content ${isOpen ? 'content-open' : ''}`}>
                <div className="d-flex justify-content-between bg-white p-3">
                    <div className="fs-2 my-auto" onClick={handleTrigger} style={{ cursor: "pointer" }}>
                        {isOpen ? <i className="bi bi-x-lg"></i> : <i className="bi bi-list"></i>}
                    </div>
                    <div className="d-flex">
                        <i className="bi bi-bell-fill fs-3 my-auto mx-4 position-relative"><span className="position-absolute translate-middle badge rounded-pill bg-danger" style={{ fontSize: "9px", top: 16, left: 25 }}>+99</span></i>
                        <NavBar />
                    </div>
                </div>
                {/* Admin Components */}
                <Outlet />
            </div>
        </div>
    )
}