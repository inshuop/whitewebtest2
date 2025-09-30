import Link from "next/link";

const Sidebar = () => (
  <nav style={{ width: "250px", background: "#f4f4f4", padding: "10px" }}>
    <ul>
      <li><Link href="/admin/projects">Projects</Link></li>
      <li><Link href="/admin/blogs">Blogs</Link></li>
    </ul>
  </nav>
);

export default Sidebar;
