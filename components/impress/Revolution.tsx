'use client';
import React, { useEffect, useRef, useCallback, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  vx: number;
  vy: number;
  color: string;
  pulse: number;
}

const Revolution: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | undefined>(undefined); // Fixed: Added initial value
  const [isVisible, setIsVisible] = useState(false);
  const lastFrameTime = useRef(0);
  const FPS_LIMIT = 60;
  const FRAME_INTERVAL = 1000 / FPS_LIMIT;

  // Initialize particles with colors
  const initParticles = useCallback((canvas: HTMLCanvasElement) => {
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 30 : 50;
    particlesRef.current = [];

    const colors = [
      'rgba(59, 130, 246, 0.8)',   // Blue
      'rgba(139, 92, 246, 0.8)',   // Purple
      'rgba(236, 72, 153, 0.8)',   // Pink
      'rgba(255, 255, 255, 0.6)',  // White
    ];

    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5 + 1,
        speedX: (Math.random() - 0.5) * 0.6,
        speedY: (Math.random() - 0.5) * 0.6,
        vx: 0,
        vy: 0,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * Math.PI * 2
      });
    }
  }, []);

  // Resize handler with throttling
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles(canvas);
  }, [initParticles]);

  // Mouse/Touch move handler
  const handlePointerMove = useCallback((e: MouseEvent | TouchEvent) => {
    if ('touches' in e) {
      mouseRef.current.x = e.touches[0].clientX;
      mouseRef.current.y = e.touches[0].clientY;
    } else {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    }
  }, []);

  // Optimized animation loop with FPS limiting
  const animate = useCallback((currentTime: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // FPS limiting
    const elapsed = currentTime - lastFrameTime.current;
    if (elapsed < FRAME_INTERVAL) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }
    lastFrameTime.current = currentTime - (elapsed % FRAME_INTERVAL);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const particles = particlesRef.current;
    const mouse = mouseRef.current;
    const maxConnectionDistance = 120;
    const mouseConnectionDistance = 150;

    // Draw grid pattern
    if (Math.random() < 0.3) { // Only draw occasionally for performance
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.03)';
      ctx.lineWidth = 0.5;

      for (let x = 0; x < canvas.width; x += 80) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += 80) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    }

    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i];

      // Mouse attraction physics
      const dx = mouse.x - particle.x;
      const dy = mouse.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < mouseConnectionDistance) {
        particle.vx += (dx / distance) * 0.001;
        particle.vy += (dy / distance) * 0.001;

        // Draw connection to mouse
        const opacity = (1 - distance / mouseConnectionDistance) * 0.5;
        const gradient = ctx.createLinearGradient(mouse.x, mouse.y, particle.x, particle.y);
        gradient.addColorStop(0, `rgba(59, 130, 246, ${opacity})`);
        gradient.addColorStop(0.5, `rgba(139, 92, 246, ${opacity})`);
        gradient.addColorStop(1, particle.color.replace('0.8', opacity.toString()));

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(mouse.x, mouse.y);
        ctx.lineTo(particle.x, particle.y);
        ctx.stroke();
      }

      // Apply damping
      particle.vx *= 0.95;
      particle.vy *= 0.95;

      // Update position
      particle.x += particle.speedX + particle.vx;
      particle.y += particle.speedY + particle.vy;

      // Boundary bounce
      if (particle.x > canvas.width || particle.x < 0) {
        particle.speedX *= -1;
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
      }
      if (particle.y > canvas.height || particle.y < 0) {
        particle.speedY *= -1;
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));
      }

      // Update pulse
      particle.pulse += 0.03;
      const pulseScale = Math.sin(particle.pulse) * 0.3 + 1;

      // Draw particle glow
      const glowGradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size * 3 * pulseScale
      );
      glowGradient.addColorStop(0, particle.color);
      glowGradient.addColorStop(0.5, particle.color.replace('0.8', '0.3'));
      glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * 3 * pulseScale, 0, Math.PI * 2);
      ctx.fill();

      // Draw particle core
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();

      // Draw particle connections (only forward to avoid duplicates)
      for (let j = i + 1; j < particles.length; j++) {
        const other = particles[j];
        const pdx = particle.x - other.x;
        const pdy = particle.y - other.y;
        const pdistance = Math.sqrt(pdx * pdx + pdy * pdy);

        if (pdistance < maxConnectionDistance) {
          const opacity = (1 - pdistance / maxConnectionDistance) * 0.3;
          const connectionGradient = ctx.createLinearGradient(
            particle.x, particle.y, other.x, other.y
          );
          connectionGradient.addColorStop(0, particle.color.replace('0.8', opacity.toString()));
          connectionGradient.addColorStop(1, other.color.replace('0.8', opacity.toString()));

          ctx.strokeStyle = connectionGradient;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          ctx.stroke();
        }
      }
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [FRAME_INTERVAL]);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    const currentCanvas = canvasRef.current;
    if (currentCanvas) {
      observer.observe(currentCanvas);
    }

    return () => {
      if (currentCanvas) {
        observer.unobserve(currentCanvas);
      }
    };
  }, []);

  // Main canvas setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    initParticles(canvas);

    // Event listeners
    const handleMouseMove = (e: MouseEvent) => handlePointerMove(e);
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      handlePointerMove(e);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('resize', handleResize);

    // Start animation when visible
    if (isVisible) {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [initParticles, handleResize, handlePointerMove, animate, isVisible]);

  return (
    <div className="home-banner w-full bg-black py-16 md:py-24 relative overflow-hidden">
      {/* Multi-layer Animated Wave Background */}
      <div className="absolute inset-0">
        {/* Primary wave */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-900/15 to-transparent animate-wave"></div>

        {/* Secondary wave with offset */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-900/10 to-transparent animate-wave-reverse"
          style={{ animationDelay: '2s' }}
        ></div>

        {/* Tertiary wave */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-900/8 to-transparent animate-wave"
          style={{ animationDelay: '4s' }}
        ></div>

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent"></div>

        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Wave animation styles moved to global.css to avoid styled-jsx hydration issues */}


      {/* Enhanced Network Particles Canvas */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
          isVisible ? 'opacity-40' : 'opacity-0'
        }`}
        style={{ zIndex: 1 }}
        aria-hidden="true"
      />

      {/* Floating decorative elements */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-50"></div>
      <div className="absolute top-20 right-20 w-3 h-3 bg-purple-400 rounded-full animate-ping opacity-50" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-pink-400 rounded-full animate-ping opacity-50" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-20 right-1/3 w-3 h-3 bg-blue-300 rounded-full animate-ping opacity-50" style={{ animationDelay: '3s' }}></div>

      {/* Content Container */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 items-center gap-8">
          <motion.div
            className="data text-center max-w-5xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Main Heading with gradient text */}
            <motion.h1
              className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <span className="bg-gradient-to-r text-3xl from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                LEADING THE
              </span>
              <br />
              <motion.span
                className="inline-block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                style={{ backgroundSize: '200% 200%' }}
              >
                MIMO REVOLUTION
              </motion.span>
            </motion.h1>

            {/* Description with enhanced styling */}
            <motion.p
              className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-3xl mx-auto px-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            >
              Deep roots in <span className="text-blue-300 font-semibold">R&amp;D</span>.
              Relentless testing in critical real-world situations.
              We innovate <span className="text-purple-300 font-semibold">Mobile-Networked MIMO (MN-MIMO)</span>
              <br className="hidden md:block" />
              wireless communications systems to deliver throughput, range and robustness that were previously thought impossible.
            </motion.p>

            {/* Enhanced CTA Button */}
            <motion.div
              className="btn inline-block mb-8 group"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="/demo"
                className="primary inline-flex items-center gap-3 bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 hover:from-red-700 hover:via-pink-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl text-lg relative overflow-hidden border border-white/10"
                title="REQUEST A DEMO"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  REQUEST A DEMO
                </span>

                {/* Animated shimmer effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>

                {/* Glow effect */}
                <span className="absolute inset-0 rounded-xl bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </a>
            </motion.div>

            {/* Stats indicators */}
            <motion.div
              className="flex flex-wrap justify-center items-center gap-6 md:gap-8 text-sm md:text-base text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-gray-300">10+ Years R&D Excellence</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                <span className="text-gray-300">50+ Global Deployments</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                <span className="text-gray-300">99.9% Network Reliability</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Network Orbiter Technologies",
            "url": "https://networkorbiter.com",
            "logo": "https://networkorbiter.com/logo.png",
            "description": "Leading the MIMO revolution with innovative Mobile-Networked MIMO (MN-MIMO) wireless communications systems.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "10990 Wilshire Blvd., Suite #1500",
              "addressLocality": "Los Angeles",
              "addressRegion": "CA",
              "postalCode": "90024",
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 34.0574171,
              "longitude": -118.4470367
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "09:00",
              "closes": "17:00"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+1-310-479-3333",
              "contactType": "sales",
              "areaServed": "US",
              "availableLanguage": "English",
              "email": "info@networkorbiter.com"
            },
            "sameAs": [
              "https://twitter.com/networkorbiter",
              "https://linkedin.com/company/networkorbiter",
              "https://github.com/networkorbiter"
            ]
          })
        }}
      />
    </div>
  );
};

Revolution.displayName = 'RevolutionHero';

export default Revolution;
