import { Outlet } from 'react-router-dom'
import NavBar from '../../Nav/NavBar'

export default function HomeUser() {
    return (
        <div>
            <NavBar />
            <h1 className="bg-danger text-white my-3 text-center">Member Dashboard</h1>
            <Outlet />
        </div>
    )
}