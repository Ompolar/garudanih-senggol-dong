import { Outlet } from 'react-router-dom'
import NavUser from '../../Nav/NavUser'

export default function HomeUser() {
    return (
        <div>
            <NavUser />
            <h1 className="bg-danger text-white mb-3 text-center">Member Dashboard</h1>
            <Outlet />
        </div>
    )
}