const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const path = require("path");
const users = require("./routes/api/users");
const app = express();

app.use(helmet());
app.use(bodyParser.json());

app.use("/api/users", users);

// When Deploying it in production mode
if (process.env.NODE_ENV === production) {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
