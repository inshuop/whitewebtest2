"use client";

import { useEffect, useState } from "react";
import SectionHeader from "../Common/SectionHeader";
import BlogItem from "./BlogItem";
import type { Blog } from "@/types/blog";

const Blog = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch("/api/blog/getblogs");
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        const data = await response.json();

        // Sort the blogs by createdAt (newest first)
        const sortedBlogs = data.sort((a: Blog, b: Blog) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });

        setBlogs(sortedBlogs); // Set all blogs to state
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  if (loading) return <p>Loading blogs...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="py-20 lg:py-25 xl:py-30">
      <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
        {/* Section Title */}
        <div className="animate_top mx-auto text-center">
          <SectionHeader
            headerInfo={{
              title: `NEWS & BLOGS`,
              subtitle: `Latest News & Blogs`,
              description: ``,
            }}
          />
        </div>
      </div>

      <div className="mx-auto mt-15 max-w-c-1280 px-4 md:px-8 xl:mt-20 xl:px-0">
        {/* Pass only the first 3 blogs to BlogItem */}
        <BlogItem blogs={blogs.slice(0, 3)} />
      </div>
    </section>
  );
};

export default Blog;
