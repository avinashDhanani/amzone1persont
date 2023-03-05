const express = require("express");
const cors = require("cors");
const data = require("./routes/data");
require("./db/mongoose");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", data);
const port = 8000;

app.all("/", (req, res) => {
  res.send("<h1>Hey my name is avinash dhanani</h1>");
});



app.listen(port, () => {
  console.log("app is listing on port 8000");
});
