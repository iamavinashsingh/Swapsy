// models/User.model.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
        type: String,
        required: true,
        },
        email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        },
        password: {
        type: String,
        required: true,
        },
        profilePic: {
        type: String,
        default: '', // optional profile photo URL
        },
        location: {
        type: String,
        default: '',
        },
        skillsOffered: {
        type: [String],
        default: [],
        },
        skillsWanted: {
        type: [String],
        default: [],
        },
        availability: {
        type: String, // e.g. "Weekends", "Evenings"
        default: '',
        },
        isAdmin: {
        type: Boolean,
        default: false,
        },
        isBanned: {
        type: Boolean,
        default: false,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
