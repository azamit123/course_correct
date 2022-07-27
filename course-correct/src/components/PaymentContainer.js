import React from 'react'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import NavBar from './NavBar';

const PUBLIC_KEY = "pk_test_51LPc7xBzdxROlnhnEFfByXFspt1k21ize93mWsNOLsDCFXIngIldBOh186yVZjmqLCBsRu2aeJekPIIWPPGPW1Fm008pKmb2d4";

const stripeTest = loadStripe(PUBLIC_KEY);

export default function PaymentContainer() {


    return (
        <div style={{ margin: 100 }}>
            <NavBar />
            <Elements stripe={stripeTest}>
                <PaymentForm />
            </Elements>
        </div>
    )
}
