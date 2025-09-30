import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";

import InquiryForm from './InquiryForm';
import DivisionHamburger from './DivisionHamburger';
import ManagerHamburger from './ManagerHamburger';


const Header = () => {
 
  const [navigationOpen] = useState(false);
 
  const [stickyMenu, setStickyMenu] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false); // Inquiry form popup state
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);

  const pathUrl = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const isDivisionPage = pathUrl && pathUrl.includes("/divisions/");

  // Sticky menu effect
  const handleStickyMenu = () => {
    if (window.scrollY >= 80) {
      setStickyMenu(true);
    } else {
      setStickyMenu(false);
    }
  };

 

  // Determine which division the user is in based on the path
  const getDivision = () => {
    if (pathUrl && pathUrl.includes("/divisions/GlassDivision")) {
      return "Glass Processing";
    } else if (pathUrl && pathUrl.includes("/divisions/ArchitecturalAluminium")) {
      return "Architectural Aluminium";
    }else if (pathUrl &&  pathUrl.includes("/divisions/AutomaticEntrance")) {
      return "Automatic Entrance";
    }else if  (pathUrl &&  pathUrl.includes("/divisions/CommercialDivision")) {
      return "Commercial Division";
    }else if (pathUrl &&  pathUrl.includes("/divisions/FireRatedGlazedDoors")) {
      return "Fire Rated Glazed Doors";
    }else if (pathUrl &&  pathUrl.includes("/divisions/KitchenDivision")) {
      return "Kitchen Division";
    }
    return null;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);
    return () => {
      window.removeEventListener("scroll", handleStickyMenu);
    };
  }, []);

 

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setHamburgerMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const division = getDivision();

  return (
    <header
    className={`fixed left-0 top-0 z-99999 w-full py-7  ${
      stickyMenu
        ? "!py-1 shadow transition duration-100 dark:bg-black bg-white text-blue-500"
        : "text-white headerbgcm "
    } `}
    >  
   
      <div className="relative mx-auto items-center justify-around px-4 md:px-8 xl:flex 2xl:px-0 ">
        <div className="flex w-full items-center justify-between xl:w-1/5  ">
          <Link href="/" className=" w-auto h-auto">
            {stickyMenu ? (
              <>
                <Image
                  src="/images/logo/newlogo.png"
                  alt="sticky logo"
                  width={119.03}
                  height={30}
                  priority
                  className="rounded-t-lg transition-transform duration-300 hover:scale-105 w-[60%] sm:w-[80%] h-auto "

    style={{
      objectFit: "cover", // Apply object fit using style
    }}
                 
                />
              
              </>
            ) : (
              <>
                <Image
                  src="/images/logo/newlogo.png"
                  alt="logo"
                  width={119.03}
                  height={30}
                  priority
                  className="rounded-t-lg transition-transform duration-300 hover:scale-105 w-[70%] sm:w-[95%] h-auto "
                  style={{
                    objectFit: "cover", // Apply object fit using style
                  }}
                  
                />
                
             
                
              </>
            )}
          </Link>
          <button
        aria-label="hamburger Toggler"
        className={`block xl:hidden ${isDivisionPage ? 'hidden' : ''}`}

        onClick={() => {
         
          setHamburgerMenuOpen(!hamburgerMenuOpen); // Toggle hamburger menu
        }}
      >
        <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="absolute right-0 block h-full w-full">
              <span className="relative flex flex-col items-center justify-center">
  {/* First Line */}
  <span
    className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm transition-all duration-200 ease-in-out ${
      !navigationOpen ? "w-full delay-300" : "w-0"
    } ${stickyMenu ? "bg-blue-600" : "bg-white"} dark:bg-white`}
  ></span>

  {/* Second Line */}
  <span
    className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm transition-all duration-200 ease-in-out ${
      !navigationOpen ? "w-full delay-400" : "w-0"
    } ${stickyMenu ? "bg-blue-600" : "bg-white"} dark:bg-white`}
  ></span>

  {/* Third Line */}
  <span
    className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm transition-all duration-200 ease-in-out ${
      !navigationOpen ? "w-full delay-500" : "w-0"
    } ${stickyMenu ? "bg-blue-600" : "bg-white"} dark:bg-white`}
  ></span>

  {/* Icon background line (rotate 45 degrees) */}
  
    {/* First rotating line */}
  
</span>

              </span>
            </span>
      </button>
       
         
          {division && (
  <button
    aria-label="hamburger Toggler"
    className="relative block h-5.5 w-5.5 cursor-pointer xl:hidden  "
    onClick={() => setHamburgerMenuOpen(!hamburgerMenuOpen)}
  >
     <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="absolute right-0 block h-full w-full">
              <span className="relative flex flex-col items-center justify-center">
  {/* First Line */}
  <span
    className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm transition-all duration-200 ease-in-out ${
      !navigationOpen ? "w-full delay-300" : "w-0"
    } ${stickyMenu ? "bg-blue-600" : "bg-white"} dark:bg-white`}
  ></span>

  {/* Second Line */}
  <span
    className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm transition-all duration-200 ease-in-out ${
      !navigationOpen ? "w-full delay-400" : "w-0"
    } ${stickyMenu ? "bg-blue-600" : "bg-white"} dark:bg-white`}
  ></span>

  {/* Third Line */}
  <span
    className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm transition-all duration-200 ease-in-out ${
      !navigationOpen ? "w-full delay-500" : "w-0"
    } ${stickyMenu ? "bg-blue-600" : "bg-white"} dark:bg-white`}
  ></span>

  {/* Icon background line (rotate 45 degrees) */}
  
    {/* First rotating line */}
  
