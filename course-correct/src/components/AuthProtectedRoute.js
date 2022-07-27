import React from 'react'
import { Navigate } from "react-router-dom";
import { decodeToken } from "../helperFunctions/decodeToken";


export default function AuthProtectedRoute({ children, redirectTo }) {
    const user = decodeToken();

    return user ? children : <Navigate to={redirectTo} />
}
