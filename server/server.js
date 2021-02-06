require("dotenv").config();
require("./db");

const express = require("express");
const app = express();
const { getLocationCords, getNearestOutlet } = require("./utils");
const PORT = 4000 || process.env.PORT;

app.get("/api/outlets", async (req, res) => {
  let address = req.query.address;
  console.log("Received address", address);
  if (!address)
    return res.status(400).send({ message: "Please provide a valid address." });
  try {
    let coordinates = await getLocationCords(address);
    console.log("coordinates", coordinates);

    let nearestOutlest = await getNearestOutlet(coordinates);
    console.log("nearestOutlest", nearestOutlest);
    res.send({ name: nearestOutlest && nearestOutlest.name });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/public"));
  app.get("*", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});
