// import React from "react";

// const BlogCategoryAddForm = ({ handleToggle }) => {
//   //   const [first, setfirst] = useState(second);
//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     // log all data
//     console.log(e.target);
//   };
//   return (
//     <div className="Add">
//       {/* header for add glance comps */}
//       <div className=" mb-4 bg-white p-4 md:p-6">
//         <h1 className="text-xl md:text-2xl">Add</h1>
//         <p>
//           <small>Fields with (*) marks are required.</small>
//         </p>
//       </div>

//       {/* form for add glance comps */}
//       <div className="bg-white p-4 md:p-6">
//         <h1 className="text-2xl border-b mb-4 pb-4">Section Info</h1>
//         <form onSubmit={handleFormSubmit}>
//           <div className="lg:flex gap-4 items-center justify-center my-12">
//             <div className="mb-4 w-full">
//               <label htmlFor="order" className="block text-sm font-bold mb-2">
//                 Count <span className="text-red-600">*</span>
//               </label>
//               <input
//                 type="number"
//                 id="order"
//                 name="order"
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 placeholder="Enter order"
//               />
//             </div>
//             <div className="mb-4 w-full">
//               <label
//                 htmlFor="description"
//                 className="block text-sm font-bold mb-2"
//               >
//                 Text <span className="text-red-600">*</span>
//               </label>
//               <input
//                 type="text"
//                 id="description"
//                 name="description"
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 placeholder="Enter service description"
//               />
//             </div>
//           </div>

//           <div className="flex items-center justify-center gap-2">
//             <button
//               onClick={() => handleToggle("list")}
//               className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//               type="button"
//             >
//               Cancel
//             </button>
//             <button
//               className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//               type="submit"
//             >
//               Add
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default BlogCategoryAddForm;

import React, { useState } from "react";
import axios from "axios";

const BlogCategoryAddForm = ({ handleToggle }) => {
  const [category_name, setCategoryName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("category_name", category_name);
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL_JMC_TECHNOLOGY}/api/blog/category/create`,
        {
          category_name,
        }
      )
      .then((res) => {
        setSuccess(res.data.message);
        setError("");
        setCategoryName("");
        setTimeout(() => {
          handleToggle("list");
        }, 1000);
      })
      .catch((err) => {
        setError(err.response.data.message);
        setSuccess("");
      });
  };
  return (
    <div className="Add">
      {/* header for add glance comps */}
      <div className=" mb-4 bg-white p-4 md:p-6">
        <h1 className="text-xl md:text-2xl">Add</h1>
        <p>
          <small>Fields with (*) marks are required.</small>
        </p>
      </div>

      {/* form for add glance comps */}
      <div className="bg-white p-4 md:p-6">
        <h1 className="text-2xl border-b mb-4 pb-4">Section Info</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="lg:flex gap-4 items-center justify-center my-12">
            <div className="mb-4 w-full">
              <label
                htmlFor="category_name"
                className="block text-sm font-bold mb-2"
              >
                Category Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="category_name"
                name="category_name"
                value={category_name}
                onChange={(e) => setCategoryName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter category name"
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-2">
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
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
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogCategoryAddForm;
