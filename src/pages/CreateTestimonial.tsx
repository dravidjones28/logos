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
  Spinner,
  Image,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MdDriveFileRenameOutline } from "react-icons/md";

import "react-quill/dist/quill.snow.css";
import "../components/common/createBlog.css";
import z from "zod";
import useAddTestimonial from "../hooks/testimonial/useAddTestimonial";
import { useLocation } from "react-router-dom";
import Footer from "../components/footer/Footer";
import { BsUpload } from "react-icons/bs";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const schema = z.object({
  testimonalName: z
    .string()
    .min(3, "Project Name must be contain minimum of 3 Characters"),

  description: z
    .string()
    .min(3, "Description must be contain minimum of 2 Characters"),
  testimonialImage: z
    .any()

    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max image size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

type TestimonialFormData = z.infer<typeof schema>;
const CreateTestimonal = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  let {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    // getValues,
    watch,
  } = useForm<TestimonialFormData>({
    resolver: zodResolver(schema),
  });
  const addTestimonial = useAddTestimonial(() => {
    reset();
  });

  const imageName = watch("testimonialImage");

  const [previewImage, setPreviewImage] = useState<any>("");

  const onSubmit = (data: TestimonialFormData) => {
    // let formData = {
    //   ...data,
    //   testimonialImage: uploadedImage["profilePicture"],
    // };
    // if (Object.keys(pictureError).length === 0) {
    // let temp = new FormData();

    // // const reader = new FileReader();

    // temp.append("testimonalName", data.testimonalName);
    // temp.append("description", data.description);
    // temp.append("testimonialImage", previewImage);

    // const testimonialData: TestimonialFormData = {
    //   testimonalName: temp.get("testimonalName") as string,
    //   description: temp.get("description") as string,
    //   testimonialImage: temp.get("testimonialImage") as File,
    //   // Add other properties if needed
    // };

    // testimonialData.testimonialImage = reader.readAsDataURL(
    //   data.testimonialImage[0]
    // );

    // console.log(testimonialData);

    let formData = {
      ...data,
      testimonialImage: previewImage,
    };

    addTestimonial.mutate(formData);
    // }
  };

  const previewFile = () => {
    const reader = new FileReader();
    reader.readAsDataURL(imageName[0]);
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
  };

  useEffect(() => {
    if (imageName) {
      previewFile();
    }
  }, [imageName]);

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
          <form onSubmit={handleSubmit((data) => onSubmit(data))} method="POST">
            {/* <FormControl my={1}>
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
                    onClick={() => {
                      setSelectedImage(null);
                      setUploadedImage({});
                    }}
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
            </FormControl> */}
            <FormControl my={3}>
              <InputGroup>
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
                    <Text ml={5} color="gray.500" fontWeight={500}>
                      {imageName && imageName[0] && imageName[0]?.name}
                    </Text>
                  </Flex>
                </>
                <Input
                  {...register("testimonialImage", {
                    required: true,
                  })}
                  id="profilePicture"
                  type="file"
                  accept="image/*"
                  hidden
                  size="lg"
                  _placeholder={{
                    opacity: 1,
                    color: "gray.500",
                    fontSize: "15px",
                  }}
                  // onChange={(event) => console.log(event.target.files)}
                  // placeholder="Enter a Your Name"
                />
              </InputGroup>
              {errors.testimonialImage && (
                <FormHelperText color="red">
                  {errors.testimonialImage.message?.toString()}
                </FormHelperText>
              )}
              {previewImage && (
                <Image
                  src={previewImage}
                  width={200}
                  height={200}
                  borderRadius="50%"
                  objectFit="cover"
                />
              )}
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

            <Button
              isDisabled={addTestimonial.isPending ? true : false}
              type="submit"
              colorScheme="blue"
              mr={3}
              mt={10}
            >
              {addTestimonial.isPending ? <Spinner /> : "Publish"}
            </Button>
          </form>
        </Card>
      </Box>
      <Box mt={20}>
        <Footer />
      </Box>
    </LGBox>
  );
};

export default CreateTestimonal;
