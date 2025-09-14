const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'contact.html'))

});

router.post('/', (req, res) => {
    console.log(req.body)
    if (req.body.fullName && req.body.email) {
        res.redirect('/success');
    }
    else {
        res.end();
    }
})
module.exports = router;