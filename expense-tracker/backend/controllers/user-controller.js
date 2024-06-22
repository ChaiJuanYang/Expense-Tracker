const mongoose = require("mongoose");
const User = require("../models/user-details");

module.exports = {
    createUser : async function (req, res) {
        let newUser = new User({ name: req.body.name, email: req.body.email, password: req.body.password,
            gender: req.body.gender, contactNumber: req.body.contactNumber });
        let user;
        try {
            user = new User(newUser);
            await user.save();
        } catch (err) {
            res.status(400).json({ error: "Invalid Data" });
            return;
        }    
        res.status(200).json(user);
    }
};