const express = require('express');
const sequelize = require('./utils/db-connection');
const userRoute = require('./routes/userRoute');
const busRoute = require('./routes/busRoute');
const bookingRoute = require('./routes/bookingRoute');
require('./models/association');
const app = express();
app.use(express.json());

app.use('/users',userRoute);
app.use('/buses',busRoute);
app.use('/bookings',bookingRoute);

sequelize.sync({ force: false }).then(() => {
    app.listen(3000, () => {
        console.log('Server is listening');
    })
}).catch(err => {
    console.log(err);
});