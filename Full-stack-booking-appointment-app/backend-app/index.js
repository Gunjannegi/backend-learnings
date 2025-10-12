const express = require('express');
const sequelize = require('./utils/db-connection');
const userRoutes = require('./routes/userRoutes');
var cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());


app.use('/users',userRoutes);

sequelize.sync().then(()=>{
    app.listen(3000, () => console.log('Server is listening on port 3000'));
}).catch((error)=>{console.log(error)});

