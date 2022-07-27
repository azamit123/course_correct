const Subject = require("../model/subject");



exports.uploadPictures = async (req, res) => {
    const file = req.file
    res.send(file)
}

exports.getMySubjects = async (req, res) => {
    const subjects = await Subject.getMySubjects(req.user._id);
    res.status(200).send({ status: "success", result: subjects });
}


exports.getAllsubjects = async (req, res) => {
    const subjects = await Subject.getAllSubjects();
    res.status(200).send({ status: "success", result: subjects });
}


exports.addNewSubject = async (req, res) => {
    req.body.isAvailable = true;
    const { tutor_id, subjectName, tutorName,
        tutorEmail, tutorPic, fee, day, startTime, endTime,
        type, pic, description, isAvailable } = req.body;

    const newSubject = new Subject(tutor_id, subjectName, tutorName,
        tutorEmail, tutorPic, fee, day, startTime, endTime, type, pic,
        description, isAvailable);
    try {
        await newSubject.addNewSubject();
        res.status(200).send({ status: "success" })
    } catch (err) {
        console.log(err, "ERROR")
        res.send({ status: "failed" });

    }

}

exports.deleteSubject = async (req, res) => {
    const subject_id = req.params.subject_id;
    try {
        const isDeleted = await Subject.deleteSubject(subject_id);
        if (isDeleted) {
            res.status(200).send({ status: "success" })
        } else {
            res.send({ status: "failed" });
        }
    } catch (err) {
        // console.log("error", err)
        res.send({ status: "failed" });
    }
}

exports.updateSubject = async (req, res) => {
    try {
        await Subject.updateSubject(req.body);
        res.status(200).send({ status: "success" });
    } catch (err) {
        // console.log("ERROR", err)
        res.send({ status: "failed" });
    }
}