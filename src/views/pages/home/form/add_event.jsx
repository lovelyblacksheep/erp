"use client";

import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Box,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

function EventForm() {
  const [eventType, setEventType] = useState('');
  const [label, setLabel] = useState('');
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const [isAllDay, setIsAllDay] = useState(false);
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');
  const [reminder, setReminder] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      eventType,
      label,
      startDate,
      endDate,
      isAllDay,
      location,
      status,
      description,
      reminder,
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" gutterBottom>
            Create an Event
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select value={eventType} onChange={(e) => setEventType(e.target.value)} label="Type">
                <MenuItem value="meeting">Meeting</MenuItem>
                <MenuItem value="call">Call</MenuItem>
                <MenuItem value="reminder">Reminder</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
          </Box>
          <FormControlLabel
            control={
              <Checkbox
                checked={isAllDay}
                onChange={(e) => setIsAllDay(e.target.checked)}
              />
            }
            label="Event on all day(s)"
          />
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <DateTimePicker
              label="Start Date"
              value={startDate}
              onChange={setStartDate}
              renderInput={(params) => <TextField fullWidth {...params} />}
            />
            <DateTimePicker
              label="End Date"
              value={endDate}
              onChange={setEndDate}
              renderInput={(params) => <TextField fullWidth {...params} />}
            />
          </Box>
          <TextField
            fullWidth
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Tags / Categories</InputLabel>
            <TextField
                fullWidth
                sx={{ mb: 2 }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Status / Percentage</InputLabel>
            <Select value={status} onChange={(e) => setStatus(e.target.value)} label="Status / Percentage">
              <MenuItem value="not_applicable">Not applicable</MenuItem>
              <MenuItem value="in_progress">In Progress</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
            sx={{ mb: 2 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={reminder}
                onChange={(e) => setReminder(e.target.checked)}
              />
            }
            label="Create an automatic reminder notification for this event"
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="contained" color="primary" type="submit">
              Add
            </Button>
            <Button variant="outlined" color="secondary">
              Cancel
            </Button>
          </Box>
        </form>
      </Container>
    </LocalizationProvider>
  );
}

export default EventForm;
