import LGBox from "../components/common/LGBox";
import {
  Text,
  Box,
  Card,
  Heading,
  SimpleGrid,
  Stack,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react";
import useMassBook from "../hooks/massBooking/useMassBook";
import CryptoJS, { AES } from "crypto-js";
import { useEffect } from "react";
import Footer from "../components/footer/Footer";

const YourMassOffering = () => {
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
  } = useMassBook(session()?.accesstoken);

  useEffect(() => {}, [yourBookings]);

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
        mt={5}
        color="rgb(52, 71, 103)"
        fontWeight={700}
        fontSize={{ base: "20px", lg: "30px" }}
        letterSpacing={1.1}
        mx={{ base: "30px", lg: "145px" }}
      >
        Your Mass Bookings
      </Text>
      {yourBookings?.length === 0 && (
        <Box
          display="flex"
          justifyContent="center"
          mt={{ base: 5, lg: "20px" }}
        >
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
        {yourBookings?.map((item) => {
          return (
            <Card p={5}>
              <Stack>
                <Heading
                  color={useColorModeValue("gray.700", "white")}
                  fontSize={"2xl"}
                  fontFamily={"body"}
                >
                  {item.massType}
                </Heading>
                <Text fontWeight={500}>Name : {item.bookingName}</Text>
                {item.massType === "Gregorian Intention" ? (
                  <Text fontWeight={500}>
                    Your Intention : {item.gregorianIntentionField}
                  </Text>
                ) : (
                  <>
                    <Text fontWeight={500}>
                      Intention Type: {item.normalIntentionTypes}
                    </Text>
                    <Text fontWeight={500}>
                      Your Intention : {item.normalIntentionField}
                    </Text>
                  </>
                )}
                <Text fontWeight={500}>Date : {item.massDate}</Text>
              </Stack>
            </Card>
          );
        })}
      </SimpleGrid>
      <Box mt={20}>
        <Footer />
      </Box>
    </LGBox>
  );
};

export default YourMassOffering;
