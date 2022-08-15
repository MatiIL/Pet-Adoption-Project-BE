const fs = require('fs');
const path = require('path');

const pathToUsersDB = path.resolve(__dirname, '../databases/usersDB.json');

function getAllUsersModel() {
    try {
        const allUsers = fs.readFileSync(pathToUsersDB);
        return JSON.parse(allUsers);
    }
    catch(err) {
        console.error(err);
    }
}

function getUserByEmailModel() {
    try {
        const allUsers = getAllUsersModel();
        const user = allUsers.find(user => user.email === email);
        return user;
    }
    catch(err) {
        console.error(err);
    }
}

module.exports = { getAllUsersModel, getUserByEmailModel }