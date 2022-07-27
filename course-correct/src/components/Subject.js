import React, { useContext } from 'react'
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom"
import GlobalState from "./GlobalContext"


export default function Subject(props) {
    const { deleteSubject } = useContext(GlobalState);
    const { subjectName, fee, day, startTime, endTime, _id, pic } = props.subject;
    const image = "http://localhost:5000/images/" + pic;
    const navigate = useNavigate();


    const deleteSub = async (id) => {
        try {
            const userToken = localStorage.getItem("token");
            const AuthStr = "bearer " + userToken;
            const res = (await axios.delete(`/subjects/${id}`, { "headers": { 'Authorization': AuthStr } })).data
            if (res.status === "success") {
                deleteSubject(id);
            }
        } catch (err) {
            console.log(err)
            alert("Somthing went wrong, please try again")
        }
    }

    return (
        <>

            <div className="m-2">
                <Card style={{ width: '18rem' }} >
                    <Card.Img variant="top" src={image} style={{ width: '18rem', height: '18rem' }} />
                    <Card.Body>
                        <Card.Title style={{ fontWeight: "bold" }}>{subjectName}</Card.Title>
                        <Card.Text>
                            ${fee}/Week
                         <p style={{ fontWeight: "bold" }}>WEEKLY SCHEDULE</p>
                            {day.map((item, index) =>
                                <Card.Text key={index}>
                                    {item}- From{startTime}-To-{endTime}
                                </Card.Text>
                            )}
                        </Card.Text>
                        <Button variant="dark" className="m-3" onClick={() => navigate(`/editSubject/${_id}`)}>Edit</Button>
                        <Button variant="dark" className="m-3" onClick={() => deleteSub(_id)}>Delete</Button>
                    </Card.Body>
                </Card>
            </div>

        </>
    )
}
