import {
  Card,
  Stack,
  FormControl,
  FormLabel,
  Box,
  Text,
  Input,
  FormHelperText,
  Select,
  RadioGroup,
  Radio,
  Button,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CostTable from "../components/Dates/CostTable";
import MultipleDate from "../components/Dates/MultipleDate";
import RangeDate from "../components/Dates/RangeDate";
import SingleDate from "../components/Dates/SingleDate";
import LGBox from "../components/common/LGBox";
import useMassBooking from "./../hooks/massBooking/useMassBooking";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/footer/Footer";
import db from "../components/common/db";
import { addDays } from "date-fns";
import ThirtyDaysDate from "../components/Dates/ThirtyDaysDate";
import { format } from "date-fns";
import ReCAPTCHA from "react-google-recaptcha";
import captchaKey from "../components/common/captcha";

export interface Value {
  dates: Date[] | Date | undefined | DateRange;
}

const schema = z.object({
  fullName: z
    .string()
    .min(2, "Minimum of 4 Characters")
    .refine((data) => /^[A-Za-z\s]+$/.test(data), {
      message: "Only characters and spaces are allowed for fullName",
    }),

  email: z.string().min(4, "Minimum of 4 Characters").email().optional(),
  massType: z.string().min(1, "Please Select MassType"),
  time: z.string().min(1, "Please select time slot"),
  phoneNumber: z
    .string()
    .min(10, "Please Enter 10 digits")
    .max(10, "Please Enter 10 digits"),
  normalIntentionTypes: z
    .enum([
      "Thanksgiving Mass",
      "Mass for Special Intention",
      "Mass for the soul",
      "Thanksgiving Mass on birthday",
      "Thanksgiving Mass on wedding anniversary",
      "Thanksgiving Mass on priestly ordination",
      "Thanksgiving Mass on religious vocation",
    ])
    .refine((data) => data.length > 0)
    .optional(),
  normalIntentionField: z
    .string()
    .min(2, "First Name should contain atleast 2 characters")
    .max(10, "First Name should have maximum of 10 characters")
    .optional(),
  normalIntentionField1: z
    .string()
    .min(2, "Last Name should contain atleast 2 characters")
    .max(10, "Last Name should have maximum of 10 characters")
    .optional(),
  gregorianIntentionField: z
    .string()
    .min(2, "First Name should contain atleast 2 characters")
    .max(10, "First Name should have maximum of 10 characters")

    .optional(),
  gregorianIntentionField1: z
    .string()
    .min(2, "Last Name should contain atleast 2 characters")
    .max(10, "Last Name should have maximum of 10 characters")
    .optional(),
});

export type MassData = z.infer<typeof schema>;

export interface DateValues {
  weekdays: number;
  weekends: number;
  totalDays: number;
  weekdayCost: number;
  weekendCost: number;
  totalCost: number;
}

type DateRangeOrUndefined = DateRange | undefined;

function MassBooking() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [radioValue, setRadioValue] = useState("");
  const [dateValue, setDateValue] = useState<Date[] | Date>([]);
  const [tableValues, setTableValues] = useState<DateValues>();
  const [openTable, setOpenTable] = useState<boolean>(false);
  const [captachaDone, setCaptachaDone] = useState<any>(false);

  const handleCaptacha = (value: any) => {
    setCaptachaDone(value);
  };

  const {
    register: data,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    unregister,
  } = useForm<MassData>({ resolver: zodResolver(schema) });

  const selectedMassType = watch("massType");
  const auth = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const database = db();

  const handleValue = (e: any) => {
    setDateValue([]);
    setRadioValue(e);
    setOpenTable(false);
  };

  const handleDate = () => {
    setOpenTable(true);
  };

  const handleMassTypeChange = (value: string) => {
    setValue("massType", value);
    if (value === "Normal Intention") {
      // Unregister fields for Gregorian Intention
      unregister("gregorianIntentionField");
      unregister("gregorianIntentionField1");
    } else if (value === "Gregorian Intention") {
      // Unregister fields for Normal Intention
      unregister("normalIntentionTypes");
      unregister("normalIntentionField");
      unregister("normalIntentionField1");
    }
  };

  const massPayment = useMassBooking();
  const isDateValueArray = Array.isArray(dateValue);

  const isDateValueNotEmpty = isDateValueArray && dateValue.length > 0;

  const onSubmit = (data: MassData) => {
    let temp: any = [];

    const formatDate = (date: Date): string => format(date, "yyyy-MM-dd");
    if (Array.isArray(dateValue)) {
      temp = dateValue.map((item) => formatDate(item));
    } else {
      temp = [formatDate(dateValue)];
    }

    if (!captachaDone) {
      return toast({
        title: "Failed",
        description: `Please complete the reCAPTCHA`,
        position: "top",
        status: "error",
        isClosable: true,
        duration: 3000,
      });
    } else if (auth) {
      let field = {
        bookingName: data.fullName,
        // amount: Number(tableValues?.totalCost),
        email: auth ? auth.email : "",
        massType: data.massType,
        time: data.time,
        normalIntentionField: data.normalIntentionField
          ? `${data.normalIntentionField} ${data.normalIntentionField1}`
          : "None",
        normalIntentionTypes: data.normalIntentionTypes
          ? data.normalIntentionTypes
          : "None",
        gregorianIntentionField: data.gregorianIntentionField
          ? `${data.gregorianIntentionField} ${data.gregorianIntentionField1}`
          : "None",

        massDate: temp,
        author: `${database?._id}`,
        phone: Number(data.phoneNumber),
      };

      massPayment.mutate(field);
    } else {
      toast({
        title: "Please Login In",
        description: "To offer your Mass",
        position: "top",
        status: "error",
        isClosable: true,
        duration: 3000,
      });
      navigate("/login");
    }
  };

  const intetionTypes = [
    "Thanksgiving Mass",
    "Mass for Special Intention",
    "Mass for the soul",
    "Thanksgiving Mass on birthday",
    "Thanksgiving Mass on wedding anniversary",
    "Thanksgiving Mass on priestly ordination",
    "Thanksgiving Mass on religious vocation",
  ];

  return (
    <LGBox>
      <Box height="100%" bg="#eef0f3">
        <Box py={{ base: 3, lg: 5 }}>
          <Card p={{ base: 5, lg: 10 }} mx={{ base: "5px", lg: "145px" }}>
            <form onSubmit={handleSubmit((data) => onSubmit(data))}>
              <Box>
                <Text
                  color="rgb(52, 71, 103)"
                  fontWeight={700}
                  fontSize={{ base: "25px", lg: "30px" }}
                  letterSpacing={1.1}
                >
                  Offer a Mass
                </Text>
                <Text fontWeight={500} mb={10}>
                  Every mass offered carries countless graces. Select your dates
                  and make an offering today.
                </Text>
                <Stack direction={{ base: "column", lg: "row" }}>
                  <FormControl isInvalid={errors.fullName ? true : false}>
                    <FormLabel fontSize={{ base: "14px", lg: "16px" }}>
                      Enter Your Full Name
                    </FormLabel>
                    <Input {...data("fullName")} type="text" />
                    {errors.fullName && (
                      <FormHelperText color="red">
                        {errors.fullName.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <FormControl isInvalid={errors.email ? true : false}>
                    <FormLabel>Email address</FormLabel>
                    <Input
                      {...data("email")}
                      disabled={true}
                      value={auth ? auth.email : ""}
                      defaultValue={auth ? auth.email : ""}
                      type="email"
                    />
                    {errors.email && (
                      <FormHelperText color="red">
                        {errors.email.message}
                      </FormHelperText>
                    )}
                  </FormControl>

                  <FormControl isInvalid={errors.phoneNumber ? true : false}>
                    <FormLabel>Phone Number</FormLabel>
                    <Input {...data("phoneNumber")} type="number" />
                    {errors.phoneNumber && (
                      <FormHelperText color="red">
                        {errors.phoneNumber.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <FormControl isInvalid={errors.massType ? true : false}>
                    <FormLabel>Choose Mass Type</FormLabel>
                    <Select
                      placeholder="Select an option"
                      onChange={(e) => handleMassTypeChange(e.target.value)}
                    >
                      <option value="Normal Intention">Normal Intention</option>
                      <option value="Gregorian Intention">
                        Gregorian Intention
                      </option>
                    </Select>
                    {errors.massType && (
                      <FormHelperText color="red">
                        {errors.massType.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <FormControl isInvalid={errors.time ? true : false}>
                    <FormLabel>Choose Mass Timings</FormLabel>
                    <Select
                      placeholder="Select an option"
                      {...data("time", { required: true })}
                      // onChange={(e) => handleMassTypeChange(e.target.value)}
                    >
                      <option value="6:00 a.m (English)">
                        {"6.00 am - 6.30 am (English)"}
                      </option>
                      <option value="6:30 a.m (Malayalam)">
                        {"6:30 am - 7:00 am (Malayalam)"}
                      </option>
                      <option value="4:30 p.m (English)">
                        {"4.30 pm - 5.00 pm (English)"}
                      </option>
                    </Select>
                    {errors.time && (
                      <FormHelperText color="red">
                        {errors.time.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Stack>
                {/* <Box display="flex" justifyContent="center" mt={5}> */}
                <Box width="100%" mt={5}>
                  {selectedMassType === "Normal Intention" && (
                    <FormControl
                      isInvalid={errors.normalIntentionField ? true : false}
                    >
                      <Stack direction={{ base: "column", lg: "row" }}>
                        <Box>
                          <FormLabel>Mass offered for</FormLabel>
                          <Select
                            my={3}
                            placeholder="Select Intention"
                            {...data("normalIntentionTypes")}
                            width="500px"
                          >
                            {intetionTypes.map((item, index) => (
                              <option value={item} key={index}>
                                {item}
                              </option>
                            ))}
                          </Select>
                          {errors.normalIntentionTypes && (
                            <FormHelperText color="red" mb={2}>
                              {errors.normalIntentionTypes.message}
                            </FormHelperText>
                          )}
                        </Box>
                        <Box>
                          <FormLabel>First Name</FormLabel>

                          <Input
                            {...data("normalIntentionField")}
                            type="text"
                            placeholder="Enter First Name"
                          />
                          {errors.normalIntentionField && (
                            <FormHelperText color="red">
                              {errors.normalIntentionField.message}
                            </FormHelperText>
                          )}
                        </Box>
                        <Box>
                          <FormLabel>Last Name</FormLabel>

                          <Input
                            {...data("normalIntentionField1")}
                            type="text"
                            placeholder="Enter Last Name"
                          />
                          {errors.normalIntentionField1 && (
                            <FormHelperText color="red">
                              {errors.normalIntentionField1.message}
                            </FormHelperText>
                          )}
                        </Box>
                      </Stack>
                    </FormControl>
                  )}

                  {selectedMassType === "Gregorian Intention" && (
                    <>
                      <FormLabel>GREGORIAN SOULS MASSES</FormLabel>
                      <Stack direction={{ base: "column", lg: "row" }}>
                        <Box>
                          <FormLabel>First Name</FormLabel>
                          <Input
                            {...data("gregorianIntentionField")}
                            type="text"
                            placeholder="Enter First Name"
                            width="300px"
                          />
                          {errors.gregorianIntentionField && (
                            <FormHelperText color="red">
                              {errors.gregorianIntentionField.message}
                            </FormHelperText>
                          )}
                        </Box>
                        <Box>
                          <FormLabel>Last Name</FormLabel>

                          <Input
                            {...data("gregorianIntentionField1")}
                            type="text"
                            placeholder="Enter Last Name"
                            width="300px"
                          />
                          {errors.gregorianIntentionField1 && (
                            <FormHelperText color="red">
                              {errors.gregorianIntentionField1.message}
                            </FormHelperText>
                          )}
                        </Box>
                      </Stack>
                    </>
                  )}
                </Box>
              </Box>
              <Box>
                {selectedMassType === "Gregorian Intention" ? (
                  <ThirtyDaysDate
                    onTableValue={(value: DateValues) => {
                      setTableValues(value);
                    }}
                    onValue={(value: DateRangeOrUndefined) => {
                      // console.log(value);
                      if (value && value.to && value.from) {
                        let newDates = [];
                        for (
                          let date = value.from;
                          date <= value.to;
                          date = addDays(date, 1)
                        ) {
                          newDates.push(new Date(date));
                        }
                        setDateValue(newDates);
                      }
                    }}
                  />
                ) : (
                  <Box>
                    {selectedMassType && (
                      <Text mt={{ base: 5, lg: 10 }} fontWeight={500}>
                        How many masses you want to offer?
                      </Text>
                    )}
                    {selectedMassType && (
                      <RadioGroup
                        onChange={handleValue}
                        value={radioValue}
                        mt={4}
                      >
                        <Stack direction={{ base: "column", lg: "row" }}>
                          <Radio value="1">Single</Radio>
                          <Radio value="2">Multiple</Radio>
                          <Radio value="3">Range</Radio>
                        </Stack>
                      </RadioGroup>
                    )}
                    {radioValue === "1" ? (
                      <SingleDate
                        onTableValue={(value: DateValues) =>
                          setTableValues(value)
                        }
                        onValue={(value: any) => setDateValue(value)}
                      />
                    ) : radioValue === "2" ? (
                      <MultipleDate
                        onTableValue={(value: DateValues) =>
                          setTableValues(value)
                        }
                        onValue={(value: any) => setDateValue(value)}
                      />
                    ) : radioValue === "3" ? (
                      <RangeDate
                        onTableValue={(value: DateValues) => {
                          // for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
                          //   // Include only Sunday and Monday
                          //   if (date.getDay() === 0 || date.getDay() === 1) {
                          //     dateArray.push(new Date(date));
                          //   }
                          // }
                          setTableValues(value);
                        }}
                        onValue={(value: any) => {
                          // console.log(value);
                          if (value && value.to) {
                            let newDates = [];
                            for (
                              let date = value.from;
                              date <= value.to;
                              date = addDays(date, 1)
                            ) {
                              newDates.push(new Date(date));
                            }
                            // console.log("newDates", newDates);
                            // console.log("Value:", value);
                            setOpenTable(false);
                            setDateValue(newDates);
                          }
                        }}
                      />
                    ) : null}
                  </Box>
                )}
              </Box>
              {(selectedMassType === "Normal Intention" ? radioValue : true) &&
                dateValue &&
                (isDateValueNotEmpty || dateValue.toString().length > 0) &&
                !openTable && (
                  <Button colorScheme="blue" onClick={handleDate}>
                    Confirm Date
                  </Button>
                )}
              <Box>
                {openTable && <CostTable tableValues={tableValues} />}
                {(selectedMassType === "Normal Intention"
                  ? radioValue
                  : true) &&
                  dateValue &&
                  openTable && (
                    <>
                      <ReCAPTCHA
                        sitekey={captchaKey}
                        onChange={handleCaptacha}
                      />
                      <Button
                        isDisabled={massPayment.isPending ? true : false}
                        // isDisabled={true}
                        colorScheme="blue"
                        type="submit"
                      >
                        {massPayment.isPending ? <Spinner /> : "Confirm"}
                      </Button>
                    </>
                  )}
              </Box>
            </form>
          </Card>
        </Box>
        <Box mt={10}>
          <Footer />
        </Box>
      </Box>
    </LGBox>
  );
}

export default MassBooking;
