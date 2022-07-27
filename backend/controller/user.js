const User = require("../model/user");
const jwt = require("jsonwebtoken");
const PRIVATE_KEY = "Tutor1234";




exports.uploadPictures = async (req, res) => {
    const file = req.file
    res.send(file)

}


exports.signUp = async (req, res) => {
    if (!(req.body.email && req.body.password
        && req.body.firstName && req.body.lastName && req.body.phoneNumber && req.body.role)) {
        res.send("INVALID INPUT FORMAT, ALL USER INFORMATION IS REQUIRED");
    } else {
        const { email, password, firstName, lastName, phoneNumber, role, pic } = req.body;
        const newUser = new User(email, password, firstName, lastName, phoneNumber, role, pic);
        const isSaved = await newUser.signUp();
        if (isSaved) {
            res.status(200).send("USER SUCCESFULLY ADDED");
        } else {
            res.send("EMAIL EXISISTS,TRY A DIFFERENT EMAIL");
        }
    }
}

exports.logIn = async (req, res) => {
    const { email, password } = req.body;
    if (!(email && password)) {
        res.send("Email AND PASSWORD IS REQUIRED");
    } else {
        const body = new User(email, password);
        const validUser = await body.logIn();
        if (validUser === "Invalid Password" || validUser === "email doesnt exist") {
            res.send({ status: "failed" });
        } else {
            const token = jwt.sign({
                _id: validUser._id,
                email: validUser.email,
                firstName: validUser.firstName,
                lastName: validUser.lastName,
                phoneNumber: validUser.phoneNumber,
                role: validUser.role,
                pic: validUser.pic

            }, PRIVATE_KEY,

            );
            res.status(200).send({ status: "success", result: token });

        }
    }

}

exports.updateUser = async (req, res) => {
    if (req.user._id === req.body._id) {

        try {
            await User.updateProfile(req.body);
            res.status(200).send({ status: "success" });
        } catch (err) {
            res.send({ status: "failed" });
        }
    } else {
        res.send({ status: "failed" });
    }
}

exports.deleteUser = async (req, res) => {
    if (req.user._id === req.params._id) {
        try {
            await User.deleteUser(req.params._id)
            res.status(200).send({ status: "success" });
        } catch (err) {
            res.send({ status: "failed" })
        }
    } else {
        res.send({ status: "failed" })
    }
}



