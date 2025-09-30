'use client'; // Ensure this is rendered on the client side

import { useEffect, useState } from 'react';
import ManagerHamburger from './ManagerHamburger';

const HamburgerToggler = ({ navigationOpen,  }) => {
  const [isClient, setIsClient] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentPath, setCurrentPath] = useState('');
  const [isHidden, setIsHidden] = useState(false);
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);

  // Set state to true once the component is rendered on the client
  useEffect(() => {
    setIsClient(true);

    // Set current path when component is mounted on the client side
    const path = window.location.pathname;
    setCurrentPath(path);

    // Check if the current path matches any hidden page criteria
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const hiddenPages = ['/divisions']; // Any page under /divisions
    if (path.startsWith('/divisions')) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  }, []);

  // Do not render the button if it's in the hidden pages and ensure client-side rendering
  if (!isClient || isHidden) {
    return null;
  }

  return (
    <>
      <button
        aria-label="hamburger Toggler"
        className="block xl:hidden"
        onClick={() => {
         
          setHamburgerMenuOpen(!hamburgerMenuOpen); // Toggle hamburger menu
        }}
      >
        <span className="relative block h-5.5 w-5.5 cursor-pointer">
          <span className="absolute right-0 block h-full w-full">
            <span
              className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                !navigationOpen ? '!w-full delay-300' : 'w-0'
              }`}
            ></span>
            <span
              className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                !navigationOpen ? 'delay-400 !w-full' : 'w-0'
              }`}
            ></span>
            <span
              className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                !navigationOpen ? '!w-full delay-500' : 'w-0'
              }`}
            ></span>
          </span>
          <span className="du-block absolute right-0 h-full w-full rotate-45">
            <span
              className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                !navigationOpen ? '!h-0 delay-[0]' : 'h-full'
              }`}></span>
            <span
              className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                !navigationOpen ? '!h-0 delay-200' : 'h-0.5'
              }`}
            ></span>
          </span>
        </span>
      </button>

      {/* Conditionally render the ManagerHamburger when the hamburger menu is open */}
      {hamburgerMenuOpen && (
        <ManagerHamburger
          division="marketing" // Pass the division name or dynamic value
          setHamburgerMenuOpen={setHamburgerMenuOpen} // Pass the function to close the menu
        />
      )}
    </>
    
  );
};

export default HamburgerToggler;
