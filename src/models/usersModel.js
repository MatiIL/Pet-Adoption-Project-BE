const User = require("../schemas/userSchema");

async function signUpModel(newUser) {
  try {
    const user = new User(newUser);
    await user.save();
    return res;
  } catch (err) {
    console.log(err.message);
  }
}

async function getUserByEmailModel(email) {
  try {
    const user = await User.findOne({ email: email });
    return user;
  } catch (err) {
    console.log(err.message);
  }
}

async function savePetModel(petId, userId) {
  try {
    const newSavedPet = await User.updateOne(
      { _id: userId }, { $addToSet: { savedPets: petId } }
      );
    return newSavedPet;
  } catch (err) {
    console.log(err.message);
  }
}

async function ownPetModel(petId, userId) {
  try {
    const ownedPet = await User.updateOne(
      { _id: userId },
      { $push: { ownedPets: petId } }
    );
    return ownedPet;
  } catch (err) {
    console.log(err.message);
  }
}

async function returnPetModel(petId, userId) {
  try {
    const returned = await User.updateOne(
      { _id: userId },
      { $pull: { adoptedPets: petId } }
    );
    await User.updateOne({ _id: userId }, { $pull: { fosteredPets: petId } });
    return returned;
  } catch (err) {
    console.log(err.message);
  }
}

async function unsavePetModel(petId, userId) {
  try {
    const removed = await User.updateOne(
      { _id: userId },
      { $pull: { savedPets: petId } }
    );
    if (removed) return { ok: true };
  } catch (err) {
    console.log(err.message);
  }
}

async function updateUserModel(userId, updatedUser) {
  try {
    const user = await User.findById(userId);
    user.firstName = updatedUser.firstName;
    user.lastName = updatedUser.lastName;
    user.email = updatedUser.email;
    user.phone = updatedUser.phone;
    user.password = updatedUser.password;
    user.bio = updatedUser.bio;
   const newUser = await user.save()
    if (newUser) return newUser;
  } catch (err) {
    console.log(err.message);
  }
}

async function getUserByIdModel(userId) {
  try {
    const user = await User.findById(userId).select("-password");
    if (user) return user;
  } catch (err) {
    console.log(err.message);
  }
}

async function getAllUsersModel() {
  try {
    const users = await User.find({});
    if (users) return users;
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  signUpModel,
  getUserByEmailModel,
  savePetModel,
  ownPetModel,
  returnPetModel,
  unsavePetModel, 
  updateUserModel,
  getUserByIdModel, 
  getAllUsersModel
};
