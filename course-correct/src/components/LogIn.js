import React, { useState, useEffect } from 'react'
import { useFormik } from "formik"
import * as Yup from "yup"
import { useNavigate } from "react-router-dom"
import { Button, Form } from "react-bootstrap";
import { Link } from 'react-router-dom'
import axios from "axios";
import jwt_decode from "jwt-decode";
import { decodeToken } from "../helperFunctions/decodeToken"



export default function LogIn() {
    const [user, setUser] = useState()
    const navigator = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const loggedIn = decodeToken(token);
            if (loggedIn.role === "tutor") {
                navigator("/subjects")
            } else if (loggedIn.role === "student") {
                navigator("/lessonsList")
            }
        }

    }, [])



    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""

        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address")
                .required("*Required"),

            password: Yup.string()
                // .matches(
                //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                //     "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
                // )
                .required("*Required")
        }),

        onSubmit: async (values) => {
            const res = (await axios.post("/users/login", values)).data
            if (res.status === "success") {
                localStorage.setItem("token", res.result);
                const decodedToken = jwt_decode(res.result);
                setUser(decodedToken);
                if (decodedToken.role === "tutor") {
                    navigator("/subjects")
                } else if (decodedToken.role === "student") {
                    navigator("/lessonsList")
                }
            } else {
                alert("Invalid input, Please check password and/or email again")
            }


        }
    })
    return (
        <>
            <div style={{ height: "100vh", paddingTop: 80 }} class="login-wrapper">
                <div className="row" id="loginPage">
                    <h3 style={{ color: "white", textAlign: "center", fontFamily: "serif" }}>COURSE <span style={{ color: "lightcoral", fontFamily: "cursive" }}> CORRECT </span> </h3>
                    <p style={{ color: "white", textAlign: "center", fontFamily: "cursive", fontSize: 20 }}>"Education is The Most Powerful <span style={{ color: "lightcoral", fontFamily: "serif" }}> Weapon Which you can  </span> change The World"</p>
                    {/* <Navbar /> */}
                    <div className="col-sm-3"></div>
                    <div className=" col-sm-6 border border-2 border-black  mb-3 p-5 m-5  shadow p-3 mb-5 bg-white rounded-top">
                        <h3 className="  text-black text-center mt-4">LOG-IN</h3>
                        <Form onSubmit={formik.handleSubmit}>
                            <Form.Group className="mb-3 m-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="email"
                                    placeholder="Enter email"
                                    value={formik.values.username}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                />
                                {formik.touched.email && formik.errors.email ? <p className="errorMessage">* {formik.errors.email}</p> : null}
                                <Form.Text className="text-muted">

                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3 m-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formik.values.password}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                />
                                {formik.touched.password && formik.errors.password ? <p className="errorMessage"> *{formik.errors.password}</p> : null}
                            </Form.Group>
                            <Form.Group className="mb-3 m-3" controlId="formBasicCheckbox">
                                {/* <Form.Check type="checkbox" label="Remember password" /> */}
                            </Form.Group>
                            <Button
                                size="lg"
                                variant="warning"
                                type="submit"
                                className=" mr-3"
                            >
                                Submit
                        </Button>
                            <p className="mt-4">
                                No account, Please sign up <Link to="/signup">here</Link>
                            </p>
                        </Form>

                    </div>
                    <div className="col-sm-3"></div>
                </div>
            </div>
        </>
    )
}

