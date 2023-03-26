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
const { ownPetModel, returnPetModel } = require("../models/usersModel");

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

// async function savePet(req, res) {
//   try {
//     const { userId } = req.body;
//     const { petId } = req.params;
//     const savedPetObj = {
//       userId: userId,
//       petId: parseInt(petId),
//     };
//     const savePet = await savePetModel(savedPetObj);
//     if (savePet.error) {
//       throw new Error(savePet.error);
//     }
//     res.send({ ok: true });
//   } catch (err) {
//     console.log(err);
//     res.status(500).send(err.message);
  

// async function removePet(req, res) {
//   try {
//     const petId = req.params.petId;
//     const userId = req.body.userId;
//     const removedPetObj = {
//       userId: userId,
//       petId: parseInt(petId),
//     };
//     const removePet = await unsavePetModel(removedPetObj);
//     if (removePet.error) {
//       throw new Error(removePet.error);
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).send(err.message);
  

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
  console.log(req.body);
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
  adoptOrFoster,
  returnPet,
  editPet,
};
