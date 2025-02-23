import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { TextField, Button, MenuItem, Container, Typography, Box } from "@mui/material";

const API_BASE_URL = "http://localhost:5000";

const RegistrationPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dynamicFields: {},
  });

  // Fetch event details
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/events/${eventId}`)
      .then((response) => {
        setEvent(response.data);
      })
      .catch((error) => console.error("Error fetching event:", error));
  }, [eventId]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDynamicChange = (fieldLabel, value) => {
    setFormData((prev) => ({
      ...prev,
      dynamicFields: {
        ...prev.dynamicFields,
        [fieldLabel]: value,
      },
    }));
  };

  // Submit registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/register/${eventId}`, formData);
      alert("Registered successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error submitting registration:", error);
      alert("Error submitting registration");
    }
  };

  if (!event) return <Typography>Loading event details...</Typography>;

  return (
    <Container>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Register for {event.title}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Name" name="name" fullWidth margin="normal" required onChange={handleChange} />
        <TextField label="Email" name="email" type="email" fullWidth margin="normal" required onChange={handleChange} />
        <TextField label="Phone" name="phone" type="tel" fullWidth margin="normal" required onChange={handleChange} />

        {event.dynamicFields.map((field, index) => (
          <Box key={index} marginBottom={2}>
            {field.type === "enum" ? (
              <TextField
                select
                label={field.label}
                fullWidth
                required
                onChange={(e) => handleDynamicChange(field.label, e.target.value)}
              >
                {field.options.map((option, i) => (
                  <MenuItem key={i} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            ) : (
              <TextField
                label={field.label}
                type={field.type}
                fullWidth
                required
                onChange={(e) => handleDynamicChange(field.label, e.target.value)}
              />
            )}
          </Box>
        ))}

        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
      </form>
    </Container>
  );
};

export default RegistrationPage;
