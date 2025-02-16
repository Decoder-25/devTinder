const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true, 
        minLength:  3, 
        maxLength: 50, 
        validate: validator.isAlpha,
    },
    lastName: {
        type: String,
        validate: validator.isAlpha, 
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
        unique: true, 
        trim: true,
        validate: validator.isEmail,
    },
    password: {
        type: String,
        required: true,
        validate: validator.isStrongPassword
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'others'],
    },
    photoUrl: {
        type: String, 
        validate: validator.isURL
    },
    about: {
        type: String,
        default: "Hi, I'm using DevTinder!",
    },
    skills: {
        type: [String],
    },
    socialLinks: {
        github: { type: String, validate: validator.isURL },
        linkedin: { type: String, validate: validator.isURL },
        portfolio: { type: String, validate: validator.isURL }
    },
    lookingFor: {
        type: [String],
        enum: ['Collaboration', 'Mentorship', 'Networking', 'Job Opportunities'],
    },
    location: {
        city: String,
        country: String,
    },
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema);

module.exports = User;