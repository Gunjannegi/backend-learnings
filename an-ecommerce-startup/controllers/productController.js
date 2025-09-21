const path = require('path');
const useService = require('../service/productService');
const getAllProducts = (req,res)=>{
    const filePath = path.join(__dirname,"..","views","product.html");
    useService.gettingAllProducts(res,filePath);
};

const addProduct = (req,res)=>{
    const data = req.body;
    useService.addingNewProduct(res,data.productName);
};

const getProductById = (req,res)=>{
    const id = req.params.id;
    useService.gettingProductById(res,id)
};

module.exports  = {getAllProducts, addProduct, getProductById};