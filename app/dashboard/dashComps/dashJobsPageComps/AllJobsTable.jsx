"use client";

import { SkeletonListTable } from "@/components/Shared/commonComps/AllLoadingskeletons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

const AllJobsTable = () => {
  const [appliedJobsState, setAppliedJobsState] = useState({
    isLoading: true,
    error: null,
    appliedJobs: [],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [confirmationMsg, setConfirmationMsg] = useState("");

  const fetchAppliedJobsData = async () => {
    try {
      setAppliedJobsState((prevState) => ({
        ...prevState,
        isLoading: true,
      }));
      const response = await fetch(
        "https://jmctl-api.bdcare.vip/api/job/application/list"
      );
      const data = await response.json();
      setAppliedJobsState({
        isLoading: false,
        error: null,
        appliedJobs: data.applications,
      });
    } catch (error) {
      setAppliedJobsState((prevState) => ({
        ...prevState,
        isLoading: false,
        error: error.message || "Something went wrong",
      }));
    }
  };

  useEffect(() => {
    fetchAppliedJobsData();
  }, []);

  const handleDelete = async (id) => {
    const isConfirmDeleteJobApplication = confirm(
      `Are you sure you want to delete job ID: ${id}?`
    );
    if (isConfirmDeleteJobApplication) {
      try {
        const res = await fetch(
          `https://jmctl-api.bdcare.vip/api/job/application/destroy/${id}`,
          {
            method: "DELETE",
            // headers: {
            //   "Content-Type": "application/json",
            //   authorization: `Bearer ${token}`, // Make sure to replace with actual token if needed
            // },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to delete the job application");
        }

        // Remove deleted job from the state
        setAppliedJobsState((prevState) => ({
          ...prevState,
          appliedJobs: prevState.appliedJobs.filter((job) => job._id !== id),
        }));

        setConfirmationMsg("Job application deleted successfully!");
      } catch (error) {
        console.error("Error deleting job application:", error);
        setConfirmationMsg("Failed to delete job application.");
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
  const { appliedJobs, isLoading, error } = appliedJobsState;
  const totalPages = Math.ceil(appliedJobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = appliedJobs.slice(startIndex, startIndex + itemsPerPage);

  if (isLoading) {
    return <SkeletonListTable />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="list">
      <div className="page-header flex justify-between items-center mb-4 bg-white p-4 md:p-6 shadow">
        <p className="text-xl md:text-2xl">All Applied Jobs</p>
      </div>

      {confirmationMsg && (
        <div className="mb-4 text-green-500">{confirmationMsg}</div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 mb-4">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Applicant Name</th>
              <th className="py-2 px-4 border-b">Contact No</th>
              <th className="py-2 px-4 border-b">Job Title</th>
              <th className="py-2 px-4 border-b">Applying Date</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, i) => (
              <tr key={i}>
                <td className="py-2 px-4 border-b">
                  {item?.full_name || "Anonymous"}
                </td>
                <td className="py-2 px-4 border-b">
                  {item?.mobile || "+8801...."}
                </td>
                <td className="py-2 px-4 border-b">{item.job_title}</td>
                <td className="py-2 px-4 border-b">
                {new Date(item.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })}{" "}
  {new Date(item.date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })}</td>
                <td className="py-3 px-4 border-b flex space-x-2">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-dashSideNavText"
                  >
                    <FaTrash title="Delete Job" />
                  </button>
                  <button className="text-dashSideNavText hover:underline">
                    <Link href={`applied-job-details/${item._id }`}>
                      <FaEye title="View Job Description" />
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

export default AllJobsTable;
