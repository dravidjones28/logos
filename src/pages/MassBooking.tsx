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
  Textarea,
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

export interface Value {
  dates: Date[] | Date | undefined | DateRange;
}

const schema = z.object({
  fullName: z.string().min(2, "Minimum of 4 Characters"),
  email: z.string().min(4, "Minimum of 4 Characters").email(),
  massType: z.string().min(1, "Please Select MassType"),
  normalIntentionField: z
    .string()
    .refine((data) => data.length > 0)
    .optional(),
  gregorianIntentionField: z
    .string()
    .refine((data) => data.length > 0)
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

function MassBooking() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [radioValue, setRadioValue] = useState("");
  const [dateValue, setDateValue] = useState<Value>();
  const [tableValues, setTableValues] = useState<DateValues>();
  const [openTable, setOpenTable] = useState<boolean>(false);

  const {
    register: data,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<MassData>({ resolver: zodResolver(schema) });

  const selectedMassType = watch("massType");

  const handleValue = (e: any) => {
    setDateValue(undefined);
    setRadioValue(e);
    setOpenTable(false);
  };

  const handleDate = () => {
    setOpenTable(true);
  };

  const handleMassTypeChange = (value: string) => {
    setValue("massType", value);
    // Additional logic based on massType if needed
  };

  const useAddPayment = useMassBooking();
  const auth = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit = (data: MassData) => {
    if (auth) {
      const field = {
        ...data,
        dates: dateValue,
        ...tableValues,
        amount: tableValues?.totalCost,
      };
      useAddPayment.mutate(field);
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
                    <Input {...data("email")} type="email" />
                    {errors.email && (
                      <FormHelperText color="red">
                        {errors.email.message}
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
                </Stack>
                <Box display="flex" justifyContent="center" mt={5}>
                  <Box width="100%">
                    {selectedMassType === "Normal Intention" && (
                      <FormControl
                        isInvalid={errors.normalIntentionField ? true : false}
                      >
                        <FormLabel>Normal Intention Field</FormLabel>
                        <Input {...data("normalIntentionField")} type="text" />
                        {errors.normalIntentionField && (
                          <FormHelperText color="red">
                            {errors.normalIntentionField.message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    )}

                    {selectedMassType === "Gregorian Intention" && (
                      <FormControl
                        isInvalid={
                          errors.gregorianIntentionField ? true : false
                        }
                      >
                        <FormLabel>Gregorian Intention Field</FormLabel>
                        <Textarea {...data("gregorianIntentionField")} />
                        {errors.gregorianIntentionField && (
                          <FormHelperText color="red">
                            {errors.gregorianIntentionField.message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    )}
                  </Box>
                </Box>
              </Box>
              <Box>
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
                      onTableValue={(value: DateValues) =>
                        setTableValues(value)
                      }
                      onValue={(value: any) => setDateValue(value)}
                    />
                  ) : null}
                  {radioValue && dateValue && !openTable && (
                    <Button colorScheme="blue" onClick={handleDate}>
                      Confirm Date
                    </Button>
                  )}
                </Box>
              </Box>
              <Box>
                {openTable && <CostTable tableValues={tableValues} />}
                {radioValue && dateValue && openTable && (
                  <Button
                    isDisabled={useAddPayment.isPending ? true : false}
                    colorScheme="blue"
                    type="submit"
                  >
                    {useAddPayment.isPending ? <Spinner /> : "Confirm"}
                  </Button>
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
