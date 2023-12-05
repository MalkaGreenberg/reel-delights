import React from 'react';

const CalendarButton = () => {
  const generateICal = async () => {
    try {
      // Fetch event details from your server
      const response = await fetch('/api/calendar/generate');
      const icalData = await response.text();

      // Create a Blob from the response data
      const blob = new Blob([icalData], { type: 'text/calendar' });

      // Create a download link and trigger the download
      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.download = 'event.ics';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      // Open the event in an external calendar
      const calendarLink = document.createElement('a');
      calendarLink.href = 'webcal://' + window.location.host + '/api/calendar/generate';
      document.body.appendChild(calendarLink);
      calendarLink.click();
      document.body.removeChild(calendarLink);
    } catch (error) {
      console.error('Error generating iCalendar file:', error);
    }
  };

  return (
    <div>
      <button onClick={generateICal}>Download iCalendar</button>
      <button onClick={openInExternalCalendar}>Open in External Calendar</button>
    </div>
  );
};

const openInExternalCalendar = () => {
  // Open the event in an external calendar
  window.open('webcal://' + window.location.host + '/api/calendar/generate');
};

export default CalendarButton;