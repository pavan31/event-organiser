import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const API_BASE_URL = "http://localhost:5000";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    location: "",
    dynamicFields: [],
  });

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleAddField = () => {
    setEventData({
      ...eventData,
      dynamicFields: [...eventData.dynamicFields, { label: "", type: "text", options: [] }],
    });
  };

  const handleRemoveField = (index) => {
    const updatedFields = eventData.dynamicFields.filter((_, i) => i !== index);
    setEventData({ ...eventData, dynamicFields: updatedFields });
  };

  const handleFieldChange = (index, e) => {
    const updatedFields = [...eventData.dynamicFields];
    updatedFields[index][e.target.name] = e.target.value;

    // Ensure 'options' is an array when switching to enum type
    if (e.target.name === "type" && e.target.value === "enum") {
      updatedFields[index].options = [];
    }

    setEventData({ ...eventData, dynamicFields: updatedFields });
  };

  const handleAddEnumOption = (index) => {
    const updatedFields = [...eventData.dynamicFields];
    updatedFields[index].options.push("");
    setEventData({ ...eventData, dynamicFields: updatedFields });
  };

  const handleEnumOptionChange = (index, optionIndex, e) => {
    const updatedFields = [...eventData.dynamicFields];
    updatedFields[index].options[optionIndex] = e.target.value;
    setEventData({ ...eventData, dynamicFields: updatedFields });
  };

  const handleRemoveEnumOption = (index, optionIndex) => {
    const updatedFields = [...eventData.dynamicFields];
    updatedFields[index].options.splice(optionIndex, 1);
    setEventData({ ...eventData, dynamicFields: updatedFields });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/events`, eventData);
      console.log("Event Created:", response.data);
      navigate("/"); // Redirect to event list page
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>Create Event</Typography>
      <TextField label="Title" name="title" fullWidth margin="normal" onChange={handleChange} />
      <TextField label="Date" name="date" type="date" fullWidth margin="normal" InputLabelProps={{ shrink: true }} onChange={handleChange} />
      <TextField label="Location" name="location" fullWidth margin="normal" onChange={handleChange} />

      <Typography variant="h6" style={{ marginTop: "20px" }}>Dynamic Fields</Typography>
      {eventData.dynamicFields.map((field, index) => (
        <div key={index} style={{ display: "flex", flexDirection: "column", marginBottom: "15px" }}>
          <TextField label="Field Label" name="label" fullWidth margin="dense" value={field.label} onChange={(e) => handleFieldChange(index, e)} />

          <FormControl fullWidth margin="dense">
            <InputLabel>Type</InputLabel>
            <Select name="type" value={field.type} onChange={(e) => handleFieldChange(index, e)}>
              <MenuItem value="text">Text</MenuItem>
              <MenuItem value="number">Number</MenuItem>
              <MenuItem value="date">Date</MenuItem>
              <MenuItem value="enum">Dropdown (Enum)</MenuItem>
            </Select>
          </FormControl>

          {field.type === "enum" && (
            <>
              <Typography variant="subtitle1" style={{ marginTop: "10px" }}>Options</Typography>
              {field.options.map((option, optionIndex) => (
                <div key={optionIndex} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "5px" }}>
                  <TextField
                    label={`Option ${optionIndex + 1}`}
                    value={option}
                    onChange={(e) => handleEnumOptionChange(index, optionIndex, e)}
                  />
                  <IconButton onClick={() => handleRemoveEnumOption(index, optionIndex)}>
                    <RemoveCircleOutlineIcon color="error" />
                  </IconButton>
                </div>
              ))}
              <Button startIcon={<AddCircleOutlineIcon />} onClick={() => handleAddEnumOption(index)}>Add Option</Button>
            </>
          )}

          <IconButton onClick={() => handleRemoveField(index)} style={{ alignSelf: "flex-start" }}>
            <RemoveCircleOutlineIcon color="error" />
          </IconButton>
        </div>
      ))}

      <Button startIcon={<AddCircleOutlineIcon />} onClick={handleAddField} style={{ marginTop: "10px" }}>Add Field</Button>

      <Button variant="contained" color="primary" fullWidth onClick={handleSubmit} style={{ marginTop: "20px" }}>
        Create Event
      </Button>
    </Container>
  );
};

export default CreateEvent;
