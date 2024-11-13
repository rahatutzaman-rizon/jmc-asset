"use client";

import React, { useState } from "react";
import DashBoardSideBar from "./DashBoardSideBar";
import { FiMenu } from "react-icons/fi";
import {
  MdOutlineCancel,
  // MdRefresh,
} from "react-icons/md";
import DashHeader from "./DashHeader";

const DashboardBody = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // Manage which dropdown is open

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <section>
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Sidebar */}
        <DashBoardSideBar
          openDropdown={openDropdown}
          isSidebarOpen={isSidebarOpen}
          toggleDropdown={toggleDropdown}
        />

        <div className="flex-1">
          {/* Header for dashboard */}
          <DashHeader
            openDropdown={openDropdown}
            toggleDropdown={toggleDropdown}
          />

          {/* Main Content starts */}
          <div className="p-8 overflow-hidden">{children}</div>
          {/* Main Content ends */}
        </div>

        {/* Sidebar Toggle Button for Mobile */}
        <button
          className="lg:hidden fixed top-4 right-4 z-50 p-2 text-black rounded-full "
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <MdOutlineCancel size={28} /> : <FiMenu size={28} />}
        </button>
      </div>
    </section>
  );
};

export default DashboardBody;
