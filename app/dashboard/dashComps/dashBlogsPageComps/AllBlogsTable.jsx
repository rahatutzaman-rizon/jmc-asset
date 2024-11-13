"use client";
import { SkeletonListTable } from "@/app/(components)/Shared/commonComps/AllLoadingskeletons";
import { deleteBlogs, useBlogs } from "@/utils/customHooks/useBlogs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaEye } from "react-icons/fa";

const AllBlogsTable = () => {
  // const [data, setData] = useState([]);
  const { isLoading, error, blogs, success, refetchBlogs } = useBlogs();
  const [confirmationMsg, setConfirmationMsg] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleDelete = async (id) => {
    const isConfirmDeleteBlog = confirm(`Delete blog: ${id}`);
    if (isConfirmDeleteBlog) {
      const { status } = await deleteBlogs(id);
      console.log("status", status);
      if (status === 200) {
        refetchBlogs();
        setConfirmationMsg("Row Deleted Successfully!");
        alert("Blog deleted successfully");
      } else if (status === 404) {
        alert("Blog deletion failed");
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
  const totalPages = Math.ceil(blogs?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = blogs?.slice(startIndex, startIndex + itemsPerPage);

  if (isLoading) {
    return <SkeletonListTable />;
  }

  return (
    <div className="list">
      <div className="page-header flex justify-between items-center mb-4 bg-white p-4 md:p-6 shadow">
        <p className="text-xl md:text-2xl">All Blogs</p>
        <button className="create-btn text-dashPrimary border-dashPrimary border bg-white rounded py-2 px-4">
          <Link href={"/dashboard/add-blog"}>Add Blog</Link>
        </button>
      </div>

      {confirmationMsg && (
        <div className="mb-4 text-green-500">{confirmationMsg}</div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 mb-4">
          <thead>
            <tr>
            <th className="py-2 px-4 border-b">Id</th>
            <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Category Id</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.map((item, i) => (
              <tr key={i} className="text-center">
              <td className="py-2 px-4 border-b">{item?._id}</td>
              <td className="py-2 px-4 border-b">{item?.title}</td>
                <td className="py-2 px-4 border-b">
                  {item?.seoDescriptions?.slice(0, 15) || "Description"}...
                </td>
                <td className="py-2 px-4 border-b">{item.category}</td>
                <td className="py-3 px-4 border-b flex space-x-2">
                  <button className="text-dashSideNavText hover:underline">
                    <Link
                      href={`/dashboard/edit-blog/${item._id}`}
                      // href={`/dashboard/edit-blog/66fa70038b551b78744e9282`}
                      // href={`/dashboard/edit-blog`}
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
                  <button className="text-dashSideNavText hover:underline cursor-pointer">
                    <Link href={`/blogDetails/${item?._id}`}>
                      <FaEye />
                    </Link>
                  </button>
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

export default AllBlogsTable;
