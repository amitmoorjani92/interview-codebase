import { useQuery } from "@tanstack/react-query";

const fetchRocketById = async (id:any) => {
  const response = await fetch(`https://api.spacexdata.com/v4/rockets/${id}`);
  if (!response.ok) throw new Error("Failed to fetch rocket details");
  return response.json();
};

const useRocketDetails = (rocketId:any) => {
  return useQuery({
    queryKey: ["rocket", rocketId],
    queryFn: () => fetchRocketById(rocketId),
    enabled: !!rocketId,
  });
};

export default useRocketDetails;
