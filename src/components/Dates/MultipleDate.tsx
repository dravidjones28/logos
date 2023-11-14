import React, { useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { isWeekend } from "date-fns";
import "react-day-picker/dist/style.css";

export interface DateValues {
  totalCost: number;
  totalDays: number;
  weekdayCost: number;
  weekdays: number;
  weekendCost: number;
  weekends: number;
}
interface Value {
  onValue: (value: Date[]) => void;
  onTableValue: (value: DateValues) => void;
}

export default function MultipleDate({ onValue, onTableValue }: Value) {
  const initialDays: Date[] = [];
  const [days, setDays] = React.useState<Date[] | undefined>(initialDays);

  const isDateSelectable = (date: Date): boolean => {
    const today = new Date();
    return date >= today;
  };

  const calculateCost = (selectedDays: Date[] | undefined): DateValues => {
    if (!selectedDays) {
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

    selectedDays.forEach((date) => {
      if (isWeekend(date)) {
        weekendCost += 150; // Weekend cost
        weekends++;
      } else {
        weekdayCost += 100; // Weekday cost
        weekdays++;
      }
    });

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

  useEffect(() => {
    const calculatedCost = calculateCost(days);
    console.log(calculateCost(days));
    onTableValue(calculatedCost);
  }, [days]);

  const handleSelect = (selectedDays: Date[] | undefined): void => {
    if (selectedDays) {
      const filteredDays = selectedDays.filter(isDateSelectable);
      setDays(filteredDays);
      onValue(filteredDays);
    }
  };

  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const isDayDisabled = (date: Date): boolean => !isDateSelectable(date);

  const footer =
    days && days.length > 0 ? (
      <p>You selected {days.map(formatDate).join(", ")}.</p>
    ) : (
      <p>Please pick one or more days.</p>
    );
  return (
    <DayPicker
      mode="multiple"
      min={1}
      selected={days}
      onSelect={handleSelect}
      footer={footer}
      disabled={isDayDisabled}
    />
  );
}
