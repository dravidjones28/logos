import LGBox from "../components/common/LGBox";
import {
  Box,
  Card,
  Flex,
  Icon,
  Text,
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftElement,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { BsUpload } from "react-icons/bs";
import { MdOutlineDownloadDone } from "react-icons/md";
import "react-quill/dist/quill.snow.css";
import "../components/common/createBlog.css";
import z from "zod";
import useAddTestimonial from "../hooks/testimonial/useAddTestimonial";
import { useLocation } from "react-router-dom";

const schema = z.object({
  testimonalName: z
    .string()
    .min(3, "Project Name must be contain minimum of 3 Characters"),

  description: z
    .string()
    .min(3, "Description must be contain minimum of 2 Characters"),
});

type FormData = z.infer<typeof schema>;
const CreateTestimonal = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [pictureError, setPictureError] = useState<{ [key: string]: string }>(
    {}
  );
  const [uploadedImage, setUploadedImage] = useState<{ [key: string]: string }>(
    {}
  );

  let {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const addTestimonial = useAddTestimonial(() => {
    reset();
  });

  const onSubmit = (data: FormData) => {
    let formData = {
      ...data,
      testimonialImage: uploadedImage["profilePicture"],
    };
    if (Object.keys(pictureError).length === 0) {
      addTestimonial.mutate(formData);
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
    const validImageTypes = ["image/png", "image/jpeg", "image/jpg"];
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
    if (item === "profilePicture") setSelectedImage(file.name);

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === "string")
        setUploadedImage({ ...uploadedImage, [item]: reader.result });
    };
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    const newText = text.replace(/[\n\r]/g, "\n");
    setValue("description", newText);
  };

  return (
    <LGBox>
      <Box>
        <Text
          fontWeight={500}
          fontSize="20px"
          mx={{ base: "20px", lg: "80px" }}
          pt={{ base: "30px", lg: "15px" }}
        >
          Write your Testimonial
        </Text>
        <Card
          mx={{ base: "20px", lg: "120px" }}
          mt={{ base: "30px", lg: "20px" }}
          p={{ base: "10px", lg: "25px" }}
        >
          <form onSubmit={handleSubmit((data) => onSubmit(data))}>
            <FormControl my={1}>
              {selectedImage ? (
                <Flex>
                  <FormLabel fontWeight={500}>
                    Uploaded: <span>{selectedImage ? selectedImage : ""}</span>
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
                    <FormLabel htmlFor="profilePicture">Change</FormLabel>
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
                      htmlFor="profilePicture"
                    >
                      Add your profile picture
                    </FormLabel>
                    <Icon mt={1} as={BsUpload} />
                  </Flex>
                </>
              )}
              {pictureError && (
                <FormHelperText color="red" position="relative" top="-15px">
                  {pictureError ? pictureError["profilePicture"] : ""}
                </FormHelperText>
              )}

              <Input
                id="profilePicture"
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
                onChange={(e) => handlePicture(e, "profilePicture")}
              />
            </FormControl>
            <FormControl my={3}>
              <InputGroup>
                <InputLeftElement marginTop="5px">
                  <Icon as={MdDriveFileRenameOutline} color="#5664d2" />
                </InputLeftElement>
                <Input
                  {...register("testimonalName", {
                    required: true,
                  })}
                  type="text"
                  size="lg"
                  _placeholder={{
                    opacity: 1,
                    color: "gray.500",
                    fontSize: "15px",
                  }}
                  placeholder="Enter a Your Name"
                />
              </InputGroup>
              {errors.testimonalName && (
                <FormHelperText color="red">
                  {errors.testimonalName.message}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl id="name">
              <FormLabel>Message</FormLabel>
              <Textarea
                {...register("description", {
                  required: true,
                })}
                borderColor="gray.300"
                _hover={{
                  borderRadius: "gray.300",
                }}
                height="250px"
                onChange={handleTextareaChange}
                placeholder="message"
              />
              {errors.description && (
                <FormHelperText color="red">
                  {errors.description.message}
                </FormHelperText>
              )}
            </FormControl>

            <Button type="submit" colorScheme="blue" mr={3} mt={10}>
              Publish
            </Button>
          </form>
        </Card>
      </Box>
    </LGBox>
  );
};

export default CreateTestimonal;
