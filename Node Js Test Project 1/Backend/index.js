const express = require('express');
const sequelize = require('./utils/db-connection');
var cors = require('cors');
const app = express();
const postRouter = require('./routes/postRouter');
const commentRouter = require('./routes/commentRouter');
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.use('/post', postRouter);
app.use('/comment', commentRouter);

sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log("Server is running...");
    });
}).catch((err) => { console.log(err) });

// const synching = async () => {
//     try {
//         const response = await sequelize.sync()
//         if (response) {
//             app.listen(3000, () => {
//                 console.log("Server is running...");
//             });
//         }
//     } catch (err) {
//         console.log(err)
//     }
// };

// synching();

