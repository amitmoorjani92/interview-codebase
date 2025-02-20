import { useQuery } from "@tanstack/react-query";

const fetchStarlinkData = async () => {
  const response = await fetch("https://api.spacexdata.com/v4/starlink");
  if (!response.ok) {
    throw new Error("Failed to fetch Starlink data");
  }
  return response.json();
};

const useStarlink = () => {
  return useQuery(["starlink"], fetchStarlinkData);
};

export default useStarlink;
