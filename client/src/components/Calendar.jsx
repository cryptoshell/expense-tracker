import React from 'react';
import ReactCalendar from 'react-datetime-picker';
import 'react-calendar/dist/Calendar.css';

const Calendar = props => {
  const { date, changeDate } = props;

  return (
    <ReactCalendar 
      onChange={changeDate}
      value={date}
    />
  );
};

export default Calendar;
