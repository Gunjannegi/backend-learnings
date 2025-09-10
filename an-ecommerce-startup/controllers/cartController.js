const getProductByUserId = (req,res)=>{
    const id = req.params.userId;
    res.send(`Fetching cart for user with ID: ${id}`);
};

const addProductInCart = (req,res)=>{
    const id = req.params.userId;
    res.send(`Adding product to cart for user with ID: ${id}`);
};

module.exports = {getProductByUserId, addProductInCart};