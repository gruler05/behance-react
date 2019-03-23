const express = require("express");
const bodyParser = require("body-parser");
const users = require("./routes/api/users");
const app = express();

app.use(bodyParser.json());

app.use("/api/users", users);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
