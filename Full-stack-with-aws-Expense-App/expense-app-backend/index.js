const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const sequelize = require('./utils/db-connection');

app.use(express.json());
app.use(cors());

app.use('/user', userRoutes);
app.use('/expenses',expenseRoutes)

sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log("Server is running...");
    });
}).catch((err) => { console.log(err) });
