const express = require('express');
const router = express.Router();
const PetsController = require('../controllers/petsController');
const { upload, uploadToCloudinary } = require('../middleware/imagesMiddleware');
const { verifyToken, isReqAuthorized } = require('../middleware/usersMiddleware');
const { filterPetSearch, verifyPetStatus } = require('../middleware/petsMiddleware');

router.post(
    '/add-pet', 
    verifyToken, 
    isReqAuthorized, 
    upload.single("picture"), 
    uploadToCloudinary, 
    PetsController.addPet
    ); 
router.get('/search', filterPetSearch, PetsController.getSearchedPets);
router.get('/all-pets', verifyToken, isReqAuthorized, PetsController.getAllPets);
router.get('/pet/:petId', PetsController.getPetById);
router.put('/pet/:petId/save', verifyToken, PetsController.savePet); 
router.delete('/pet/:petId/remove', verifyToken, PetsController.removePet); 
router.put(
    '/pet/adopt/:petId', 
    verifyToken, 
    verifyPetStatus, 
    PetsController.adoptOrFoster
); 
router.put('/pet/return/:petId', verifyToken, PetsController.returnPet);
 
router.put(
    '/:userId/:petId', 
    verifyToken, 
    isReqAuthorized, 
    upload.single("picture"), 
    uploadToCloudinary,  
    PetsController.editPet
    ); 

module.exports = router;