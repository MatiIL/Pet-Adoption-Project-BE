const express = require('express');
const router = express.Router();
const PetsController = require('../controllers/PetsController');
const { validateBody } = require('../middleware/validateBody');
const { petSchema } = require('../schemas/allSchemas');
const { upload, uploadToCloudinary } = require('../middleware/imagesMiddleware');
const { verifyToken } = require('../middleware/usersMiddleware');

router.post('/', verifyToken, upload.single("picture"), uploadToCloudinary, validateBody(petSchema), PetsController.addPet); //verifyAdminToken
router.get('/search', PetsController.getSearchedPets);
router.get('/:petId', PetsController.getPetById);
router.post('/:petId/save', verifyToken, PetsController.savePet); 
router.delete('/:petId/remove', verifyToken, PetsController.removePet); 
router.post('/adopt/:petId', verifyToken, PetsController.adoptOrFoster); //isPetAdopted
router.post('/return/:petId', verifyToken, PetsController.returnPet);

// router.get('/mypets/:userId', verifyToken, PetsController.getMyPets);





module.exports = router;