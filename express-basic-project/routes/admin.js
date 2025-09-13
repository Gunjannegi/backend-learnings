const express = require('express');
const router = express.Router();

router.get('/add-product',(req,res)=>{
    res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title"/><br/><input type="number" name="size"/><br/><button type="submit">Add Product</button></form>')
});

router.post('/add-product',(req,res,next)=>{
    console.log(req.body);
    res.redirect('/');
})

module.exports = router;