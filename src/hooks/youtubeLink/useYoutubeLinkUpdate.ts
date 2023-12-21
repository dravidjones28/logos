import { useMutation, useQueryClient } from "@tanstack/react-query";
import { YoutubeLinkData } from "./useYoutubeLink";
import APIClient from "../../services/apiClient";
import { useToast } from "@chakra-ui/react";

const apiClient = new APIClient<YoutubeLinkData, YoutubeLinkData>(
  "/youtubeLink"
);

export interface AddYoutubeLinkContext {
  previousYoutubeLink: YoutubeLinkData[];
}

const useYoutubeLinkUpdate = () => {
  const query = useQueryClient();
  const toast = useToast();

  return useMutation<
    YoutubeLinkData,
    Error,
    YoutubeLinkData,
    AddYoutubeLinkContext
  >({
    mutationFn: (data: YoutubeLinkData) =>
      apiClient.putData(data, "65848dc0002df363ec165b13"),

    onMutate: (link) => {
      const previousYoutubeLink =
        query.getQueryData<YoutubeLinkData[]>(["youtubeLink"]) || [];
      query.setQueryData<YoutubeLinkData[]>(
        ["youtubeLink"],
        (_youtubeLinks = []) => {
          const filteredYoutubeLinks = [link];
          return filteredYoutubeLinks;
        }
      );

      return { previousYoutubeLink };
    },

    onSuccess: (_res) => {
      toast({
        title: "Success",
        description: "Successfully Updated",
        position: "top",
        status: "success",
        isClosable: true,
        duration: 3000,
      });
    },

    onError: (_error, _project, context) => {
      if (!context) return;
      query.setQueryData<YoutubeLinkData[]>(
        ["youtubeLink"],
        context.previousYoutubeLink
      );
      toast({
        title: "Failed",
        description: "Something Happened",
        position: "top",
        status: "error",
        isClosable: true,
        duration: 3000,
      });
    },
  });
};

export default useYoutubeLinkUpdate;
