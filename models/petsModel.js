const dbConnection = require("../knex/knex");

// async function getAllPetsModel() {
//     try {
//         
//     }
//     catch(err) {
//         console.log(err);
//     }
// }

async function addPetModel(newPet) {
  try {
    const [petId] = await dbConnection.from("pets").insert(newPet);
    return petId;
  } catch (err) {
    console.log(err);
  }
}

async function searchPetsModel(petSearchObj) {
  try {
    const { type, status, name, minHeight, maxHeight, minWeight, maxWeight } =
      petSearchObj;

    const mostBasicSearch = dbConnection
      .from("pets")
      .modify(function (queryBuilder) {
        if (type == 1 || type == 2)
            queryBuilder.where("type", type);
        if (status == 1 || status == 2 || status == 3)
            queryBuilder.where("adoptionStatus", status);
        if (name !== "")
            queryBuilder.where("name", name);
        if (minHeight > 0)
            queryBuilder.whereBetween("height", [minHeight, dbConnection("pets").max("height")]);
        if (maxHeight > 0)
            queryBuilder.whereBetween("height", [dbConnection("pets").min("height"), maxHeight]);
        if (minHeight > 0 && maxHeight > 0)
            queryBuilder.whereBetween("height", [minHeight, maxHeight]);
        if (minWeight > 0)
            queryBuilder.whereBetween("weight", [minWeight, dbConnection("pets").max("weight")]);
        if (maxWeight > 0)
            queryBuilder.whereBetween("weight", [dbConnection("pets").min("weight"), maxWeight]);
        if (minWeight > 0 && maxWeight > 0)
            queryBuilder.whereBetween("weight", [minWeight, maxWeight]);
        });
    const findPets = await mostBasicSearch;
    return findPets;
  } catch (err) {
    console.log(err);
  }
}

async function getPetByIdModel(petId) {
  try {
    const [retrievedPet] = await dbConnection.from('pets').where('petId', petId);
    return retrievedPet;
  } catch (err) {
    console.log(err);
  }
}

async function savePetModel(petId) {
  
}

async function removePetModel(petId) {
  
}

module.exports = { addPetModel, searchPetsModel, getPetByIdModel, savePetModel, removePetModel };
