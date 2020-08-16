const express = require("express");
const app = express();
const port = 3000;

app.get("/", function (req, res) {
  res.send("Welcome to My Movie DB");
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
