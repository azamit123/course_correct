import React from 'react'
import { Navigate } from "react-router-dom";
import { decodeToken } from "../helperFunctions/decodeToken";

export default function TutorProtectedRoute({ children, redirectTo }) {
    const user = decodeToken();
    return user && user.role === "tutor" ? children : <Navigate to={redirectTo} />
}
