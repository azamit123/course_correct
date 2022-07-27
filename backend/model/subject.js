const SubjectModel = require("../schema/subject");

class Subject {
    constructor(tutor_id, subjectName, tutorName, tutorEmail, tutorPic, fee, day, startTime, endTime, type, pic, description, isAvailable) {
        this.tutor_id = tutor_id,
            this.tutorName = tutorName,
            this.tutorEmail = tutorEmail
        this.tutorPic = tutorPic,
            this.subjectName = subjectName,
            this.fee = fee,
            this.day = day,
            this.startTime = startTime,
            this.endTime = endTime
        this.type = type,
            this.pic = pic,
            this.description = description,
            this.isAvailable = isAvailable
    }


    static async getMySubjects(user_id) {
        const subjects = await SubjectModel.find({ tutor_id: user_id });
        return subjects;
    }

    static async getAllSubjects() {
        const subjects = await SubjectModel.find().sort({ createdAt: -1 });
        return subjects;
    }

    async addNewSubject() {
        const newSubject = new SubjectModel(this);
        await newSubject.save();
        return true;
    }


    static async deleteSubject(subject_id) {
        const subject = await SubjectModel.findOne({ _id: subject_id });
        if (subject) {
            await SubjectModel.deleteOne({ _id: subject_id });
            return true;
        } else {
            return false;
        }
    }

    static async updateSubject(newValue) {
        const updatedSubject = await SubjectModel.updateOne({ _id: newValue._id }, {
            $set: {
                // tutor_id: newValue.tutor_id,
                fee: newValue.fee,
                type: newValue.type,
                day: newValue.day,
                startTime: newValue.startTime,
                endTime: newValue.endTime,
                subjectName: newValue.subjectName,
                description: newValue.description,
                pic: newValue.pic,
                isAvailable: newValue.isAvailable
            }
        });
        return true;
    }

}


module.exports = Subject;