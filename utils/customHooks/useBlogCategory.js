import { useQuery, useQueryClient } from "@tanstack/react-query";

// tanstack query এর সাহায্যে local api fetching
import blogCategoryData from "../../assets/fake-jsons/category.blog.json"; // Adjust the path as needed

// export const useBlogCategories = () => {
//   const queryClient = useQueryClient();

//   const { isLoading, error, data } = useQuery({
//     queryKey: ["blogCategory"], // Include category in the query key
//     queryFn: async () => {
//       // You can directly return the imported JSON data
//       return new Promise((resolve) => {
//         setTimeout(() => {
//           resolve(blogCategoryData); // Simulating network delay
//         }, 1000); // Adjust the timeout duration as needed
//       });
//     },
//     staleTime: 1000 * 60 * 5, // 5 minutes
//   });

//   // Function to invalidate and refetch the blog Category query
//   const refetchBlogCategories = () => {
//     queryClient.invalidateQueries(["blogCategory"]);
//   };

//   const { category, success } = data || {};
//   return {
//     isLoading,
//     error,
//     blogCategories: category,
//     refetchBlogCategory: refetchBlogCategories,
//   };
// };

// tanstack query এর সাহায্যে online api fetching
export const useBlogCategories = () => {
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["blogCategory"], // Include category in the query key
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL_JMC_TECHNOLOGY}/api/blog/category/list`; // এখানে api wrong
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Function to invalidate and refetch the blog Category query
  const refetchBlogCategories = () => {
    queryClient.invalidateQueries(["blogCategory"]);
  };

  const { categories, success } = data || {};

  return {
    isLoading,
    error,
    blogCategories: categories,
    refetchBlogCategory: refetchBlogCategories,
  };
};

export const useBlogCategoryById = (id) => {
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["blogCategoryById", id],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL_JMC_TECHNOLOGY}/api/blog/category/${id}`
      ).then((res) => res.json()),
  });

  const refetchBlogCategoryById = () => {
    queryClient.invalidateQueries(["blogCategoryById", id]);
  };

  const { category, success } = data || {};
  console.log(
    `${process.env.NEXT_PUBLIC_BACKEND_URL_JMC_TECHNOLOGY}/api/blog/category/${id}`
  );

  return {
    isLoadingBlogCategoryById: isLoading,
    error,
    blogCategory: category,
    refetchBlogCategoryById,
  };
};
