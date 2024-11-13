"use client";
import React, { useState } from "react";
import BlogCategoryTable from "./BlogCategoryTable";
import BlogCategoryAddForm from "./BlogCategoryAddForm";
import BlogCategoryUpdateForm from "./BlogCategoryUpdateForm";
import ViewCategories from "./ViewCategories";

const BlogCategoryPageComp = () => {
  const [open, setOpen] = useState("list");

  const handleToggle = (type) => setOpen(open === type ? null : type);

  return (
    <section className="flex flex-col space-y-4">
      {open === "list" && <BlogCategoryTable handleToggle={handleToggle} />}
      {open === "add" && <BlogCategoryAddForm handleToggle={handleToggle} />}
      {open === "edit" && (
        <BlogCategoryUpdateForm handleToggle={handleToggle} />
      )}
      {open === "view" && <ViewCategories handleToggle={handleToggle} />}
    </section>
  );
};

export default BlogCategoryPageComp;
