const express = require('express');
const router = express.Router();
const PetsController = require('../controllers/PetsController');
// const { filterSearch } = require('../middleware/petsMiddleware');
const { validateBody } = require('../middleware/validateBody');
const { upload, uploadToCloudinary } = require("../middleware/imagesMiddleware");


router.post('/', upload.single("picture"), uploadToCloudinary, PetsController.addPet);
router.get('/search', PetsController.getSearchedPets);
router.get('/:petId', PetsController.getPetById);

// router.get('/mypets/:userId', PetsController.getMyPets);
// router.post('/adopt/:petId', validateBody, verifyToken, PetsController.adoptPet);
//two more post routes for fostering and returning?
// router.put('/save/:petId', validateBody, verifyToken, PetsController.savePet);
//one more put route for unsaving?

module.exports = router;