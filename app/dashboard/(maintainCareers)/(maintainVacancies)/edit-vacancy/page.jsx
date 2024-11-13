"use client"

import { useState } from "react";

export default function EditJobForm() {
  const [formData, setFormData] = useState({
    title: "java",
    job_context: "",
    job_thumbnail: "java",
    vacancy_count: 1,
    job_responsibilities: "java developer",
    employment_status: "",
    educational_requirements: "bsc",
    experience_requirements: "2",
    salary: "20000",
    application_deadline: "2024-10-06 18:50:00",
    job_posted_at: "2024-11-09 17:51:00",
    status: "expired",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform your form submission logic here (e.g., send the data to the API)
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Edit Job</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Job Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Job Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Job Thumbnail */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Job Thumbnail</label>
            <input
              type="text"
              name="job_thumbnail"
              value={formData.job_thumbnail}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Vacancy Count */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Vacancy Count</label>
            <input
              type="number"
              name="vacancy_count"
              value={formData.vacancy_count}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Job Responsibilities */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Job Responsibilities</label>
            <textarea
              name="job_responsibilities"
              value={formData.job_responsibilities}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
          </div>

          {/* Employment Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Employment Status</label>
            <input
              type="text"
              name="employment_status"
              value={formData.employment_status}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Educational Requirements */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Educational Requirements</label>
            <input
              type="text"
              name="educational_requirements"
              value={formData.educational_requirements}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Experience Requirements */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Experience Requirements</label>
            <input
              type="text"
              name="experience_requirements"
              value={formData.experience_requirements}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Salary */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Salary</label>
            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Application Deadline */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Application Deadline</label>
            <input
              type="datetime-local"
              name="application_deadline"
              value={formData.application_deadline}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Job Posted At */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Job Posted At</label>
            <input
              type="datetime-local"
              name="job_posted_at"
              value={formData.job_posted_at}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="active">Active</option>
              <option value="expired">Expired</option>
            </select>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
