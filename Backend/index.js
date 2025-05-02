const connectToMongoose = require("./db");
const express = require("express");
var cors = require('cors')

const app = express();
const PORT = 5000;

app.use(cors());

//
app.use(express.json());

connectToMongoose();

//Available routes
app.use("/api/auth",require("./routes/auth"));
app.use("/api/notes",require("./routes/notes"));

app.get("/",(req, res) => {
    res.status(200).send("Hello guys! This is Stiti!");
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}....`);
});