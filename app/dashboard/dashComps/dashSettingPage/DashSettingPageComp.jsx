"use client";
import React, { useRef, useState } from "react";
import { MdRefresh } from "react-icons/md";

const DashSettingPageComp = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    companyAddress: "",
    companyEmail: "",
    companyPhone: "",
    companyLogo: null,
  });
  const [previewLogo, setPreviewLogo] = useState(null);
  const fileInputRef = useRef(null); // Create a ref for the file input

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, companyLogo: file });
    setPreviewLogo(URL.createObjectURL(file));
  };

  const handleImageReset = () => {
    setFormData({ ...formData, companyLogo: null });
    setPreviewLogo(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null; // Reset the file input value
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log(formData);
  };
  return (
    <section className="bg-white p-6">
      <form onSubmit={handleSubmit}>
        <div className="my-6">
          <h2 className="text-2xl font-semibold">Update Settings</h2>
          <p>
            <small>Fields with (*) marks are required.</small>
          </p>
        </div>

        {/* Company Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Company Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              className="block w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Company Address
            </label>
            <input
              type="text"
              name="companyAddress"
              value={formData.companyAddress}
              onChange={handleInputChange}
              className="block w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Company Email <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              name="companyEmail"
              value={formData.companyEmail}
              onChange={handleInputChange}
              className="block w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Company Phone <span className="text-red-600">*</span>
            </label>
            <input
              type="tel"
              name="companyPhone"
              value={formData.companyPhone}
              onChange={handleInputChange}
              className="block w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
        </div>

        {/* Company Logo Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Company Logo
          </label>
          <div className="flex items-center">
            <input
              type="file"
              name="companyLogo"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef} // Assign ref to the input
              className="block w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            {previewLogo && (
              <button
                type="button" // Set type to "button"
                className="ml-4 text-red-600"
                onClick={handleImageReset}
              >
                <MdRefresh className="w-5 h-5" />
              </button>
            )}
          </div>
          {previewLogo && (
            <img
              src={previewLogo}
              alt="Preview"
              className="mt-4 max-h-48 object-contain"
            />
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-6">
          <button
            type="button" // Set type to "button" to prevent form submission
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Update
          </button>
        </div>
      </form>
    </section>
  );
};

export default DashSettingPageComp;
