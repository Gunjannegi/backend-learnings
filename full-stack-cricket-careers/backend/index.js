const express = require('express');
const app = express();
const sequelize = require('./utils/db-connection');
const playerRoutes = require('./routes/playerRoute');
const cors = require('cors');
app.use(cors());
app.use(express.json());

app.use('/cricket', playerRoutes);

sequelize.sync().then(() => {
    app.listen(3000,() => {
        console.log("Server is listening...")
    });
}).catch(err => { console.log(err) });
