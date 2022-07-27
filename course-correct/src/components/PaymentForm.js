import React, { useState, useEffect, useContext } from 'react'
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { setHeader, decodeToken } from "../helperFunctions/decodeToken"
import GlobalState from "./GlobalContext";
import Subject from './Subject';



export default function PaymentForm() {
    const [success, setSuccess] = useState(false);
    const [subject, setSubject] = useState([]);
    const { subjects } = useContext(GlobalState);
    const location = useLocation();
    const navigate = useNavigate();

    const stripe = useStripe();
    const elements = useElements();
    const AuthStr = setHeader();
    const user = decodeToken();

    const enrollmentInfo = location.state.class;


    useEffect(() => {

        const sub = subjects.find((s) => s._id === enrollmentInfo.subject_id);
        if (sub) {
            setSubject(sub);
        }

    }, [])


    const handlePay = async (e) => {
        e.preventDefault();

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        });

        if (!error) {
            try {
                const { id } = paymentMethod;
                const res = (await axios.post("/classes/payment", {
                    amount: enrollmentInfo.totalFee,
                    id
                }, { "headers": { 'Authorization': AuthStr } })).data;

                if (res.status === "success") {
                    setSuccess(true);
                    alert(`You have enrolled successfull, and start on ${enrollmentInfo.startDate}`);

                    // ADDING CLASS TO DB AND UPDATING SUBJECT AVAILABILITY.
                    try {
                        const res = (await axios.post("/classes", enrollmentInfo, { "headers": { "Authorization": AuthStr } })).data
                        if (res.status === "success") {
                            subject.isAvailable = false;

                            // UPDATING SUBJECT TO BE UNAVAILABLE.
                            const resp = (await axios.put("/subjects", subject, { "headers": { "Authorization": AuthStr } })).data

                            // console.log(resp, "make subject unavailable");
                            if (resp.status === "success") {
                                const email = {
                                    message: `You have been scheduled for ${subject.subjectName} and start Date is ${enrollmentInfo.startDate},
                                     student Name is ${user.firstName}-${user.lastName}`,
                                    to: subject.tutorEmail,
                                    subject: 'Class Enrollment'

                                };
                                // console.log(email)
                                const sent = (await axios.post("/classes/sendemail", email, { "headers": { "Authorization": AuthStr } })).data
                                console.log(sent, "sending")
                            }
                        }
                    } catch (err) {
                        console.log(err);
                        navigate("/error")

                    }
                }

            } catch (error) {
                console.log("err", error)
                navigate("/error")
            }
        } else {
            console.log(error.message);
            alert(error.message)
        }


    }

    return (
        <>
            {!success ?
                <form onSubmit={handlePay} style={{ padding: 80 }}>
                    <p style={{ margin: 50 }}>Please Fill Your Card Information</p>
                    <fieldset className="FormGroup">
                        <div className="FormRow">
                            <CardElement options={CARD_OPTIONS} />
                        </div>
                    </fieldset>
                    <button>Pay</button>
                </form>
                :
                <div>
                    <h2>YOU HAVE SUCCESSFULLY ENROLLED</h2>
                    <p> YOU PAID ${enrollmentInfo.totalFee}</p>
                    <p>HERE IS YOUR CONFORMATION NUMBER {enrollmentInfo.student_id}</p>
                    <p>THANK YOU!!!</p>
                </div>
            }

        </>
    )
}




const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#c4f0ff",
            color: "#fff",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": { color: "#fce883" },
            "::placeholder": { color: "#87bbfd" }
        },
        invalid: {
            iconColor: "#ffc7ee",
            color: "#ffc7ee"
        }
    }
}