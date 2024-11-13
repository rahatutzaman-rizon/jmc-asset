import { useBlogCategoryById } from "@/utils/customHooks/useBlogCategory";
import React from "react";

const ViewCategories = ({ handleToggle }) => {
  const {
    isLoadingBlogCategoryById,
    error,
    blogCategory,
    refetchBlogCategoryById,
  } = useBlogCategoryById(2);
  console.log(blogCategory);
  return (
    <div className="Add">
      {/* form for add glance comps */}
      <div className="bg-white p-4 md:p-6">
        <h1 className="text-2xl border-b mb-4 pb-4">Glance Info</h1>
        <div className="m-6">
          <p>
            <strong>id :</strong> {id}
          </p>
          <p>
            <strong>category_name :</strong> {category_name}{" "}
          </p>
        </div>
      </div>
      <div className="flex justify-center bg-white my-4 p-4">
        <button
          onClick={() => handleToggle("list")}
          className="bg-red-500 px-4 py-2 text-white rounded"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ViewCategories;
