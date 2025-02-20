import { useQuery } from "@tanstack/react-query";

const fetchStarWarsData = async (page: number) => {
  const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
  if (!response.ok) throw new Error("Failed to fetch data");
  return response.json();
};

const useStarWars = (page: number) => {
  return useQuery(["starWarsPeople", page], () => fetchStarWarsData(page), {
    keepPreviousData: true,
  });
};

export default useStarWars;
