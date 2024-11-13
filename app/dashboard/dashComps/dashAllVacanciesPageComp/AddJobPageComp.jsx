// "use client";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";

// const AddJobPageComp = () => {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     department_id: 1,
//     job_title: "",
//     job_location: "",
//     experience_level: "",
//     education_qualification: "",
//     skills_required: "",
//     compensation: "",
//     benefits: "",
//     no_of_vacancy: 1,
//     job_posted_at: new Date().toISOString(),
//     application_deadline: new Date().toISOString(),
//     status: "active",
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(formData);
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL_JMC_TECHNOLOGY}/api/job/create`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       const data = await response.data;
//       console.log(data);
//       if (data.success) {
//         router.replace("/dashboard/all-jobs");
//       }
//     } catch (error) {
//       console.error("Error submitting job:", error);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   return (
//     <div className="bg-white p-4 rounded-lg">
//       <form onSubmit={handleSubmit}>
//         <div className="grid grid-cols-1 gap-4 my-8">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Department
//             </label>
//             <select
//               name="department_id"
//               value={formData.department_id}
//               onChange={handleChange}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
//             >
//               <option value="1">Select a department</option>
//               <option value="2">Development</option>
//               <option value="3">Design</option>
//               <option value="4">Marketing</option>
//               <option value="5">Sales</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Job Title
//             </label>
//             <input
//               type="text"
//               name="job_title"
//               value={formData.job_title}
//               onChange={handleChange}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Job Location
//             </label>
//             <input
//               type="text"
//               name="job_location"
//               value={formData.job_location}
//               onChange={handleChange}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Experience Level
//             </label>
//             <select
//               name="experience_level"
//               value={formData.experience_level}
//               onChange={handleChange}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
//             >
//               <option value="entry_level">Entry Level</option>
//               <option value="mid_level">Mid Level</option>
//               <option value="senior_level">Senior Level</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Education Qualification
//             </label>
//             <textarea
//               name="education_qualification"
//               value={formData.education_qualification}
//               onChange={handleChange}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Skills Required
//             </label>
//             <textarea
//               name="skills_required"
//               value={formData.skills_required}
//               onChange={handleChange}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Compensation
//             </label>
//             <textarea
//               name="compensation"
//               value={formData.compensation}
//               onChange={handleChange}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Benefits
//             </label>
//             <textarea
//               name="benefits"
//               value={formData.benefits}
//               onChange={handleChange}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               No of Vacancy
//             </label>
//             <input
//               type="number"
//               name="no_of_vacancy"
//               value={formData.no_of_vacancy}
//               onChange={handleChange}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Job Posted At
//             </label>
//             <input
//               type="datetime-local"
//               name="job_posted_at"
//               value={formData.job_posted_at}
//               onChange={handleChange}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Application Deadline
//             </label>
//             <input
//               type="datetime-local"
//               name="application_deadline"
//               value={formData.application_deadline}
//               onChange={handleChange}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Status
//             </label>
//             <select
//               name="status"
//               value={formData.status}
//               onChange={handleChange}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
//             >
//               <option value="active">Active</option>
//               <option value="inactive">Inactive</option>
//               <option value="expired">Expired</option>
//             </select>
//           </div>

//           <div className="mt-4">
//             <button
//               type="submit"
//               className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               Submit
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddJobPageComp;

/* v2 */

"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toast

const AddJobPageComp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "", // Required
    job_thumbnail: "", // Optional
    vacancy_count: 1, // Optional
    job_responsibilities: "", // Required
    employment_status: "", // Optional
    educational_requirements: "", // Required
    experience_requirements: "", // Required
    salary: "", // Optional
    application_deadline: new Date().toISOString(), // Required
    job_posted_at: new Date().toISOString(), // Required
    status: "active", // Required
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL_JMC_TECHNOLOGY}/api/job/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.data;
      console.log(data);

      if (data.success) {
        toast.success("Job created successfully!"); // Show success message
        setTimeout(() => {
          router.replace("/dashboard/all-jobs");
        }, 2000); // Redirect after 2 seconds
      }
    } catch (error) {
      console.error("Error submitting job:", error);
      toast.error("Failed to create the job. Please try again."); // Show error message
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white p-4 rounded-lg">
      <ToastContainer /> {/* Toast container to show messages */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 my-8">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Job Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Job Thumbnail
            </label>
            <input
              type="text"
              name="job_thumbnail"
              value={formData.job_thumbnail}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              No of Vacancy
            </label>
            <input
              type="number"
              name="vacancy_count"
              value={formData.vacancy_count}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Job Responsibilities
            </label>
            <textarea
              name="job_responsibilities"
              value={formData.job_responsibilities}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Educational Requirements
            </label>
            <textarea
              name="educational_requirements"
              value={formData.educational_requirements}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Experience Requirements
            </label>
            <textarea
              name="experience_requirements"
              value={formData.experience_requirements}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Salary
            </label>
            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Application Deadline
            </label>
            <input
              type="datetime-local"
              name="application_deadline"
              value={formData.application_deadline}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Job Posted At
            </label>
            <input
              type="datetime-local"
              name="job_posted_at"
              value={formData.job_posted_at}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="active">Active</option>
              <option value="expired">Expired</option>
            </select>
          </div>

          <div className="mt-4">
            <button
              type="button"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-careerRed hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 me-6"
            >
              <Link href="/dashboard/all-vacancies">Cancel</Link>
            </button>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-dashCaviarTitleText hover:bg-dashPrimary focus:outline-none focus:ring-2 focus:ring-offset-2 "
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddJobPageComp;

