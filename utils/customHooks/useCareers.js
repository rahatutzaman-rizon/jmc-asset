import { useQuery, useQueryClient } from "@tanstack/react-query";

// tanstack query এর সাহায্যে local api fetching
// import careersData from "../../assets/fake-jsons/careers.json"; // Adjust the path as needed

// export const useCareers = () => {
//   const queryClient = useQueryClient();

//   const { isLoading, error, data } = useQuery({
//     queryKey: ["careers"], // Include category in the query key
//     queryFn: async () => {
//       // You can directly return the imported JSON data
//       return new Promise((resolve) => {
//         setTimeout(() => {
//           resolve(careersData); // Simulating network delay
//         }, 1000); // Adjust the timeout duration as needed
//       });
//     },
//     staleTime: 1000 * 60 * 5, // 5 minutes
//   });

//   // Function to invalidate and refetch the careers query
//   const refetchCareers = () => {
//     queryClient.invalidateQueries(["careers"]);
//   };
//   return { isLoading, error, careers: data, refetchCareers };
// };

// tanstack query এর সাহায্যে online api fetching
export const useCareers = () => {
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["careers"], // Include category in the query key
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL_JMC_TECHNOLOGY}/api/job/list`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    select: (data) => data.jobs,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Function to invalidate and refetch the careers query
  const refetchCareers = () => {
    queryClient.invalidateQueries(["careers"]);
  };

  console.log("data",data)

  return { isLoading, error, careers: data, refetchCareers };
};
