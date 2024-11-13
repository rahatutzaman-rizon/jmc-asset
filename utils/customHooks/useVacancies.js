import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useVacancies = () => {
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["vacancies"], // Include category in the query key
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL_JMC_TECHNOLOGY}/api/job/list`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Function to invalidate and refetch the vacancies query
  const refetchVacancies = () => {
    queryClient.invalidateQueries(["vacancies"]);
  };
console.log(data)
  const { jobs, success } = data || {};

  return { isLoading, error, jobs, success, refetchVacancies };
};
