const signUpSchema = {
  type: "object",
  properties: {
    firstName: { type: "string" },
    lastName: { type: "string" },
    email: { type: "string" },
    password: { type: "string", minLength: 2 },
    repeatPassword: { type: "string", minLength: 2 },
    phone: { type: "string" },
  },
  required: ["email"],
  additionalProperties: false,
};

const loginSchema = {
  type: "object",
  properties: {
    email: { type: "string" },
    password: { type: "string", minLength: 2 },
  },
  required: ["email", "password"],
  additionalProperties: false,
};

const petSchema = {
  type: "object",
  properties: {
    type: { type: "string" },
    name: { type: "string", minLength: 2 },
    adoptionStatus: { type: "string" },
    height: { type: "string" },
    weight: { type: "string" },
    dietary: { type: "string" },
    breed: { type: "string" },
    color: { type: "string" },
    hypoallergenic: { type: "string" },
    bio: { type: "string" },
    imageUrl: { type: "string" },
  },
  required: [
    "type",
    "name",
    "adoptionStatus",
    "imageUrl",
    "height",
    "weight",
    "dietary",
    "breed",
    "color",
    "hypoallergenic",
    "bio",
  ],
  additionalProperties: true,
};

const updateUserSchema = {
  type: "object",
  properties: {
    userId: { type: "number"},
    firstName: { type: "string" },
    lastName: { type: "string" },
    email: { type: "string" },
    password: { type: "string" },
    repeatPassword: { type: "string" },
    phone: { type: "string" },
    bio: { type: "string" },
  },
};

module.exports = { signUpSchema, loginSchema, petSchema, updateUserSchema };
