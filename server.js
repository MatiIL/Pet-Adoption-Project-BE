const express = require('express');
const PORT = process.env.PORT || 8080;
const cors = require('cors');
const petsRoute = require('./routes/petsRoute');
const usersRoute = require('./routes/usersRoute');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/pets', petsRoute);
app.use('/users', usersRoute);

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
})