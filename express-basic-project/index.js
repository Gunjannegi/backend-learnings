const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const adminRoutes = require('./routes/admin');
const contactRoutes = require('./routes/contact');
const shopRoutes = require('./routes/shop');
app.use(bodyParser.urlencoded({extended: false}));

app.use('/admin',adminRoutes);
app.use('/contactus',contactRoutes);
app.get('/success',(req,res)=>{
    res.send(`<h1>Form successfuly filled</h1>`)
})
app.use(shopRoutes);


app.use((req,res,next)=>{
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));
})

app.listen(port,(req,res)=>{
    console.log("Server is running on http://localhost:3000")
})