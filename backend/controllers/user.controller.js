const userService = require('../services/user.service');

exports.registerUser = async (req, res) => {
    try {
        const userData = await userService.registerUser(req.body);
        res.status(201).json(userData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const userData = await userService.loginUser(req.body);
        res.status(200).json(userData);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const userData = await userService.getUserProfile(req.user.id);
        res.status(200).json(userData);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};