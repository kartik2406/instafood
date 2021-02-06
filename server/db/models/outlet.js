const mongoose = require("mongoose");

const outletSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point", "Polygon"],
      required: true,
    },
    coordinates: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
});
// outletSchema.index({ location: "2dsphere" });
module.exports = mongoose.model("Outlet", outletSchema);
