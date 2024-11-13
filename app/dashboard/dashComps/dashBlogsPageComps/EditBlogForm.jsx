

"use client";
import React, { useEffect, useState } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { useRouter } from "next/navigation";
import { useBlogs } from "@/utils/customHooks/useBlogs";
import { useBlogCategories } from "@/utils/customHooks/useBlogCategory";
import axios from 'axios';

const EditBlogForm = ({ blogId }) => {
  const { isLoading: isLoadingBlogs, error: errorBlogs, refetchBlogs } = useBlogs();
  const {
    isLoading: isLoadingBlogCategory,
    error: errorBlogCategory,
    blogCategories,
    refetchBlogCategory,
  } = useBlogCategories();

  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    descriptions: "",
    seoDescriptions: "",
    category: "",
    tags: "",
    image: null,
    status: "published",
  });

  const [imagePreview, setImagePreview] = useState(null);

  // Fetch blog data
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch(`https://jmctl-api.bdcare.vip/api/blog/${blogId}`);
        // const response = await fetch(`https://jmctl-api.bdcare.vip/api/blog/19`);
        if (!response.ok) throw new Error("Failed to fetch blog data");
        const data = await response.json();
        const { title, descriptions, seoDescriptions, category, tags, status, imagePath } = data;

        setFormData({
          title,
          descriptions: descriptions.replace(/<[^>]*>/g, ""), // Strip HTML tags if necessary
          seoDescriptions,
          category,
          tags,
          status,
        });

        // Set initial image preview
        setImagePreview(imagePath ? `${process.env.NEXT_PUBLIC_BACKEND_URL_JMC_TECHNOLOGY}/${imagePath}` : null);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchBlogData();
  }, [blogId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
    
    // Create a preview URL for the selected image
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleContentChange = (content) => {
    setFormData((prev) => ({ ...prev, descriptions: content }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formData",formData)
    const { title, seoDescriptions, descriptions, category, tags, image, status } = formData;

    // Validate all fields
    if (!title || !seoDescriptions || !descriptions || !category || !tags || !status) {
      alert("Please fill all the fields");
      return;
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("title", title);
    formDataToSubmit.append("seoDescriptions", seoDescriptions);
    formDataToSubmit.append("descriptions", descriptions);
    formDataToSubmit.append("status", status);
    formDataToSubmit.append("category_id", category);
    formDataToSubmit.append("_method", "PUT");
    // formDataToSubmit.append("tags", JSON.stringify(tags));
    formDataToSubmit.append("tags", tags);
    if (image) {
      formDataToSubmit.append("imagePath", image);
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL_JMC_TECHNOLOGY}/api/blog/edit/${blogId}`,
        formDataToSubmit
      );
  console.log("response",response)
      if (response.status === 200) {
        refetchBlogs();
        router.replace("/dashboard/all-blogs");
      }
    } catch (error) {
      console.error("Error updating blog:", error.response ? error.response.data : error.message);
    }
  };

  if (isLoadingBlogs || isLoadingBlogCategory) return <p>Loading...</p>;
  if (errorBlogs || errorBlogCategory) return <p>Error loading data</p>;


const takatakFn = async (e) => {
  console.log("takatak clicked");
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL_JMC_TECHNOLOGY}/api/blog/edit/${blogId}`,
      {
        title: "takatak10101010",
        descriptions: "takatak",
        status: "published",
        category_id: 6,
        tags: "jjjj,jjjjjjjjjj,jjjjjjjjjj"
      }
    );

    if (response.status === 200) {
      refetchBlogs();
      router.replace("/dashboard/all-blogs");
    }
  } catch (error) {
    console.error("Error updating blog:", error.response ? error.response.data : error.message);
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
              value={formData.category || ""}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="" disabled>Select a category</option>
              {blogCategories?.map((ctg) => (
                <option key={ctg._id} value={ctg._id}>{ctg.category_name}</option>
              ))}
            </select>
          </div>

          <div className="border p-2 my-2">
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              onChange={handleChange}
              value={formData.status}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="published">Published</option>
              <option value="unpublished">Unpublished</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <div className="mb-4">
            {imagePreview && <img src={imagePreview} alt="Preview" className="mb-2" style={{ maxWidth: '200px' }} />}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="border p-2 w-full mt-2 mb-8"
            />
          </div>

          <div className="z-10">
            <SunEditor
              autoFocus={true}
              placeholder="Enter the content"
              width="100%"
              height="500"
              setDefaultValue={formData.descriptions}
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
              value={formData.tags}
              className="border p-2"
              placeholder="Use comma(,) for tags"
            />
            <textarea
              name="seoDescriptions"
              onChange={handleChange}
              value={formData.seoDescriptions}
              className="border p-2 min-h-44"
              placeholder="SEO Descriptions"
            />
          </div>

          <button
            type="submit"
            className="border p-3 bg-dashPrimary text-white w-full"
          >
            Update Blog
          </button>
        </div>
      </form>
      <button className={"border bg-red-200"} onClick={takatakFn}>takatak</button>
    </div>
  );
};

export default EditBlogForm;



/*v-2*/


// "use client";
// import React, { useEffect, useState } from "react";
// import SunEditor from "suneditor-react";
// import "suneditor/dist/css/suneditor.min.css";
// import { useRouter } from "next/navigation";
// import { useBlogs } from "@/utils/customHooks/useBlogs";
// import { useBlogCategories } from "@/utils/customHooks/useBlogCategory";
// import axios from 'axios';

// const EditBlogForm = ({ blog }) => {
//   const { isLoading: isLoadingBlogs, error: errorBlogs, refetchBlogs } = useBlogs();
//   const {
//     isLoading: isLoadingBlogCategory,
//     error: errorBlogCategory,
//     blogCategories,
//     refetchBlogCategory,
//   } = useBlogCategories();

//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     title: blog.title || "",
//     descriptions: blog.descriptions || "",
//     seoDescriptions: blog.seoDescriptions || "",
//     category: blog.category || "",
//     tags: blog.tags || "",
//     image: null,
//     status: blog.status || "published",
//   });

//   const [imagePreview, setImagePreview] = useState(blog.imagePath ? `${process.env.NEXT_PUBLIC_BACKEND_URL_JMC_TECHNOLOGY}/${blog.imagePath}` : null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     setFormData((prev) => ({ ...prev, image: file }));
    
//     // Create a preview URL for the selected image
//     if (file) {
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   const handleContentChange = (content) => {
//     setFormData((prev) => ({ ...prev, descriptions: content }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("formData",formData)
//     const { title, seoDescriptions, descriptions, category, tags, image, status } = formData;

//     // Validate all fields
//     if (!title || !seoDescriptions || !descriptions || !category || !tags || !status) {
//       alert("Please fill all the fields");
//       return;
//     }

//     const formDataToSubmit = new FormData();
//     formDataToSubmit.append("title", title);
//     formDataToSubmit.append("seoDescriptions", seoDescriptions);
//     formDataToSubmit.append("descriptions", descriptions);
//     formDataToSubmit.append("status", status);
//     formDataToSubmit.append("category_id", category);
//     formDataToSubmit.append("tags", JSON.stringify(tags));
//     if (image) {
//       formDataToSubmit.append("imagePath", image);
//     }

//     try {
//       const response = await axios.put(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL_JMC_TECHNOLOGY}/api/blog/edit/${blog._id}`,
//         formDataToSubmit
//       );
//   console.log("response",response)
//       if (response.status === 200) {
//         refetchBlogs();
//         router.replace("/dashboard/all-blogs");
//       }
//     } catch (error) {
//       console.error("Error updating blog:", error.response ? error.response.data : error.message);
//     }
//   };

//   if (isLoadingBlogs || isLoadingBlogCategory) return <p>Loading...</p>;
//   if (errorBlogs || errorBlogCategory) return <p>Error loading data</p>;

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div className="blogFields">
//           <input
//             type="text"
//             name="title"
//             placeholder="Blog Title"
//             value={formData.title}
//             onChange={handleChange}
//             className="outline-none border my-2 p-3 w-full"
//           />
//           <div className="border p-2 my-2">
//             <label className="block text-sm font-medium text-gray-700">Category</label>
//             <select
//               name="category"
//               onChange={handleChange}
//               value={formData.category || ""}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
//             >
//               <option value="" disabled>Select a category</option>
//               {blogCategories?.map((ctg) => (
//                 <option key={ctg._id} value={ctg._id}>{ctg.category_name}</option>
//               ))}
//             </select>
//           </div>

//           <div className="border p-2 my-2">
//             <label className="block text-sm font-medium text-gray-700">Status</label>
//             <select
//               name="status"
//               onChange={handleChange}
//               value={formData.status}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
//             >
//               <option value="published">Published</option>
//               <option value="unpublished">Unpublished</option>
//               <option value="draft">Draft</option>
//             </select>
//           </div>

//           <div className="mb-4">
//             {imagePreview && <img src={imagePreview} alt="Preview" className="mb-2" style={{ maxWidth: '200px' }} />}
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageUpload}
//               className="border p-2 w-full mt-2 mb-8"
//             />
//           </div>

//           <div className="z-10">
//             <SunEditor
//               autoFocus={true}
//               placeholder="Enter the content"
//               width="100%"
//               height="500"
//               setDefaultValue={formData.descriptions}
//               onChange={handleContentChange}
//               setDefaultStyle={`color:black;`}
//               setOptions={{
//                 font: [
//                   "Arial", "Comic Sans MS", "Courier New", "Impact", "Georgia", 
//                   "Tahoma", "Trebuchet MS", "Verdana", "Logical", "Salesforce Sans", 
//                   "Garamond", "Sans-Serif", "Serif", "Times New Roman", "Helvetica",
//                 ],
//                 fontSize: [8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 36, 42, 55, 60],
//                 buttonList: [
//                   ["undo", "redo"],
//                   ["font", "fontSize", "formatBlock"],
//                   ["textStyle", "fontColor", "hiliteColor", "horizontalRule"],
//                   ["bold", "underline", "italic", "strike"],
//                   ["subscript", "superscript", "removeFormat", "blockquote"],
//                   ["list", "align", "table", "image", "preview", "video", "audio"],
//                 ],
//               }}
//             />
//           </div>
//         </div>

//         <div className="my-2">
//           <div className="seoFields grid grid-cols-1 gap-4 my-8">
//             <input
//               type="text"
//               name="tags"
//               onChange={handleChange}
//               value={formData.tags}
//               className="border p-2"
//               placeholder="Use comma(,) for tags"
//             />
//             <textarea
//               name="seoDescriptions"
//               onChange={handleChange}
//               value={formData.seoDescriptions}
//               className="border p-2 min-h-44"
//               placeholder="SEO Descriptions"
//             />
//           </div>

//           <button
//             type="submit"
//             className="border p-3 bg-dashPrimary text-white w-full"
//           >
//             Update Blog
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditBlogForm;



/* v-3 */



// "use client";
// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useBlogs } from "@/utils/customHooks/useBlogs";
// import { useBlogCategories } from "@/utils/customHooks/useBlogCategory";
// import axios from 'axios';

// const EditBlogForm = ({ blogId }) => {
//   const { isLoading: isLoadingBlogs, error: errorBlogs, refetchBlogs } = useBlogs();
//   const {
//     isLoading: isLoadingBlogCategory,
//     error: errorBlogCategory,
//     blogCategories,
  
//   } = useBlogCategories();

//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     title: "",
//     descriptions: "",
//     seoDescriptions: "",
//     category: "",
//     tags: "",
//     image: null,
//     status: "published",
//   });

//   const [imagePreview, setImagePreview] = useState(null);

//   // Fetch blog data
//   useEffect(() => {
//     const fetchBlogData = async () => {
//       try {
//         const response = await fetch(`https://jmctl-api.bdcare.vip/api/blog/${blogId}`);
//         if (!response.ok) throw new Error("Failed to fetch blog data");
//         const data = await response.json();
//         const { title, descriptions, seoDescriptions, category, tags, status, imagePath } = data;

//         setFormData({
//           title,
//           descriptions: descriptions.replace(/<[^>]*>/g, ""), // Strip HTML tags if necessary
//           seoDescriptions,
//           category,
//           tags,
//           status,
//         });

//         // Set initial image preview
//         setImagePreview(imagePath ? `${process.env.NEXT_PUBLIC_BACKEND_URL_JMC_TECHNOLOGY}/${imagePath}` : null);
//       } catch (error) {
//         console.error("Error fetching blog data:", error);
//       }
//     };

//     fetchBlogData();
//   }, [blogId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     setFormData((prev) => ({ ...prev, image: file }));

//     // Create a preview URL for the selected image
//     if (file) {
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { title, seoDescriptions, descriptions, category, tags, status, image } = formData;

//     // Validate all fields
//     if (!title || !seoDescriptions || !descriptions || !category || !tags || !status) {
//       alert("Please fill all the fields");
//       return;
//     }

//     const formDataToSubmit = new FormData();
//     formDataToSubmit.append("title", title);
//     formDataToSubmit.append("seoDescriptions", seoDescriptions);
//     formDataToSubmit.append("descriptions", descriptions);
//     formDataToSubmit.append("status", status);
//     formDataToSubmit.append("category_id", category); // Ensure this matches API expectation
//     formDataToSubmit.append("tags", tags);

//     if (image) {
//       formDataToSubmit.append("imagePath", image);
//     }

//     // Log to check what is being sent
//     console.log([...formDataToSubmit]);

//     try {
//       const response = await axios.put(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL_JMC_TECHNOLOGY}/api/blog/edit/${blogId}`,
//         formDataToSubmit
//       );

//       if (response.status === 200) {
//         refetchBlogs();
//         router.replace("/dashboard/all-blogs");
//       }
//     } catch (error) {
//       console.error("Error updating blog:", error.response ? error.response.data : error.message);
//     }
//   };

//   if (isLoadingBlogs || isLoadingBlogCategory) return <p>Loading...</p>;
//   if (errorBlogs || errorBlogCategory) return <p>Error loading data</p>;

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div className="blogFields">
//           <input
//             type="text"
//             name="title"
//             placeholder="Blog Title"
//             value={formData.title}
//             onChange={handleChange}
//             className="outline-none border my-2 p-3 w-full"
//           />
//           <div className="border p-2 my-2">
//             <label className="block text-sm font-medium text-gray-700">Category</label>
//             <select
//               name="category"
//               onChange={handleChange}
//               value={formData.category || ""}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
//             >
//               <option value="" disabled>Select a category</option>
//               {blogCategories?.map((ctg) => (
//                 <option key={ctg._id} value={ctg._id}>{ctg.category_name}</option>
//               ))}
//             </select>
//           </div>

//           <div className="border p-2 my-2">
//             <label className="block text-sm font-medium text-gray-700">Status</label>
//             <select
//               name="status"
//               onChange={handleChange}
//               value={formData.status}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
//             >
//               <option value="published">Published</option>
//               <option value="unpublished">Unpublished</option>
//               <option value="draft">Draft</option>
//             </select>
//           </div>

//           <div className="mb-4">
//             {imagePreview && <img src={imagePreview} alt="Preview" className="mb-2" style={{ maxWidth: '200px' }} />}
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageUpload}
//               className="border p-2 w-full mt-2 mb-8"
//             />
//           </div>

//           <div className="z-10">
//             <textarea
//               name="descriptions"
//               value={formData.descriptions}
//               onChange={handleChange}
//               className="w-full h-96 p-2 border"
//               placeholder="Enter the content"
//             />
//           </div>
//         </div>

//         <div className="my-2">
//           <div className="seoFields grid grid-cols-1 gap-4 my-8">
//             <input
//               type="text"
//               name="tags"
//               onChange={handleChange}
//               value={formData.tags}
//               className="border p-2"
//               placeholder="Use comma(,) for tags"
//             />
//             <textarea
//               name="seoDescriptions"
//               onChange={handleChange}
//               value={formData.seoDescriptions}
//               className="border p-2 min-h-44"
//               placeholder="SEO Descriptions"
//             />
//           </div>

//           <button
//             type="submit"
//             className="border p-3 bg-dashPrimary text-white w-full"
//           >
//             Update Blog
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditBlogForm;
