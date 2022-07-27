const Class = require("../model/class");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRETE)
const nodemailer = require("nodemailer");
const password = process.env.PASSWORD;



exports.sendEmail = async (req, res) => {
    let { message, to, subject } = req.body;
    const transport = nodemailer.createTransport({
        service: 'Outlook',
        auth: {
            user: 'course_correct@outlook.com',
            pass: password
        }
    });

    try {
        await transport.sendMail({
            from: 'course_correct@outlook.com',
            to: to,
            subject: subject,
            text: message
        });
        res.status(200).send({ status: "success" });

    } catch (err) {
        console.log(err);
        res.send({ status: "failed" })
    }



}




exports.recievePayment = async (req, res) => {
    let { amount, id } = req.body;
    amount = amount * 100
    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "USD",
            description: "course correct",
            payment_method: id,
            confirm: true

        });
        // console.log("payment", payment);
        res.send({ status: "success" });

    } catch (err) {
        // console.log("ERROR", err);
        res.send({ status: "failed" })
    }

}




exports.getMyClass = async (req, res) => {
    let classes = null;
    try {
        if (req.user.role === "student") {
            classes = await Class.getStudentClasses(req.user._id);
        } else if (req.user.role === "tutor") {
            classes = await Class.getTutorClasses(req.user._id);
        }
        res.status(200).send({ status: "success", result: classes });
    } catch (err) {
        console.log("ERROR", err)
        res.send({ status: "failed" });
    }
}



exports.addNewClass = async (req, res) => {
    const { tutor_id, tutorEmail, student_id, subject_id, startDate, time,
        lessonDuration, tutorName, subjectName, studentName,
        totalFee, days, endDate, isFinished } = req.body;

    const newClass = new Class(tutor_id, tutorEmail, student_id, subject_id, startDate, time, lessonDuration,
        subjectName, tutorName, studentName, totalFee, days, endDate, isFinished);

    try {
        await newClass.addNewClass();
        res.status(200).send({ status: "success" })
    } catch (err) {
        console.log(err, "ERROR")
        res.send({ status: "failed" });

    }

}

exports.deleteClass = async (req, res) => {
    const class_id = req.params.class_id;
    try {
        const isDeleted = await Class.deleteClass(class_id);
        if (isDeleted) {
            res.status(200).send({ status: "success" })
        } else {
            res.send({ status: "failed" });
        }
    } catch (err) {
        console.log("error", err)
        res.send({ status: "failed" });
    }
}


exports.updateClass = async (req, res) => {
    try {
        await Class.updateClass(req.body);
        res.status(200).send({ status: "success" });
    } catch (err) {
        console.log("ERROR", err)
        res.send({ status: "failed" });
    }
}


