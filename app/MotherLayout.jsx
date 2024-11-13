"use client";
import React from "react";

import { usePathname } from "next/navigation";
import Header from "./(components)/Shared/header";
import Footer from "./(components)/Shared/footer";

const MotherLayout = ({ children }) => {
  const pathname = usePathname();
  console.log(!pathname.includes("dashboard"));
  return (
   <div>
   
      {!pathname.includes("dashboard") && (
        <Header className="fixed mt-[header-height] top-0 left-0 right-0 z-50" />
      )}
      {children}
      {!pathname.includes("dashboard") && <Footer />}
    
   </div>
  );
};

export default MotherLayout;
