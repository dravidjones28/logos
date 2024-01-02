// import LGBox from "../components/common/LGBox";
// import {
//   Box,
//   Button,
//   Card,
//   FormControl,
//   HStack,
//   Icon,
//   Input,
//   InputGroup,
//   InputLeftElement,
//   Spinner,
//   Text,
// } from "@chakra-ui/react";
// import { IconButton } from "@chakra-ui/react";
// import { MinusIcon, AddIcon } from "@chakra-ui/icons";
// import { ChangeEvent, useEffect, useState } from "react";
// import { BsFillPersonPlusFill } from "react-icons/bs";
// import db from "../components/common/db";
// import {
//   //  useNavigate,
//    useParams } from "react-router-dom";
// import useRetreatEvent from "../hooks/retreatEvents/useRetreatEvent";
// import useAddPayment from "../hooks/payment/useAddPayment";
// import Footer from "../components/footer/Footer";
// // import uuid from "react-uuid";
// import { v4 as uuidv4 } from "uuid";
// import { FaPhone } from "react-icons/fa";

import { useNavigate, useParams } from "react-router-dom";
import useRetreatEvent from "../hooks/retreatEvents/useRetreatEvent";

// const Bookings = () => {
//   const [count, setCount] = useState<number>(1);
//   const [errors, setErrors] = useState<string[]>([]);
//   const { slug } = useParams();
//   const [slots, setSlots] = useState<number>();
//   const [phoneNumber, setPhoneNumber] = useState<string>();
//   const [phoneError, setPhoneError] = useState("");

//   useEffect(() => {
//     setSlots(Number(events?.slots) - count);
//   }, [count, []]);

//   const { data: events, isLoading, error } = useRetreatEvent(slug!);

//   const [inputValues, setInputValues] = useState<string[]>(
//     Array(count).fill("")
//   );

//   const handleIncrement = () => {
//     if (slots === 0) return;
//     else {
//       setCount(count + 1);
//       setInputValues((prevInputValues) => [...prevInputValues, ""]);
//     }
//   };

//   const handleDecrement = () => {
//     if (count > 1) {
//       setCount(count - 1);
//       setInputValues((prevInputValues) => prevInputValues.slice(1, count));
//       let temp = errors;
//       temp.pop();
//       setErrors(temp);
//     }
//   };

//   const handleInputChange = (indexNumber: number, value: string) => {
//     // if (value.trim() !== "") {
//     //   // If the input is not empty, clear the error for that input
//     //   let temp = [...errors];
//     //   temp[indexNumber] = "";
//     //   setErrors(temp);
//     // }
//     if (/^[A-Za-z\s]+$/.test(value)) {
//       // If the input contains only characters and spaces, clear the error for that input
//       let temp = [...errors];
//       temp[indexNumber] = "";
//       setErrors(temp);
//     } else {
//       // If the input contains other characters, set an error for that input
//       let temp = [...errors];
//       temp[indexNumber] = "Only characters and spaces are allowed";
//       setErrors(temp);
//     }

//     const newInputValues = [...inputValues];
//     newInputValues[indexNumber] = value;

//     setInputValues(newInputValues);
//   };

//   const addPayment = useAddPayment();
//   const session = db();

//   const validateInputs = () => {
//     const newInputValues = inputValues.map((input) => {
//       return input.trim() === "" ? "" : input;
//     });

//     setInputValues(newInputValues);

//     const isValid = newInputValues.every((input) => {
//       return input.trim() !== "";
//     });

//     if (!isValid) {
//       // If there are empty inputs, set the corresponding error messages
//       const errorMessages = newInputValues.map((input, index) => {
//         return input.trim() === "" ? `Person ${index + 1} is empty` : "";
//       });
//       setErrors(errorMessages);
//       return;
//     }
//     if (!phoneNumber) {
//       setPhoneError("This field is required");
//       return;
//     } else if (phoneNumber && phoneNumber.length !== 10) {
//       setPhoneError("Phone Number should have 10 digits");
//       return;
//     } else {
//       let temp: any = {};
//       inputValues.map((item, index) => {
//         const name = `Person${index + 1}`;
//         temp[name] = item;
//       });

//       const totalNumberOfPerson = Object.entries(temp)
//         .map(
//           ([key, value]) => `${key}_${(value as string).replace(/\s+$/, "")}`
//         )
//         .join(",");

//       const totalAmount = Number(events?.cost) * count;

//       addPayment.mutate({
//         txnid: `${uuidv4()}`,
//         amount: `${totalAmount}.0`,
//         productinfo: "Retreat Booking",
//         name: `${session?.name}`,
//         phone: `${phoneNumber}`,
//         email: `${session?.email.replace(/\s+$/, "")}`,
//         udf1: totalNumberOfPerson,
//         udf2: `${events?._id}&${session?._id}`,
//         udf3: `${slots}&${events?.cost}`,
//         udf4: events?.title,
//         udf5: events?.ledBy,
//         udf6: `${events?.start}&${events?.end}`,
//         udf7: `${events?.noOfDays}`,
//         udf8: "",
//         udf9: "",
//         udf10: "",
//         unique_id: "",
//         split_payments: "",
//         sub_merchant_id: "",
//         customer_authentication_id: "",
//         surl: "http://localhost:3000/api/response",
//         furl: "http://localhost:3000/api/response",
//       });
//     }
//   };

//   const validatePhoneNumber = (value: string) => {
//     const isValid = /^\d{10}$/.test(value);
//     return isValid;
//   };

