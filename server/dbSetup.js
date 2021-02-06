require("dotenv").config();
const mongoose = require("mongoose");
const OutletModel = require("./db/models/outlet");

var tj = require("togeojson"),
  fs = require("fs"),
  // node doesn't have xml parsing or a dom. use xmldom
  DOMParser = require("xmldom").DOMParser;

async function setupData() {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  console.log("Connected to Mongo!");
  var kml = new DOMParser().parseFromString(
    fs.readFileSync("./assets/locations.kml", "utf8")
  );
  var converted = tj.kml(kml);

  let outlets = converted.features.map((feature) => {
    return {
      name: feature.properties.name,
      location: {
        type: feature.geometry.type,
        coordinates: feature.geometry.coordinates,
      },
    };
  });
  await OutletModel.insertMany(outlets);
  console.log("Outlests", JSON.stringify(outlets));
  mongoose.disconnect();
}

setupData();
