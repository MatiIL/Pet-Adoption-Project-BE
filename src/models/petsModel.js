const Pet = require("../schemas/petSchema");

async function addPetModel(newPet) {
  try {
    const pet = new Pet(newPet);
    await pet.save();
    return pet;
  } catch (err) {
    console.log(err.message);
  }
}

async function editPetModel(petId, newPet) {
  try {
    const pet = await Pet.findByIdAndUpdate(petId, newPet, {new: true});
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

async function setPetFosteredModel(petId) {
  try {
    const petStatus = await Pet.updateOne(
      { _id: petId },
      { $set: { adoptionStatus: "Fostered" } }
    );
    if (petStatus) return { ok: true };
  } catch (err) {
    console.log(err.message);
  }
}

async function setPetAdoptedModel(petId) {
  try {
    const petStatus = await Pet.updateOne(
      { _id: petId },
      { $set: { adoptionStatus: "Adopted" } }
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
      { $set: { adoptionStatus: "Available" } }
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
  setPetFosteredModel,
  setPetAdoptedModel,
  setPetAvailableModel,
  getAllPetsModel,
};
