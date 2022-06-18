var mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: 4,
        maxlength: 100,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        minlength: 4,
        maxlength: 255,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "user", "block"],
        default: "user",
    },
    timeCreated: {
        type: Date,
        default: () => Date.now(),
    },
});


const Account = mongoose.model("Account", AccountSchema);

module.exports = Account;