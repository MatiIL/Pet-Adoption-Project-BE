const {
  getAllPetsModel,
  addPetModel,
  searchPetsModel,
  getPetByIdModel,
  setPetFosteredModel,
  setPetAdoptedModel,
  setPetAvailableModel,
  editPetModel,
} = require("../models/petsModel");
const { ownPetModel, returnPetModel, savePetModel, unsavePetModel } = require("../models/usersModel");

async function addPet(req, res) {
  try {
    const petId = await addPetModel(req.body);
    if (petId.error) {
      throw new Error(petId.error);
    }
    res.send({ ok: true });
  } catch (err) {
    res.status(500).send(err);
  }
}

async function getSearchedPets(req, res) {
  try {
    const search = req.query;
    const filteredPets = await searchPetsModel(search);
    if (filteredPets) res.status(200).send(filteredPets);
  } catch (err) {
    res.status(400).send(err.message);
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

async function savePet(req, res) {
  try {
    const { userId } = req.body;
    const { petId } = req.params;
    const savePet = await savePetModel(petId, userId);
    if (savePet.error) {
      throw new Error(savePet.error);
    } else res.status(200).send({ ok: true });
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
}
  
async function removePet(req, res) {
  try {
    const petId = req.params.petId;
    const userId = req.body.userId;
    const removePet = await unsavePetModel(petId, userId);
    if (removePet.error) {
      throw new Error(removePet.error);
    } else res.status(200).send({ ok: true });
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
}
  

async function adoptOrFoster(req, res) {
  try {
    const { petId } = req.params;
    const { userId, action } = req.body;
    
    const petOwned = await ownPetModel(petId, userId);
    if (petOwned.error) {
      throw new Error(petOwned.error);
    }

    if (action === "Foster") {
      const petFostered = await setPetFosteredModel(petId);
      if (petFostered.error) {
        throw new Error(petFostered.error);
      }
    }
    
    if (action === "Adopt") {
      const petAdopted = await setPetAdoptedModel(petId);
      if (petAdopted.error) {
        throw new Error(petAdopted.error);
      }
    }

  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
}

async function returnPet(req, res) {
  try {
    const returnedPet = await returnPetModel(req);
    if (returnedPet.error) {
      throw new Error(returnedPet.error);
    }
    // const petAvailable = await setPetAvailableModel()
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
}

async function getAllPets(req, res) {
  try {
    const allPets = await getAllPetsModel();
    if (allPets.error) {
      throw new Error(allPets.error);
    }
    res.send(allPets);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function editPet(req, res) {
  const { petId } = req.params;
  const numPetId = parseInt(petId);
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
    const newPetDetails = {
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
    const editPet = await editPetModel(numPetId, newPetDetails);
    if (editPet.error) {
      throw new Error(editPet.error);
    }
    res.send({ ok: true });
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports = {
  getAllPets,
  addPet,
  getSearchedPets,
  getPetById,
  savePet,
  removePet,
  adoptOrFoster,
  returnPet,
  editPet,
};
