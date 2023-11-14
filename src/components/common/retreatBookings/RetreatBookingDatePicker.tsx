import { Input, Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import enUS from "date-fns/locale/en-US";

registerLocale("en-US", enUS); // Register the English locale

const isSunday = (date: Date) => {
  return date.getDay() === 0;
};

const RetreatBookingDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    if (date && isSunday(date)) {
      setSelectedDate(date);
    }
  };
  return (
    <Box>
      <Text fontSize="15px" fontWeight={500} color="gray.600">
        When do you want to attend?
      </Text>
      <Box mt="5px">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          locale="en-US" // Set the locale to English
          filterDate={isSunday} // Use the isSunday function to filter dates
          placeholderText="Select the Date"
          customInput={
            <Input
              placeholder="Please select the date"
              _placeholder={{
                color: "gray.600",
                fontSize: "13px",
                fontWeight: 500,
              }}
              cursor="pointer"
            />
          }
        />
      </Box>
    </Box>
  );
};

export default RetreatBookingDatePicker;
