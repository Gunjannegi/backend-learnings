const path = require('path');
const getAllProducts = (req,res)=>{
    res.sendFile(path.join(__dirname,"..","views","product.html"));
};

const addProduct = (req,res)=>{
    res.send("Adding a new product.")
};

const getProductById = (req,res)=>{
    const id = req.params.id;
    res.send(`Fetching product with ID: ${id}`);
};

module.exports  = {getAllProducts, addProduct, getProductById};