import React from "react";
import EditBlogForm from "@/app/dashboard/dashComps/dashBlogsPageComps/EditBlogForm";

export async function generateStaticParams() {
  const { blogs } = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL_JMC_TECHNOLOGY}/api/blogs`
  ).then((res) => res.json());
  const staticParams4updateBlog = blogs.map((blog) => ({
    id: blog._id.toString(),
  }));
  console.log("staticParams4updateBlog", staticParams4updateBlog);
  return staticParams4updateBlog;
}

export async function fetchBlogById(id) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL_JMC_TECHNOLOGY}/api/blog/${id}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const blog = await response.json();
    return blog;
  } catch (error) {
    console.error(`Failed to fetch blog by ID ${id}:`, error);
    throw error; // Re-throw the error after logging it
  }
}

const EditBlog = async ({ params: { id } }) => {
  const blog = await fetchBlogById(id);

  return (
    <section>
      {/* <EditBlogForm blog={blog} /> */}
      <EditBlogForm blogId={blog._id} />
    </section>
  );
};

export default EditBlog;
