// "use client";
// import React, { useState } from "react";
// import SunEditor from "suneditor-react";
// import "suneditor/dist/css/suneditor.min.css";
// import { useRouter } from "next/navigation";
// import { useBlogs } from "@/utils/customHooks/useBlogs";
// import { useBlogCategories } from "@/utils/customHooks/useBlogCategory";

// const AddBlogForm = () => {
//   const { isLoading, error, blogs, refetchBlogs } = useBlogs();
//   const {
//     isLoading: isLoadingBlogCategory,
//     error: errorBlogCategory,
//     blogCategories: blogCategory,
//     refetchBlogCategory,
//   } = useBlogCategories();

//   const router = useRouter();
//   const [descriptions, setDescriptions] = useState("");
//   const [seoDescriptions, setSeoDescriptions] = useState("");
//   const [category, setCategory] = useState(null);
//   const [tags, setTags] = useState("");
//   const [image, setImage] = useState(null);
//   const [title, setTitle] = useState("");
//   const [status, setStatus] = useState("published");

//   const handleContentChange = (content) => {
//     console.log(content);
//     setDescriptions(content);
//   };
//   const handleImageUpload4Suneditor = (targetElement, index, state, image) => {
//     // console.log("targetElement", targetElement);
//     // console.log("index", index);
//     // console.log("state", state);
//     // console.log("image", image);
//   };
//   const handleImageUpload = (event) => {
//     setImage(event.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     // validate all fields are filled or not if not then return and show error based on that in frontend
//     if (
//       !title ||
//       !seoDescriptions ||
//       !descriptions ||
//       !category ||
//       !tags ||
//       !image ||
//       !status
//     ) {
//       alert("Please fill all the fields");
//       return;
//     }
//     formData.append("title", title);
//     formData.append("seoDescriptions", seoDescriptions);
//     formData.append("descriptions", descriptions);
//     formData.append("status", status);
//     formData.append("category_id", category);
//     formData.append("tags", JSON.stringify(tags));
//     if (image) {
//       formData.append("imagePath", image);
//     }
//     console.log(formData);
//     try {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL_JMC_TECHNOLOGY}/api/blog/create`,
//         {
//           method: "POST",
//           // headers: {
//           //   //   "Content-Type": "application/json",
//           //   authorization: `Bearer ${token}`,
//           // },
//           body: formData,
//         }
//       );
//       const data = await response.json();
//       console.log(data);
//       if (data.status == 200) {
//         refetchBlogs();
//         router.replace("/dashboard/all-blogs");
//       }
//     } catch (error) {
//       console.error("Error submitting blog:", error);
//     }
//   };

//   return (
//     <div className="">
//       <form onSubmit={handleSubmit}>
//         <div className="blogFields">
//           <input
//             type="text"
//             placeholder="Blog Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="outline-none border my-2 p-3 w-full"
//           />
//           <div className="border p-2  my-2">
//             <label className="block text-sm font-medium text-gray-700">
//               Category
//             </label>
//             <select
//               onChange={(e) => setCategory(e.target.value)}
//               name="category"
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
//             >
//               <option selected value="" disabled>
//                 Select a category
//               </option>
//               {blogCategory?.map((ctg, index) => (
//                 <option key={index} value={ctg?._id}>
//                 {ctg?.category_name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="border p-2  my-2">
//             <label className="block text-sm font-medium text-gray-700">
//               Status
//             </label>
//             <select
//               onChange={(e) => setStatus(e.target.value)}
//               name="category"
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
//             >
//               <option selected value="" disabled>
//                 Select a Status
//               </option>
//               {['published', 'unpublished', 'draft']?.map((status, index) => (
//                 <option key={index} value={status}>
//                 {status}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageUpload}
//             className="border p-2 w-full  mt-2 mb-8"
//           />

//           <div className="z-10">
//             <SunEditor
//               autoFocus={true}
//               placeholder="Enter the content"
//               width="100%"
//               height="500"
//               defaultValue={""}
//               onChange={handleContentChange}
//               onImageUpload={handleImageUpload4Suneditor}
//               setDefaultStyle={`color:black;`}
//               setOptions={{
//                 font: [
//                   "Arial",
//                   "Comic Sans MS",
//                   "Courier New",
//                   "Impact",
//                   "Georgia",
//                   "Tahoma",
//                   "Trebuchet MS",
//                   "Verdana",
//                   "Logical",
//                   "Salesforce Sans",
//                   "Garamond",
//                   "Sans-Serif",
//                   "Serif",
//                   "Times New Roman",
//                   "Helvetica",
//                 ],
//                 fontSize: [
//                   8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 36, 42, 55,
//                   60,
//                 ],
//                 popupDisplay: "local",

//                 buttonList: [
//                   ["undo", "redo"],
//                   ["font", "fontSize", "formatBlock"],
//                   ["textStyle", "fontColor", "hiliteColor", "horizontalRule"],
//                   ["bold", "underline", "italic", "strike"],
//                   ["subscript", "superscript", "removeFormat", "blockquote"],
//                   [
//                     "list",
//                     "align",
//                     "table",
//                     "image",
//                     "preview",
//                     "video",
//                     "audio",
//                   ],
//                 ],
//               }}
//             />
//           </div>
//         </div>

