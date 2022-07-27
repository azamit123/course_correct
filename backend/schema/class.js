const mongoose = require("mongoose");

const classSchema = mongoose.Schema({
    tutor_id: { type: String, require: true },
    tutorEmail: { type: String, require: true },
    student_id: { type: String, require: true },
    subject_id: { type: String, require: true },
    startDate: { type: Date, requires: true },
    time: { type: String, requires: true },
    lessonDuration: { type: Number, require: true },
    subjectName: { type: String, required: true },
    tutorName: { type: String, required: true },
    studentName: { type: String, required: true },
    days: [],
    endDate: { type: Date, requires: true },
    totalFee: { type: Number, require: true },
    isFinished: { type: Boolean, require: true }
}, {
    timestamps: true
})


const ClassModel = mongoose.model("class", classSchema);

module.exports = ClassModel;