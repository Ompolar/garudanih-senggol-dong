import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { actionCurrentUser } from '../actions/UserAction';
import HomeAdmin from '../components/Home/Admin/Home';
import HomeUser from '../components/Home/User/Home';
import LoadingSpinner from '../components/LoadingSpinner';

export default function LandingPage() {
    const dispatch = useDispatch()

    const token = localStorage.getItem("token")

    const { currentUserData } = useSelector((state) => state.UserReducer)

    useEffect(() => {

        dispatch(actionCurrentUser(token))

    }, [dispatch, token])

    return (
        <div>
            {currentUserData ? (
                currentUserData.role === "member" ? <HomeUser /> : <HomeAdmin />
            ) : (
                <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center">
                    <LoadingSpinner />
                </div>
            )}
        </div >
    )
}