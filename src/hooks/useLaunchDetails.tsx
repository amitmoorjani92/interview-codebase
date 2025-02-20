import { useQuery } from "@tanstack/react-query";

const fetchLaunchById = async (id:any) => {
  const response = await fetch(`https://api.spacexdata.com/v5/launches/${id}`);
  if (!response.ok) throw new Error("Failed to fetch launch details");
  return response.json();
};

const useLaunchDetails = (id:any) => {
  return useQuery({
    queryKey: ["launch", id],
    queryFn: () => fetchLaunchById(id),
    enabled: !!id, 
  });
};

export default useLaunchDetails;
