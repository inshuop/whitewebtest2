// components/LoadingScreen.tsx
import Image from 'next/image';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center overflow-hidden z-50">
      {/* Full-Screen Sliding Background Transition */}
      <div className="absolute inset-0 bg-white transform transition-transform duration-1000 ease-in-out animate-slide-background"></div>

      {/* Content (Logo and Spinner) */}
      <div className="relative text-center p-8 rounded-xl shadow-lg bg-white bg-opacity-90 flex flex-col justify-center items-center z-10 space-y-6">
        {/* Logo */}
        <Image
          src="/images/logo/newlogo.png"
          alt="Website Logo"
          width={160}
          height={40} // Adjust height based on the aspect ratio of your logo
          className="w-40"
        />

        {/* Spinner */}
        <div className="w-16 h-16 border-t-4 border-gray-700 border-solid rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
