const User = require('../models/users');

const addUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = await User.create({
            name: name,
            email: email
        });
        res.status(201).send(`User with name: ${name} is created.`)
    } catch (err) {
        res.status(500).send(err)
    }
}

const getAllUsers = async (req, res) => {
    try {
        const user = await User.findAll();
        res.status(200).send(user)
    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports = { addUser,getAllUsers }