const mongoose = require("mongoose");
const DB_Url = require("../config.json").DB;
mongoose
  .connect(DB_Url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to DB ");
  })
  .catch((error) => {
    console.log(error);
  });
