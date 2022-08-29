const {
  addPetModel,
  searchPetsModel,
  getPetByIdModel,
} = require("../models/petsModel");

// async function getAllPets(req, res) {
//     try {
//         const allPets = getAllPetsModel();
//         res.send(allPets);
//     }
//     catch(err) {
//         res.status(500).send(err);
//     }
// }

async function addPet(req, res) {
  try {
    const {
      type,
      name,
      adoptionStatus,
      imageUrl,
      height,
      weight,
      dietary,
      breed,
      color,
      hypoallergenic,
      bio,
    } = req.body;
    const isHypo = hypoallergenic === "true" ? 1 : 0;
    const newPet = {
      type: type,
      name: name,
      adoptionStatus: adoptionStatus,
      picture: imageUrl,
      height: height,
      weight: weight,
      dietary: dietary,
      breed: breed,
      color: color,
      hypoallergenic: isHypo,
      bio: bio,
    };
    const petId = await addPetModel(newPet);
    if (petId.error) throw new Error(petId.error);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function getSearchedPets(req, res) {
  try {
    const { type, status, name, minHeight, maxHeight, minWeight, maxWeight } =
      req.query;

    const petSearchObj = {
      type: type,
      status: status,
      name: name,
      minHeight: minHeight,
      maxHeight: maxHeight,
      minWeight: minWeight,
      maxWeight: maxWeight,
    };
    console.log(req.headers);
    console.log(req.cookies);
    const findPets = await searchPetsModel(petSearchObj);
    res.send(findPets);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
}

async function getPetById(req, res) {
  try {
    const { petId } = req.params;
    const pet = await getPetByIdModel(petId);
    res.send(pet);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
}

module.exports = { addPet, getSearchedPets, getPetById };
