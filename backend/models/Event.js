const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: String,
  date: String,
  location: String,
  dynamicFields: [
    {
      label: String,
      type: { type: String, enum: ["text", "number", "date", "enum"], default: "text" },
      options: [String] // Only used when type is "enum"
    }
  ],
});

module.exports = mongoose.model("Event", EventSchema);
