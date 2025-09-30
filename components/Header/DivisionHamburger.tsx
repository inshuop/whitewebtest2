import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
// import ThemeToggler from "./ThemeToggler";
import { divisionOptions } from "./divisionOptions"; // Your existing division options
import menuData from "./menuData"; // Importing menuData
import { FaFacebook,  FaInstagram, FaLinkedin } from "react-icons/fa";

interface DivisionHamburgerProps {
  division: string;
  setHamburgerMenuOpen: (open: boolean) => void;
}

const DivisionHamburger: React.FC<DivisionHamburgerProps> = ({
  division,
  setHamburgerMenuOpen,
}) => {
  const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>({});
  const menuRef = useRef<HTMLDivElement>(null);

  const { options, socialLinks } = divisionOptions[division] || {
    options: [],
    socialLinks: {},
  };

  const toggleSubmenu = (submenuId: string) => {
    setOpenSubmenus((prevState) => ({
      ...prevState,
      [submenuId]: !prevState[submenuId],
    }));
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setHamburgerMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-end">
      <div
        ref={menuRef}
        className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white dark:bg-gray-900 rounded-l-2xl shadow-xl transform transition-all duration-500 ease-in-out overflow-y-auto flex flex-col"
      >
        <div> 
          {/* Header Section */}
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold textblue dark:text-gray-100">
           
              {division.charAt(0).toUpperCase() + division.slice(1)} 
            </h2>
           
            <button
              onClick={() => setHamburgerMenuOpen(false)}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors text-2xl"
            >
              &times;
            </button>
          </div>

          {/* Menu Section */}
          <ul className="px-6 py-4 space-y-3">
            {options.map((option, index) => (
              <React.Fragment key={index}>
                <li className="group flex items-center space-x-2">
                  <option.icon className="textblue dark:text-gray-300" />
                  <Link
                    href={option.path}
                    className="block text-sm font-medium textblue dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                  >
                    {option.title}
                  </Link>
                </li>
                {index < options.length - 1 && <hr className="border-gray-200 dark:border-gray-700" />}
              </React.Fragment>
            ))}
          </ul>
           <hr className="border-gray-200 dark:border-gray-700" />
          {/* "Our Divisions" menu from menuData */}
         {/* "Our Divisions" menu from menuData */}
{/* "Our Divisions" menu from menuData */}
<ul className="px-6 py-4 space-y-3">
  {menuData.map((menuItem, index) => (
    <React.Fragment key={index}>
      <li key={menuItem.id} className="group">
        {menuItem.submenu ? (
          <>
            <div className="flex justify-between items-center">
              {/* Title Clickable for Submenu Toggle */}
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => toggleSubmenu(menuItem.id.toString())}
              >
                {React.createElement(menuItem.icon, { className: "textblue dark:text-gray-300" })}
                <span className="block text-sm font-medium textblue dark:text-gray-300">
                  {menuItem.title}
                </span>
              </div>
              {/* Plus Button for Submenu Toggle */}
              <button
                onClick={() => toggleSubmenu(menuItem.id.toString())}
                className="textblue dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 transition-colors text-xl"
              >
                {openSubmenus[menuItem.id] ? "−" : "+"}
              </button>
            </div>
            <ul
              className={`ml-4 mt-2 space-y-2 overflow-hidden transition-all duration-300 ease-in-out ${
                openSubmenus[menuItem.id] ? "max-h-screen" : "max-h-0"
              }`}
            >
              {menuItem.submenu.map((submenuItem) => (
                <li key={submenuItem.id}>
                  {submenuItem.submenu ? (
                    <>
                      <div className="flex justify-between items-center">
                        {/* Submenu Title Clickable for Nested Toggle */}
                        <div
                          className="flex items-center space-x-2 cursor-pointer"
                          onClick={() => toggleSubmenu(submenuItem.id.toString())}
                        >
                          <span className="block text-sm font-medium textblue dark:text-gray-300">
                            {submenuItem.title}
                          </span>
                        </div>
                        {/* Plus Button for Nested Submenu Toggle */}
                        <button
                          onClick={() => toggleSubmenu(submenuItem.id.toString())}
                          className="textblue dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 transition-colors text-lg"
                        >
                          {openSubmenus[submenuItem.id] ? "−" : "+"}
                        </button>
                      </div>
                      <ul
                        className={`ml-4 mt-2 space-y-2 overflow-hidden transition-all duration-300 ease-in-out ${
                          openSubmenus[submenuItem.id] ? "max-h-screen" : "max-h-0"
                        }`}
                      >
                        {submenuItem.submenu.map((nestedItem) => (
                          <li key={nestedItem.id}>
                            <Link
                              href={nestedItem.path}
                              className="block textblue dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                            >
                              {nestedItem.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link
                      href={submenuItem.path}
                      className="block textblue dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                    >
                      {submenuItem.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="flex items-center space-x-2">
            {React.createElement(menuItem.icon, { className: "textblue dark:text-gray-300" })}
            <Link
              href={menuItem.path}
              className="block text-sm font-medium textblue dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
            >
              {menuItem.title}
            </Link>
          </div>
        )}
      </li>
      {index < menuData.length - 1 && <hr className="border-gray-200 dark:border-gray-700" />}
    </React.Fragment>
  ))}
</ul>


        </div>

        {/* Footer Section */}
        <div className="mt-auto">
          <div className="border-t border-gray-200 dark:border-gray-700"></div>
          <div className="px-6 py-3 flex justify-center">
            {socialLinks?.facebook && (
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-2xl mx-3"
              >
                <FaFacebook />
              </a>
            )}
         
            {socialLinks?.instagram && (
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors text-2xl mx-3"
              >
                <FaInstagram />
              </a>
            )}
            {socialLinks?.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-500 transition-colors text-2xl mx-3"
              >
                <FaLinkedin />
              </a>
            )}
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700"></div>
          <div className="text-gray-500 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-500 transition-colors text-center text-sm px-9 py-2">
            <p>
              &copy; {new Date().getFullYear()} White Aluminium Enterprises LLC. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DivisionHamburger;
