const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
        unique: true, 
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'others']
    },
    photoUrl: {
        type: String, 
    },
    about: {
        type: String,
        default: "Hi, I'm using DevTinder!",
    },
    skills: {
        type: [String],
    }
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema);

module.exports = User;