const dbConnection = require('../knex/knex');

async function getUserByEmailModel(email) {
    try {
      const user = await dbConnection.from("users").where({email: email}).first()
      return user;
    } catch (err) {
      console.log(err);
    }
  }
  
  async function signUpModel(newUser) {
    try {
      const [userId] = await dbConnection.from("users").insert(newUser);
      return userId;
    } 
    catch (err) {
      console.log(err);
    }
  }

  async function getUserByIdModel(userId) {
    try {
      const user = await dbConnection.from("users").where("userId", userId).first();
      return user;
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  }

  // async function getUserPassword(userId) {
  //   try {
  //     const userPassword = await dbConnection.column("password").select().from("users").where("userId", userId);
  //     console.log(userPassword);

  //   } catch (err) {
  //     console.log(err);
  //     return { error: err };
  //   }
  // }

  async function emailComparator(userId, email) {
    try {
      const [emailUnchanged] = await dbConnection.from("users").where("userId", userId).andWhere("email", email);
      const [newUniqueEmail] = await dbConnection.from("users").whereNotExists(function() {
        this.select('*')
          .from("users")
          .where("email", email);
      })
      if (emailUnchanged) {
        return true;
      } else if (!emailUnchanged && newUniqueEmail) {
        return true;
      } else return false;
    } catch (err) {
      console.log(err);
    }
  }
  
  async function updateUserModel(userId, newDetails) {
    try {
      const updateDetails = await dbConnection.from("users").where("userId", userId).update(newDetails);
      const updatedUser = getUserByIdModel(userId);
      return updatedUser;
    } 
    catch (err) {
      console.log(err);
    }
  }

  async function getAllUsersModel() {
    try {
      const allUsers = await dbConnection.select('*').from("users");
      return allUsers;
    } catch (err) {
      console.log(err);
    }
  }
  
  
  module.exports = { getUserByEmailModel, signUpModel, getUserByIdModel, emailComparator, updateUserModel, getAllUsersModel };