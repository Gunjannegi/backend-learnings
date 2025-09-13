const express = require('express');
const router = express.Router();

router.get('/',(req, res) => {
    res.send(`
        <form action="/login" method="POST" onsubmit="localStorage.setItem('username',document.getElementById('username').value)">
            <label for="username">Username</label>
            <input id="username" name="username" required />
            <button type="submit">Login</button>
        </form>
    `);
});

router.post('/', (req, res) => {
    res.redirect('/');
})
module.exports = router;