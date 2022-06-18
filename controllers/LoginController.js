var Account = require("../models/AccountModel");

const Signup = async (req, res, next) => {
    const user = Account({
        username: "admin",
        password: "admin",
        role: "admin",
    });
    await user.save();
    console.log(user);
    return res.send(user);
};

const Logout = (req, res, next) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                return next(err);
            } else {
                return res.redirect("/");
            }
        });
    }
};

module.exports = { Logout, Signup };