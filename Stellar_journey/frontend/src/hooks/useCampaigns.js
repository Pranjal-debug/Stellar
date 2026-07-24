import { useQuery } from "@tanstack/react-query";
import { getCampaigns } from "../services/crowdfunding";

export function useCampaigns() {
  return useQuery({
    queryKey: ["campaigns"],
    queryFn: getCampaigns,
  });
}