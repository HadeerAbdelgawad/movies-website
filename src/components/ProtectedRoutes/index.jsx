import React from 'react'
import { Navigate } from 'react-router'

function ProtectedRoutes({ children }) {
    const token = localStorage.getItem('userToken')

    if (!token) {
        alert('Login First  ')
        return <Navigate to="/login" replace />;
    }

    return children


}

export default ProtectedRoutes
