const User = require("../models/user");

const addUser = async (req, res) => {
    try {
        const { username, useremail, userpassword } = req.body;
        const checkUser = await User.findOne({ where: { useremail } });

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

const loginUser = async (req, res) => {
    try {
        const { useremail, userpassword } = req.body;
        const checkUser = await User.findOne({ where: { useremail } });

        if (checkUser) {
            if(checkUser.userpassword !== userpassword){
                return res.status(401).send({ message: "Unauthorized User" });
            }
            return res.status(200).send({ message: "User is successfully logged in" });
        };
        res.status(404).send({ message: "User not found" });
    } catch (err) {
        res.status(500).send(err)
    }
};

module.exports = { addUser, loginUser }