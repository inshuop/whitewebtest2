"use client";

import React from "react";
import { Blog } from "@/types/blog";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Helper function to format date
const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = new Date(date).toLocaleDateString("en-US", options);
  return formattedDate;
};

interface BlogItemProps {
  blogs: Blog[];
}

const BlogItem: React.FC<BlogItemProps> = ({ blogs }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Display only the first 3 blogs */}
      {blogs.map((blog) => (
        <motion.div
          key={blog.id}
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="animate_top rounded-lg bg-white p-4 pb-9 shadow-solid-8 dark:bg-blacksection"
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

            {/* Display created date */}
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Published on: {formatDate(blog.createdAt)}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default BlogItem;
