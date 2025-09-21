const {sendErrorResponse, sendResponse} = require('../utils/response');
const gettingAllProducts = (res, filePath) => {
    sendResponse(res,filePath,200);
};

const gettingProductById = (res, id) => {
    sendResponse(res,`Fetching product with ID: ${id}`,200);
};

const addingNewProduct = (res, data) => {
      try{
            if(!data){
                const err = new Error("Product Name is required.");
                console.log(err)
                err.statusCode = 400;
                throw err;
            }
        sendResponse(res,{ value: data },201);
    
        }catch(error){
            sendErrorResponse(res,error)
        }

};

module.exports = { gettingAllProducts, gettingProductById, addingNewProduct };