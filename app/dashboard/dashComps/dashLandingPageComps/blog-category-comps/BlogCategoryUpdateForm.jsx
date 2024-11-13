import React from "react";

const BlogCategoryUpdateForm = ({ handleToggle }) => {
  return (
    <div className="Add">
      {/* header for add glance comps */}
      <div className=" mb-4 bg-white p-4 md:p-6">
        <h1 className="text-xl md:text-2xl">Update Glance Info</h1>
        <p>
          <small>Fields with (*) marks are required.</small>
        </p>
      </div>

      {/* form for add glance comps */}
      <div className="bg-white p-4 md:p-6">
        <h1 className="text-2xl border-b mb-4 pb-4">Section Info</h1>
        <form>
          <div className="lg:flex gap-4 items-center justify-center my-12">
            <div className="mb-4 w-full">
              <label htmlFor="order" className="block text-sm font-bold mb-2">
                Count <span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                id="order"
                name="order"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter order"
              />
            </div>
            <div className="mb-4 w-full">
              <label
                htmlFor="description"
                className="block text-sm font-bold mb-2"
              >
                Text <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="description"
                name="description"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter service description"
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => handleToggle("list")}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Cancel
            </button>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogCategoryUpdateForm;
