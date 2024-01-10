// import { useParams } from "react-router-dom";
// import useRetreatEvent from "../hooks/retreatEvents/useRetreatEvent";
// import {
//   Card,
//   Box,
//   Text,
//   HStack,
//   IconButton,
//   Spinner,
//   FormControl,
//   InputGroup,
//   InputLeftElement,
//   Icon,
//   Input,
//   Select,
//   Button,
// } from "@chakra-ui/react";
// import LGBox from "../components/common/LGBox";
// import { MinusIcon, AddIcon } from "@chakra-ui/icons";
// import { useState } from "react";
// import db from "../components/common/db";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { BsFillPersonPlusFill } from "react-icons/bs";
// import { FaPhone } from "react-icons/fa";
// import useAddPayment from "./../hooks/payment/useAddPayment";

// const schema = z.object({
//   formData: z
//     .array(
//       z.object({
//         name: z.string().min(2, "Name should be minimum of 2 characters"),
//         phoneNumber: z
//           .string()
//           .min(7, "Phone Number should be minimum of 7 characters"),
//         file: z.string().min(3, "File should be minimum of 3 characters"),
//         acOrNonAc: z
//           .enum(["ac", "non-ac"])

//           .refine((value) => value !== undefined, {
//             message:
//               "Invalid value for 'acOrNonAc'. Choose between 'ac' or 'non-ac'.",
//           }),
//       })
//     )
//     .refine(
//       (data) => {
//         return data.every((item) => item.name && item.file);
//       },
//       { message: "All fields are required" }
//     ),
// });

// // Define the form data type based on the schema
// type FormData = z.infer<typeof schema>;

// const Bookings = () => {
//   const { slug } = useParams();
//   const session = db();
//   const { data: events, isLoading, error } = useRetreatEvent(slug!);

//   const [count, setCount] = useState(1);

//   const {
//     register,
//     handleSubmit,
//     watch,
//     trigger,
//     formState: { errors },
//     setError,
//     setValue,
//   } = useForm<FormData>({
//     resolver: zodResolver(schema),
//   });

//   const addPayment = useAddPayment();

//   const valuesOfFormData = watch("formData");

//   let total = 0;
//   valuesOfFormData?.slice(0, count).map((item) => {
//     if (item.acOrNonAc === "ac") total += 3000;
//     if (item.acOrNonAc === "non-ac") total += 500;
//   });

//   console.log("total", total);

//   const handleCount = (newCount: number) => {
//     if (events?.slots && newCount > 0 && newCount <= events?.slots) {
//       setCount(newCount);
//     }
//   };

//   const handleFileChange = async (
//     index: number,
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = e.target.files && e.target.files[0];

//     if (file) {
//       if (file.type === "application/pdf") {
//         // Check minimum size (500 KB)
//         if (file.size > 500 * 1024) {
//           setError(`formData[${index}].file`, {
//             type: "manual",
//             message: "File must be at least 500 KB",
//           });
//           return;
//         } else {
//           // Clear the error if the file is valid
//           setError(`formData[${index}].file`, undefined);
//         }
//       } else {
//         setError(`formData[${index}].file`, {
//           type: "manual",
//           message: "Please upload a valid PDF file.",
//         });
//         return;
//       }

//       const base64String = await readFileAsBase64(file);
//       setValue(`formData[${index}].file`, base64String);
//       // Trigger re-validation for the file input
//       trigger(`formData[${index}].file`);

//       // Trigger re-validation for the text input
//       trigger(`formData[${index}].name`);
//     }
//   };

//   const readFileAsBase64 = (file: File): Promise<string> => {
//     return new Promise((resolve) => {
//       const fileReader = new FileReader();
//       fileReader.onloadend = () => {
//         resolve(fileReader.result as string);
//       };
//       fileReader.readAsDataURL(file);
//     });
//   };

//   const onSubmit = (data: FormData) => {
//     let newData = data.formData.slice(0, count);
//     console.log(newData);

//     addPayment.mutate({
//       bookingName: session?.name,
//       email: session?.email,
//       persons: newData,
//       author: session?._id,
//       eventId: events?._id,
//     });
//   };

