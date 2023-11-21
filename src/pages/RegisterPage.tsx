import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import LGBox from "../components/common/LGBox";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormCard from "../components/common/FormCard";
import { Link, useLocation } from "react-router-dom";
import useAddRegister from "../hooks/register/useRegister";
import { Spinner } from "@chakra-ui/react";
import { MdOutlineDownloadDone } from "react-icons/md";
import { BsUpload } from "react-icons/bs";
import Footer from "../components/footer/Footer";

const schema = z.object({
  firstName: z.string().min(2, "Minimum of 2 Characters"),
  lastName: z.string().min(2, "Minimum of 2 Characters"),
  email: z
    .string()
    .min(4, "Minimum of 4 Characters")
    .max(255, "Maximim of 255 Characters")
    .email(),
  password: z
    .string()
    .min(4, "Minimum of 4 Characters")
    .max(1024, "Maximum of 1024 Characters"),
  isChecked: z.boolean().refine((value) => value === true, {
    message: "Please agree to terms and condition",
  }),
});

export type RegisterData = z.infer<typeof schema>;

const RegisterPage = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const addRegister = useAddRegister();

  const {
    register: data,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({ resolver: zodResolver(schema) });

  const [showPassword, setShowPassword] = useState(false);
  const [pictureError, setPictureError] = useState<{ [key: string]: string }>(
    {}
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<{ [key: string]: string }>(
    {}
  );

  const onSubmit = (data: RegisterData) => {
    if (Object.keys(pictureError).length === 0) {
      let formData = {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        password: data.password,
        profilePic: uploadedImage["profilePic"],
      };

      addRegister.mutate(formData);
    }
  };

  const handlePicture = (
    e: React.ChangeEvent<HTMLInputElement>,
    item: string
  ) => {
    setPictureError({});

    const selectedFile = e.target.files?.[0];
    const fileSizeInKB = selectedFile && selectedFile.size / 1024; // convert bytes to KB
    const fileType: string | undefined = selectedFile && selectedFile.type;
    const validImageTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
    ];
    const validFileTypeRegex = new RegExp(`(${validImageTypes.join("|")})`);
    let errors: Record<string, string> = {};

    if (fileType && !validFileTypeRegex.test(fileType)) {
      errors[item] = "Only PNG, JPEG, and JPG files are allowed";
      setPictureError(errors);
    } else if (fileSizeInKB && fileSizeInKB > 500) {
      errors[item] = "File size should not be more than 500 KB";
      setPictureError(errors);
    } else {
      delete errors[item];
      base64(selectedFile, item);
    }
  };

  function base64(file: any, item: string) {
    if (item === "profilePic") setSelectedImage(file.name);

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === "string")
        setUploadedImage({ ...uploadedImage, [item]: reader.result });
    };
  }

  return (
    <LGBox>
      <Box bg={useColorModeValue("gray.50", "gray.800")}>
        <Flex minH={"100vh"} align={"center"} justify={"center"}>
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Card>
              <FormCard
                width={300}
                title1="  Join us today"
                title2=" Enter your email and password to register"
              />

              <Box
                rounded={"lg"}
                bg={useColorModeValue("white", "gray.700")}
                boxShadow={"lg"}
                p={8}
              >
                <Stack spacing={4}>
                  <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                    <HStack>
                      <Box>
                        <FormControl
                          isInvalid={errors.firstName ? true : false}
                        >
                          <FormLabel>First Name</FormLabel>
                          <Input {...data("firstName")} type="text" />
                          {errors.firstName && (
                            <FormHelperText color="red">
                              {errors.firstName.message}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Box>
                      <Box>
                        <FormControl isInvalid={errors.lastName ? true : false}>
                          <FormLabel>Last Name</FormLabel>
                          <Input {...data("lastName")} type="text" />
                          {errors.lastName && (
                            <FormHelperText color="red">
                              {errors.lastName.message}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Box>
                    </HStack>
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
                    <FormControl my={1}>
                      {selectedImage ? (
                        <Flex>
                          <FormLabel fontWeight={500}>
                            Uploaded:{" "}
                            <span>{selectedImage ? selectedImage : ""}</span>
                          </FormLabel>
                          <Icon
                            as={MdOutlineDownloadDone}
                            color="green"
                            boxSize="20px"
                            ml="-10px"
                            mt="3px"
                          />
                          <Button
                            bg="#348ded"
                            _hover={{ bg: "#70b7ff" }}
                            color="#fff"
                            mx="10px"
                            pt="5px"
                          >
                            <FormLabel htmlFor="projectImage">Change</FormLabel>
                          </Button>
                          <Button
                            bg="red"
                            color="#fff"
                            onClick={() => setSelectedImage("")}
                          >
                            Remove
                          </Button>
                        </Flex>
                      ) : (
                        <>
                          <Flex>
                            <FormLabel
                              // color="blue.500"
                              // as={Link}
                              color="gray.500"
                              cursor="pointer"
                              htmlFor="projectImage"
                            >
                              Add a Profile Picture
                            </FormLabel>
                            <Icon mt={1} as={BsUpload} />
                          </Flex>
                        </>
                      )}
                      {pictureError && (
                        <FormHelperText
                          color="red"
                          position="relative"
                          top="-15px"
                        >
                          {pictureError ? pictureError["profilePic"] : ""}
                        </FormHelperText>
                      )}
                      <Input
                        id="projectImage"
                        type="file"
                        accept="image/*"
                        size="lg"
                        hidden
                        _placeholder={{
                          opacity: 1,
                          color: "gray.500",
                          fontSize: "15px",
                        }}
                        // placeholder="Upload"
                        onChange={(e) => handlePicture(e, "profilePic")}
                      />
                    </FormControl>

                    <Stack
                      direction={{ base: "column", sm: "row" }}
                      align={"start"}
                      justify={"space-between"}
                      mt="3px"
                    >
                      <FormControl>
                        <Checkbox {...data("isChecked")}>
                          I agree to the{" "}
                          <Link
                            style={{ fontWeight: 500 }}
                            to="/termsAndCondition"
                          >
                            Terms and Conditions
                          </Link>
                        </Checkbox>
                        {errors.isChecked && (
                          <FormHelperText color="red">
                            {errors.isChecked.message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Stack>
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
                        disabled={addRegister.isPending ? true : false}
                      >
                        {addRegister.isPending ? <Spinner /> : "Sign up"}
                      </Button>
                    </Stack>
                  </form>
                  <Stack pt={6}>
                    <Text align={"center"}>
                      Already a user?{" "}
                      <Link
                        style={{ color: "#3182CE", cursor: "pointer" }}
                        to="/login"
                      >
                        Login
                      </Link>
                    </Text>
                  </Stack>
                </Stack>
              </Box>
            </Card>
          </Stack>
        </Flex>
      </Box>
      <Footer />
    </LGBox>
  );
};

export default RegisterPage;
