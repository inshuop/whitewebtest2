import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Error Page - Solid SaaS Boilerplate",
  description: "This is Error page for Solid Pro",
  // other metadata
};

const ErroPage = () => {
  return (
    <section className="overflow-hidden pb-25 pt-45 lg:pb-32.5 lg:pt-50 xl:pb-37.5 xl:pt-55">
      <div className="animate_top mx-auto max-w-[518px] text-center">
        <Image
          src="/images/shape/404.svg"
          alt="404"
          className="mx-auto mb-7.5"
          width={400}
          height={400}
        />

        <h2 className="mb-5 text-2xl font-semibold text-black dark:text-white md:text-4xl">
          This Page Does Not Exist
        </h2>
        <p className="mb-7.5">
          The page you were looking for appears to have been moved, deleted or
          does not exist.
        </p>

        
      </div>
    </section>
  );
};

export default ErroPage;
