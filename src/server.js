const express = require("express");
require("dotenv").config({ path: "./.env" });
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const petsRoute = require("./routes/petsRoute");
const usersRoute = require("./routes/usersRoute");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const app = express();

app.use("/images", express.static("images"));
app.use(express.json());

const getServerUrl = () => {
  if (process.env.NODE_ENV === 'production') return 'https://pets-server.onrender.com/'
  return "http://localhost:3000";
}

app.use(cors({ origin: getServerUrl(), credentials: true }));
app.use(cookieParser());

app.use("/pets", petsRoute);
app.use("/users", usersRoute);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

async function init() {
  try {
    const dbConnection = await mongoose.connect(
      process.env.MONGO_URI,
      { useNewUrlParser: true, useUnifiedTopology: true },
      { dbName: "<petsApp>" }
    );
    if (dbConnection.connections[0].host) {
      console.log("Connected to DB");
      app.listen(PORT, () => {
        console.log("Listening on port " + PORT);
      });
    }
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

init();