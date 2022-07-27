import React, { useEffect, useState } from 'react'
import { Button, Row, Col, Form } from 'react-bootstrap';
import * as Yup from "yup"
import { useFormik } from "formik"
import { useNavigate, useLocation } from "react-router-dom";
import { decodeToken } from "../helperFunctions/decodeToken"



export default function EnrollmentForm() {
    // const { subject_id } = useParams();
    const navigate = useNavigate();
    const [availableDays, setDays] = useState([])
    const location = useLocation();
    const subject = location.state.subject;
    const timesPerWeek = subject.day.length;


    useEffect(() => {
        const daysInWeek = [];
        subject.day.forEach((d) => {
            if (d === "monday") {
                daysInWeek.push(0);
            } else if (d === "tuesday") {
                daysInWeek.push(1);
            } else if (d === "wednsday") {
                daysInWeek.push(2);
            } else if (d === "thursday") {
                daysInWeek.push(3);
            } else if (d === "friday") {
                daysInWeek.push(4);
            } else if (d === "saturday") {
                daysInWeek.push(5);
            }
        });
        setDays(daysInWeek)

    }, [])



    const formik = useFormik({
        initialValues: {
            startDate: "",
            lessonDuration: 1,
        },
        validationSchema: Yup.object({
            startDate: Yup.string().required("Required"),
            lessonDuration: Yup.number().min(1).required("Required"),
        }),

        onSubmit: async (values) => {
            const today = new Date().getDate();
            const minDate = today - new Date(values.startDate).getDate()

            if (minDate >= 1) {
                alert("You Must Pick future dates");
            } else {
                const day = new Date(values.startDate).getDay();
                const validStartDate = availableDays.includes(day);
                let endDate = new Date(values.startDate);
                endDate = endDate.setDate((endDate.getDate() + 1) + (values.lessonDuration * 7))

                if (!validStartDate) {
                    alert(`Please pick a date with in the available days ${subject.day} are the vailable day to start`);
                } else {

                    if (values.lessonDuration && values.startDate) {
                        const user = decodeToken();
                        const newClass = {
                            tutor_id: subject.tutor_id,
                            tutorEmail: subject.tutorEmail,
                            student_id: user._id,
                            subject_id: subject._id,
                            startDate: values.startDate,
                            time: subject.startTime,
                            lessonDuration: values.lessonDuration,
                            subjectName: subject.subjectName,
                            tutorName: subject.tutorName,
                            studentName: user.firstName,
                            days: subject.day,
                            endDate: new Date(endDate),
                            totalFee: (subject.fee * values.lessonDuration),
                            isFinished: false
                        }
                        navigate("/pay", { state: { class: newClass } });
                    }

                }
            }

        }
    })



    return (
        <>
            <div className="row">
                <div className="col-sm-2"></div>
                <div className=" col-sm-8 border border-2 border-black  mb-3 p-5 m-5  shadow p-3 mb-5 bg-white rounded-top">
                    <Form onSubmit={formik.handleSubmit}>
                        <h3 className="text-black text-center mb-5">You Are Enrolling For </h3>
                        <p> {subject.subjectName}</p>
                        <p> With:  {subject.tutorName}</p>
                        <p> {timesPerWeek} Times/Week </p>
                        <p> Classes Are {subject.type} </p>
                        <p>Total Fees ${(formik.values.lessonDuration * subject.fee)}</p>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Pick How Many Weeks</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="lessonDuration"
                                    placeholder="number of weeks"
                                    value={formik.values.lessonDuration}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                />
                                {formik.touched.lessonDuration && formik.errors.lessonDuration ? <p className="errorMessage">* {formik.errors.lessonDuration}</p> : null}
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label> Pick Starting Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="startDate"
                                    placeholder="Date to start class"
                                    value={formik.values.startDate}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange} />
                                {formik.touched.startDate && formik.errors.startDate ? <p className="errorMessage">* {formik.errors.startDate}</p> : null}
                            </Form.Group>
                        </Row>
                        <Button variant="warning" type="submit" size="lg">
                            Enroll And Pay
                        </Button>
                    </Form>
                </div>
                <div className="col-sm-2"></div>
            </div>


        </>
    )
}
