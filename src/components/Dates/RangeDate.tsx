import { useState } from "react";

import { addDays, format, isWeekend } from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
import { DateValues } from "./MultipleDate";

interface Value {
  onValue: (value: DateRange) => void;
  onTableValue: (value: DateValues) => void;
}

export default function RangeDate({ onValue, onTableValue }: Value) {
  const [range, setRange] = useState<DateRange | undefined>();

  const isDateSelectable = (date: Date): boolean => {
    const today = new Date();
    return date >= today;
  };

  const formatDate = (date: Date): string => {
    return format(date, "MMMM d yyyy");
  };

  const calculateDateValues = (
    dateRange: DateRange | undefined
  ): DateValues => {
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
        weekdayCost += 150; // Weekday cost
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

  const handleRangeSelect = (e: any) => {
    setRange(e);
    onValue(e);
    const calculatedCost = calculateDateValues(e);
    onTableValue(calculatedCost);
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
