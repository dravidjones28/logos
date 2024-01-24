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
  InputGroup,
  InputRightElement,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormCard from "../components/common/FormCard";
import { useLocation, useParams } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import Footer from "../components/footer/Footer";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import useVerifyPassword from "../hooks/forgotpassword/useVerifyPassword";

const schema = z
  .object({
    password: z.string().min(4, "Minimum of 4 Characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type VerifyPasswordData = z.infer<typeof schema>;

const VerifyPassword = () => {
  const { pathname } = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const { userId, resetString } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const verifyPassword = useVerifyPassword();

  const {
    register: data,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyPasswordData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: VerifyPasswordData) => {
    const temp = {
      newPassword: data.confirmPassword,
      userId: userId ?? "",
      resetString: resetString ?? "",
    };

    verifyPassword.mutate(temp);
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
              title1="Set New Password!"
              title2="Enter your new password"
            />

            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <Stack spacing={4}>
                <form onSubmit={handleSubmit((data) => onSubmit(data))}>
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
                  <FormControl
                    isInvalid={errors.confirmPassword ? true : false}
                  >
                    <FormLabel>Confirm Password</FormLabel>
                    <InputGroup>
                      <Input
                        {...data("confirmPassword")}
                        type={showPassword1 ? "text" : "password"}
                      />

                      <InputRightElement h={"full"}>
                        <Button
                          variant={"ghost"}
                          onClick={() =>
                            setShowPassword1((showPassword1) => !showPassword1)
                          }
                        >
                          {showPassword1 ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    {errors.confirmPassword && (
                      <FormHelperText color="red">
                        {errors.confirmPassword.message}
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
                    <Button
                      //   loadingText="Submitting"
                      type="submit"
                      size="lg"
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                      disabled={verifyPassword.isPending ? true : false}
                    >
                      {verifyPassword.isPending ? <Spinner /> : "Update"}
                    </Button>
                  </Stack>
                </form>
              </Stack>
            </Box>
          </Card>
        </Stack>
      </Flex>
      <Footer />
    </LGBox>
  );
};

export default VerifyPassword;
