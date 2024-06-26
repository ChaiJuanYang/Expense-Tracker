const mongoose = require("mongoose");
const User = require("../models/user-details");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    createUser: async function (req, res) {
        try {
            // Check if user already exists
            const existingUser = await User.findOne({ email: req.body.email });
            if (existingUser) {
                return res.status(400).json({ message: "Email address is already in use." });
            }

            // Hash the password
            const hash = await bcrypt.hash(req.body.password, 10);

            // Create new user
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: hash,
                gender: req.body.gender,
                contactNumber: req.body.contactNumber
            });

            console.log("New User:", newUser);

            // Save the new user
            const result = await newUser.save();
            res.status(201).json({ message: "User created!", result: result });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    loginUser: async function (req, res) {
        let userFound;
        User.findOne({ email: req.body.email }).then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "User Not Found"
                });
            }
            userFound = user;
            return bcrypt.compare(req.body.password, user.password);
        })
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    message: "Incorrect Password"
                });
            }
            const token = jwt.sign(
                { email: userFound.email, userId: userFound._id },
                "secret_string",
                { expiresIn: "1h" }
            ); // expires in 1 hour
            return res.status(200).json({
                token: token,
            });
        })
        .catch(err => {
            return res.status(401).json({
                message: "Error with Authentication"
            });
        });
    }
};