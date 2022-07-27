const jwt = require("jsonwebtoken");
const PRIVATE_KEY = "Tutor1234";



// AUTHORIZE LOG IN
exports.authorize = async (req, res, next) => {
    const authoToken = req.headers.authorization;
    if (authoToken) {
        const token = authoToken.split(" ")[1];
        jwt.verify(token, PRIVATE_KEY, (err, user) => {
            if (err) {
                res.status(403).send({ status: false });
            } else {
                req.user = user;
                next()
            }
        })
    } else {
        res.status(401).send({ status: false });
    }
}


// AUTHORIZE TUTOR/TEACHER ROLE
exports.protectTutor = async (req, res, next) => {
    if (req.user.role === "tutor") {
        next();
    } else {
        res.status(401).send({ status: false });
    }
}


// AUTHORIZE STUDENT ROLE
exports.protectStudent = async (req, res, next) => {
    if (req.user.role === "student") {
        next();
    } else {
        res.status(401).send({ status: false });
    }
}

