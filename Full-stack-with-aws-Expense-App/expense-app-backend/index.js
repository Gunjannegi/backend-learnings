const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const premiumRoutes = require('./routes/premiumRoutes');
const aiRoutes = require('./routes/aiRoutes');
const sequelize = require('./utils/db-connection');
require("./models/user");
require("./models/expense");

app.use(express.json());
app.use(cors());

app.use('/user', userRoutes);
app.use('/expenses', expenseRoutes);
app.use('/payment', paymentRoutes);
app.use('/premium', premiumRoutes);
app.use('/ask', aiRoutes);

sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log("Server is running...");
    });
}).catch((err) => { console.log(err) });
