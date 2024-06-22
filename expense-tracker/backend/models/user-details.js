const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    createdDate : {
        type : Date,
        default : Date.now
    },
    gender : {
        type: String,
        required: true
    },
    contactNumber : {
        type: String,
        required: true
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;