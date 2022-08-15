const express = require('express');
const router = express.Router();
const petsController = require('../controllers/petsController');

router.get('/', petsController.getAllPets);


module.exports = router