//   console.log(errors);

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

//   if (events?.slots === 0) navigate("/");

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
//             {events?.title}
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
//                 onClick={() => handleCount(count - 1)}
//                 aria-label="Add people"
//                 isDisabled={count === 1 ? true : false}
//                 boxSize={{ base: "25px", lg: "30px" }}
//               />
//               <Text mt="10px" fontSize={{ base: "14px", lg: "17px" }}>
//                 {count}
//               </Text>
//               <IconButton
//                 aria-label="remove people"
//                 icon={<AddIcon />}
//                 isDisabled={Number(events?.slots) - count === 0 ? true : false}
//                 mt="10px"
//                 onClick={() => handleCount(count + 1)}
//                 boxSize={{ base: "25px", lg: "30px" }}
//               />
//             </HStack>
//             <Text
//               fontSize={{ base: "14px", lg: "17px" }}
//               my={2}
//               fontWeight={500}
//             >
//               slots : {Number(events.slots) - count}
//             </Text>
//             <Text
//               fontSize={{ base: "14px", lg: "17px" }}
//               my={5}
//               fontWeight={500}
//             >
//               Booking Person : {session?.name}{" "}
//             </Text>
//           </Box>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             {[...Array(count)].map((_, index) => (
//               <Card key={index} paddingX="30px" marginBottom="30px">
//                 <FormControl my={3}>
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
//                       {...register(`formData.${index}.name` as const)}
//                       placeholder={`Enter Person ${index + 1} Name`}
//                     />
//                   </InputGroup>
//                   {errors.formData?.[index]?.name && (
//                     <p style={{ color: "red" }}>
//                       {" "}
//                       {errors.formData[index].name.message}
//                     </p>
//                   )}
//                 </FormControl>
//                 <FormControl my={3} key={index}>
//                   <InputGroup>
//                     <InputLeftElement marginTop="5px">
//                       <Icon as={FaPhone} color="#5664d2" />
//                     </InputLeftElement>
//                     <Input
//                       type="number"
//                       size="lg"
//                       fontSize={{ base: "14px", lg: "17px" }}
//                       _placeholder={{
//                         opacity: 1,
//                         color: "gray.500",
//                         fontSize: "14px",
//                       }}
//                       {...register(`formData.${index}.phoneNumber` as const)}
//                       placeholder={`Enter Person ${index + 1} Phone Number`}
//                     />
//                   </InputGroup>
//                   {errors.formData?.[index]?.phoneNumber && (
//                     <p style={{ color: "red" }}>
//                       {errors.formData[index].phoneNumber.message}
//                     </p>
//                   )}
//                 </FormControl>
//                 <Select
//                   my={3}
//                   placeholder="Room Type"
//                   {...register(`formData.${index}.acOrNonAc` as const)}
//                 >
//                   <option value="ac">Ac</option>
//                   <option value="non-ac">Non-Ac</option>
//                 </Select>
//                 {errors.formData?.[index]?.acOrNonAc && (
//                   <p style={{ color: "red" }}>
//                     {errors.formData[index].acOrNonAc.message}
//                   </p>
//                 )}
//                 <div>
//                   <label htmlFor={`file-${index}`}>
//                     Upload Adhaard Card {index + 1}
//                   </label>
//                   <Input
//                     type="file"
//                     accept=".pdf"
//                     onChange={(e) => handleFileChange(index, e)}
//                   />
//                   {errors.formData?.[index]?.file && (
//                     <p style={{ color: "red" }}>
//                       {errors.formData[index].file.message}
//                     </p>
//                   )}
//                 </div>
//               </Card>
//             ))}

//             <Text
//               fontSize={{ base: "14px", lg: "17px" }}
//               my={5}
//               fontWeight={500}
//             >
//               Total: {total}
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
//               type="submit"
//               isDisabled={addPayment.isPending ? true : false}
//             >
//               {addPayment.isPending ? <Spinner /> : "Book Retreat"}
//             </Button>
//           </form>
//         </Card>
//       </Box>
//     </LGBox>
//   );
// };

// export default Bookings;

const Bookings = () => {
  return <div>Bookings</div>;
};

export default Bookings;
