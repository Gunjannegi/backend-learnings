const Post = require('../models/post');
const getAllPosts = async (req, res) => {
    try {
        const allPosts = await Post.findAll();
        if (!allPosts || allPosts.length === 0) {
            res.status(404).send("No Posts Available");
            return;
        }
        res.status(200).send(allPosts);
    } catch (err) {
        res.status(500).send(err);
    }
};

const addPost = async (req, res) => {
    try {
        const { link, description } = req.body;
        const post = await Post.create({
            link: link,
            description: description
        });
        res.status(201).send("Post has been successfully added.");
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports = { getAllPosts, addPost }