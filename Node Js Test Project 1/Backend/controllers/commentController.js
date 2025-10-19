const Comment = require("../models/comments");

const getAllComments = async (req, res) => {
    try {
        const {postId} = req.params;
        const allComments = await Comment.findAll({where:{postId:postId}});
        if (!allComments || allComments.length === 0) {
            res.status(404).send("No Comments Available");
            return;
        }
        res.status(200).send(allComments);
    } catch (err) {
        res.status(500).send(err);
    }
};

const addComment = async (req, res) => {
    try {
        const { postId, comment } = req.body;
        const post = await Comment.create({
            postId,comment
        });
        res.status(201).send("Comment has been successfully added.");
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports = { getAllComments, addComment }