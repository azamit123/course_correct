const UserModel = require("../schema/user");
const bcrypt = require("bcrypt");

class User {
    constructor(email, password, firstName, lastName, phoneNumber, role, pic) {
        this.firstName = firstName,
            this.lastName = lastName,
            this.email = email,
            this.phoneNumber = phoneNumber,
            this.password = password,
            this.role = role,
            this.pic = pic
    }


    async signUp() {
        const existingEmail = await UserModel.findOne({ email: this.email });
        if (existingEmail) {
            return false;
        } else {
            const newUser = new UserModel(this);
            newUser.password = bcrypt.hashSync(newUser.password, 8);
            await newUser.save();
            return true;
        }
    }


    async logIn() {
        const currentUser = await UserModel.findOne({ email: this.email });
        if (currentUser) {
            const isValid = bcrypt.compareSync(this.password, currentUser.password);
            if (isValid) {
                return currentUser;
            } else {
                return "Invalid Password";
            }
        }
        return "email doesnt exist";
    }

    static async updateProfile(updatedUser) {
        if (updatedUser.password) {
            updatedUser.password = bcrypt.hashSync(updatedUser.password, 8);
        }

        const currentUser = await UserModel.updateOne({ _id: updatedUser._id }, {
            $set: {
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                phoneNumber: updatedUser.phoneNumber,
                pic: updatedUser.pic,
                password: updatedUser.password
            }
        });
        return true;
    }


    static async deleteUser(user_id) {
        await UserModel.deleteOne({ _id: user_id });
        return true;
    }


}


module.exports = User;