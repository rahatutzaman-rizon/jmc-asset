"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const ActiveLink = ({ href, children, className }) => {
  const pathname = usePathname();
  return (
    <Link
      className={`${
        pathname === href ? "text-white bg-dashPrimary" : ""
      } hover:text-white hover:bg-dashPrimary ${className}`}
      href={href}
    >
      {children}
    </Link>
  );
};

export default ActiveLink;
