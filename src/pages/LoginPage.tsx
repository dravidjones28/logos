import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import LGBox from "../components/common/LGBox";
import {
  Box,
  Button,
  Card,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
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
import useLogin from "../hooks/login/useLogin";
import { Spinner } from "@chakra-ui/react";
import Footer from "../components/footer/Footer";
import ReCAPTCHA from "react-google-recaptcha";
import captchaKey from "../components/common/captcha";

const schema = z.object({
  email: z.string().min(4, "Minimum of 4 Characters").email(),
  password: z.string().min(4, "Minimum of 4 Characters"),
});

export type RegisterData = z.infer<typeof schema>;

const RegisterPage = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const login = useLogin();

  const {
    register: data,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({ resolver: zodResolver(schema) });

  const [showPassword, setShowPassword] = useState(false);
  const [captachaDone, setCaptachaDone] = useState<any>(false);

  const handleCaptacha = (value: any) => {
    setCaptachaDone(value);
  };

  const toast = useToast();

  const onSubmit = (data: RegisterData) => {
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
      login.mutate(data);
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
              title1="Sign In"
              title2=" Enter your email and password to sign in"
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
                  <FormControl isInvalid={errors.password ? true : false}>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <Input
                        {...data("password")}
                        type={showPassword ? "text" : "password"}
                      />

                      <InputRightElement h={"full"}>
                        <Button
                          variant={"ghost"}
                          onClick={() =>
                            setShowPassword((showPassword) => !showPassword)
                          }
                        >
                          {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    {errors.password && (
                      <FormHelperText color="red">
                        {errors.password.message}
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
                    <ReCAPTCHA sitekey={captchaKey} onChange={handleCaptacha} />
                    <Button
                      //   loadingText="Submitting"
                      type="submit"
                      size="lg"
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                      disabled={login.isPending ? true : false}
                    >
                      {login.isPending ? <Spinner /> : "Sign in"}
                    </Button>
                  </Stack>
                </form>
                <Box pt={6}>
                  <Center>
                    <Link
                      style={{ color: "#3182CE", cursor: "pointer" }}
                      to="/forgotPassword"
                    >
                      {`Forgot Password?`}
                    </Link>
                  </Center>
                  <Stack>
                    <Text align={"center"}>
                      Don't have an account?
                      <Link
                        style={{ color: "#3182CE", cursor: "pointer" }}
                        to="/register"
                      >
                        {` Register`}
                      </Link>
                    </Text>
                  </Stack>
                </Box>
              </Stack>
            </Box>
          </Card>
        </Stack>
      </Flex>
      <Footer />
    </LGBox>
  );
};

export default RegisterPage;
