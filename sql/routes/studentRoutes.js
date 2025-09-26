const express = require('express');
const router = express.Router();
const {addEntries, updateEntries, deleteEntries} = require('../controller/studentController')

router.post('/add',addEntries);
router.put('/update/:id',updateEntries);
router.delete('/delete/:id',deleteEntries)

module.exports = router;

