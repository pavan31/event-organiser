const express = require("express");
const Event = require("../models/Event");

const router = express.Router();

// Create Event with Dynamic Fields
router.post("/", async (req, res) => {
  try {
    const { title, date, location, dynamicFields } = req.body;

    // Validate that enums have options
    for (const field of dynamicFields) {
      if (field.type === "enum" && (!field.options || field.options.length === 0)) {
        return res.status(400).json({ message: `Enum field "${field.label}" must have options` });
      }
    }

    const event = new Event({ title, date, location, dynamicFields });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: "Error creating event", error });
  }
});

// Fetch Events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error });
  }
});

router.get("/:eventId", async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
