const fs = require('fs');
const path = require('path');

const pathToUsersDB = path.resolve(__dirname, '../databases/usersDB.json');

function signup(req, res) {
    try {
        const newUser = (req.body);
        const addUserToDB = fs.writeFileSync(pathToUsersDB, JSON.stringify(newUser));
        res.send(addUserToDB);
    }
    catch(err) {
        console.error(err);
    }

}

module.exports = { signup };