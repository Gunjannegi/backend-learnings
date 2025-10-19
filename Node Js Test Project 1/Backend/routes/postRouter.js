const express = require('express');
const router = express.Router();
const {getAllPosts, addPost} = require('../controllers/postController');

router.get('/getAllPosts', getAllPosts);
router.post('/add', addPost);

module.exports = router;