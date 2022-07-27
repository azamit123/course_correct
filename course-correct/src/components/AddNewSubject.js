import axios from "axios";
import React, { useState } from 'react'
import { Button, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom"
import jwt_decode from "jwt-decode";
import NavBar from "./NavBar";



export default function AddNewSubject() {
    const navigate = useNavigate();
    // const { addNewSubject, state } = useContext(GlobalState);
    const userToken = localStorage.getItem("token");


    const week = ["monday", "tuesady", "wednsday", "thursday", "friday", "saturday"]
    const [days, setDays] = useState([])
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const [subject, setSubject] = useState({
        subjectName: "",
        fee: 0,
        type: "",
        description: "",
        pic: ""
    })



    const uploadImage = async (e) => {
        if (e.target.files.length > 0) {
            const image = e.target.files[0]
            const formData = new FormData();
            formData.append('pics', image);
            const AuthStr = "bearer " + userToken;
            const res = (await axios.post("/subjects/images", formData, { "headers": { 'Authorization': AuthStr } })).data
            setSubject({ ...subject, pic: res.filename })

        }
    }

    const handleAdd = async () => {
        const { subjectName, fee, type, description, pic } = subject;
        const user = jwt_decode(userToken);
        if (days.length > 0 && subjectName && fee && type && description && startTime && endTime && pic) {
            const newSubject = {
                tutor_id: user._id,
                tutorName: user.firstName,
                tutorEmail: user.email,
                tutorPic: user.pic,
                subjectName,
                fee,
                type,
                description,
                pic,
                day: days,
                startTime,
                endTime
            }
            const AuthStr = "bearer " + userToken;
            const res = (await axios.post("/subjects", newSubject, { "headers": { 'Authorization': AuthStr } })).data
            console.log(res)
            if (res.status === "success") {
                navigate("/subjects")
            }
        } else {
            alert("Please make sure all fields are filled");
        }
    }


    return (
        <>
            <NavBar />
            <div style={{ height: "100vh", padding: 40 }} class="addSubject">
                <div className="row">
                    <div className="col-sm-2"></div>
                    <div className=" col-sm-8 border border-2 border-black  mb-3 p-5 m-5  shadow p-3 mb-5 bg-white rounded-top">
                        <div className="container2">
                            <h2 style={{ textAlign: "center", color: "teal" }}>Add Subject Form</h2>
                            <Row className="mb-3">
                                <Form.Label style={{ color: "teal", fontWeight: "bold" }}>Subject-Name </Form.Label>
                                <Form.Control
                                    onChange={(e) => setSubject({ ...subject, [e.target.name]: e.target.value })}
                                    name="subjectName" value={subject.subjectName} type="text"
                                    placeholder="Enter Subject Name"
                                />
                                <Form.Label style={{ color: "teal", fontWeight: "bold" }}>Fee</Form.Label>
                                <Form.Control
                                    onChange={(e) => setSubject({ ...subject, [e.target.name]: e.target.value })}
                                    name="fee" value={subject.fee}
                                    type="number"
                                    placeholder="Enter the Fees per Lesson"
                                />

                                <Form.Group>
                                    <Form.Label style={{ color: "teal", fontWeight: "bold" }}>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        aria-label="With textarea"
                                        placeholder="Description"
                                        name="description"
                                        value={subject.description}
                                        onChange={(e) => setSubject({ ...subject, [e.target.name]: e.target.value })}
                                    />
                                </Form.Group>



                                <Form.Group >
                                    <Form.Label style={{ color: "teal", fontWeight: "bold" }}>Weekly Availability</Form.Label>
                                    <Form.Select name="days" onChange={(e) => setDays([...days, e.target.value])} multiple>
                                        <option>Select Availability days</option>
                                        {week.map((day, index) =>
                                            <option value={day} key={index} >{day}</option>
                                        )}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label style={{ color: "teal", fontWeight: "bold" }}>Lesson Method</Form.Label>
                                    <Form.Select name="type" onChange={(e) => setSubject({ ...subject, [e.target.name]: e.target.value })}>
                                        <option>Select Lesson Method</option>
                                        <option value="online">Online</option>
                                        <option value="inPerson">In Person</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label style={{ color: "teal", fontWeight: "bold" }}>Time From</Form.Label>
                                    <Form.Control
                                        onChange={(e) => setStartTime(e.target.value)}
                                        name="startTime"
                                        value={startTime}
                                        type="time"
                                        placeholder="09:00AM"
                                    />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label style={{ color: "teal", fontWeight: "bold" }}>Time To</Form.Label>
                                    <Form.Control
                                        onChange={(e) => setEndTime(e.target.value)}
                                        name="endTime"
                                        value={endTime}
                                        type="time"
                                        placeholder="06:00Pm"
                                    />
                                </Form.Group>
                            </Row>
                            <Form.Label style={{ color: "teal", fontWeight: "bold" }}>Please choose a subject picture</Form.Label>
                            <input type="file" name="image" onChange={(e) => uploadImage(e)} /><br></br>
                            <Button className="m-1" variant="dark" onClick={handleAdd}>ADD</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
