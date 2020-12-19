const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

require("./models/AdminModel");
require("./models/GroupModel");
require("./models/StudenetModel");
require("./db/db");

const adminRouter = require("./routes/adminRoutes");


app.use(bodyParser.json({ type: "application/*+json" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw({ type: "application/vnd.custom-type" }));
app.use(bodyParser.text({ type: "text/html" }));
app.use(express.json());
app.use(cors());


// app.use(express.static("uploads"));


app.use(adminRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
 