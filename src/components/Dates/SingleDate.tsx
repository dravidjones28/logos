import { useState } from "react";
import { isWeekend } from "date-fns";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { DateValues } from "./MultipleDate";

interface Value {
  onValue: (dates: Date) => void;
  onTableValue: (value: DateValues) => void;
}

export default function SingleDate({ onValue, onTableValue }: Value) {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>();

  const isDateSelectable = (date: Date): boolean => {
    const today = new Date();
    // const today = new Date(2024, 2, 15, 17, 0, 0);
    const isPastDate = date < today;

    // If it's past 5 PM, skip tomorrow's date
    if (today.getHours() >= 16 && date.getDate() === today.getDate() + 1) {
      return false;
    }

    const disabledDates = [
      new Date(2024, 2, 28), // March 28, 2023
      new Date(2024, 2, 29), // March 29, 2024
      new Date(2024, 2, 30),
    ];

    if (
      disabledDates.some(
        (disabledDate) => date.getTime() === disabledDate.getTime()
      )
    ) {
      return false;
    }

    return !isPastDate;
  };

  const footer = selectedDay ? (
    <p>You selected {format(selectedDay, "PPP")}.</p>
  ) : (
    <p>Please pick a day.</p>
  );

  const calculateCost = (selectedDate: Date | undefined): DateValues => {
    if (!selectedDate) {
      return {
        weekdays: 0,
        weekends: 0,
        totalDays: 0,
        weekdayCost: 0,
        weekendCost: 0,
        totalCost: 0,
      };
    }

    let weekdays = 0;
    let weekends = 0;
    let weekdayCost = 0;
    let weekendCost = 0;

    if (selectedDate) {
      if (isWeekend(selectedDate)) {
        weekendCost += 200; // Weekend cost
        weekends++;
      } else {
        weekdayCost += 150; // Weekday cost
        weekdays++;
      }
    }

    const totalDays = weekdays + weekends;
    const totalCost = weekdayCost + weekendCost;

    return {
      weekdays,
      weekends,
      totalDays,
      weekdayCost,
      weekendCost,
      totalCost,
    };
  };

  const isDayDisabled = (date: Date): boolean => !isDateSelectable(date);

  const handleSelect = (e: any) => {
    onValue(e);
    setSelectedDay(e);
    const calculatedCost = calculateCost(e);
    onTableValue(calculatedCost);
  };

  return (
    <DayPicker
      mode="single"
      required
      selected={selectedDay}
      onSelect={handleSelect}
      footer={footer}
      disabled={isDayDisabled}
    />
  );
}
