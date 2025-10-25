const express = require('express');
const { addPlayer, updatePlayer,getPlayerByName } = require('../controllers/playerController');
const route = express.Router();

route.get('/getPlayer',getPlayerByName);
route.post('/addPlayer',addPlayer);
route.put('/updatePlayer/:id',updatePlayer);

module.exports = route;