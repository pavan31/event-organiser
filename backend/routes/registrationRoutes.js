const express = require("express");
const Registration = require("../models/Registration");
const Event = require("../models/Event");

const router = express.Router();

// Register User for an Event
router.post("/:eventId", async (req, res) => {
  try {
    const { name, email, phone, dynamicFields } = req.body;
    const { eventId } = req.params;

    console.log("Received Registration Data:", req.body);

    const event = await Event.findById(eventId);
    if (!event) {
      console.error("Event not found:", eventId);
      return res.status(404).json({ message: "Event not found" });
    }

    const newRegistration = new Registration({
      eventId,
      name,
      email,
      phone,
      dynamicFields,
    });

    await newRegistration.save();
    res.status(201).json({ message: "Registration successful!" });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


// Get Registrations for an Event
router.get("/:eventId", async (req, res) => {
  try {
    const registrations = await Registration.find({ eventId: req.params.eventId });
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching registrations", error });
  }
});


// GET all registrations
router.get("/", async (req, res) => {
  try {
    const registrations = await Registration.find().populate("eventId"); // Fetch event details
    const formattedRegistrations = registrations.map((reg) => ({
      _id: reg._id,
      name: reg.name,
      email: reg.email,
      phone: reg.phone,
      eventTitle: reg.eventId ? reg.eventId.title : "Unknown Event",
      dynamicFields: reg.dynamicFields,
    }));
    res.json(formattedRegistrations);
  } catch (error) {
    console.error("Error fetching registrations:", error);
    res.status(500).json({ error: "Server error while fetching registrations" });
  }
});


module.exports = router;
