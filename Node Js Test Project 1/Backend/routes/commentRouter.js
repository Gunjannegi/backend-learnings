const express = require('express');
const router = express.Router();
const {getAllComments, addComment} = require('../controllers/commentController');

router.get('/getAllComments/:postId', getAllComments);
router.post('/add', addComment);

module.exports = router;