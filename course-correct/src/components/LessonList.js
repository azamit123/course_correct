import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from "react-router-dom"
import { Form } from "react-bootstrap";
import axios from "axios";
import Lesson from './Lesson';
import GlobalState from "./GlobalContext";
import { decodeToken, setHeader } from "../helperFunctions/decodeToken"
import NavBar from "./NavBar";



export default function LessonList() {
    const { subjects, setSubjects } = useContext(GlobalState)
    const navigate = useNavigate();
    const [searchVal, setSearchVal] = useState("")
    const [filtered, setFiltered] = useState([]);
    const user = decodeToken();

    useEffect(() => {
        const fetchAllSubjects = async () => {
            if (user) {
                try {
                    const AuthStr = setHeader();
                    const res = (await axios.get("/subjects/", { "headers": { 'Authorization': AuthStr } })).data
                    if (res.status === "success") {
                        // console.log(res.result)
                        setSubjects(res.result);
                    }
                } catch (err) {
                    console.log("ERROR", err);
                    navigate("/error")
                }
            }
        }
        fetchAllSubjects();
    }, [])


    const onChangeSearch = (e) => {
        setSearchVal(e.target.value);
        const filtredArr = []
        for (let subject of subjects) {
            if (subject.subjectName.toLowerCase().includes((e.target.value).toLowerCase()) ||
                subject.tutorName.includes(e.target.value) ||
                (subject.fee + "").includes(e.target.value) || subject.day.includes(e.target.value)) {
                filtredArr.push(subject);
            }
        }
        setFiltered(filtredArr);

    }

    let displayArr = [];

    displayArr = searchVal === "" ? subjects : filtered;



    return (
        <>

            <NavBar />
            <div className="mt-5" >
                <div className="mt-5 p-5">
                    <Form className="d-flex">
                        <Form.Control
                            type="text"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            value={searchVal}
                            onChange={(e) => onChangeSearch(e)}
                        />
                    </Form>
                </div>
                {displayArr.filter((sub) => sub.isAvailable === true).map((item) => <Lesson subject={item} key={item._id} />)}
            </div>

        </>
    )
}
