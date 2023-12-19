// import { useState } from "react";
// import ThirtyDaysDate from "../components/Dates/ThirtyDaysDate";
// import { addDays } from "date-fns";
// import { DateRange } from "react-day-picker";

// export interface DateValues {
//   weekdays: number;
//   weekends: number;
//   totalDays: number;
//   weekdayCost: number;
//   weekendCost: number;
//   totalCost: number;
// }
// type DateRangeOrUndefined = DateRange | undefined;

// const Playground = () => {
//   const [tableValues, setTableValues] = useState<DateValues>();
//   const [dateValue, setDateValue] = useState<any>();

//   return (
//     <ThirtyDaysDate
//       onTableValue={(value: DateValues) => {
//         setTableValues(value);
//       }}
//       onValue={(value: DateRangeOrUndefined) => {
//         // console.log(value);
//         if (value && value.to && value.from) {
//           let newDates = [];
//           for (
//             let date = value.from;
//             date <= value.to;
//             date = addDays(date, 1)
//           ) {
//             newDates.push(new Date(date));
//           }

//           setDateValue(newDates);
//         }
//       }}
//     />
//   );
// };

// export default Playground;
