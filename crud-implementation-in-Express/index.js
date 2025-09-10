const express = require('express');
const app = express();
const port = 3000;
const studentRouter = require('./routes/studentRouter');
const courseRouter = require('./routes/courseRouter');

// Middleware to parse JSON bodies
app.use(express.json());   

app.get('/', (req, res) => {
  res.send('Welcome to the Student & Course Portal API!');
});
app.use('/students', studentRouter);
app.use('/courses', courseRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});