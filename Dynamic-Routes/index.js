const express = require('express');
const app = express();
const welcomeRouter = require('./routes/welcomeRouter')

app.use('/welcome',welcomeRouter)

app.listen(3000,()=>{console.log("Server is running...")})