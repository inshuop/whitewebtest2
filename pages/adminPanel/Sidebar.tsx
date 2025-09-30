import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { FaProjectDiagram, FaBlog, FaUsers, FaBuilding, FaFolder, FaEnvelope, FaFileAlt, FaImages, FaBriefcase, FaBox, FaDashcube } from "react-icons/fa";
import { MdGroup, MdManageAccounts } from "react-icons/md";


const Sidebar = () => {
  const [isPartnersOpen, setIsPartnersOpen] = useState(false);
  const { pathname } = useRouter();

  const isPartnerActive = pathname.startsWith("/admin/partnergroup") || pathname.startsWith("/admin/partners");

  const getLinkClass = (path) => {
    return pathname === path
      ? "text-white bg-blue-800 flex items-center gap-2 px-4 py-2 rounded-md transition-all"
      : "text-lg flex items-center gap-2 hover:bg-blue-700 hover:text-blue-300 px-4 py-2 rounded-md transition-all";
  };

  const handleTogglePartners = () => {
    setIsPartnersOpen(!isPartnersOpen);
  };

  

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-primary text-white p-6 space-y-6">
      <div className="flex items-center mb-8 mt-10">
        
      </div>

      <ul className="space-y-4">
      <li>
          <Link href="/admin">
            <span className={getLinkClass("/admin")}><FaDashcube/> Dashboard</span>
          </Link>
        </li>
        <li>
          <Link href="/admin/projectsu">
            <span className={getLinkClass("/admin/projectsu")}><FaProjectDiagram /> Projects</span>
          </Link>
        </li>
        <li>
          <Link href="/admin/blogs">
            <span className={getLinkClass("/admin/blogs")}><FaBlog /> Blogs</span>
          </Link>
        </li>
        <li>
          <Link href="/admin/team">
            <span className={getLinkClass("/admin/team")}><FaUsers /> Teams</span>
          </Link>
        </li>
        <li>
          <Link href="/admin/division">
            <span className={getLinkClass("/admin/division")}><FaBuilding /> Divisions</span>
          </Link>
        </li>

        <li>
          <div
            className="flex justify-between items-center text-lg cursor-pointer py-2 px-4 rounded-md hover:bg-blue-700 hover:text-blue-300"
            onClick={handleTogglePartners}
          >
            <span className="flex items-center gap-2"><MdGroup /> Partner Group</span>
            <span>{isPartnersOpen || isPartnerActive ? "▼" : "▶"}</span>
          </div>
          <ul
            className={`pl-6 mt-2 space-y-2 transition-all duration-300 ease-in-out overflow-hidden ${
              isPartnersOpen || isPartnerActive ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <li>
              <Link href="/admin/partnergroup">
                <span className={getLinkClass("/admin/partnergroup")}><MdManageAccounts /> Partner Groups</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/partners">
                <span className={getLinkClass("/admin/partners")}><MdManageAccounts /> Manage Partners</span>
              </Link>
            </li>
          </ul>
        </li>

        <li>
          <Link href="/admin/documents">
            <span className={getLinkClass("/admin/documents")}><FaFolder /> Documents</span>
          </Link>
        </li>
        <li>
          <Link href="/admin/email">
            <span className={getLinkClass("/admin/email")}><FaEnvelope /> Email</span>
          </Link>
        </li>
        <li>
          <Link href="/admin/article">
            <span className={getLinkClass("/admin/article")}><FaFileAlt /> Article</span>
          </Link>
        </li>
        <li>
          <Link href="/admin/gallery">
            <span className={getLinkClass("/admin/gallery")}><FaImages /> Gallery</span>
          </Link>
        </li>
        <li>
          <Link href="/admin/career">
            <span className={getLinkClass("/admin/career")}><FaBriefcase /> Career</span>
          </Link>
        </li>
        <li>
          <Link href="/admin/product">
            <span className={getLinkClass("/admin/product")}><FaBox /> Product</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
