const { getAllPetsModel } = require('../models/petsModel');

async function getAllPets(req, res) {
    try {
        const allPets = getAllPetsModel();
        res.send(allPets);
    }
    catch(err) {
        res.status(500).send(err);
    }
}

module.exports = { getAllPets }