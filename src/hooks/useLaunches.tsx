import { useQuery } from "@tanstack/react-query";

const fetchLaunches = async () => {
  const response = await fetch("https://api.spacexdata.com/v5/launches");
  if (!response.ok) throw new Error("Failed to fetch launches");
  return response.json();
};

const useLaunches = () => {
  return useQuery({
    queryKey: ["launches"],
    queryFn: fetchLaunches,
    staleTime: 1000 * 60 * 5,
  });
};

export default useLaunches;
