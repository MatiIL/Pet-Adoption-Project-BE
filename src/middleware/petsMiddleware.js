const { isPetAvailableModel } = require("../models/petsModel");
require("dotenv").config();

function filterPetSearch(req, res, next) {
  const { minHeightParam, maxHeightParam, minWeightParam, maxWeightParam } = req.query;
  for (let key in req.query) {
    if (req.query[key] === "" || req.query[key] === 0 || req.query[key] === 'Type') {
      delete req.query[key];
    }
  }

  const minHeight = Number(minHeightParam) > 0 ? minHeightParam : 0; 
  const minWeight = Number(minWeightParam) > 0 ? minWeightParam : 0;
  const maxHeight = Number(maxHeightParam) > 0? maxHeightParam : 90;
  const maxWeight = Number(maxWeightParam) > 0? maxWeightParam : 130;

  req.query.height = { $gte: minHeight, $lte: maxHeight};
  req.query.weight = { $gte: minWeight, $lte: maxWeight};
  delete req.query.minHeight;
  delete req.query.minWeight;
  delete req.query.maxHeight;
  delete req.query.maxWeight;

  next();
}

async function verifyPetStatus(req, res, next) {
  try {
    const { petId } = req.params;
    const { action } = req.body;
    const isActionPermitted = await isPetAvailableModel(petId, action);
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

module.exports = { filterPetSearch, verifyPetStatus };
