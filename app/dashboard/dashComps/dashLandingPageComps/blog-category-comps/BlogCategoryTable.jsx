// import { useBlogCategories } from "@/utils/customHooks/useBlogCategory";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { FaTrash, FaEdit, FaEye } from "react-icons/fa";

// const BlogCategoryTable = ({ handleToggle }) => {
//   const [confirmationMsg, setConfirmationMsg] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(5);

//   const { isLoading, error, blogCategories, refetchBlogCategory } =
//     useBlogCategories();

//   const handleDelete = (id) => {
//     refetchBlogCategory();
//     setConfirmationMsg("Row Deleted Successfully!");
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const handleItemsPerPageChange = (e) => {
//     setItemsPerPage(Number(e.target.value));
//     setCurrentPage(1); // Reset to the first page
//   };

//   // Pagination logic
//   const totalPages = Math.ceil(blogCategories?.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentItems = blogCategories?.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   return (
//     <div className="list">
//       <div className="page-header flex justify-between items-center mb-4 bg-white p-4 md:p-6 shadow">
//         <p className="text-xl md:text-2xl">Blog Categories</p>
//         <button
//           onClick={() => handleToggle("add")}
//           className="create-btn text-dashPrimary border-dashPrimary border bg-white rounded py-2 px-4"
//         >
//           Add
//         </button>
//       </div>

//       {confirmationMsg && (
//         <div className="mb-4 text-green-500">{confirmationMsg}</div>
//       )}

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-300 mb-4">
//           <thead>
//             <tr>
//               <th className="py-2 px-4 border-b">#ID</th>
//               <th className="py-2 px-4 border-b">Category Name</th>
//               <th className="py-2 px-4 border-b">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentItems?.map((item) => (
//               <tr key={item.id} className="text-center">
//                 <td className="py-2 px-4 border-b">{item.id}</td>
//                 <td className="py-2 px-4 border-b">{item.category_name}</td>
//                 <td className="py-3 px-4 border-b flex space-x-2 items-center justify-center">
//                   <button
//                     // onClick={() => handleToggle("edit")}
//                     className="text-dashSideNavText hover:underline"
//                   >
//                     <Link
//                       href={`/dashboard/blog-category/edit-blog-category/${item.id}`}
//                     >
//                       <FaEdit />
//                     </Link>
//                   </button>
//                   <button
//                     onClick={() => handleDelete(item.id)}
//                     className="text-dashSideNavText"
//                   >
//                     <FaTrash />
//                   </button>
//                   {/* <button
//                     onClick={() => handleToggle("view")}
//                     className="text-dashSideNavText hover:underline"
//                   >
//                     <FaEye />
//                   </button> */}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="flex flex-col md:flex-row justify-between items-center mb-4">
//         <div className="mb-2 md:mb-0">
//           <span>Items per page: </span>
//           <select
//             value={itemsPerPage}
//             onChange={handleItemsPerPageChange}
//             className="border rounded p-1"
//           >
//             <option value={5}>5</option>
//             <option value={10}>10</option>
//             <option value={15}>15</option>
//           </select>
//         </div>
//         <div className="flex flex-wrap justify-center md:justify-end">
//           {Array.from({ length: totalPages }, (_, index) => (
//             <button
//               key={index}
//               onClick={() => handlePageChange(index + 1)}
//               className={`mx-1 px-3 py-1 border rounded ${
//                 currentPage === index + 1
//                   ? "bg-blue-500 text-white"
//                   : "bg-white"
//               }`}
//             >
//               {index + 1}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogCategoryTable;

import { useBlogCategories } from "@/utils/customHooks/useBlogCategory";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaEye } from "react-icons/fa";

const BlogCategoryTable = ({ handleToggle }) => {
  const [confirmationMsg, setConfirmationMsg] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const { isLoading, error, blogCategories, refetchBlogCategory } =
    useBlogCategories();

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this category?",id)) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL_JMC_TECHNOLOGY}/api/blog/category/destroy/${id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete the category");
        }

        setConfirmationMsg("Row Deleted Successfully!");
        refetchBlogCategory(); // Refresh the list after deletion
      } catch (error) {
        console.error("Delete error:", error);
        setConfirmationMsg("Failed to delete the category.");
      }
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page
  };

  // Pagination logic
  const totalPages = Math.ceil(blogCategories?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = blogCategories?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="list">
      <div className="page-header flex justify-between items-center mb-4 bg-white p-4 md:p-6 shadow">
        <p className="text-xl md:text-2xl">Blog Categories</p>
        <button
          onClick={() => handleToggle("add")}
          className="create-btn text-dashPrimary border-dashPrimary border bg-white rounded py-2 px-4"
        >
          Add
        </button>
      </div>

      {confirmationMsg && (
        <div className="mb-4 text-green-500">{confirmationMsg}</div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 mb-4">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">#ID</th>
              <th className="py-2 px-4 border-b">Category Name</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.map((item) => (
              <tr key={item.id} className="text-center">
                <td className="py-2 px-4 border-b">{item._id}</td>
                <td className="py-2 px-4 border-b">{item.category_name}</td>
                <td className="py-3 px-4 border-b flex space-x-2 items-center justify-center">
                  <button
                    // onClick={() => handleToggle("edit")}
                    className="text-dashSideNavText hover:underline"
                  >
                    <Link
                      href={`/dashboard/blog-category/edit-blog-category/${item._id}`}
                    >
                      <FaEdit />
                    </Link>
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-dashSideNavText"
                  >
                    <FaTrash />
                  </button>
                  {/* <button
                    onClick={() => handleToggle("view")}
                    className="text-dashSideNavText hover:underline"
                  >
                    <FaEye />
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <div className="mb-2 md:mb-0">
          <span>Items per page: </span>
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="border rounded p-1"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </div>
        <div className="flex flex-wrap justify-center md:justify-end">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-1 px-3 py-1 border rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogCategoryTable;
