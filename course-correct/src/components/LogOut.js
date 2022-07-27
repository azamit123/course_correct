import React, { useContext, useEffect } from 'react'
import GlobalState from "./GlobalContext"
import { useNavigate } from "react-router-dom"

export default function LogOut() {
    const { logOut } = useContext(GlobalState);
    const navigate = useNavigate();

    useEffect(() => {
        logOut();
        navigate("/login");
    }, [])



    return (
        <div>

        </div>
    )
}
