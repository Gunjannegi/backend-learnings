const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const loginRoute = require('./router/loginRoute');
const inboxRoute = require('./router/inboxRoute');

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', inboxRoute);

app.use('/login', loginRoute);

// Start server
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});
