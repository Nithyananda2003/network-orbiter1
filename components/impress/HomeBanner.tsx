'use client';

import React, { useEffect, useRef, useState } from 'react';

const NAVBAR_HEIGHT = 80; // adjust if your header height changes

const HomeBanner: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [canPlayVideo, setCanPlayVideo] = useState(false);
  const [allowMotion, setAllowMotion] = useState(true);

  // Respect prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setAllowMotion(!mediaQuery.matches);

    handleChange();

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Lazy-load video only when section is in view
  useEffect(() => {
    if (!allowMotion) return;

    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.preload = 'auto';
            setCanPlayVideo(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, [allowMotion]);

  return (
    <section
      className="relative w-full overflow-hidden bg-black"
      style={{
        height: `calc(100vh + ${NAVBAR_HEIGHT}px)`,
        marginTop: `-${NAVBAR_HEIGHT}px`, // this removes the white gap
      }}
    >
      {/* Dark radial overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.2)_10%,rgba(0,0,0,0.85)_100%)]"
      />

      {/* Background video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
        muted
        loop={allowMotion}
        playsInline
        autoPlay={allowMotion && canPlayVideo}
        preload="none"
        poster="/impress/homevid-poster.jpg"
        suppressHydrationWarning
      >
        <source src="/impress/homevid.mp4" type="video/mp4" />
      </video>

      {/* Hero content */}
      <div className="relative z-20 flex h-full items-center justify-center px-6">
        <div className="max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-medium text-white leading-tight mb-6 tracking-tight">
            Built for Mission-Critical Connectivity
          </h1>
          <p className="text-base md:text-xl text-zinc-200 max-w-2xl mx-auto leading-relaxed">
            Carrier-grade wireless communication systems engineered for
            high throughput, extreme reliability, and secure operations —
            anywhere your network needs to perform.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
