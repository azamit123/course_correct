const ClassModel = require("../schema/class");

class Class {
    constructor(tutor_id, tutorEmail, student_id, subject_id, startDate, time, lessonDuration, subjectName, tutorName, studentName, totalFee, days, endDate, isFinished) {
        this.tutor_id = tutor_id,
        this.tutorEmail = tutorEmail,
            this.student_id = student_id,
            this.subject_id = subject_id,
            this.startDate = startDate,
            this.time = time,
            this.lessonDuration = lessonDuration,
            this.tutorName = tutorName,
            this.subjectName = subjectName,
            this.studentName = studentName
        this.totalFee = totalFee,
            this.days = days,
            this.endDate = endDate,
            this.isFinished = isFinished

    }


    static async getStudentClasses(student_id) {
        const classes = await ClassModel.find({ student_id });
        return classes;
    }

    static async getTutorClasses(tutor_id) {
        const classes = await ClassModel.find({ tutor_id });
        return classes;
    }



    async addNewClass() {
        const newClass = new ClassModel(this);
        await newClass.save();
        return true;
    }


    static async deleteClass(class_id) {
        await ClassModel.deleteOne({ _id: class_id });
        return true;
    }

    static async updateClass(newValue) {
        const updatedClass = await ClassModel.updateOne({ _id: newValue._id }, {
            $set: {
                isFinished: true
            }
        });
        return true;
    }


}


module.exports = Class;