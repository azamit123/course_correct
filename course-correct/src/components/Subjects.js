import axios from 'axios';
import React from 'react'
import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import GlobalState from './GlobalContext';
import Subject from './Subject';
import jwt_decode from "jwt-decode";
import NavBar from './NavBar';


export default function Subjects() {
    const [user, setUser] = useState({})
    const { subjects, setSubjects } = useContext(GlobalState)


    useEffect(() => {
        const fetchSubjects = async () => {
            const userToken = localStorage.getItem("token");
            const decoded = jwt_decode(userToken);
            setUser(decoded);
            try {
                const AuthStr = "bearer " + userToken;
                const res = (await axios.get(`/subjects/${user._id}`, { "headers": { 'Authorization': AuthStr } })).data;
                setSubjects(res.result);
            } catch (err) {
                console.log(err);
            }
        };
        fetchSubjects();
    }, [])



    return (
        <>
            <NavBar />
            <div style={{ height: "100vh" }} class="subject-wrapper">
                <div className="row">
                    <h3 style={{ marginTop: 45 }}>Welcome {user.firstName}-{user.lastName}</h3>
                    <div className="col-sm-1"></div>
                    {subjects.length ?
                        <div className="col-sm-8">
                            {subjects.map((item) => <Subject subject={item} key={item._id} />)}
                        </div>
                        :
                        <>
                            <h2 style={{ textAlign: "center", marginTop: 50, fontWeight: "bolder" }} >You currently dont have any subjects</h2>
                            <h3 style={{ textAlign: "center", fontWeight: "bolder" }}>Please <Link style={{ textDecoration: "none" }} to="/addSubject">Add Subject</Link></h3>
                        </>
                    }
                </div>
            </div>
        </>
    )
}
