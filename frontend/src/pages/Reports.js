import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const API_BASE_URL = "http://localhost:5000";

const Reports = () => {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/register`)
      .then((response) => setRegistrations(response.data))
      .catch((error) => console.error("Error fetching registrations:", error));
  }, []);

  return (
    <Container>
      <Typography variant="h4" sx={{ fontWeight: "bold", marginTop: 2 }}>
        Registrations Report
      </Typography>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Event Title</TableCell>
              <TableCell>Dynamic Fields</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {registrations.length > 0 ? (
              registrations.map((reg) => (
                <TableRow key={reg._id}>
                  <TableCell>{reg.name}</TableCell>
                  <TableCell>{reg.email}</TableCell>
                  <TableCell>{reg.phone}</TableCell>
                  <TableCell>{reg.eventTitle}</TableCell>
                  <TableCell>
                    {Object.entries(reg.dynamicFields).map(([key, value]) => (
                      <Typography key={key}>
                        <strong>{key}:</strong> {value}
                      </Typography>
                    ))}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No registrations found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Reports;
