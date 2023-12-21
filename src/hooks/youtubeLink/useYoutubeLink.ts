import APIClient from "../../services/apiClient";
import { useQuery } from "@tanstack/react-query";
import ms from "ms";

export interface YoutubeLinkData {
  _id?: string;
  youtubeId?: string;
}
const apiClient = new APIClient<YoutubeLinkData[], null>("/youtubeLink");
const useYoutubeLink = () => {
  return useQuery({
    queryKey: ["youtubeLink"],
    queryFn: apiClient.getAll,
    staleTime: ms("24h"),
  });
};

export default useYoutubeLink;
