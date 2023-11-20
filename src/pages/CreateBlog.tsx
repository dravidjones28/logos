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
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MdDriveFileRenameOutline, MdOutlineTitle } from "react-icons/md";
import { BsUpload } from "react-icons/bs";
import { MdOutlineDownloadDone } from "react-icons/md";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../components/common/createBlog.css";
import z from "zod";
import useAddBlogs from "../hooks/blogs/useAddBlogs";
import db from "../components/common/db";
import { useLocation } from "react-router-dom";

const schema = z.object({
  blogType: z
    .string()
    .min(3, "Project Name must be contain minimum of 3 Characters"),

  blogTitle: z.string().min(2, "Title must be contain minimum of 2 Characters"),
});

type FormData = z.infer<typeof schema>;
const CreateBlog = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  let {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const addBlog = useAddBlogs(() => {
    reset();
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [uploadedImage, setUploadedImage] = useState<{ [key: string]: string }>(
    {}
  );

  const [pictureError, setPictureError] = useState<{ [key: string]: string }>(
    {}
  );

  const [text, setText] = useState<string>("");
  const session = db();

  const onSubmit = (data: FormData) => {
    if (Object.keys(pictureError).length === 0) {
      const date = new Date();
      console.log(date);

      const day = date.getDate();
      const month = new Intl.DateTimeFormat("en", { month: "long" }).format(
        date
      );
      const year = date.getFullYear();
      const todayDate = `${day} ${month} ${year}`;
      let formData = {
        ...data,
        blogImage: uploadedImage["blogImage"],
        uploadedDate: todayDate,
        description: text,
        authorName: session?.name,
        authorImage: session?.profilePic ? session?.profilePic : "",
      };

      addBlog.mutate(formData);
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
    if (item === "blogImage") setSelectedImage(file.name);

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === "string")
        setUploadedImage({ ...uploadedImage, [item]: reader.result });
    };
  }

  return (
    <LGBox>
      <Box bg="#f5f5f5">
        <Text
          fontWeight={500}
          fontSize="20px"
          mx={{ base: "20px", lg: "80px" }}
          pt={{ base: "30px", lg: "15px" }}
        >
          Create Blog
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
                      Add a cover image
                    </FormLabel>
                    <Icon mt={1} as={BsUpload} />
                  </Flex>
                </>
              )}
              {pictureError && (
                <FormHelperText color="red" position="relative" top="-15px">
                  {pictureError ? pictureError["projectImage"] : ""}
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
                onChange={(e) => handlePicture(e, "blogImage")}
              />
            </FormControl>

            <FormControl my={3}>
              <InputGroup>
                <InputLeftElement marginTop="5px">
                  <Icon as={MdDriveFileRenameOutline} color="#5664d2" />
                </InputLeftElement>
                <Input
                  {...register("blogType", {
                    required: true,
                  })}
                  type="text"
                  size="lg"
                  _placeholder={{
                    opacity: 1,
                    color: "gray.500",
                    fontSize: "15px",
                  }}
                  placeholder="Enter a Blog Type"
                />
              </InputGroup>
              {errors.blogType && (
                <FormHelperText color="red">
                  {errors.blogType.message}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl my={3}>
              <InputGroup>
                <InputLeftElement marginTop="5px">
                  <Icon as={MdOutlineTitle} color="#5664d2" />
                </InputLeftElement>
                <Input
                  {...register("blogTitle", {
                    required: true,
                  })}
                  type="text"
                  size="lg"
                  _placeholder={{
                    opacity: 1,
                    color: "gray.500",
                    fontSize: "15px",
                  }}
                  placeholder="Enter a Blog Title"
                />
              </InputGroup>
              {errors.blogTitle && (
                <FormHelperText color="red">
                  {errors.blogTitle.message}
                </FormHelperText>
              )}
            </FormControl>

            <ReactQuill value={text} onChange={setText} />

            <Button
              disabled={addBlog.isPending ? true : false}
              type="submit"
              colorScheme="blue"
              mr={3}
              mt={10}
            >
              {addBlog.isPending ? <Spinner /> : "Publish"}
            </Button>
          </form>
        </Card>
      </Box>
    </LGBox>
  );
};

export default CreateBlog;
