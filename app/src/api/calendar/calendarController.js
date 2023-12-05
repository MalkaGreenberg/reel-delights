// Import necessary modules
const express = require('express');
const ICAL = require('ical.js');
const router = express.Router();

// Example route for generating iCalendar data
router.get('/generate', (req, res) => {
  // Assume you have event details available
  const eventDetails = {
    summary: 'Movie Night',
    location: 'Home',
    description: 'A movie night event',
    start: new Date(),
    end: new Date(),
  };

  const jcalData = {
    jcal: ICAL.Component.serialize(eventDetails),
    method: 'REQUEST',
  };

  const jcalString = JSON.stringify(jcalData);
  const icalData = ICAL.Component.fromString(jcalString);

  // Set response headers for iCalendar file
  res.set('Content-Type', 'text/calendar');
  res.set('Content-Disposition', 'attachment; filename=event.ics');

  // Send iCalendar data as response
  res.send(icalData.toString());
});

module.exports = router;