const express = require("express");
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const petsRoute = require("./routes/petsRoute");
const usersRoute = require("./routes/usersRoute");
const dbConnection = require("./knex/knex");
const cookieParser = require("cookie-parser");
const pino = require('pino-http');
const app = express();

app.use("/images", express.static("images"));
app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use(cookieParser());

app.use('/pets', petsRoute);
app.use("/users", usersRoute);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));
app.use(pino({ level: 'info'}));

dbConnection.migrate
  .latest()
  .then((migration) => {
    if (migration) {
      console.log(migration, "Connected to DB");
      app.listen(PORT, () => {
        console.log("Listening on port " + PORT);
      });
    }
  })
  .catch((err) => console.error(err));
