const {sendResponse} = require('../utils/response');

const getAllUsers = (req,res)=>{
    sendResponse(res,"Fetching all users.",200)
};

const addUser = (req,res)=>{
    sendResponse(res,"Adding a new user.",201)
};

const getUserById = (req,res)=>{
    const id = req.params.id;
    sendResponse(res,`Fetching user with ID: ${id}`,200);
};

module.exports = {getAllUsers, addUser, getUserById};
