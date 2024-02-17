import LGBox from "../components/common/LGBox";
import {
  Box,
  Button,
  Card,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormCard from "../components/common/FormCard";
import { Link, useLocation } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import Footer from "../components/footer/Footer";
import useForgotPassword from "../hooks/forgotpassword/useForgotPassword";
import ReCAPTCHA from "react-google-recaptcha";
import captchaKey from "../components/common/captcha";

const schema = z.object({
  email: z.string().min(4, "Minimum of 4 Characters").email(),
});

export type ForgotPasswordData = z.infer<typeof schema>;

const ForgotPassword = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const forgotPassword = useForgotPassword();

  const {
    register: data,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordData>({ resolver: zodResolver(schema) });

  const [captachaDone, setCaptachaDone] = useState<any>(false);
  const handleCaptacha = (value: any) => {
    setCaptachaDone(value);
  };

  const toast = useToast();

  const onSubmit = (data: ForgotPasswordData) => {
    if (!captachaDone) {
      return toast({
        title: "Failed",
        description: `Please complete the reCAPTCHA`,
        position: "top",
        status: "error",
        isClosable: true,
        duration: 3000,
      });
    } else {
      const temp = {
        ...data,
        redirectUrl: "https://logosretreatcentre.com/passwordReset",
      };
      forgotPassword.mutate(temp);
    }
  };

  return (
    <LGBox>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Card>
            <FormCard
              width={280}
              title1="Forgot Password!"
              title2="Enter your email"
            />

            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <Stack spacing={4}>
                <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                  <FormControl isInvalid={errors.email ? true : false}>
                    <FormLabel>Email address</FormLabel>
                    <Input {...data("email")} type="email" />
                    {errors.email && (
                      <FormHelperText color="red">
                        {errors.email.message}
                      </FormHelperText>
                    )}
                  </FormControl>

                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                    mt="3px"
                  ></Stack>
                  <Stack spacing={10} pt={2}>
                    <Box>
                      <ReCAPTCHA
                        sitekey={captchaKey}
                        onChange={handleCaptacha}
                      />
                    </Box>
                    <Button
                      //   loadingText="Submitting"
                      type="submit"
                      size="lg"
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                      disabled={forgotPassword.isPending ? true : false}
                    >
                      {forgotPassword.isPending ? <Spinner /> : "Send"}
                    </Button>
                  </Stack>
                </form>
                <Stack pt={6}>
                  <Text align={"center"}>
                    Forget it,
                    <Link
                      style={{ color: "#3182CE", cursor: "pointer" }}
                      to="/login"
                    >
                      {` Send me `}
                    </Link>
                    back to the sign in screen
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </Card>
        </Stack>
      </Flex>
      <Footer />
    </LGBox>
  );
};

export default ForgotPassword;
