const Pet = require("../schemas/petSchema");

async function addPetModel(newPet) {
  newPet.ownerId = "";
  try {
    const pet = new Pet(newPet);
    await pet.save();
    return pet;
  } catch (err) {
    console.log(err.message);
  }
}

async function editPetModel(petId, newDetails) {
  try {
    const pet = await Pet.findByIdAndUpdate(petId, newDetails, {new: true});
    return pet;
  } catch (err) {
    console.log(err.message);
  }
}

async function getPetByIdModel(petId) {
  try {
    const pet = await Pet.findById({ _id: petId });
    return pet;
  } catch (err) {
    console.log(err.message);
  }
}

async function searchPetsModel(params) {
  try {
    const filteredPets = await Pet.find(params);
    return filteredPets;
  } catch (err) {
    console.log(err.message);
  }
}

async function isPetAvailableModel(petId, action) {
  try {
    const pet = await Pet.findById({ _id: petId });
    if (
      (action === 'Foster' && pet.adoptionStatus !== '1') ||
      (action === 'Adopt' && pet.adoptionStatus === '3')
    ) {
      return false;
    } else return true;
  } catch (err) {
    console.log(err.message);
  }
}

async function setPetFosteredModel(petId, userId) {
  try {
    const petStatus = await Pet.updateOne(
      { _id: petId },
      { $set: { adoptionStatus: "2", ownerId: userId } }
    );
    if (petStatus) return { ok: true };
  } catch (err) {
    console.log(err.message);
  }
}

async function setPetAdoptedModel(petId, userId) {
  try {
    const petStatus = await Pet.updateOne(
      { _id: petId },
      { $set: { adoptionStatus: "3", ownerId: userId } }
    );
    if (petStatus) return { ok: true };
  } catch (err) {
    console.log(err.message);
  }
}

async function setPetAvailableModel(petId) {
  try {
    const petStatus = await Pet.updateOne(
      { _id: petId },
      { $set: { adoptionStatus: "1", ownerId: "" } }
    );
    if (petStatus) return { ok: true };
  } catch (err) {
    console.log(err.message);
  }
}

async function getAllPetsModel() {
  try {
    const pets = await Pet.find({});
    if (pets) return pets;
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  addPetModel,
  editPetModel,
  getPetByIdModel,
  searchPetsModel,
  isPetAvailableModel,
  setPetFosteredModel,
  setPetAdoptedModel,
  setPetAvailableModel,
  getAllPetsModel,
};