</span>

              </span>
            </span>
  </button>
)}
        </div>

        {/* Nav Menu */}
        <div
  className={`invisible h-0 w-full items-center justify-around xl:visible xl:flex xl:h-auto navmenuadjust ${
    navigationOpen
      ? "navbar !visible mt-4 h-auto rounded-md bg-white p-7.5 shadow-solid-5 dark:bg-blacksection xl:h-auto xl:p-0 xl:shadow-none xl:dark:bg-transparent"
      : "h-0"
  }`}
>
<nav className="relative z-50">
  <ul className="flex justify-center items-center gap-8 py-4">
    {menuData.map((menuItem) => (
      <li key={menuItem.id} className="relative group">
        <Link
          href={menuItem.path || "#"}
          className="flex items-center gap-2 relative"
        >
          {menuItem.title}
          <span className="absolute bottom-0 right-0 w-full h-[2px] bg-primary transform scale-x-0 group-hover:scale-x-100 transition-all duration-500 origin-left"></span>
        </Link>

        {/* First Level Dropdown */}
        {menuItem.submenu && (
          <ul className="absolute top-full left-0 w-[52vw] bg-white shadow-xl rounded-md p-2 grid grid-cols-2 gap-4 mt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transform scale-95 group-hover:scale-100 transition-all duration-300 ease-in-out z-50">
            {menuItem.submenu.map((submenuItem) => (
              <li key={submenuItem.id} className="relative group/submenu">
                <Link
                  href={submenuItem.path || "#"}
                  className="flex items-center gap-4 hover:bg-gray-100 p-3 rounded-md transition"
                >
                  {submenuItem.logo && (
                    <Image
                      src={submenuItem.logo}
                      alt={submenuItem.title}
                      width={100}
                      height={100}
                      className="rounded-md"
                    />
                  )}
                  <div>
                    <span className="font-semibold text-sm text-blue-600">
                      {submenuItem.title}
                    </span>
                    {submenuItem.details && (
                      <p className="text-xs text-gray-500">
                        {submenuItem.details}
                      </p>
                    )}
                  </div>
                </Link>

                {/* Second Level Dropdown */}
                {submenuItem.submenu && (
                  <ul className="absolute top-full left-0 w-[25vw] bg-white shadow-lg rounded-md p-4 mt-0 opacity-0 invisible group-hover/submenu:opacity-100 group-hover/submenu:visible transform scale-95 group-hover/submenu:scale-100 transition-all duration-300 ease-in-out z-50">
                    {submenuItem.submenu.map((subItem) => (
                      <li
                        key={subItem.id}
                        className="hover:bg-gray-100 p-2 rounded-md transition"
                      >
                        <Link
                          href={subItem.path || "#"}
                          className="flex items-center gap-4"
                        >
                          {subItem.logo && (
                            <Image
                              src={subItem.logo}
                              alt={subItem.title}
                              width={100}
                              height={100}
                              className="rounded-md"
                            />
                          )}
                          <div>
                            <span className="font-semibold text-sm text-blue-600">
                              {subItem.title}
                            </span>
                            {subItem.details && (
                              <p className="text-xs text-gray-500">
                                {subItem.details}
                              </p>
                            )}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </li>
    ))}
  </ul>
</nav>



  
         
  <div className="mt-7 flex items-center gap-6 xl:mt-0 mbcmt ">
  <div className="hidden sm:block">
    <ThemeToggler />
  </div>

 

  {/* Get A Quote Button */}
  <button
  onClick={() => setInquiryOpen(true)} // Trigger popup for inquiry form
  className={`relative inline-flex items-center justify-center p-2 px-4 text-base font-semibold  bg-transparent border-2 border-blue-600 rounded-full group overflow-hidden hover:text-white hover:border-transparent hover:ring-2 hover:ring-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-500 transition-all duration-300 ease-in-out ${
    stickyMenu ? ' text-blue-500' : 'text-white'
  }`}
>
  <span className="absolute inset-0 w-full h-full bg-blue-600 text-blue-500 transform scale-0 group-hover:scale-100 group-hover:opacity-90 transition-all duration-300 ease-in-out"></span>
  <span className="relative z-10">Get A Quote</span>
</button>
{division && (
  <button
    aria-label="hamburger Toggler"
    className="relative block h-5.5 w-5.5 cursor-pointer items-center justify-center  "
    onClick={() => setHamburgerMenuOpen(!hamburgerMenuOpen)}
  >
     <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="absolute right-0 block h-full w-full">
              <span className="relative flex flex-col items-center justify-center">
  {/* First Line */}
  <span
    className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm transition-all duration-200 ease-in-out ${
      !navigationOpen ? "w-full delay-300" : "w-0"
    } ${stickyMenu ? "bg-blue-600" : "bg-white"} dark:bg-white`}
  ></span>

  {/* Second Line */}
  <span
    className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm transition-all duration-200 ease-in-out ${
      !navigationOpen ? "w-full delay-400" : "w-0"
    } ${stickyMenu ? "bg-blue-600" : "bg-white"} dark:bg-white`}
  ></span>

  {/* Third Line */}
  <span
    className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm transition-all duration-200 ease-in-out ${
      !navigationOpen ? "w-full delay-500" : "w-0"
    } ${stickyMenu ? "bg-blue-600" : "bg-white"} dark:bg-white`}
  ></span>

  {/* Icon background line (rotate 45 degrees) */}
  
    {/* First rotating line */}
  
</span>

              </span>
            </span>
  </button>
)}
</div>


          
</div>

 {/* Division Hamburger Toggler */}


      </div>
      {division && hamburgerMenuOpen && (
        <DivisionHamburger division={division} setHamburgerMenuOpen={setHamburgerMenuOpen} />
      )}


{inquiryOpen && (
        <InquiryForm setInquiryOpen={setInquiryOpen} />
      )}

{hamburgerMenuOpen && (
        <ManagerHamburger
          division="marketing" // Pass the division name or dynamic value
          setHamburgerMenuOpen={setHamburgerMenuOpen} // Pass the function to close the menu
        />
      )}
    </header>
  );
};

export default Header;
