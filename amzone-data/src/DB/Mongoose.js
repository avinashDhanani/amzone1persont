const mongoose = require("mongoose");
// const mongo =
//   "mongodb+srv://avinash2808:avinash2808@cluster0.viskioy.mongodb.net/driveDB?retryWrites=true&w=majority";
const mongo = `mongodb://127.0.0.1:27017/amzone`;
mongoose
  .connect(mongo, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false
  })
  .then((res) => {
    console.log("database conncted");
  })
  .catch((err) => {
    console.log(err);
    console.log("error in database connections");
  });
