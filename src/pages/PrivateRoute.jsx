import React from 'react'
import { Outlet, Navigate} from 'react-router-dom'
import { useSelector } from 'react-redux';
function PrivateRoute() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    if (isAuthenticated){
        return(
        <>
        <Outlet/>
        </>
        )
    } else{
        return <Navigate to='/'/>
    }
}

export default PrivateRoute