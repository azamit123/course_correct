import React from 'react'
import { Navigate } from "react-router-dom";
import { decodeToken } from "../helperFunctions/decodeToken";

export default function StudentProtectedRoute({ children, redirectTo }) {
    const user = decodeToken();

    return user && user.role === "student" ? children : <Navigate to={redirectTo} />
}
