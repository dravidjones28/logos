import LGBox from "../components/common/LGBox";
import {
  Box,
  // Button,
  Center,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Show,
  Textarea,
  Text,
  FormHelperText,
  // Spinner,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BsPerson } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";

import z from "zod";
// import useAddContactUs from "../hooks/contactUs/useAddContactUs";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Footer from "../components/footer/Footer";

const schema = z.object({
  fullName: z
    .string()
    .min(3, "FullName must be contain minimum of 3 Characters"),

  email: z
    .string()
    .min(2, "Email must be contain minimum of 2 Characters")
    .email(),
  message: z.string().min(2, "Message must be contain minimum of 2 Characters"),
});

type FormData = z.infer<typeof schema>;

const ContactUs = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  let {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // const addContectUs = useAddContactUs(() => {
  //   reset();
  // });

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    const newText = text.replace(/[\n\r]/g, "\n");
    setValue("message", newText);
  };

  const onSubmit = (data: FormData) => {
    // addContectUs.mutate(data);
    console.log(data);
  };

  return (
    <LGBox>
      <Grid
        templateAreas={{
          base: `"contactUs"`,
          lg: `"image contactUs"`,
        }}
        templateColumns={{
          base: "1fr",
          lg: "1fr 1fr",
        }}
        mx={{ base: "5px", lg: "20px" }}
        p={{ base: "10px", lg: "10px" }}
        mt="25px"
        gap={10}
      >
        <Show above="lg">
          <GridItem area="image">
            <Center>
              <Image
                borderRadius="10px"
                height="630px"
                src="https://res.cloudinary.com/dxdpahm3o/image/upload/v1694845701/Logos%20Retreat%20Centre/BIBLE_akyc8p.jpg"
              />
            </Center>
          </GridItem>
        </Show>

        <GridItem area="contactUs">
          <Box bg="white" borderRadius="lg" border="1px solid #ccc">
            <Box
              bg="#3f99ef"
              mx="20px"
              p={5}
              borderRadius="10px"
              position="relative"
              top="-20px"
            >
              <Text color="#fff" fontWeight={500} fontSize="25px">
                Contact us{" "}
              </Text>
            </Box>
            <Center>
              <Text
                mx="20px"
                textAlign="left"
                width={{ base: "100%", lg: "580px" }}
                fontSize="18px"
              >
                Got questions or need more information? Don't hesitate to
                contact us. Fill out the form below, and our team will get back
                to you as soon as possible.
              </Text>
            </Center>
            <form onSubmit={handleSubmit((data) => onSubmit(data))}>
              <Box m={8} color="#0B0E3F">
                <FormControl mb={5}>
                  <FormLabel>Full Name</FormLabel>
                  <InputGroup borderColor="#E0E1E7">
                    <InputLeftElement pointerEvents="none">
                      <BsPerson color="gray.800" />
                    </InputLeftElement>
                    <Input
                      {...register("fullName", {
                        required: true,
                      })}
                      type="text"
                      size="md"
                      placeholder="Your Full Name"
                    />
                  </InputGroup>
                  {errors.fullName && (
                    <FormHelperText color="red" mb={3}>
                      {errors.fullName.message}
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl mb={5}>
                  <FormLabel>Email</FormLabel>
                  <InputGroup borderColor="#E0E1E7">
                    <InputLeftElement pointerEvents="none">
                      <MdOutlineEmail color="gray.800" />
                    </InputLeftElement>
                    <Input
                      {...register("email", {
                        required: true,
                      })}
                      type="text"
                      size="md"
                      placeholder="Your Email"
                    />
                  </InputGroup>
                  {errors.email && (
                    <FormHelperText color="red" mb={3}>
                      {errors.email.message}
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl mb={3}>
                  <FormLabel>What can we help you?</FormLabel>
                  <Textarea
                    placeholder="Describe your requirements/issue in at least 250 characters"
                    borderColor="gray.300"
                    _hover={{
                      borderRadius: "gray.300",
                    }}
                    {...register("message", {
                      required: true,
                    })}
                    onChange={handleTextareaChange}
                  />
                  {errors.message && (
                    <FormHelperText color="red">
                      {errors.message.message}
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl>
                  {/* <Button
                    variant="solid"
                    bg="#0D74FF"
                    color="white"
                    _hover={{}}
                    cursor="pointer"
                    type="submit"
                    textTransform="uppercase"
                    disabled={addContectUs.isPending ? true : false}
                  >
                    {addContectUs.isPending ? <Spinner /> : "send messages"}
                  </Button> */}
                </FormControl>
              </Box>
            </form>
          </Box>
        </GridItem>
      </Grid>
      <Box mt={20}>
        <Footer />
      </Box>
    </LGBox>
  );
};

export default ContactUs;
