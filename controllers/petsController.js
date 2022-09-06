const {
  getAllPetsModel,
  addPetModel,
  searchPetsModel,
  getPetByIdModel,
  savePetModel,
  removePetModel,
  adoptOrFosterModel,
  returnPetModel,
  getUserPetsModel,
  editPetModel
} = require("../models/petsModel");

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

async function savePet(req, res) {
  try {
    const { userId } = req.body;
    const { petId } = req.params;
    const savedPetObj = {
      userId: userId,
      petId: parseInt(petId),
    };
    const savePet = await savePetModel(savedPetObj);
    if (savePet.error) {
      throw new Error(savePet.error);
    }
    res.send({ ok: true });
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
}

async function removePet(req, res) {
  try {
    const petId = req.params.petId;
    const userId = req.body.userId;
    const removedPetObj = {
      userId: userId,
      petId: parseInt(petId),
    };
    const removePet = await removePetModel(removedPetObj);
    if (removePet.error) {
      throw new Error(removePet.error);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
}

async function adoptOrFoster(req, res) {
  try {
    const { petId } = req.params;
    const { userId, action } = req.body;

    const changeReqDetails = {
      userId: userId,
      userAction: action,
      petId: petId,
    };
    const changeStatus = await adoptOrFosterModel(changeReqDetails);
    if (changeStatus.error) {
      throw new Error(changeStatus.error);
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
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
}

async function getUserPets(req, res) {
  try {
    const { userId } = req.body;
    if (userId) {
    const allUserPets = await getUserPetsModel(userId);
    res.send(allUserPets);
    if (allUserPets.error) {
      throw new Error(allUserPets.error);
    }
  }
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
    }
    catch(err) {
        res.status(500).send(err);
    }
}

async function editPet(req, res) {
  const {petId} = req.params;
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
  getUserPets,
  editPet
};
