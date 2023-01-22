const express = require('express');
const router = express.Router();
const PetsController = require('../controllers/PetsController');
const { validateBody } = require('../middleware/validateBody');
const { petSchema } = require('../schemas/allSchemas');
const { upload, uploadToCloudinary } = require('../middleware/imagesMiddleware');
const { verifyToken, isReqAuthorized } = require('../middleware/usersMiddleware');
const { isPetAvailable } = require('../middleware/petsMiddleware');

router.post(
    '/', 
    verifyToken, 
    isReqAuthorized, 
    upload.single("picture"), 
    uploadToCloudinary, 
    validateBody(petSchema), 
    PetsController.addPet
    ); 
router.get('/search', PetsController.getSearchedPets);
router.get('/:petId', PetsController.getPetById);
router.post('/:petId/save', verifyToken, PetsController.savePet); 
router.delete('/:petId/remove', verifyToken, PetsController.removePet); 
router.post('/adopt/:petId', verifyToken, isPetAvailable, PetsController.adoptOrFoster); 
router.post('/return/:petId', verifyToken, PetsController.returnPet);
router.get('/mypets/:userId', verifyToken, PetsController.getUserPets);
router.get('/', verifyToken, isReqAuthorized, PetsController.getAllPets); 
router.put(
    '/:userId/:petId', 
    verifyToken, 
    isReqAuthorized, 
    upload.single("picture"), 
    uploadToCloudinary, 
    validateBody(petSchema), 
    PetsController.editPet
    ); 

module.exports = router;