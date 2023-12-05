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
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'event.ics';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error generating iCalendar file:', error);
    }
  };

  return (
    <button onClick={generateICal}>Download iCalendar</button>
  );
};

export default CalendarButton;