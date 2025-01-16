const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
// Define routes here
app.use("*",require("./routes/auth"))
app.use("*",require("./routes/discussions"))
app.use("*",require("./routes/NewDiscussion"))


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
