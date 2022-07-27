const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    role: { type: String, required: true },
    pic: { type: String, required: true }

}, {
    timestamps: true
})


const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;