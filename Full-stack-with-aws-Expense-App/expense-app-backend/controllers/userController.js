const User = require("../models/user");

const addUser = async (req, res) => {
    try {
        const { username, useremail, userpassword } = req.body;
        const checkUser = await User.findOne({ where:{useremail} });
        console.log(checkUser)

        if (checkUser) {
            return res.status(409).send({ message: "User already exist", data: checkUser });
        };
        const user = await User.create({
            username: username,
            useremail: useremail,
            userpassword: userpassword
        });
        if (user) {
            res.status(201).send({ message: "User is successfully added", data: user });
        }
    } catch (err) {
        res.status(500).send(err)
    }

};

module.exports = {addUser}