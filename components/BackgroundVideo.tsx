import React from 'react';

const BackgroundVideo: React.FC = () => {
  return (
    <div
  className="relative overflow-hidden h-[70vh] sm:h-[100vh]"
>
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover', // Ensures the video covers the container
          zIndex: -1, // Sends the video behind content
        }}
      >
        <source src="/video/bgtest.mp4" type="video/mp4" />
        <source src="/video/background.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* Foreground Content */}
      {/* <div style={{ position: 'relative', zIndex: 1, color: 'white', textAlign: 'center', paddingTop: '40vh' }}>
        <h1>Welcome to My Website</h1>
        <p>Enjoy the immersive background experience!</p>
      </div> */}
    </div>
  );
};

export default BackgroundVideo;
