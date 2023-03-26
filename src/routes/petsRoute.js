const express = require('express');
const router = express.Router();
const PetsController = require('../controllers/petsController');
const { upload, uploadToCloudinary } = require('../middleware/imagesMiddleware');
const { verifyToken, isReqAuthorized } = require('../middleware/usersMiddleware');
const { isPetAvailable } = require('../middleware/petsMiddleware');

router.post(
    '/', 
    verifyToken, 
    isReqAuthorized, 
    upload.single("picture"), 
    uploadToCloudinary, 
    PetsController.addPet
    ); 
router.get('/search', PetsController.getSearchedPets);
router.get('/:petId', PetsController.getPetById);
// router.post('/:petId/save', verifyToken, PetsController.savePet); 
// router.delete('/:petId/remove', verifyToken, PetsController.removePet); 
router.post('/adopt/:petId', verifyToken, isPetAvailable, PetsController.adoptOrFoster); 
router.post('/return/:petId', verifyToken, PetsController.returnPet);
router.get('/', verifyToken, isReqAuthorized, PetsController.getAllPets); 
router.put(
    '/:userId/:petId', 
    verifyToken, 
    isReqAuthorized, 
    upload.single("picture"), 
    uploadToCloudinary,  
    PetsController.editPet
    ); 

module.exports = router;