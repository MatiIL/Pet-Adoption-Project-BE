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
const {
  doesUserOwnPetModel,
  ownPetModel,
  returnPetModel,
  savePetModel,
  unsavePetModel,
} = require("../models/usersModel");

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
    const { userId, action, petId } = req.body;

    if (action === "Foster") {
      const petOwned = await ownPetModel(petId, userId);
      if (petOwned.error) {
        throw new Error(petOwned.error);
      } else res.status(200).send({ ok: true });

      const petFostered = await setPetFosteredModel(petId, userId);
      if (petFostered.error) {
        throw new Error(petFostered.error);
      }
    }

    if (action === "Adopt") {
      const isFostererAdopting = await doesUserOwnPetModel(userId, petId);
      if (isFostererAdopting.error) {
        throw new Error(isFostererAdopting.error);
      } else if (isFostererAdopting) {
        const petAdopted = await setPetAdoptedModel(petId, userId);
        if (petAdopted.error) {
          throw new Error(petAdopted.error);
        } else res.status(200).send({ ok: true });
        return;
      } else {
        const petOwned = await ownPetModel(petId, userId);
        if (petOwned.error) throw new Error(petOwned.error);
        const petAdopted = await setPetAdoptedModel(petId, userId);
        if (petAdopted.error) throw new Error(petAdopted.error);
        res.status(200).send({ ok: true }); 
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
}

async function returnPet(req, res) {
  try {
    const { userId } = req.body;
    const { petId } = req.params;
    const returnedPet = await setPetAvailableModel(petId);
    if (returnedPet.error) {
      throw new Error(returnedPet.error);
    }
    const removePetFromUser = await returnPetModel(petId, userId);
    if (removePetFromUser.error) {
      throw new Error(removePetFromUser.error);
    } else res.status(200).send({ ok: true });
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
      hypoallergenic: hypoallergenic,
      bio: bio,
    };
    const editPet = await editPetModel(petId, newPetDetails);
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
