const mongoose = require("mongoose");

const RegistrationSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  dynamicFields: { type: Object, required: true },
});

module.exports = mongoose.model("Registration", RegistrationSchema);
