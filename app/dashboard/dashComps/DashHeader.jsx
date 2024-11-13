




import Link from "next/link";
import React from "react";
import {
  IoMdArrowDropdown,
  IoMdArrowDropright,
  IoMdNotificationsOutline,
} from "react-icons/io";
import { FiSettings } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { CgSidebarOpen } from "react-icons/cg";
import { LuBellRing } from "react-icons/lu";
// import { logout } from "@/utils/authUtils/authenticateNAccessToken";
import { useRouter } from "next/navigation";

const DashHeader = ({ openDropdown, toggleDropdown }) => {
  const router = useRouter()
  const handleLogout = async (e)=>{
    const status = await logout()
  console.log("status from dash header",status)
      router.push("/");
  }
  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-white p-3 px-24 border-b shadow-sm">
      {/* Breadcrumb Navigation */}
      <div className="hidden lg:flex items-center space-x-2 text-dashAshText mb-2 md:mb-0">
        <CgSidebarOpen className="text-2xl" />
        <span>Breadcrumb</span>
        <span>
          <IoMdArrowDropright />
        </span>
        <span>Breadcrumb</span>
        <span>
          <IoMdArrowDropright />
        </span>
        <span className="">Breadcrumb</span>
      </div>

   
      {/* Icons and User Profile */}
      <div className="flex items-center space-x-6">
        <LuBellRing size={20} className="text-dashAshText" />
        <FiSettings size={20} className="text-dashAshText" />

        {/* User Dropdown */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("headerBtn")}
            className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 p-2 rounded-full border"
          >
            <FaUserCircle className="text-2xl" />
            <span className="hidden md:block">Jmc Asset Management Limited </span>
            <IoMdArrowDropdown size={20} />
          </button>
          {openDropdown === "headerBtn" && (
            <ul className="absolute right-0 mt-2 w-48 bg-white shadow-lg border rounded-lg p-2 space-y-2">
              {/* <li>
                <Link
                  href="/account-setting"
                  className="block text-gray-600 hover:bg-gray-100 p-2 rounded-lg"
                >
                  Account Setting
                </Link>
              </li> */}
              <li
                onClick={handleLogout} // Call logout function
                className="block text-gray-600 hover:bg-gray-100 p-2 rounded-lg cursor-pointer"
              >
                Log out
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashHeader;
