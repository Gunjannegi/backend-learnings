const User = require('../models/user');
const getAllUsers = async(req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).send(users);

    } catch (error) {
        res.status(500).send(error)
    }
};

const addUser = async(req, res) => {
    const { username, phoneNumber, email } = req.body;
    try {
        const users = await User.create({
            username: username,
            phoneNumber: phoneNumber,
            email: email
        });
        res.status(201).send(`User with name ${username} is successfully added.`);

    } catch (error) {
        res.status(500).send(error)
    }
};

const deleteUser = async(req,res) =>{
    try{
        const {id} = req.params;
        const user = await User.destroy({
            where:{
                userId:id
            }
        });
       if(user===0){
        res.status(404).send("User not found");
        return;
       }
       res.status(200).send("User has been deleted.")

    }catch(error){
        res.status(500).send(error)
    }
}

const editUser = async(req,res)=>{
    try{
        const {userId, username, phoneNumber,email} = req.body;
        const user = await User.findOne({
            where: {userId}
        });
         if(!user){
        res.status(404).send("User not found");
        return;
       }
        user.username = username;
        user.phoneNumber = phoneNumber;
        user.email = email;
        await user.save();
      
       res.status(200).send("User has been edited.",user)

    }catch(error){
        res.status(500).send(error)
    }
}

module.exports = { getAllUsers, addUser, deleteUser, editUser };