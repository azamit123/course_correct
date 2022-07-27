import { Button, Form, Row, Col } from "react-bootstrap";
import * as Yup from "yup"
import { useFormik } from "formik"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import { decodeToken, setHeader } from "../helperFunctions/decodeToken"

export default function EditProfile() {
    const navigator = useNavigate();
    const user = decodeToken();
    const [pic, setPic] = useState(user.pic);
    const [currUser, setCurrUser] = useState();

    useEffect(() => {
        if (user) {
            setCurrUser(user);
        }
    }, [])

    const pics = "http://localhost:5000/images/" + user.pic

    const formik = useFormik({
        initialValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            password: "",
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required("Required"),
            lastName: Yup.string().required("Required"),
            password: Yup.string()
                // .matches(
                //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                //     "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
                // )
                .required("*Required"),
            phoneNumber: Yup.string().required("*Required")
        }),



        onSubmit: async (values) => {
            const AuthStr = setHeader();
            const newUser = { ...values, _id: user._id, pic: pic }
            const res = (await axios.put("/users", newUser, { "headers": { 'Authorization': AuthStr } })).data;
            if (res.status === "success") {
                alert("ACCOUNT SUCCESSFULLY UPDATED");
                navigator("/login");
            } else {
                console.log("errooo")
            }

        }
    })


    const uploadImage = async (e) => {
        if (e.target.files.length > 0) {
            const image = e.target.files[0]
            const formData = new FormData();
            formData.append('pics', image);
            const res = (await axios.post("/users/images", formData)).data
            setPic(res.filename);

        }
    }

    return (
        <>
            <div style={{ height: "100vh", paddingTop: 40 }} class="login-wrapper">
                <div className="row">
                    <div className="col-sm-2"></div>
                    <div className=" col-sm-8 border border-2 border-black  mb-3 p-5 m-5  shadow p-3 mb-5 bg-white rounded-top">
                        <Form onSubmit={formik.handleSubmit}>
                            <h3 className="text-black text-center mb-5">EDIT-PROFILE</h3>
                            <img src={pics} class="circle" style={{ width: 150, margin: "auto" }}
                                alt="Avatar" />
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                        value={formik.values.firstName}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange} />
                                    {formik.touched.firstName && formik.errors.firstName ? <p className="errorMessage">* {formik.errors.firstName}</p> : null}
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        value={formik.values.lastName}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange} />
                                    {formik.touched.lastName && formik.errors.lastName ? <p className="errorMessage">* {formik.errors.lastName}</p> : null}
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="phoneNumber"
                                    placeholder="Your phone number"
                                    value={formik.values.phoneNumber}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange} />
                                {formik.touched.phoneNumber && formik.errors.phoneNumber ? <p className="errorMessage">* {formik.errors.phoneNumber}</p> : null}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formik.values.password}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange} />
                                {formik.touched.password && formik.errors.password ? <p className="errorMessage">* {formik.errors.password}</p> : null}
                            </Form.Group>

                            <Row className="mb-3">
                            </Row>
                            <Form.Label>Please choose a picture</Form.Label>
                            <input type="file" name="image" onChange={(e) => uploadImage(e)} /><br></br>
                            <Button variant="warning" type="submit" size="lg">
                                EDIT
                        </Button>
                        </Form>
                    </div>
                    <div className="col-sm-2"></div>
                </div>
            </div>
        </>
    );
}