import { useState } from "react";
import { addDays, format, isWeekend } from "date-fns";
import {
  DateRange,
  DayPicker,
  SelectRangeEventHandler,
} from "react-day-picker";
import { DateValues } from "./MultipleDate";

interface Value {
  onValue: (value: DateRange | undefined) => void;
  onTableValue: (value: DateValues) => void;
}

type DateRangeOrUndefined = DateRange | undefined;

function ThirtyDaysDate({ onValue, onTableValue }: Value) {
  const [range, setRange] = useState<DateRangeOrUndefined>();

  const isDateSelectable = (date: Date): boolean => {
    const today = new Date();
    return date >= today;
  };

  const formatDate = (date: Date): string => {
    return format(date, "MMMM d yyyy");
  };

  const calculateDateValues = (dateRange: DateRangeOrUndefined): DateValues => {
    if (!dateRange || !dateRange.from || !dateRange.to) {
      return {
        weekdays: 0,
        weekends: 0,
        totalDays: 0,
        weekdayCost: 0,
        weekendCost: 0,
        totalCost: 0,
      };
    }

    let currentDay = new Date(dateRange.from);
    let weekdays = 0;
    let weekends = 0;
    let weekdayCost = 0;
    let weekendCost = 0;

    while (currentDay <= dateRange.to) {
      if (isWeekend(currentDay)) {
        weekendCost += 200; // Weekend cost
        weekends++;
      } else {
        weekdayCost += 200; // Weekday cost
        weekdays++;
      }
      currentDay = addDays(currentDay, 1);
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

  let footer =
    range && range.from && range.to ? (
      <p>
        {formatDate(range.from)} to {formatDate(range.to)}
      </p>
    ) : (
      <p>Please pick the first day.</p>
    );

  const isDayDisabled = (date: Date): boolean => !isDateSelectable(date);

  const handleRangeSelect: SelectRangeEventHandler = (selectedRange) => {
    if (selectedRange && selectedRange.from) {
      const selectedFromDate = selectedRange.from;
      // Calculate the end date by adding 29 days to the selected from date
      const selectedToDate = addDays(selectedFromDate, 29);
      // Set the range for 30 days
      const thirtyDayRange: DateRange = {
        from: selectedFromDate,
        to: selectedToDate,
      };
      setRange(thirtyDayRange);
      onValue(thirtyDayRange);
      const calculatedCost = calculateDateValues(thirtyDayRange);
      onTableValue(calculatedCost);
    } else {
      // If selectedRange is undefined, reset the range state
      setRange(undefined);
      onValue(undefined);
    }
  };

  return (
    <DayPicker
      mode="range"
      selected={range}
      onSelect={handleRangeSelect}
      footer={footer}
      disabled={isDayDisabled}
    />
  );
}

export default ThirtyDaysDate;
