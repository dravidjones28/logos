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
  useToast,
  Button,
  Spinner,
  // Spinner,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BsPerson } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";

import z from "zod";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../components/footer/Footer";
import useAuth from "../hooks/useAuth";
import useAddPrayerRequest from "../hooks/prayerRequest/useAddPrayerRequest";
import ReCAPTCHA from "react-google-recaptcha";
import captchaKey from "../components/common/captcha";
const schema = z.object({
  fullName: z
    .string()
    .min(3, "FullName must be contain minimum of 3 Characters"),

  email: z
    .string()
    .min(2, "Email must be contain minimum of 2 Characters")
    .email()
    .optional(),
  message: z.string().min(2, "Message must be contain minimum of 2 Characters"),
});

type FormData = z.infer<typeof schema>;

const PrayerRequest = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const [captachaDone, setCaptachaDone] = useState<any>(false);

  const handleCaptacha = (value: any) => {
    setCaptachaDone(value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  let {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const addPrayerRequest = useAddPrayerRequest(() => {
    reset();
  });

  const auth = useAuth();

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    const newText = text.replace(/[\n\r]/g, "\n");
    setValue("message", newText);
  };

  const onSubmit = (data: FormData) => {
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
      const prayerRequestData = {
        ...data,
        email: auth ? auth.email : "",
      };
      addPrayerRequest.mutate(prayerRequestData);
    } else {
      toast({
        title: "Please Login In",
        description: "To offer your prayer request",
        position: "top",
        status: "error",
        isClosable: true,
        duration: 3000,
      });
      navigate("/login");
    }
  };

  console.log(auth ? auth.email : "");

  return (
    <LGBox>
      <Grid
        templateAreas={{
          base: `"prayerRequest"`,
          lg: `"image prayerRequest"`,
        }}
        templateColumns={{
          base: "1fr",
          lg: "1fr 1fr",
        }}
        mx={{ base: "5px", lg: "20px" }}
        p={{ base: "10px", lg: "10px" }}
        mt="35px"
        gap={10}
      >
        <Show above="lg">
          <GridItem area="image">
            <Center>
              <Image
                borderRadius="10px"
                height="630px"
                src="https://res.cloudinary.com/dxdpahm3o/image/upload/v1694845692/Logos%20Retreat%20Centre/Prayer_zgcfwr.jpg"
              />
            </Center>
          </GridItem>
        </Show>

        <GridItem area="prayerRequest">
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
                Prayer Request
              </Text>
            </Box>
            <Center>
              <Text
                mx="20px"
                textAlign="left"
                width={{ base: "100%", lg: "580px" }}
                fontSize="18px"
              >
                Prayer can do wonders, and at Logos Retreat Center, our
                intercession team is praying 24x7 in front of the blessed
                sacrament. Send your prayer requests, and don't underestimate
                the power of prayer.
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
                      value={auth ? auth.email : ""}
                      defaultValue={auth ? auth.email : ""}
                      disabled={true}
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
                  <FormLabel>How can we lift you up in prayer today?</FormLabel>
                  <Textarea
                    placeholder="Write your prayer request here."
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
                  <ReCAPTCHA sitekey={captchaKey} onChange={handleCaptacha} />
                  <Button
                    variant="solid"
                    bg="#0D74FF"
                    color="white"
                    _hover={{}}
                    cursor="pointer"
                    type="submit"
                    disabled={addPrayerRequest.isPending ? true : false}
                    textTransform="uppercase"
                  >
                    {addPrayerRequest.isPending ? <Spinner /> : "pray for me"}
                  </Button>
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

export default PrayerRequest;
