const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

exports.registerUser = async ({ name, email, password }) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
    };
};

exports.loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
    };
};

exports.getUserProfile = async (userId) => {
    const user = await User.findById(userId).select('-password');
    if (!user) throw new Error('User not found');
    return user;
};

// UPDATE User Profile
exports.updateUserProfile = async (userId, body) => {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    user.name = body.name || user.name;
    user.skillsOffered = body.skillsOffered || user.skillsOffered;
    user.skillsWanted = body.skillsWanted || user.skillsWanted;
    user.availability = body.availability || user.availability;
    user.profilePhoto = body.profilePhoto || user.profilePhoto;

    // ✅ Secure password update (if user wants)
    if (body.password) {
        const bcrypt = require('bcryptjs');
        user.password = await bcrypt.hash(body.password, 10);
    }

    //  DO NOT allow changing email or isAdmin
    const updatedUser = await user.save();

    return {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email, // email stays same
        skillsOffered: updatedUser.skillsOffered,
        skillsWanted: updatedUser.skillsWanted,
        availability: updatedUser.availability,
        profilePhoto: updatedUser.profilePhoto,
        token: generateToken(updatedUser._id),
    };
};
