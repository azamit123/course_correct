const mongoose = require("mongoose");

const subjectSchema = mongoose.Schema({
    tutor_id: { type: String, require: true },
    tutorName: { type: String, require: true },
    tutorEmail: { type: String, require: true },
    tutorPic: { type: String, require: true },
    subjectName: { type: String, required: true },
    fee: { type: Number, require: true },
    type: { type: String, require: true },
    day: [{ type: String, required: true }],
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    description: { type: String, required: true },
    pic: { type: String, required: true },
    isAvailable: { type: Boolean, required: true }
}, {
    timestamps: true
})


const SubjectModel = mongoose.model("subject", subjectSchema);

module.exports = SubjectModel;