import {
  FaHome,
  FaBook,
} from "react-icons/fa";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { IoMdArrowDropdown } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "../../../public/images/asset.svg"

// Navigation items for the sidebar
const navItemsUp = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <FaHome className="mr-2" />,
  },
  {
    name: "Blog",
    href: "",
    icon: <FaBook className="mr-2" />,
    dropdown: [
      {
        name: "All Blogs",
        href: "/dashboard/all-blogs",
      },
      {
        name: "Category",
        href: "/dashboard/blog-category",
      },
    ],
  },
  {
    name: "Career",
    href: "",
    icon: <AiOutlineMenuUnfold className="mr-2" />,
    dropdown: [
      {
        name: "All Vacancies",
        href: "/dashboard/all-vacancies",
      },
      {
        name: "All Applied Jobs",
        href: "/dashboard/all-applied-jobs",
      },
    ],
  },

  {
    name: "Featured Properties",
    href: "",
    icon: <AiOutlineMenuUnfold className="mr-2" />,
    dropdown: [
      {
        name: "Featured Properties",
        href: "/dashboard/featuredProperties",
      },
    
    ],
  },
];

// ActiveLink component to highlight the active route
const ActiveLink = ({ href, children }) => {
  const pathname = usePathname();
  return (
    <Link
      className={`${
        pathname === href ? "text-black bg-dashPrimary" : "text-dashCaviarTitleText"
      } flex items-center p-2 rounded-lg text-lg hover:bg-black hover:text-white transition-colors duration-300`}
      href={href}
    >
      {children}
    </Link>
  );
};

const DashBoardSideBar = ({ isSidebarOpen, openDropdown, toggleDropdown }) => {
  return (
    <>
      <style jsx>{`
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 9999px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        * {
          scrollbar-width: thin;
          scrollbar-color: #d1d5db transparent;
        }
      `}</style>

      <aside
        className={`w-full lg:w-1/5 bg-white lg:static fixed ${
          isSidebarOpen ? "left-0" : "-left-full"
        } transition-all duration-300 ease-in-out border-e max-h-screen overflow-y-auto z-50`}
      >
        <div className="flex items-center p-24 md:p-32"> {/* Adjusted padding */}
          <Link href="/">
            <Image
              src={logo}
              alt="JMC Asset Management Limited"
              layout="responsive"
              width={40} // Reduced width
              height={50} // Reduced height
              className="w-auto cursor-pointer"
            />
          </Link>
        </div>


        <nav className="min-h-screen">
          <ul className="space-y-1 px-6"> {/* Reduced space between buttons */}
            {navItemsUp.map((item, index) => (
              <li key={index}>
                {item.dropdown ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className="flex justify-between items-center w-full p-2 text-dashCaviarTitleText rounded-lg text-lg hover:bg-black hover:text-white transition-colors duration-300"
                    >
                      <div className="flex items-center">
                        {item.icon}
                        <span>{item.name}</span>
                      </div>
                      <IoMdArrowDropdown size={20} />
                    </button>
                    {openDropdown === item.name && (
                      <ul className="pl-5 space-y-1">
                        {item.dropdown.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <ActiveLink href={subItem.href}>
                              {subItem.name}
                            </ActiveLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <ActiveLink href={item.href}>
                    {item.icon}
                    {item.name}
                  </ActiveLink>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default DashBoardSideBar;
