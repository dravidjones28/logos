import {
  Box,
  Button,
  Card,
  FormControl,
  FormHelperText,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Text,
  Stack,
  Link,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { IoIosPhonePortrait } from "react-icons/io";
import ReCAPTCHA from "react-google-recaptcha";
import captchaKey from "../components/common/captcha";
import { useState } from "react";
import LGBox from "../components/common/LGBox";
import { useParams } from "react-router-dom";
import useVerifyEmail from "../hooks/users/useVerifyEmail";
import useResendEmail from "../hooks/users/useResendEmail";

const schema = z.object({
  verifyCode: z.string().min(4, "Minimum of 4").max(4, "Maximum of 4"),
});

export type VerifyData = z.infer<typeof schema>;

const VerifyEmail = () => {
  const {
    register: data,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyData>({ resolver: zodResolver(schema) });

  const [captachaDone, setCaptachaDone] = useState<any>(false);
  const { userId, email } = useParams();

  const verifyEmail = useVerifyEmail();
  const resendEmail = useResendEmail();
  const toast = useToast();

  const handleCaptacha = (value: any) => {
    setCaptachaDone(value);
  };

  const handleResendEmail = () => {
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
        userId: userId ?? "",
        email: email ?? "",
      };

      resendEmail.mutate(temp);
    }
  };

  const onSubmit = (data: VerifyData) => {
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
        otp: data.verifyCode,
        userId: userId ?? "",
      };
      verifyEmail.mutate(temp);
    }
  };

  return (
    <LGBox>
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        height="80vh"
        gap="10px"
      >
        <Heading
          textAlign="center"
          color="#495057"
          fontWeight={600}
          fontSize="16px"
        >
          2-Step Verification
        </Heading>
        <Card p={5}>
          <Heading
            textAlign="center"
            fontSize="0.8125rem"
            fontWeight={400}
            color="#495057"
            lineHeight={1.5}
            my={5}
          >
            An email with a verification code was just sent to {email}
          </Heading>
          <form onSubmit={handleSubmit((data) => onSubmit(data))}>
            <FormControl isInvalid={errors.verifyCode ? true : false} mb={5}>
              <InputGroup>
                <Input
                  {...data("verifyCode", { required: true })}
                  placeholder="verification code"
                  color="343a40"
                />

                <InputLeftElement h={"full"}>
                  <IoIosPhonePortrait />
                </InputLeftElement>
              </InputGroup>
              {errors.verifyCode && (
                <FormHelperText color="red">
                  {errors.verifyCode.message}
                </FormHelperText>
              )}
            </FormControl>
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
                disabled={
                  verifyEmail.isPending || resendEmail.isPending ? true : false
                }
              >
                {verifyEmail.isPending ? <Spinner /> : "Send"}
              </Button>
            </Stack>
          </form>
          <Box pt={6}>
            <Stack>
              <Text
                align={"center"}
                textAlign="center"
                fontSize="0.8125rem"
                fontWeight={400}
                color="#495057"
                lineHeight={1.5}
              >
                Didn't get code?
                <Link color="blue" onClick={handleResendEmail}>
                  {" Resend"}
                </Link>
              </Text>
            </Stack>
            <Box mt="20px">
              <ReCAPTCHA sitekey={captchaKey} onChange={handleCaptacha} />
            </Box>
          </Box>
        </Card>
      </Box>
    </LGBox>
  );
};

export default VerifyEmail;
