const mongoose = require("mongoose");

const petSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    breed: { type: String, required: true },
    name: { type: String, required: true },
    adoptionStatus: { type: String, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    color: { type: String, required: true },
    bio: { type: String, required: true },
    hypoallergenic: { type: String, required: true },
    dietary: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  { collation: { locale: 'en', strength: 2 } },
  { timestamps: true },
  { collection: "pets" }
);

const Pet = mongoose.model("Pets", petSchema);

module.exports = Pet;