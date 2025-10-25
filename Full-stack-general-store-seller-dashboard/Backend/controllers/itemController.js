const Item = require("../models/items");

const getAllItems = async (req, res) => {
    const items = await Item.findAll();
    if (items.length === 0) {
        res.status(404).send("No Item found.");
        return;
    }
    res.status(200).send(items);
};

const addItem = async (req, res) => {
    try {
        const { item, description, price, quantity } = req.body;
        const items = await Item.create({
            item: item,
            description: description,
            price: price,
            quantity: quantity
        });
        res.status(200).send("Item has been successfully created");
    } catch (err) {
        res.status(500).send(err)
    }

}

const updateItem = async (req, res) => {
    try {
        const { id, soldQuantity } = req.params;
        const item = await Item.findOne({ where: { id: id } });
        if (!item) {
            res.status(404).send("Item doesn't exist");
            return;
        }
        item.quantity = item.quantity - soldQuantity;
        await item.save();
        res.status(200).send("Item updated successfully.");
    } catch (err) {
        res.status(500).send(err)
    }

}

module.exports = { getAllItems, addItem, updateItem };