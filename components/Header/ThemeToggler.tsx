import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  const [stickyMenu, setStickyMenu] = useState(false);

  // Attach scroll listener
  useEffect(() => {
    const handleStickyMenu = () => {
      if (window.scrollY >= 80) {
        setStickyMenu(true);
      } else {
        setStickyMenu(false);
      }
    };

    // Add event listener
    window.addEventListener("scroll", handleStickyMenu);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("scroll", handleStickyMenu);
    };
  }, []);

  return (
    <button
      aria-label="theme toggler"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`bg-gray-2 dark:bg-dark-bg absolute  mr-1.5 flex cursor-pointer items-center justify-center rounded-full rgt text-black dark:text-white lg:static  ${
        stickyMenu ? "sticky-stage-styling" : ""
      }`}
    >
      {/* Logo for normal stage */}
      {!stickyMenu && (
        <>
          <Image
            src="/images/icon/moonwhite.webp"
            alt="normal-logo"
            width={21}
            height={21}
            className="dark:hidden"
          />
          <Image
            src="/images/icon/sunwhite.webp"
            alt="normal-logo"
            width={22}
            height={22}
            className="hidden dark:block"
          />
        </>
      )}

      {/* Logo for sticky stage */}
      {stickyMenu && (
        <>
          <Image
            src="/images/icon/moonblue.webp"
            alt="sticky-logo"
            width={21}
            height={21}
            className="dark:hidden"
          />
          <Image
            src="/images/icon/sunblue.webp"
            alt="sticky-logo"
            width={22}
            height={22}
            className="hidden dark:block"
          />
        </>
      )}
    </button>
  );
};

export default ThemeToggler;
