const express = require('express');
const app = express();
const connection = require('./utils/db-connection');
const studentRoutes = require('./routes/studentRoutes');
require('./models');
const studentModel = require('./models/student')

app.use(express.json());
app.use('/students',studentRoutes);
connection.sync({ alter: true }).then(()=>{
    app.listen(3000,()=>{
    console.log("Server is listening...")
})
}).catch((err)=>{
    console.log("Server is running")
})
