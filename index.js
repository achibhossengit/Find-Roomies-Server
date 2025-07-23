const express = require("express");
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello coder we are here to solve peoples problem!");
});

app.listen(port, () => {
  console.log(`Roomies-Server is running on port: ${port}`);
});
