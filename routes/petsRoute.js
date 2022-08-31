const express = require('express');
const router = express.Router();
const PetsController = require('../controllers/PetsController');
const { validateBody } = require('../middleware/validateBody');
const { petSchema } = require('../schemas/allSchemas');
const { upload, uploadToCloudinary } = require('../middleware/imagesMiddleware');
// const { verifyToken } = require('../middleware/usersMiddleware');


router.post('/', upload.single("picture"), uploadToCloudinary, validateBody(petSchema), PetsController.addPet); //verifyAdminToken
router.get('/search', PetsController.getSearchedPets);
router.get('/:petId', PetsController.getPetById);
router.post('/save/:petId', PetsController.savePet); //verifyToken
router.delete('/save/:petId', PetsController.removePet); //verifyToken
router.post('/take/:petId', validateBody(petSchema), PetsController.takePet); //verifyToken, isFormerAdopter

// router.get('/mypets/:userId', verifyToken, PetsController.getMyPets);

// router.post('/return/:petId', validateBody(petSchema), verifyToken, PetsController.returnPet);



module.exports = router;