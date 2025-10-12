const express = require('express');
const connection = require('./utils/db-connection');
const cors = require('cors');
const expenseRoute = require('./route/expenseRoutes');
const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

app.use('/expense',expenseRoute);




connection.sync().then(() => {
    app.listen(3001, () => { console.log("Server is listening") });
}).catch((err) => {
    console.log(err)
});