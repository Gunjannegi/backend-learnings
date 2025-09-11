const express = require('express');
const app = express();
const port = 3000;

const userRouter = require('./router/userRoute');
const productRouter = require('./router/productRoute');
const cartRouter = require('./router/cartRoute');
app.use(express.static('public'));
app.use(express.json());
app.use('/users',userRouter);
app.use('/products',productRouter);
app.use('/cart',cartRouter);

app.listen(port,(req,res)=>{
    console.log("Server is running on http://localhost:3000");
})