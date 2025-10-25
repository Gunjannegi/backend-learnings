const Player = require("../models/players");

const getPlayerByName = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) return res.status(400).send("Name is required");
    console.log(name)
    const player = await Player.findOne({ where: { name } });

    if (!player) return res.status(404).send("Player not found");

    res.status(200).send(player);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

const addPlayer = async (req, res) => {
    try {
        const { name, dob, photoUrl, birthplace, career, numberOfMatches, score, filters, average, wickets } = req.body;
        const player = await Player.create({
            name: name,
            dob: dob,
            photoUrl: photoUrl,
            birthplace: birthplace,
            career: career,
            numberOfMatches: numberOfMatches,
            score: score,
            filters: filters,
            average: average,
            wickets: wickets
        });
        res.status(201).send("Player has been successfully added");
    } catch (err) {
        res.status(500).send(err)
    }

}

const updatePlayer = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, dob, photoUrl, birthplace, career, numberOfMatches, score, filters, average, wickets } = req.body;
        const player = await Player.findOne({ where: { id: id } });
        if (!player) {
            res.status(404).send("Player doesn't exist");
            return;
        }
        player.name = name;
        player.dob = dob;
        player.photoUrl = photoUrl;
        player.birthplace = birthplace;
        player.career = career;
        player.numberOfMatches = numberOfMatches;
        player.score = score;
        player.filters = filters;
        player.average = average;
        player.wickets = wickets;
        await player.save();
        res.status(200).send("Player updated successfully.");
    } catch (err) {
        res.status(500).send(err)
    }

}

module.exports = { addPlayer, updatePlayer, getPlayerByName };