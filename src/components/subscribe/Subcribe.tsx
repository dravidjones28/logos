import { CheckIcon } from "@chakra-ui/icons";
import {
  SimpleGrid,
  Stack,
  FormControl,
  Input,
  useColorModeValue,
  Button,
  Box,
  Text,
  Image,
} from "@chakra-ui/react";

const Subcribe = () => {
  return (
    <SimpleGrid
      columns={{ base: 1, lg: 2 }}
      spacing={5}
      gap={20}
      mx={{ base: "30px", lg: "145px" }}
      mt={{ base: "70px", lg: "120px" }}
    >
      <Box flex={1} alignSelf="center">
        <Text
          fontSize="1.5rem"
          lineHeight={1.375}
          fontWeight={700}
          color="rgb(52, 71, 103)"
        >
          Stay Stay Connected — Subscribe Now!
        </Text>
        <Text
          fontSize="1.0635rem"
          fontWeight={400}
          color="rgb(73, 76, 92)"
          marginBottom="24px"
        >
          Stay up-to-date with announcements, retreat schedules, and inspiring
          teachings. Subscribe to our newsletter and nourish your soul.
        </Text>
        <Stack
          direction={{ base: "column", md: "row" }}
          as={"form"}
          spacing={"12px"}
        >
          <FormControl>
            <Input
              variant={"solid"}
              borderWidth={1}
              color={"gray.800"}
              _placeholder={{
                color: "gray.400",
              }}
              borderColor={useColorModeValue("gray.300", "gray.700")}
              id={"email"}
              type={"email"}
              required
              placeholder={"Your Email"}
              aria-label={"Your Email"}
            />
          </FormControl>
          <FormControl w={{ base: "100%", md: "40%" }}>
            <Button
              colorScheme="blue"
              //   isLoading={state === 'submitting'}
              w="100%"
              //   type={state === 'success' ? 'button' : 'submit'}
            >
              {false ? <CheckIcon /> : "SUBSCRIBE"}
            </Button>
          </FormControl>
        </Stack>
      </Box>
      <Image src="https://res.cloudinary.com/dxdpahm3o/image/upload/v1694610176/Logos%20Retreat%20Centre/Grotto_Mary_wjnvvh.webp" />
    </SimpleGrid>
  );
};

export default Subcribe;
