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
      const user = await dbConnection.from("users").where({ userId: userId }).first();
      return user;
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  }
  
  
  module.exports = { getUserByEmailModel, signUpModel, getUserByIdModel };