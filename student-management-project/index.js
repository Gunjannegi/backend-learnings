const express = require('express');
const app = express();
const connection = require('./utils/db-connection');
const studentRoutes = require('./routes/studentRoutes');

app.use(express.json());
app.use('/students',studentRoutes);
app.listen(3000,()=>{
    console.log("Server is listening...")
})