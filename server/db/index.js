const mongoose = require("mongoose");
if (process.env.NODE_ENV != "test") {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then((res) => console.log("Connected to Mongo!"));
}
