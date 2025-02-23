import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Grid, Card, CardContent, Typography, Button, Container } from "@mui/material";
import { styled } from "@mui/system";

const API_BASE_URL = "http://localhost:5000";

const StyledCard = styled(Card)({
  transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  cursor: "pointer",
  '&:hover': {
    transform: "scale(1.05)",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
  },
});

const EventList = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_BASE_URL}/events`).then((response) => setEvents(response.data));
  }, []);

  return (
    <Container>
      <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: "20px" }}>Events</Typography>
      {events.length === 0 ? (
        <Typography variant="h6" color="text.secondary" align="center">No events available</Typography>
      ) : (
        <Grid container spacing={3}>
          {events.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event._id}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>{event.title}</Typography>
                  <Typography variant="body2" color="text.secondary">Date: {event.date}</Typography>
                  <Typography variant="body2" color="text.secondary">Location: {event.location}</Typography>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    sx={{ marginTop: 2 }}
                    onClick={() => navigate(`/register/${event._id}`)} // Redirect to existing registration page
                  >
                    Register
                  </Button>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default EventList;
