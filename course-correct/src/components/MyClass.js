import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from "axios"
import { setHeader, decodeToken } from "../helperFunctions/decodeToken";
import { Button } from 'react-bootstrap';

export default function MyClass(props) {
    const [color, setColor] = useState("");
    const navigate = useNavigate();
    const AuthStr = setHeader();
    const user = decodeToken();

    const { tutorName, tutorEmail, subjectName, studentName, days, endDate, createdAt, _id, subject_id, time } = props.class;

    const expiredDate = `${(new Date(endDate).getMonth() + 1)}/${(new Date(endDate).getDate() + 1)}/${new Date(endDate).getFullYear()}`







    useEffect(() => {
        console.log(props.class)
        const checkExpiration = async () => {
            const today = Math.floor(new Date() - new Date(endDate))
            const expirationDate = (today / (1000 * 60 * 60 * 24))
            // const expirationHour = new Date().getHours();
            // const expirationMinute = new Date().getMinutes();
            // console.log(expirationDate)
            if (expirationDate > 0) {
                const res = (await axios.put("/classes", props.class, { "headers": { "Authorization": AuthStr } })).data
                if (res.status === "success") {
                    setColor("red");
                    const subject = { _id: subject_id, isAvailable: true };
                    const resp = (await axios.put("/subjects", subject, { "headers": { "Authorization": AuthStr } })).data

                }
            } else {
                // console.log("not")
            }

        }
        checkExpiration();


    }, [])



    const handleCancel = async (bookedDate, id) => {
        let checkTimer = Math.abs(new Date(bookedDate).getTime() - new Date().getTime());
        const deadline = (checkTimer / (60 * 60 * 1000));

        if (deadline >= 24) {
            try {
                if (window.confirm("Are you sure you want to Cancel, NO REFUND AFTER 24HRS")) {
                    const res = (await axios.delete(`/classes/${id}`, { "headers": { "Authorization": AuthStr } })).data
                    if (res.status === "success") {
                        alert("Thank you your class has been cancelled");
                        const subject = { _id: subject_id, isAvailable: true };
                        const resp = (await axios.put("/subjects", subject, { "headers": { "Authorization": AuthStr } })).data
                        if (resp.status === "success") {
                            const email = {
                                message: `Your scheduled class for ${subjectName} has been cancelled`,
                                to: tutorEmail,
                                subject: "Class Cancellation"
                            };
                            const sent = (await axios.post("/classes/sendemail", email, { "headers": { "Authorization": AuthStr } })).data
                            // console.log(sent)
                            navigate("/lessonsList");
                        }
                    }
                } else {
                    alert("YOUR CLASS IS NOT CANCELLED")
                }

            } catch (err) {
                console.log("ERROR", err)
            }

        } else {

            try {
                if (window.confirm("Are you sure you want to Cancel")) {
                    const res = (await axios.delete(`/classes/${id}`, { "headers": { "Authorization": AuthStr } })).data
                    if (res.status === "success") {
                        alert("Thank you your class has been cancelled, you will be refunded in 2 business days");
                        const subject = { _id: subject_id, isAvailable: true };
                        const resp = (await axios.put("/subjects", subject, { "headers": { "Authorization": AuthStr } })).data
                        if (resp.status === "success") {
                            const email = {
                                message: `Your scheduled class for ${subjectName} has been cancelled`,
                                to: tutorEmail,
                                subject: "Class Cancellation"
                            };
                            const sent = (await axios.post("/classes/sendemail", email, { "headers": { "Authorization": AuthStr } })).data
                            // console.log(sent)
                            navigate("/lessonsList");
                        }
                    }
                } else {
                    alert("YOUR CLASS IS NOT CANCELLED")
                }

            } catch (err) {
                console.log("ERROR", err)
            }

        }

    }

    return (
        <>
            <div style={{}}>
                <Card style={{ width: '18rem' }} >
                    <ListGroup variant="flush">
                        {color === "red" ?
                            <ListGroup.Item style={{ backgroundColor: color, fontWeight: "bolder" }}>CLASS EXPIRED IN {expiredDate}</ListGroup.Item> : null}
                        <ListGroup.Item > SUBJECT NAME - {subjectName}</ListGroup.Item>
                        {user.role === "student" ? <ListGroup.Item>TUTOR NAME - {tutorName}</ListGroup.Item>

                            : <ListGroup.Item>STUDENT NAME - {studentName}</ListGroup.Item>
                        }

                        <ListGroup.Item>DAYS/WEEK - {days.map((item) => item + " ")}</ListGroup.Item>
                        <ListGroup.Item>START TIME - {time}</ListGroup.Item>
                        <ListGroup.Item> CLASS END DATE - {expiredDate}</ListGroup.Item>
                    </ListGroup>
                    {color !== "red" ?
                        <Button className="m-3" variant="outline-danger" disabled={user.role === "tutor"} onClick={() => handleCancel(createdAt, _id)}>Cancel Class</Button> : null}
                </Card>

            </div>
        </>
    )
}
