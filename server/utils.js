const axios = require("axios").default;
const OutletModel = require("./db/models/outlet");

const GEO_API_URL = "http://api.positionstack.com/v1/forward";

const getLocationCords = async (address) => {
  try {
    let { data } = await axios.get(
      `${GEO_API_URL}?access_key=${
        process.env.GEO_API_KEY
      }&query=${encodeURIComponent(address)}`
    );
    console.log("Geo API res", data);
    data = data.data;
    if (data && data[0]) return [data[0].longitude, data[0].latitude];
    else return [null, null];
  } catch (err) {
    throw Error(err.message);
  }
};

const getNearestOutlet = async (coordinates) => {
  try {
    let outlet = await OutletModel.findOne(
      {
        location: {
          $geoIntersects: {
            $geometry: {
              type: "Point",
              coordinates,
            },
          },
        },
      },
      {
        name: 1,
        _id: 0,
      }
    );
    return outlet;
  } catch (err) {
    throw Error(err.message);
  }
};

module.exports = {
  getLocationCords,
  getNearestOutlet,
};
