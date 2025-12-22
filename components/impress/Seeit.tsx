'use client';

import React, { useEffect, useRef, useState } from 'react';
import DecryptedText from '@/components/DecryptedText';
import Prism from './Prism';

const Seeit: React.FC = () => {
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (isModalOpen && modalVideoRef.current) {
      const video = modalVideoRef.current;
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Modal video autoplay prevented:', err);
        });
      }
    }
  }, [isModalOpen]);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]);

  return (
    <>
      <div className="w-full">
        <div className="relative flex justify-center items-center h-96 overflow-hidden bg-black">
          {/* Prism Background Animation */}
          <div className="absolute inset-0 z-0">
            <Prism
              height={3.5}
              baseWidth={5.5}
              animationType="rotate"
              glow={1}
              noise={0.5}
              transparent={true}
              scale={3.6}
              hueShift={0}
              colorFrequency={1}
              timeScale={0.5}
              bloom={1}
              suspendWhenOffscreen={true}
            />
          </div>

          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/80 z-10 vignette-overlay"></div>

          {/* Foreground Text & CTA */}
          <div className="relative z-20 text-center text-white px-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 tracking-wide leading-tight drop-shadow-lg">
              <DecryptedText
                text="SEE IT. BELIEVE IT."
                sequential
                revealDirection="start"
                speed={40}
                maxIterations={12}
                animateOn="hover"      // or "view" / "both"
                className="text-white"
                encryptedClassName="text-red-400"
                parentClassName=""
              />
            </h2>

            <div className="inline-block">
              <button
                onClick={openModal}
                title="VIEW VIDEO LIBRARY"
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-1.5 px-5 rounded transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 backdrop-blur-sm bg-opacity-90"
              >
                VIEW VIDEO LIBRARY
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isModalOpen && (
        <>
          {/* Backdrop */}
          <div
            className={`fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center p-4 transition-opacity duration-300 ${
              isModalOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={handleBackdropClick}
          >
            {/* Modal Container */}
            <div
              className={`relative w-full max-w-5xl bg-black rounded-lg shadow-2xl overflow-hidden transform transition-all duration-300 ${
                isModalOpen ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
              }`}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 text-white hover:text-red-500 transition-colors duration-200 bg-black/50 rounded-full p-2 hover:bg-black/70"
                aria-label="Close modal"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Video Player */}
              <div className="relative aspect-video">
                <video
                  ref={modalVideoRef}
                  className="w-full h-full"
                  controls
                  autoPlay
                  playsInline
                  preload="auto"
                >
                  <source src="/vid1.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Seeit;
