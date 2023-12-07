import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the root element for accessibility

const MyEventForm = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setModalIsOpen(false); // Close the modal after selecting a date
  };

  const openDatePicker = (e) => {
    e.preventDefault(); // Prevent the default form submission
    setModalIsOpen(true);
  };

  return (
    <div>
      <h2>Event Details</h2>
      <form>
        <div>
          <label>Select Date:</label>
          <button onClick={openDatePicker}>Open Date Picker</button>
        </div>
      </form>

      {/* Modal for Date Picker */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Date Picker Modal"
      >
        <div>
          <h2>Select Date</h2>
          <DatePicker selected={selectedDate} onChange={handleDateChange} />
        </div>
      </Modal>
    </div>
  );
};

export default MyEventForm;