const gettingAllProducts = (res, filePath) => {
    res.sendFile(filePath);
};

const gettingProductById = (res, id) => {
    res.send(`Fetching product with ID: ${id}`);

};

const addingNewProduct = (res, data) => {
    res.json({ value: data })

};

module.exports = { gettingAllProducts, gettingProductById, addingNewProduct };