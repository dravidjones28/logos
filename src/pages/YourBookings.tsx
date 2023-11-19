import LGBox from "../components/common/LGBox";
import {
  Box,
  Card,
  Heading,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import useYourBookings from "../hooks/yourBookings/useYourBookings";
import CryptoJS, { AES } from "crypto-js";

const YourBookings = () => {
  const session = () => {
    if (sessionStorage.getItem("user")) {
      const session_storage = JSON.parse(sessionStorage.user);
      const decryptedObjectString = AES.decrypt(
        session_storage,
        "secretKey"
      ).toString(CryptoJS.enc.Utf8);
      const parse = JSON.parse(decryptedObjectString);
      return parse;
    }
  };

  const {
    data: yourBookings,
    error,
    isLoading,
  } = useYourBookings(session()?.accesstoken);

  const formatDate = (inputDate: string) => {
    const date = new Date(inputDate);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
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
  if (error || !yourBookings) throw error;
  return (
    <LGBox>
      <Text
        color="rgb(52, 71, 103)"
        fontWeight={700}
        fontSize={{ base: "20px", lg: "30px" }}
        letterSpacing={1.1}
        mx={{ base: "30px", lg: "145px" }}
        mt={5}
      >
        Your Bookings
      </Text>
      {yourBookings?.length === 0 && (
        <Box display="flex" justifyContent="center">
          <Text fontWeight={500}>Sorry, no bookings </Text>
        </Box>
      )}
      <SimpleGrid
        columns={{ base: 1, lg: 2, xl: 3 }}
        spacing={5}
        mx={{ base: "30px", lg: "145px" }}
        gap={20}
        justifyContent="center"
        mt={{ base: 5, lg: "20px" }}
      >
        {yourBookings.map((item) => {
          const persons = Object.keys(item.persons).map((i) => item.persons[i]);
          return (
            <Card p={5}>
              <Stack>
                <Text
                  color={"pink.400"}
                  textTransform={"uppercase"}
                  fontWeight={800}
                  fontSize={"sm"}
                  letterSpacing={1.1}
                >
                  Led by: {item.eventId.ledBy}
                </Text>
                <Heading
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  color={useColorModeValue("gray.700", "white")}
                  fontSize={"2xl"}
                  fontFamily={"body"}
                >
                  {item.eventId.title}
                </Heading>
                <Text fontWeight={500} fontSize="14px" color="#2d3748">
                  Date : {formatDate(item.eventId.start)}
                </Text>
                <Text fontWeight={700} fontSize="18px" color="#2d3748" mt={2}>
                  Booking Person: {item.bookingName}
                </Text>

                <Text fontWeight={500} fontSize="14px" color="#2d3748">
                  No of days : {item.eventId.noOfDays}
                </Text>
                <Text fontWeight={700} fontSize="18px" color="#2d3748" mt={2}>
                  List of people
                </Text>
                {persons.map((item) => (
                  <Text fontWeight={500} fontSize="14px" color="#2d3748">
                    {item}
                  </Text>
                ))}

                <Text fontWeight={700} fontSize="16px" color="#2d3748" mt={3}>
                  Total {item.amount}
                </Text>
              </Stack>
            </Card>
          );
        })}
      </SimpleGrid>
    </LGBox>
  );
};

export default YourBookings;
