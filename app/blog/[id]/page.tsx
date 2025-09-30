"use client";
import React, { useEffect, useState } from "react";
import RelatedPost from "@/components/Blog/RelatedPost";
import HeroBackground from "@/components/HeroBackground";
import Image from "next/image";
import SharePost from "@/components/Blog/SharePost";

const SingleBlogPage = ({ params }: { params: Promise<{ id: number }> }) => {
  interface Blog {
    id: number;
    title: string;
    description: string;
    picture: string;
    createdAt: string;
  }

  const [blog, setBlog] = useState<Blog | null>(null); // State to store the blog data
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [id, setId] = useState<number | null>(null);
  const [showFullDescription, setShowFullDescription] = useState(false); // State to toggle the description

  useEffect(() => {
    params.then((resolvedParams) => {
      setId(resolvedParams.id); // Unwrap the id
    });
  }, [params]);

  useEffect(() => {
    if (!id) return;

    async function fetchBlog() {
      try {
        const response = await fetch(`/api/blog/getblogss/${id}`); // Use the `id` in the API call
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        const data = await response.json();
        setBlog(data); // Set the blog data to state
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, [id]);

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

  // Function to handle the "Read More" toggle
  const handleToggleDescription = () => {
    setShowFullDescription((prev) => !prev);
  };

  // Function to truncate the description
  const getTruncatedDescription = (description: string, lineLimit: number) => {
    const lines = description.split("\n");
    return lines.slice(0, lineLimit).join("\n");
  };

  const lineLimit = 8; // Set line limit to 8 for truncating

  return (
    <section className="pb-20 pt-0 lg:pb-25 lg:pt-0 xl:pb-30 xl:pt-0">
      <section>
        <HeroBackground imageSrc="/images/hero/herotop.webp" title="" subtitle="" />
      </section>
      <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0 xl:pt-15">
        <div className="flex flex-col-reverse gap-7.5 lg:flex-row xl:gap-12.5">
          <div className="md:w-1/2 lg:w-[32%]">
            {/* Search and Categories Sidebar */}
            <RelatedPost />
          </div>

          <div className="lg:w-2/3">
            <div className="animate_top rounded-md border border-stroke bg-white p-7.5 shadow-solid-13 dark:border-strokedark dark:bg-blacksection md:p-10">
              {/* Blog Image */}
              <div className="mb-10 w-full overflow-hidden">
                <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                  <Image
                    src={blog?.picture || "/images/blog/blog-01.png"} // Use dynamic image URL
                    alt={blog?.title || "Blog Image"}
                    fill
                    className="rounded-md object-cover object-center"
                  />
                </div>
              </div>

              <h2 className="mb-5 mt-11 text-3xl font-semibold text-black dark:text-white 2xl:text-sectiontitle2">
                {blog?.title}
              </h2>

              <ul className="mb-9 flex flex-wrap gap-5 2xl:gap-7.5">
                <li>
                  <span className="text-black dark:text-white">
                    Published On: {new Date(blog?.createdAt || "").toLocaleDateString()}
                  </span>
                </li>
              </ul>

              <div className="blog-details">
                <p>
                  {showFullDescription
                    ? blog?.description
                    : getTruncatedDescription(blog?.description || "", lineLimit)}
                </p>
                {!showFullDescription && blog?.description && blog.description.split("\n").length > lineLimit && (
                  <button
                    className="text-primary mt-2 text-sm font-semibold"
                    onClick={handleToggleDescription}
                  >
                    Read More
                  </button>
                )}
              </div>

              <SharePost />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleBlogPage;
