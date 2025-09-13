const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/',(req, res) => {
    if (fs.existsSync('username.txt')) {
        fs.readFile('username.txt', "utf8", (err, data) => {
            if (err) {
                return res.status(500).send("Something went wrong while reading the file.");
            }

            res.status(200).send(`
                <p>${data}</p>
                <form action="/" method="POST" onsubmit="document.getElementById('username').value = localStorage.getItem('username');">
                    <label for="message">Message</label>
                    <input id="message" name="message" required />
                   <input id="username" type="hidden" name="username"/>
                    <button type="submit">Send</button>
                </form>
            `);
        });
    } else {
        res.send(`
            <form action="/" method="POST" onsubmit="document.getElementById('username').value = localStorage.getItem('username')">
                <label for="message">Message</label>
                <input id="message" name="message" required />
                <input id="username" type="hidden" name="username"/>
                <button type="submit">Send</button>
            </form>
        `);
    }
})
router.post('/', (req, res) => {
    const message = req.body.message;
    const username = req.body.username;
    if (!username) {
        return res.status(400).send("You are not logged in.");
    }

    const data = `${username} - ${message}`;
    if (fs.existsSync('username.txt')) {
        fs.appendFile('username.txt', data, 'utf8', (err) => {
            if (err) {
                return res.status(500).send("Something went wrong while saving the message.");

            }
            return res.redirect('/');

        });

    } else {
        fs.writeFile('username.txt', data, 'utf8', (err) => {
            if (err) {
                return res.status(500).send("Something went wrong while saving the message.");
            }
            return res.redirect('/');

        });
    }
});
module.exports = router;