import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography, Container } from "@mui/material";
import EventList from "./pages/EventList";
import CreateEvent from "./pages/CreateEvent";
import RegisterEvent from "./pages/RegisterEvent";
import Reports from "./pages/Reports";

const App = () => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Event Management</Typography>
          <Button color="inherit" component={Link} to="/">Events</Button>
          <Button color="inherit" component={Link} to="/create">Create Event</Button>
          <Button color="inherit" component={Link} to="/report">Report</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: 4 }}>
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/create" element={<CreateEvent />} />
          <Route path="/register/:eventId" element={<RegisterEvent />} />
          <Route path="/report" element={<Reports />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