//         <div className="my-2">
//           <div className="seoFields grid grid-cols-1 gap-4 my-8">
//             <input
//               type="text"
//               onChange={(e) => setTags(e.target.value)}
//               className="border p-2"
//               placeholder="use comma(,) for tags"
//             />

//             <textarea
//               onChange={(e) => setSeoDescriptions(e.target.value)}
//               className="border p-2 min-h-44"
//               placeholder="seo descriptions"
//             />
//           </div>

//           <button
//             type="submit"
//             className="border p-3 bg-dashPrimary text-white w-full"
//           >
//             Submit Blog
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddBlogForm;







/* v-2  */

"use client";
import React, { useState } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { useRouter } from "next/navigation";
import { useBlogs } from "@/utils/customHooks/useBlogs";
import { useBlogCategories } from "@/utils/customHooks/useBlogCategory";

const AddBlogForm = () => {
  const { isLoading, error, blogs, refetchBlogs } = useBlogs();
  const {
    isLoading: isLoadingBlogCategory,
    error: errorBlogCategory,
    blogCategories: blogCategory,
    refetchBlogCategory,
  } = useBlogCategories();

  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    descriptions: "",
    seoDescriptions: "",
    category: null,
    tags: "",
    image: null,
    status: "published",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (event) => {
    setFormData((prev) => ({ ...prev, image: event.target.files[0] }));
  };

  const handleContentChange = (content) => {
    setFormData((prev) => ({ ...prev, descriptions: content }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, seoDescriptions, descriptions, category, tags, image, status } = formData;

    // Validate all fields
    if (!title || !seoDescriptions || !descriptions || !category || !tags || !image || !status) {
      alert("Please fill all the fields");
      return;
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("title", title);
    formDataToSubmit.append("seoDescriptions", seoDescriptions);
    formDataToSubmit.append("descriptions", descriptions);
    formDataToSubmit.append("status", status);
    formDataToSubmit.append("category_id", category);
    formDataToSubmit.append("tags", JSON.stringify(tags));
    if (image) {
      formDataToSubmit.append("imagePath", image);
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL_JMC_TECHNOLOGY}/api/blog/create`,
        {
          method: "POST",
          body: formDataToSubmit,
        }
      );
      const data = await response.json();
      if (data.status === 200) {
        refetchBlogs();
        router.replace("/dashboard/all-blogs");
      }
    } catch (error) {
      console.error("Error submitting blog:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="blogFields">
          <input
            type="text"
            name="title"
            placeholder="Blog Title"
            value={formData.title}
            onChange={handleChange}
            className="outline-none border my-2 p-3 w-full"
          />
          <div className="border p-2 my-2">
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              name="category"
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            >
              <option selected value="" disabled>Select a category</option>
              {blogCategory?.map((ctg, index) => (
                <option key={index} value={ctg?._id}>{ctg?.category_name}</option>
              ))}
            </select>
          </div>

          <div className="border p-2 my-2">
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            >
              <option selected value="" disabled>Select a Status</option>
              {['published', 'unpublished', 'draft'].map((status, index) => (
                <option key={index} value={status}>{status}</option>
              ))}
            </select>
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="border p-2 w-full mt-2 mb-8"
          />

          <div className="z-10">
            <SunEditor
              autoFocus={true}
              placeholder="Enter the content"
              width="100%"
              height="500"
              defaultValue={""}
              onChange={handleContentChange}
              setDefaultStyle={`color:black;`}
              setOptions={{
                font: [
                  "Arial", "Comic Sans MS", "Courier New", "Impact", "Georgia", 
                  "Tahoma", "Trebuchet MS", "Verdana", "Logical", "Salesforce Sans", 
                  "Garamond", "Sans-Serif", "Serif", "Times New Roman", "Helvetica",
                ],
                fontSize: [8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 36, 42, 55, 60],
                buttonList: [
                  ["undo", "redo"],
                  ["font", "fontSize", "formatBlock"],
                  ["textStyle", "fontColor", "hiliteColor", "horizontalRule"],
                  ["bold", "underline", "italic", "strike"],
                  ["subscript", "superscript", "removeFormat", "blockquote"],
                  ["list", "align", "table", "image", "preview", "video", "audio"],
                ],
              }}
            />
          </div>
        </div>

        <div className="my-2">
          <div className="seoFields grid grid-cols-1 gap-4 my-8">
            <input
              type="text"
              name="tags"
              onChange={handleChange}
              className="border p-2"
              placeholder="use comma(,) for tags"
            />
            <textarea
              name="seoDescriptions"
              onChange={handleChange}
              className="border p-2 min-h-44"
              placeholder="seo descriptions"
            />
          </div>

          <button
            type="submit"
            className="border p-3 bg-dashPrimary text-white w-full"
          >
            Submit Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlogForm;