//   const handlePhone = (event: ChangeEvent<HTMLInputElement>) => {
//     const { value } = event.target;
//     setPhoneNumber(value);

//     if (validatePhoneNumber(value)) {
//       setPhoneError("");
//       setPhoneNumber(value);
//     } else {
//       setPhoneError("Invalid phone number. Please enter 10 digits.");
//     }
//   };

//   // const navigate = useNavigate();
//   // if (events?.slots === "0") navigate("/");

//   if (isLoading)
//     return (
//       <LGBox>
//         <Box
//           display="flex"
//           height="70vh"
//           justifyContent="center"
//           alignItems="center"
//         >
//           <Spinner />
//         </Box>
//       </LGBox>
//     );
//   if (error || !events) throw error;

//   return (
//     <LGBox>
//       <Box my={5} mx={{ base: "20px", lg: "145px" }}>
//         <Text
//           color="rgb(52, 71, 103)"
//           fontWeight={700}
//           fontSize={{ base: "20px", lg: "30px" }}
//           letterSpacing={1.1}
//         >
//           Your Booking
//         </Text>

//         <Card p={5} mt={5}>
//           <Text
//             fontSize={{ base: "20px", lg: "25px" }}
//             fontWeight={500}
//             textAlign="center"
//           >
//             {events.title}
//           </Text>
//           <Box>
//             <HStack>
//               <Text
//                 mt={{ base: "10px" }}
//                 fontWeight={500}
//                 fontSize={{ base: "14px", lg: "17px" }}
//               >
//                 Number of People{" "}
//               </Text>

//               <IconButton
//                 mt="10px"
//                 icon={<MinusIcon />}
//                 onClick={handleDecrement}
//                 aria-label="Add people"
//                 boxSize={{ base: "25px", lg: "30px" }}
//               />
//               <Text mt="10px" fontSize={{ base: "14px", lg: "17px" }}>
//                 {count}
//               </Text>
//               <IconButton
//                 aria-label="remove people"
//                 icon={<AddIcon />}
//                 mt="10px"
//                 onClick={handleIncrement}
//                 boxSize={{ base: "25px", lg: "30px" }}
//               />
//             </HStack>
//             <Text
//               fontSize={{ base: "14px", lg: "17px" }}
//               my={2}
//               fontWeight={500}
//             >
//               slots : {slots ? slots : Number(events.slots) - count}
//             </Text>
//             <Text
//               fontSize={{ base: "14px", lg: "17px" }}
//               my={5}
//               fontWeight={500}
//             >
//               Booking Person : {session?.name}{" "}
//             </Text>
//             <form>
//               <InputGroup>
//                 <InputLeftElement marginTop="5px">
//                   <Icon as={FaPhone} color="#5664d2" />
//                 </InputLeftElement>
//                 <Input
//                   type="text"
//                   size="lg"
//                   fontSize={{ base: "14px", lg: "17px" }}
//                   _placeholder={{
//                     opacity: 1,
//                     color: "gray.500",
//                     fontSize: "14px",
//                   }}
//                   onChange={handlePhone}
//                   placeholder={`+91 Please Enter your phone number`}
//                 />
//               </InputGroup>
//               <p style={{ color: "red" }}>{phoneError}</p>
//               {Array.from({ length: count }, (_, index) => (
//                 <FormControl my={3} key={index}>
//                   <InputGroup>
//                     <InputLeftElement marginTop="5px">
//                       <Icon as={BsFillPersonPlusFill} color="#5664d2" />
//                     </InputLeftElement>
//                     <Input
//                       type="text"
//                       size="lg"
//                       fontSize={{ base: "14px", lg: "17px" }}
//                       _placeholder={{
//                         opacity: 1,
//                         color: "gray.500",
//                         fontSize: "14px",
//                       }}
//                       value={inputValues[index]}
//                       onChange={(e) => handleInputChange(index, e.target.value)}
//                       placeholder={`Enter Person ${index + 1} Name`}
//                     />
//                   </InputGroup>
//                   <p style={{ color: "red" }}>{errors[index]}</p>
//                 </FormControl>
//               ))}
//             </form>
//             <Text
//               fontSize={{ base: "14px", lg: "17px" }}
//               my={5}
//               fontWeight={500}
//             >
//               {/* Total: {Number(events.cost) * count} */}
//             </Text>
//             <Button
//               fontSize={{ base: "10px", lg: "15px" }}
//               fontWeight={500}
//               height="20px"
//               borderRadius="7px"
//               ml={{ base: "10px", lg: "10px" }}
//               bg="#348ded"
//               mt={{ base: 0, lg: 0 }}
//               padding={{ base: "15px", lg: "20px" }}
//               color="#fff"
//               cursor="pointer"
//               _hover={{ bg: "#70b7ff" }}
//               onClick={validateInputs}
//               isDisabled={addPayment.isPending ? true : false}
//             >
//               {addPayment.isPending ? <Spinner /> : "Book Retreat"}
//             </Button>
//           </Box>
//         </Card>
//       </Box>
//       <Box mt={20}>
//         <Footer />
//       </Box>
//     </LGBox>
//   );
// };

// export default Bookings;

// import React from "react";

const Bookings = () => {
  const { slug } = useParams();
  const { data: events, isLoading, error } = useRetreatEvent(slug!);
  const navigate = useNavigate();

  if (events?.slots === 0) navigate("/");

  return <div>Bookings</div>;
};

export default Bookings;
