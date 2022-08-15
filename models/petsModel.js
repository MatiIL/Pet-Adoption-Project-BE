const fs = require('fs'); //will be replaced by external DB import
const path = require('path');
const pathToPetsDB = path.resolve(__dirname, '../databases/petsDB.json');

function getAllPetsModel() {
    try {
        const allPets = fs.readFileSync(pathToPetsDB);
        return JSON.parse(allPets);
    }
    catch(err) {
        console.log(err);
    }
}

module.exports = { getAllPetsModel };