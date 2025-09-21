const {sendResponse} = require('../utils/response');
const getProductByUserId = (req,res)=>{
    const id = req.params.userId;
    sendResponse(res,`Fetching cart for user with ID: ${id}`,200);
};

const addProductInCart = (req,res)=>{
    const id = req.params.userId;
    sendResponse(res,`Adding product to cart for user with ID: ${id}`,200);
};

module.exports = {getProductByUserId, addProductInCart};