const express = require('express');
const sequelize = require('./utils/db-connection');
const userRoute = require('./routes/userRoute');
const busRoute = require('./routes/busRoute');
const app = express();
app.use(express.json());

app.use('/users',userRoute);
app.use('/buses',busRoute);

sequelize.sync({ force: false }).then(() => {
    app.listen(3000, () => {
        console.log('Server is listening');
    })
}).catch(err => {
    console.log(err);
});