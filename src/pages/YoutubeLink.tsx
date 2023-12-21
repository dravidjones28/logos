import {
  FormControl,
  InputGroup,
  InputLeftElement,
  Icon,
  Input,
  FormHelperText,
  Button,
  Box,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { z } from "zod";
import useYoutubeLink from "../hooks/youtubeLink/useYoutubeLink";
import LGBox from "../components/common/LGBox";
import useYoutubeLinkUpdate from "../hooks/youtubeLink/useYoutubeLinkUpdate";

const schema = z.object({
  youtubeId: z
    .string()
    .min(11, "Youtube Link is should be minimum of 11 characters"),
});

type YoutubeLinkFormData = z.infer<typeof schema>;

const YoutubeLink = () => {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<YoutubeLinkFormData>({
    resolver: zodResolver(schema),
  });

  const { data: youtubeLink, isLoading, error } = useYoutubeLink();
  const updateLink = useYoutubeLinkUpdate();

  const onSubmit = (data: YoutubeLinkFormData) => {
    let formData = {
      ...data,
    };

    updateLink.mutate(formData);

    // addTestimonial.mutate(formData);
  };

  if (isLoading)
    return (
      <LGBox>
        <Box
          display="flex"
          height="70vh"
          justifyContent="center"
          alignItems="center"
        >
          <Spinner />
        </Box>
      </LGBox>
    );
  if (error) throw error;

  return (
    <>
      {youtubeLink?.map((item) => (
        <Text>Current Youtube Video Id : {item.youtubeId}</Text>
      ))}
      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
        <FormControl my={3}>
          <InputGroup>
            <InputLeftElement marginTop="5px">
              <Icon as={MdDriveFileRenameOutline} color="#5664d2" />
            </InputLeftElement>
            <Input
              {...register("youtubeId", {
                required: true,
              })}
              type="text"
              size="lg"
              _placeholder={{
                opacity: 1,
                color: "gray.500",
                fontSize: "15px",
              }}
              placeholder="Update Youtube Link"
            />
          </InputGroup>
          {errors.youtubeId && (
            <FormHelperText color="red">
              {errors.youtubeId.message}
            </FormHelperText>
          )}
        </FormControl>
        <Button
          isDisabled={updateLink.isPending ? true : false}
          type="submit"
          colorScheme="blue"
          mr={3}
        >
          {updateLink.isPending ? <Spinner /> : "Update"}
        </Button>
      </form>
    </>
  );
};

export default YoutubeLink;
