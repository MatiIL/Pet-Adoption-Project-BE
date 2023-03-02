const dbConnection = require("../knex/knex");

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

async function savePetModel(savedPetObj) {
  try {
    const { petId, userId } = savedPetObj;
    const [savedId] = await dbConnection.from('users_pet_list').insert(savedPetObj);
    return savedId;
  } catch (err) {
    console.log(err);
  }
  
}

async function removePetModel(removedPetObj) {
  try {
    const { petId, userId } = removedPetObj;
    const removedSavedId = await dbConnection.from('users_pet_list').where('petId', petId).andWhere('userId', userId).del();
    return removedSavedId;
  } catch (err) {
    console.log(err);
  }
}

async function isPetAvailableModel(dbQuery) {
  try {
    const { petId, action } = dbQuery;
    if (action === "Foster") {
      const [isPetAvailable] = await dbConnection.from('pets').where('petId', petId).andWhere('adoptionStatus', '1');
      return isPetAvailable;
    }
    if (action === "Adopt") {
      const [isPetAdopted] = await dbConnection.from('pets').where('petId', petId).andWhereNot('adoptionStatus', '3');
      return isPetAdopted;
    }
  } catch (err) {
    console.log(err);
  }
}

async function adoptOrFosterModel(changeReqDetails) {
  try {
    const { userId, userAction, petId } = changeReqDetails;
    const changeStatusQuery = dbConnection
      .from("pets")
      .modify(function (queryBuilder) {
        if (userAction === 'Adopt' ) {
        queryBuilder.where('petId', petId).update('ownerId', userId).update('adoptionStatus', '3');
        }
        if (userAction === 'Foster' )
        queryBuilder.where('petId', petId).update('ownerId', userId).update('adoptionStatus', '2');
      });

    const petStatusChange = await changeStatusQuery;
    return petStatusChange;

  } catch (err) {
    console.log(err);
  }
}

async function returnPetModel(req) {
  try {
  const { petId } = req.params;
  const petToAvailableStatus = await dbConnection.from('pets').where('petId', parseInt(petId)).update('ownerId', null).update('adoptionStatus', '1');
    return petToAvailableStatus;
  } catch (err) {
    console.log(err);
  }
}

async function getUserPetsModel(userId) {
  try {
    const ownedPets = await dbConnection.select('*').from('pets').where({'ownerId': userId});
    const savedPets = await dbConnection.from('users_pet_list').join('pets', 'users_pet_list.petId', 'pets.petId').where({'users_pet_list.userId': userId});
    return [ownedPets, savedPets];
  } catch (err) {
    console.log(err);
  }
}

async function getAllPetsModel() {
  try {
    const allPets = await dbConnection.select('*').from('pets');
    return allPets;
  } catch (err) {
    console.log(err);
  }
}

async function editPetModel(numPetId, newPetDetails) {
  try {
    const updatedPet = await dbConnection.from('pets').where('petId', numPetId).update(newPetDetails);
    return updatedPet;
  }
  catch (err) {
    console.log(err);
  }
}

module.exports = { addPetModel, searchPetsModel, getPetByIdModel, savePetModel, removePetModel, isPetAvailableModel, adoptOrFosterModel, returnPetModel, getUserPetsModel, getAllPetsModel, editPetModel };
