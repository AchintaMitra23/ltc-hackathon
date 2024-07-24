import React from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/red.css";

interface MultiDatePickerProps {
  selectedDates: DateObject[];
  onChange: (dates: DateObject[]) => void;
}

const MultiDatePicker: React.FC<MultiDatePickerProps> = ({
  selectedDates,
  onChange,
}) => {
  const isWeekday = (date: DateObject) => {
    const day = date.weekDay.index;
    return day !== 0 && day !== 6;
  };

  const isFutureDate = (date: DateObject) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set the time to midnight to compare dates only
    return date.toDate() >= today;
  };

  return (
    <DatePicker
      multiple
      value={selectedDates}
      onChange={onChange}
      mapDays={({ date }) => {
        if (!isWeekday(date) || !isFutureDate(date)) {
          return {
            disabled: true,
            style: { color: "#ccc" },
          };
        }
      }}
      format="MMMM D, YYYY"
      placeholder="Select your slot for lunch"
      sort
      calendarPosition="bottom-center"
      className="green"
      inputClass="custom-input"
      />
  );
};

export default MultiDatePicker;
