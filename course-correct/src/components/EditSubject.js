import React, { useState, useContext, useEffect } from 'react'
import axios from "axios"
import { Button, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router';
import { useNavigate } from "react-router-dom"
import GlobalState from "./GlobalContext"
import jwt_decode from "jwt-decode";
import NavBar from './NavBar';

export default function EditSubject() {
    const week = ["monday", "tuesady", "wednsday", "thursday", "friday", "saturday"]
    const { _id } = useParams();
    const navigate = useNavigate();
    const { subjects } = useContext(GlobalState);
    const [day, setDay] = useState([])
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const [localSubject, setLocalSubject] = useState(
        {
            subjectName: "",
            fee: 0,
            type: ""
        }
    )

    const [oldSubject, setOldSubjects] = useState();

    useEffect(() => {
        const currSubject = subjects.find((item) => item._id === _id);
        console.log(currSubject);
        if (currSubject) {
            setOldSubjects(currSubject);
            setLocalSubject({
                subjectName: currSubject.subjectName,
                fee: currSubject.fee,
                type: currSubject.type
            });
            setEndTime(currSubject.endTime);
            setStartTime(currSubject.startTime);
        }

    }, [])

    const handleEdit = async () => {
        const { subjectName, fee, type } = localSubject;
        const userToken = localStorage.getItem("token");
        const user = jwt_decode(userToken);

        if (day.length > 0 && subjectName && fee && type && startTime && endTime) {
            const editedSubject = {
                ...oldSubject,
                day: day,
                subjectName: subjectName,
                fee: fee,
                type: type,
                startTime: startTime,
                endTime: endTime

            }
            // console.log(editedSubject)
            const AuthStr = "bearer " + userToken;
            const res = (await axios.put("/subjects", editedSubject, { "headers": { 'Authorization': AuthStr } })).data
            if (res.status === "success") {
                navigate("/subjects")
            } else {
                navigate("/error");
            }
        } else {
            alert("please make sure all fields are filled");
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
                            <h2 style={{ textAlign: "center", color: "teal" }}>Edit Subject</h2>
                            <Row className="mb-3">
                                <Form.Label style={{ fontWeight: "bold", color: "teal" }}>Subject-Name </Form.Label>
                                <Form.Control
                                    onChange={(e) => setLocalSubject({ ...localSubject, [e.target.name]: e.target.value })}
                                    name="subjectName" value={localSubject.subjectName} type="text"
                                    placeholder="Enter Subject Name"
                                />
                                <Form.Label style={{ fontWeight: "bold", color: "teal" }}>Fee</Form.Label>
                                <Form.Control
                                    onChange={(e) => setLocalSubject({ ...localSubject, [e.target.name]: e.target.value })}
                                    name="fee" value={localSubject.fee}
                                    type="number"
                                    placeholder="Enter the Fees per Lesson"
                                />

                                <Form.Group>
                                    <Form.Label style={{ fontWeight: "bold", color: "teal" }}>Weekly Availability</Form.Label>
                                    <Form.Select name="days" onChange={(e) => setDay([...day, e.target.value])} multiple>
                                        <option>Select Availability days</option>
                                        {week.map((day, index) =>
                                            < option value={day} key={index} > {day}</option>
                                        )}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label style={{ fontWeight: "bold", color: "teal" }}>Lesson Method</Form.Label>
                                    <Form.Select name="type"
                                        onChange={(e) => setLocalSubject({ ...localSubject, [e.target.name]: e.target.value })}
                                    >
                                        <option>{localSubject.type}</option>
                                        <option value="online">Online</option>
                                        <option value="inPerson">In Person</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label style={{ fontWeight: "bold", color: "teal" }}>Time From</Form.Label>
                                    <Form.Control
                                        onChange={(e) => setStartTime(e.target.value)}
                                        name="startTime"
                                        value={startTime}
                                        type="time"
                                        placeholder="Enter the starting time"
                                    />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label style={{ fontWeight: "bold", color: "teal" }}>Time To</Form.Label>
                                    <Form.Control
                                        onChange={(e) => setEndTime(e.target.value)}
                                        name="endTime"
                                        value={endTime}
                                        type="time"
                                        placeholder="Enter the ending time"
                                    />
                                </Form.Group>
                            </Row>

                            <Button variant="dark" onClick={handleEdit}>Edit</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
