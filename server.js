const express = require("express");
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const petsRoute = require("./routes/petsRoute");
const usersRoute = require("./routes/usersRoute");
const dbConnection = require("./knex/knex");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());
app.use("/images", express.static("images"));
app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
// app.get("/set-cookie", (req, res) => {
//   res.cookie("token", "asgasgasgsagsgsgs", { maxAge: 800000 });
//   res.send("Hi");
// });

app.use('/pets', petsRoute);
app.use("/users", usersRoute);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

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
