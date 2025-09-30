"use client"; // Make sure this stays at the top for client-side rendering

import { useEffect, useState } from "react";
import { Blog } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";
import HeroBackground from "@/components/HeroBackground";

const BlogPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleBlogs, setVisibleBlogs] = useState<Blog[]>([]); // State to control the visible blogs
  const [blogCount, setBlogCount] = useState(9); // Initial number of blogs to display

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

        setBlogs(sortedBlogs); // Set all blogs to state without slicing
        setVisibleBlogs(sortedBlogs.slice(0, blogCount)); // Set initial visible blogs
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, [blogCount]); // Re-fetch blogs when `blogCount` changes

  const loadMoreBlogs = () => {
    setBlogCount(prevCount => prevCount + 9); // Load 12 more blogs
  };

  if (loading)
    return (
      <div className="relative w-full h-screen bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
        {/* Loading Progress Bar */}
        <div className="w-3/4 md:w-1/2 bg-gray-300 rounded-full overflow-hidden">
          <div className="h-2 bg-primary animate-progress-bar"></div>
        </div>

        {/* Blurred Background */}
        <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-60 backdrop-blur-md"></div>
      </div>
    );

  if (error) return <p>Error: {error}</p>;

  return (
    <>
      {/* Blog Content */}
      <section className="pb-20 lg:pb-25 xl:pb-30">
      <section>  <HeroBackground
    imageSrc="/images/hero/herotop.webp"
    title=""
    subtitle=""
  /></section>
  
        <div className="mx-auto mt-15 max-w-c-1280 px-4 md:px-8 xl:mt-20 xl:px-0">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0 text-center mb-10">
          {/* <!-- Section Title Start --> */}
          <div className="mb-4 inline-flex items-center justify-center rounded-full bg-zumthor px-4.5 py-1.5 dark:border dark:border-strokedark dark:bg-blacksection ">
  <h2 className="text-2xl font-bold text-black dark:text-white md:w-4/5 xl:w-full text-center text-blacks">
  Latest News & Blogs
  </h2>
</div> </div>
          <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {visibleBlogs.map((blog) => (
              <div
                key={blog.id}
                className="rounded-lg bg-white p-4 pb-9 shadow-solid-8 dark:bg-blacksection"
              >
                <Link href={`/blog/${blog.id}`} className="relative block aspect-[368/239]">
                  <Image src={blog.picture} alt={blog.title} fill />
                </Link>

                <div className="px-4">
                  <h3 className="mb-3.5 mt-7.5 line-clamp-2 inline-block text-lg font-medium text-black duration-300 hover:text-primary dark:text-white dark:hover:text-primary xl:text-itemtitle2">
                    <Link href={`/blog/${blog.id}`}>
                      {`${blog.title.slice(0, 40)}...`}
                    </Link>
                  </h3>
                  <p className="line-clamp-3">
                    {blog.description
                      ? `${blog.description.substring(0, 50)}...`
                      : "No description available."}
                  </p>

                  <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    Published on: {new Date(blog.createdAt).toLocaleDateString("en-US")}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {blogs.length > visibleBlogs.length && (
            <div className="mt-8 text-center">
              <button
                onClick={loadMoreBlogs}
                className="px-6 py-2 text-white bg-primary hover:bg-primary-dark rounded-md"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default BlogPage;
