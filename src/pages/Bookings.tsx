import { useNavigate, useParams } from "react-router-dom";
import LGBox from "../components/common/LGBox";
import useRetreatEvent from "../hooks/retreatEvents/useRetreatEvent";
import {
  Box,
  Card,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
  Button,
  HStack,
  IconButton,
  FormControl,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  FormLabel,
  useColorModeValue,
  FormHelperText,
  Textarea,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { MinusIcon, AddIcon } from "@chakra-ui/icons";
import db from "../components/common/db";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { FaPhone, FaRegQuestionCircle } from "react-icons/fa";
import { MdEmail, MdConfirmationNumber } from "react-icons/md";
import useAddRetreatBooking from "../hooks/retreatBookings/useAddRetreatBookings";
import ReCAPTCHA from "react-google-recaptcha";
import captchaKey from "../components/common/captcha";

const schema = z.object({
  email: z
    .string()
    .min(3, "Email must be contain minimum of 3 Characters")
    .email()
    .optional(),

  contactNumber: z
    .string()
    .min(10, "contactNumber must be contain minimum of 10")
    .max(10, "contactNumber must be contain maximum of 10"),

  bookingForFamilyOrIndividual: z
    .enum(["individual", "family"])
    .refine((data) => data.length > 0),

  address: z
    .string()
    .min(1, "address must be contain minimum of 1 Characters "),

  roomPreference: z
    .enum([
      "Deluxe Ac room",
      "Normal room",
      "Standard Ac room",
      "Deluxe Non-Ac room",
    ])
    .refine((data) => data.length > 0),

  familyMembers: z
    .array(
      z.object({
        firstName: z
          .string()
          .min(2, "First Name should be minimum of 2 characters"),
        lastName: z
          .string()
          .min(2, "last Name should be minimum of 2 characters"),
        age: z
          .string({
            required_error: "Age is required",
            invalid_type_error: "Age must be a number",
          })
          .min(1),

        sex: z.enum(["male", "female"]),
        religion: z.enum(["roman catholic", "non catholic", "others"]),
      })
    )
    .refine((data) => {
      // Check if all forms in the array have all fields filled
      return data.every(
        (formData) =>
          formData.firstName &&
          formData.lastName &&
          formData.age &&
          formData.sex &&
          formData.religion
      );
    }),
});

type RetreatFormData = z.infer<typeof schema>;

const Bookings = () => {
  const { slug } = useParams();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RetreatFormData>({
    resolver: zodResolver(schema),
  });

  const { data: events, isLoading, error } = useRetreatEvent(slug ?? "");
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const [captachaDone, setCaptachaDone] = useState<any>(false);

  const handleCaptacha = (value: any) => {
    setCaptachaDone(value);
  };

  const toast = useToast();

  const valuesOfFormData = watch("bookingForFamilyOrIndividual");

  const familyMembers = watch("familyMembers");

  useEffect(() => {
    if (valuesOfFormData === "individual") setCount(1);
  }, [valuesOfFormData]);

  const handleCount = async (newCount: number) => {
    if (events?.slots && newCount > 0 && newCount <= events?.slots) {
      const newFamilyMembers: {
        firstName: string;
        lastName: string;
        age: string;
        sex: "male" | "female";
        religion: "roman catholic" | "non catholic" | "others";
      }[] = Array.from({ length: count }, (_, index) => {
        // If the index is within the existing familyMembers, return the existing data
        if (index < familyMembers.length) {
          return familyMembers[index];
        }
        // Otherwise, return a new object for the added family member
        return {
          firstName: "",
          lastName: "",
          age: "",
          sex: "male",
          religion: "roman catholic",
        };
      });

      setCount(newCount);
      // Update the form value for familyMembers
      console.log(newFamilyMembers);
      setValue("familyMembers", newFamilyMembers);
      // await trigger("familyMembers");
    }
  };

  const handleDecreseCount = async (newCount: number) => {
    if (events?.slots && newCount > 0 && newCount <= events?.slots) {
      if (events?.slots && newCount > 0 && newCount <= events?.slots) {
        const newFamilyMembers: {
          firstName: string;
          lastName: string;
          age: string;
          sex: "male" | "female";
          religion: "roman catholic" | "non catholic" | "others";
        }[] = Array.from({ length: count - newCount }, (_, index) => {
          // If the index is within the existing familyMembers, return the existing data
          if (index < familyMembers.length) {
            return familyMembers[index];
          }
          // Otherwise, return a new object for the added family member
          return {
            firstName: "",
            lastName: "",
            age: "",
            sex: "male",
            religion: "roman catholic",
          };
        });
        setCount(newCount);
        // Update the form value for familyMembers
        console.log(newFamilyMembers);
        setValue("familyMembers", newFamilyMembers);

        // await trigger("familyMembers");
      }
    }
  };

  const inputDate = new Date(`${events?.start}`);
  const formattedDate = inputDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const addRetreatBooking = useAddRetreatBooking();

  const session = db();
  const onSubmit = (data: RetreatFormData) => {
    let newData = data?.familyMembers.slice(0, count);
    console.log(newData);

    let temp = {};

    const convertAgeToNumber = data?.familyMembers.map((person) => ({
      ...person,
      age: parseInt(person.age, 10),
    }));

    console.log(convertAgeToNumber);

    if (!captachaDone) {
      return toast({
        title: "Failed",
        description: `Please complete the reCAPTCHA`,
        position: "top",
        status: "error",
        isClosable: true,
        duration: 3000,
      });
    }

    if (data.bookingForFamilyOrIndividual === "family")
      temp = {
        email: session?.email,
        bookingName: session?.name,
        bookingForFamilyOrIndividual: data.bookingForFamilyOrIndividual,
        familyMembers: data.familyMembers,
        address: data.address.trim(),
        roomPreference: data.roomPreference,
        contactNumber: data.contactNumber.trim(),
        author: session?._id,
        eventId: events?._id,
      };
    else if (data.bookingForFamilyOrIndividual === "individual")
      temp = {
        email: session?.email,
        bookingName: session?.name,

        bookingForFamilyOrIndividual: data.bookingForFamilyOrIndividual,
        firstName: data.familyMembers[0].firstName,
        lastName: data.familyMembers[0].lastName,
        familyMembers: [],
        age: Number(data.familyMembers[0].age),
        sex: data.familyMembers[0].sex,
        religion: data.familyMembers[0].religion,
        address: data.address,
        roomPreference: data.roomPreference,
        contactNumber: data.contactNumber,
        author: session?._id,
        eventId: events?._id,
      };

    addRetreatBooking.mutate(temp);

    // addPayment.mutate({
    //   bookingName: session?.name,
    //   email: session?.email,
    //   persons: newData,
    //   author: session?._id,
    //   eventId: events?._id,
    // });
  };

  if (isLoading)
    return (
      <LGBox>
        <Box
          display="flex"
          height="70vh"
          justifyContent="center"
          alignItems="center"
        >
          <Spinner />
        </Box>
      </LGBox>
    );

  if (error) throw error;
  if (events?.slots === 0) navigate("/");

  return (
    <LGBox>
      <Box display="flex" justifyContent="center">
        <Card p={5} mt={5} width={{ base: "300px", md: "600px", lg: "800px" }}>
          <Heading textAlign="center" mt={4} size={{ base: "lg" }}>
            {events?.title}
          </Heading>
          <Text
            textAlign="center"
            fontWeight={500}
            mt={2}
            fontSize={{ base: "15", md: "17", lg: "20" }}
          >
            Led By: {events?.ledBy} on {formattedDate}
          </Text>
          <Box>
            <Text
              fontSize={{ base: "14px", lg: "15px" }}
              fontWeight={500}
              mt={5}
            >
              slots : {Number(events?.slots) - count}
            </Text>
            <Text
              mt={3}
              fontSize={{ base: "14px", lg: "15px" }}
              fontWeight={500}
            >
              Booking Person : {session?.name}
            </Text>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            <SimpleGrid columns={{ base: 1, lg: 2, xl: 3 }} gap={4} mt={5}>
              <FormControl>
                <FormLabel>Your Email</FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <Icon as={MdEmail} color="#5664d2" />
                  </InputLeftElement>
                  <Input
                    type="email"
                    size="md"
                    fontSize={{ base: "14px", lg: "14px" }}
                    _placeholder={{
                      opacity: 1,
                      color: "gray.500",
                      fontSize: "14px",
                    }}
                    {...register("email")}
                    value={session?.email}
                    disabled={true}
                    defaultValue={session?.email}
                    placeholder={`Enter Your email`}
                  />
                </InputGroup>
                {errors.email && (
                  <p style={{ color: "red" }}>{errors.email.message}</p>
                )}
              </FormControl>
              <FormControl>
                <FormLabel>Your contact number</FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <Icon as={FaPhone} color="#5664d2" />
                  </InputLeftElement>
                  <Input
                    type="number"
                    size="md"
                    fontSize={{ base: "14px", lg: "14px" }}
                    _placeholder={{
                      opacity: 1,
                      color: "gray.500",
                      fontSize: "14px",
                    }}
                    {...register("contactNumber")}
                    placeholder={`Enter your phone number`}
                  />
                </InputGroup>
                {errors.contactNumber && (
                  <p style={{ color: "red" }}>{errors.contactNumber.message}</p>
                )}
              </FormControl>
              <FormControl
                isInvalid={errors.bookingForFamilyOrIndividual ? true : false}
              >
                <FormLabel>Booking For</FormLabel>
                <Select
                  placeholder="Select an option"
                  {...register("bookingForFamilyOrIndividual")}
                  // onChange={(e) => handleMassTypeChange(e.target.value)}
                >
                  <option value="family">Family</option>
                  <option value="individual">Individual</option>
                </Select>
                {errors.bookingForFamilyOrIndividual && (
                  <FormHelperText color="red">
                    {errors.bookingForFamilyOrIndividual.message}
                  </FormHelperText>
                )}
              </FormControl>
            </SimpleGrid>
            <SimpleGrid columns={{ base: 1, lg: 2, xl: 2 }} gap={4} my={10}>
              <FormControl>
                <FormLabel>Address</FormLabel>
                <Textarea
                  {...register("address", {
                    required: true,
                  })}
                  borderColor="gray.300"
                  _hover={{
                    borderRadius: "gray.300",
                  }}
                  height="100px"
                  // onChange={handleTextareaChange}
                  placeholder="Address"
                />
                {errors.address && (
                  <FormHelperText color="red">
                    {errors.address.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl isInvalid={errors.roomPreference ? true : false}>
                <Box display="flex">
                  <FormLabel>Booking For</FormLabel>
                  <Box position="relative" top="-3px">
                    <Tooltip
                      label="Which room would you prefer?
(Please note that this is just to know your preference and will not guarantee the room type. Our team will send you a confirmation mail at a later time)."
                      fontSize="md"
                    >
                      <Icon cursor="pointer">
                        <FaRegQuestionCircle style={{ fontSize: "25px" }} />
                      </Icon>
                    </Tooltip>
                  </Box>
                </Box>
                <Select
                  placeholder="Select an option"
                  {...register("roomPreference")}
                  // onChange={(e) => handleMassTypeChange(e.target.value)}
                >
                  <option value="Deluxe Ac room">Deluxe Ac room</option>
                  <option value="Normal room">Normal room</option>
                  <option value="Standard Ac room">Standard Ac room</option>
                  <option value="Deluxe Non-Ac room">Deluxe Non-Ac room</option>
                </Select>
                {errors.roomPreference && (
                  <FormHelperText color="red">
                    {errors.roomPreference.message}
                  </FormHelperText>
                )}
              </FormControl>
            </SimpleGrid>
            {valuesOfFormData === "family" && (
              <HStack mt={2}>
                <Text fontWeight={500} fontSize={{ base: "14px", lg: "15px" }}>
                  Number of People
                </Text>

                <>
                  <IconButton
                    mt="10px"
                    icon={<MinusIcon boxSize="7px" />}
                    onClick={() => handleDecreseCount(count - 1)}
                    aria-label="Add people"
                    isDisabled={count === 1 ? true : false}
                    boxSize={{ base: "25px", lg: "20px" }}
                  />
                  <Text mt="10px" fontSize={{ base: "14px", lg: "15px" }}>
                    {count}
                  </Text>
                  <IconButton
                    aria-label="remove people"
                    icon={<AddIcon boxSize="7px" />}
                    isDisabled={
                      Number(events?.slots) - count === 0 ? true : false
                    }
                    mt="10px"
                    onClick={() => handleCount(count + 1)}
                    boxSize={{ base: "25px", lg: "15px" }}
                  />
                </>
              </HStack>
            )}
            {valuesOfFormData &&
              [...Array(count)].map((_, index) => (
                <Card
                  // boxShadow={"2xl"}
                  bg={useColorModeValue("white", "gray.900")}
                  key={index}
                  paddingX="30px"
                  marginY="20px"
                  border="1px solid #f3f3f3"
                >
                  <SimpleGrid
                    columns={{ base: 1, lg: 2, xl: 3 }}
                    gap={4}
                    my={5}
                  >
                    <FormControl>
                      <InputGroup>
                        <InputLeftElement marginTop="5px">
                          <Icon as={BsFillPersonPlusFill} color="#5664d2" />
                        </InputLeftElement>
                        <Input
                          type="text"
                          size="lg"
                          fontSize={{ base: "14px", lg: "17px" }}
                          _placeholder={{
                            opacity: 1,
                            color: "gray.500",
                            fontSize: "14px",
                          }}
                          {...register(
                            `familyMembers.${index}.firstName` as const
                          )}
                          placeholder={`Enter person's first name`}
                        />
                      </InputGroup>
                      {errors.familyMembers?.[index]?.firstName && (
                        <p style={{ color: "red" }}>
                          {errors.familyMembers?.[index]?.firstName?.message ??
                            ""}
                        </p>
                      )}
                    </FormControl>
                    <FormControl>
                      <InputGroup>
                        <InputLeftElement marginTop="5px">
                          <Icon as={BsFillPersonPlusFill} color="#5664d2" />
                        </InputLeftElement>
                        <Input
                          type="text"
                          size="lg"
                          fontSize={{ base: "14px", lg: "17px" }}
                          _placeholder={{
                            opacity: 1,
                            color: "gray.500",
                            fontSize: "14px",
                          }}
                          {...register(
                            `familyMembers.${index}.lastName` as const
                          )}
                          placeholder={`Enter person's last name`}
                        />
                      </InputGroup>
                      {errors.familyMembers?.[index]?.lastName && (
                        <p style={{ color: "red" }}>
                          {errors.familyMembers?.[index]?.lastName?.message ??
                            ""}
                        </p>
                      )}
                    </FormControl>
                    <FormControl>
                      <InputGroup>
                        <InputLeftElement marginTop="5px">
                          <Icon as={MdConfirmationNumber} color="#5664d2" />
                        </InputLeftElement>
                        <Input
                          type="number"
                          size="lg"
                          fontSize={{ base: "14px", lg: "17px" }}
                          _placeholder={{
                            opacity: 1,
                            color: "gray.500",
                            fontSize: "14px",
                          }}
                          {...register(`familyMembers.${index}.age` as const)}
                          placeholder={`Enter person's age`}
                        />
                      </InputGroup>
                      {errors.familyMembers?.[index]?.age && (
                        <p style={{ color: "red" }}>
                          {errors.familyMembers?.[index]?.age?.message ?? ""}
                        </p>
                      )}
                    </FormControl>
                    <FormControl>
                      <Select
                        {...register(`familyMembers.${index}.sex` as const)}
                        placeholder={`Select Male or female`}
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </Select>
                      {errors.familyMembers?.[index]?.sex && (
                        <p style={{ color: "red" }}>
                          {errors.familyMembers?.[index]?.sex?.message ?? ""}
                        </p>
                      )}
                    </FormControl>
                    <FormControl>
                      <Select
                        {...register(
                          `familyMembers.${index}.religion` as const
                        )}
                        placeholder={`Religion`}
                      >
                        <option value="roman catholic">Roman Catholic</option>
                        <option value="non catholic">Non Catholic</option>
                        <option value="others">Others</option>
                      </Select>
                      {errors.familyMembers?.[index]?.religion && (
                        <p style={{ color: "red" }}>
                          {errors.familyMembers?.[index]?.religion?.message ??
                            ""}
                        </p>
                      )}
                    </FormControl>
                  </SimpleGrid>
                </Card>
              ))}
            {valuesOfFormData && (
              <Text fontWeight={500}>
                Total :{" "}
                {valuesOfFormData === "individual"
                  ? 500
                  : familyMembers.length * 500}
              </Text>
            )}
            {valuesOfFormData && (
              <>
                <ReCAPTCHA sitekey={captchaKey} onChange={handleCaptacha} />

                <Button
                  fontSize={{ base: "10px", lg: "15px" }}
                  fontWeight={500}
                  height="20px"
                  borderRadius="7px"
                  ml={{ base: "10px", lg: "10px" }}
                  bg="#348ded"
                  mt="30px"
                  padding={{ base: "15px", lg: "20px" }}
                  color="#fff"
                  cursor="pointer"
                  _hover={{ bg: "#70b7ff" }}
                  type="submit"
                  isDisabled={addRetreatBooking.isPending ? true : false}
                >
                  {addRetreatBooking.isPending ? <Spinner /> : "Submit"}
                </Button>
              </>
            )}
          </form>
        </Card>
      </Box>
    </LGBox>
  );
};

export default Bookings;
