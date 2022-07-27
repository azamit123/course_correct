import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { decodeToken, setHeader } from "../helperFunctions/decodeToken";

import NavDropdown from 'react-bootstrap/NavDropdown';
import axios from "axios";


export default function NavBar() {
    const [currentUser, setCurrentUser] = useState()
    const user = decodeToken();
    const navigate = useNavigate();

    const pic = "http://localhost:5000/images/" + user.pic


    useEffect(() => {
        if (user) {
            setCurrentUser(user);
        }
    }, [])


    const deleteUser = async () => {
        const AuthStr = setHeader();
        if (window.confirm("Are you sure you want to DELETE your account??")) {
            try {
                const res = (await axios.delete(`/users/${user._id}`, { "headers": { 'Authorization': AuthStr } })).data
                console.log(res);
                if (res.status === "success") {
                    alert("YOUR ACCOUNT HAS BEEN CLOSED SUCCESSFULLY, THANK YOU!!");
                    navigate("/signup");
                } else {
                    navigate("/error")
                }
            } catch (err) {
                console.log(err);
                navigate("/error")
            }
        }

    }

    const img = <img src={pic} class="rounded-circle" style={{ width: 70 }}
        alt="Avatar" />


    return (
        <>
            <div className="m-4">
                <Navbar bg="dark" variant="dark" fixed="top">
                    <Container>
                        <Navbar.Brand id="navbarBrand" style={{ fontFamily: "serif" }}>Course Correct</Navbar.Brand>
                        <Nav className="" >
                            {currentUser?.role === "tutor" ?
                                <>
                                    <Link className="nav-link" to='/subjects'>My Subjects</Link>
                                    <Link className="nav-link" to='/addSubject'>Add New Subject</Link>
                                    <Link className="nav-link" to='/myclasses'> My Classes</Link>
                                </>
                                :
                                <>
                                    <Link className="nav-link" to='/lessonsList'>All Lessons</Link>
                                    <Link className="nav-link" to='/myclasses'> My Classes</Link>
                                </>

                            }

                            <NavDropdown title="My Profile" id="basic-nav-dropdown">

                                <NavDropdown.Item >
                                    <Link className="nav-link" to='/editProfile' id="logout">EDIT</Link>
                                </NavDropdown.Item>

                                <NavDropdown.Divider />

                                <NavDropdown.Item>
                                    <p id="logout" onClick={deleteUser}>DELETE</p>
                                </NavDropdown.Item>

                                <NavDropdown.Divider />

                                <NavDropdown.Item>
                                    <Link className="nav-link" to='/logout' id="logout">LOGOUT</Link>
                                </NavDropdown.Item>
                            </NavDropdown>
                            <img src={pic} class="rounded-circle" style={{ width: 80 }}
                                alt="Avatar" />

                        </Nav>
                    </Container>
                </Navbar>
            </div>
        </>
    )
}
