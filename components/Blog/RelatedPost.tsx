import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const RelatedPost = () => {
  interface BlogPost {
    id: string;
    title: string;
    picture?: string;
  }

  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]); // State to store the fetched blogs
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Fetch blogs from the API on component mount
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blog/getblogs");
        if (!response.ok) {
          throw new Error(`Error fetching blogs: ${response.statusText}`);
        }
        const data = await response.json();
        setRelatedPosts(data); // Set the fetched blogs into state
      } catch (err) {
        setError((err as Error).message); // Set error if there's a failure
      } finally {
        setLoading(false); // Set loading to false when the request is done
      }
    };

    fetchBlogs();
  }, []); // Empty dependency array means it runs once when the component mounts

  if (loading) return <p>Loading related posts...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="animate_top rounded-md border border-stroke bg-white p-9 shadow-solid-13 dark:border-strokedark dark:bg-blacksection">
      <h4 className="mb-7.5 text-2xl font-semibold text-black dark:text-white">
        Related Posts
      </h4>

      <div>
        {relatedPosts.slice(0, 3).map((post: BlogPost, key: number) => (
          <div
            className="mb-7.5 flex flex-wrap gap-4 xl:flex-nowrap 2xl:gap-6"
            key={key}
          >
            <div className="max-w-45 relative h-18 w-35">
              {post.picture ? (
                <Image fill src={post.picture} alt="Blog" />
              ) : (
                "No image"
              )}
            </div>
            <h5 className="text-md font-medium text-black transition-all duration-300 hover:text-primary dark:text-white dark:hover:text-primary">
              <Link href={`/blog/${post.id}`}>
                {post.title.slice(0, 40)}...
              </Link>
            </h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedPost;
