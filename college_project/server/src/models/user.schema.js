import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    reg_date: {
        type: Date,
        default: Date.now
    }
})


const userModel = mongoose.model('user', userSchema)


export default userModel