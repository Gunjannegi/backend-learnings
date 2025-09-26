const express = require('express');
const db = require('./utils/db-connection');
const app = express();
const studentRoutes = require('./routes/studentRoutes');
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.use('/students',studentRoutes)

app.listen(3000,()=>{console.log('Server is running...')})