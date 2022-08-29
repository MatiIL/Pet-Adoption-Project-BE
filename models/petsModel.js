const dbConnection = require("../knex/knex");

// async function getAllPetsModel() {
//     try {
//         const allPets = fs.readFileSync(pathToPetsDB);
//         return JSON.parse(allPets);
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
        switch (true) {
          case type == 1 || type == 2:
            queryBuilder.where("type", type);
          case status == 1 || status == 2 || status == 3:
            queryBuilder.where("adoptionStatus", status);
          case name != "":
            queryBuilder.where("name", name);
          case minHeight > 0:
            queryBuilder.whereBetween("height", [
              minHeight,
              dbConnection("pets").max("height"),
            ]);
          case maxHeight > 0:
            queryBuilder.whereBetween("height", [
              dbConnection("pets").min("height"),
              maxHeight,
            ]);
          case minHeight > 0 && maxHeight > 0:
            queryBuilder.whereBetween("height", [minHeight, maxHeight]);
          case minWeight > 0:
            queryBuilder.whereBetween("weight", [
              minWeight,
              dbConnection("pets").max("weight"),
            ]);
          case maxWeight > 0:
            queryBuilder.whereBetween("weight", [
              dbConnection("pets").min("weight"),
              maxWeight,
            ]);
          case minWeight > 0 && maxWeight > 0:
            queryBuilder.whereBetween("weight", [minWeight, maxWeight]);
        }
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

module.exports = { addPetModel, searchPetsModel, getPetByIdModel };
