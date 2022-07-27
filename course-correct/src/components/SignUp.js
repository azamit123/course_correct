import { Button, Form, Row, Col } from "react-bootstrap";
import * as Yup from "yup"
import { useFormik } from "formik"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useState } from "react";

export default function SignUp() {
    const navigator = useNavigate();
    const [pic, setPic] = useState("");
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            email: "",
            password: "",
            role: "",
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required("Required"),
            lastName: Yup.string().required("Required"),
            email: Yup.string()
                .email("Invalid email address")
                .required("*Required"),

            password: Yup.string()
                // .matches(
                //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                //     "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
                // )
                .required("*Required"),
            role: Yup.string().required("*Required"),
            phoneNumber: Yup.string().required("*Required")
        }),



        onSubmit: async (values) => {
            const newUser = { ...values, pic: pic }
            const res = (await axios.post("/users/signup", newUser)).data;
            if (res === "EMAIL EXISISTS,TRY A DIFFERENT EMAIL") {
                alert("EMAIL EXISISTS,TRY A DIFFERENT EMAIL")
            } else {
                navigator("/login");
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
                            <h3 className="text-black text-center mb-5">SIGN-UP</h3>
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
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Enter email"
                                    value={formik.values.email}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange} />
                                {formik.touched.email && formik.errors.email ? <p className="errorMessage">* {formik.errors.email}</p> : null}
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
                            <Form.Group className="mb-3" id="formGridCheckbox" onChange={formik.handleChange}>
                                <Form.Label>Sign-up As:</Form.Label>
                                <Form.Check
                                    name="role"
                                    type="radio"
                                    inline
                                    label="Student"
                                    value="student"
                                    onBlur={formik.handleBlur}
                                />
                                <Form.Check
                                    name="role"
                                    type="radio"
                                    inline
                                    label="Tutor"
                                    value="tutor"
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Group>

                            <Form.Label>Please choose a picture</Form.Label>
                            <input type="file" name="image" onChange={(e) => uploadImage(e)} /><br></br>
                            <Button variant="warning" type="submit" size="lg">
                                Submit
                        </Button>
                        </Form>
                    </div>
                    <div className="col-sm-2"></div>
                </div>
            </div>
        </>
    );
}