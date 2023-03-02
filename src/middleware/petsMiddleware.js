const { isPetAvailableModel } = require("../models/petsModel");
require("dotenv").config();

async function isPetAvailable(req, res, next) {
    try {
      const { petId } = req.params;
      const { action } = req.body;
      const dbQuery = {
            petId: petId,
            action: action
        }
      const isActionPermitted = await isPetAvailableModel(dbQuery);
      if (isActionPermitted) {
        next();
      } else {
        res.status(406).send("action not permitted due to pet's current status");
        return;
      }
      
    } catch (err) {
    err.statusCode = 500;
    next(err);
    }
}

module.exports = { isPetAvailable }