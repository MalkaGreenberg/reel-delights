import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MyEventForm = () => {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div>
            <h2>Event Details</h2>
            <form>
                <div>
                    <label>Select Date:</label>
                    <DatePicker selected={selectedDate} onChange={handleDateChange} />
                </div>
            </form>
        </div>
    );
};

export default MyEventForm;
