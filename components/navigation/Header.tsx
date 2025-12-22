'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { solutions } from '@/app/solutions/solutionsData';
import { productCategories } from '@/app/products/productCategories';

const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Detect screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Close menu on scroll attempt
  useEffect(() => {
    const handleScroll = () => {
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
        setActiveDropdown(null);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const handleDropdownClick = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleMouseEnter = (dropdown: string) => {
    if (!isMobile) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setActiveDropdown(dropdown);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      timeoutRef.current = setTimeout(() => {
        setActiveDropdown(null);
      }, 500);
    }
  };

  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return false;
    const top = element.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top, behavior: 'smooth' });
    return true;
  };

  const goToSection = (basePath: string, id: string) => {
    console.log(`Navigating to: ${basePath}#${id}`);
    // If we're already on the page, do an in-page smooth scroll
    if (pathname === basePath) {
      const didScroll = scrollToId(id);
      if (didScroll) {
        window.history.replaceState(null, '', `${basePath}#${id}`);
      } else {
        // fallback: set hash anyway
        window.location.hash = id;
      }
      return;
    }

    // Otherwise navigate with hash
    router.push(`${basePath}#${id}`);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setActiveDropdown(null);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleLinkClick = (href: string) => {
    router.push(href);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 h-20 bg-neutral-900 border-b border-neutral-800 shadow-lg" suppressHydrationWarning>
        <nav className="container mx-auto px-4 h-full flex items-center" suppressHydrationWarning>
          <div className="flex items-center justify-between w-full">
            {/* Logo */}
           
            <Link href="/" className="flex items-center text-2xl font-bold group">
              <div className="bg-white p-1.5 rounded-lg shadow-md mr-3 flex items-center justify-center transition-transform group-hover:scale-105">
                <Image 
                  src="/logo.png" 
                  alt="Network Orbiter Logo" 
                  width={40} 
                  height={40} 
                  className="object-contain"
                  priority 
                />
              </div>
              <span className="text-green-600 tracking-tight">Network Orbiter</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8" ref={dropdownRef}>
              <Link href="/" className="text-green-500 hover:text-green-400 font-medium transition">
                Home
              </Link>

              {/* Dropdown 1: Solutions */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('solutions')}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href="/solutions"
                  className="text-green-500 hover:text-green-400 font-medium transition flex items-center gap-1"
                >
                  Solutions
                  <svg
                    className={`w-4 h-4 transition-transform ${activeDropdown === 'solutions' ? 'rotate-180' : ''
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>

                {/* Dropdown Menu */}
                {activeDropdown === 'solutions' && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-neutral-900 border border-neutral-800 rounded-md shadow-xl py-2 max-h-[70vh] overflow-y-auto z-50">
                    {solutions.map((solution) => (
                      <Link
                        key={solution.id}
                        href={`/solutions#${solution.id}`}
                        className="block w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-green-500/10 hover:text-green-400 transition border-b border-neutral-800 last:border-0"
                        onClick={() => handleLinkClick(`/solutions#${solution.id}`)}
>
                        {solution.navLabel}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Dropdown 2: Products */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('products')}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href="/products"
                  className="text-green-500 hover:text-green-400 font-medium transition flex items-center gap-1"
                >
                  Products
                  <svg
                    className={`w-4 h-4 transition-transform ${activeDropdown === 'products' ? 'rotate-180' : ''
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>

                {/* Dropdown Menu */}
                {activeDropdown === 'products' && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-neutral-900 border border-neutral-800 rounded-md shadow-xl py-2 max-h-[70vh] overflow-y-auto z-50">
                    {productCategories.map((category) => (
                      <React.Fragment key={category.id}>
                        <Link
                          key={category.id}
                          href={`/products#${category.id}`}
                          className="block w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-green-500/10 hover:text-green-400 transition border-b border-neutral-800 last:border-0"
                          onClick={() => handleLinkClick(`/products#${category.id}`)}
                        >
                          {category.name}
                        </Link>
                        {category.products.map((product) => (
                          <Link
                            key={product.id}
                            href={`/products#${product.id}`}
                            className="block w-full text-left pl-8 pr-4 py-2 text-xs text-gray-400 hover:bg-green-500/10 hover:text-green-400 transition"
                            onClick={() => handleLinkClick(`/products#${product.id}`)}
                          >
                            {product.name}
                          </Link>
                        ))}
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/about" className="text-green-500 hover:text-green-400 font-medium transition">
                About
              </Link>
              <Link href="/#demo-form" className="text-green-500 hover:text-green-400 font-medium transition">
          Contact
        </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden text-gray-50 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full bg-black shadow-xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <p className='py-10 px-3 text-white'>Network Orbiter</p>
        <div className="flex flex-col h-full">
          
          {/* Close button */}
          <div className="flex justify-end absolute right-0 top-0 p-4">
            <button
              onClick={closeMobileMenu}
              className="text-white hover:text-green-500 focus:outline-none"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2" ref={dropdownRef}>
            <Link
              href="/"
              className="block py-2 text-green-500 hover:text-green-400 font-medium transition"
              onClick={closeMobileMenu}
            >
              Home
            </Link>

            {/* Mobile Dropdown 1 */}
            <div>
              <button
                onClick={() => handleDropdownClick('solutions')}
                className="w-full flex items-center justify-between py-2 text-green-500 hover:text-green-400 font-medium transition"
              >
                Solutions
                <svg
                  className={`w-4 h-4 transition-transform ${activeDropdown === 'solutions' ? 'rotate-180' : ''
                    }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeDropdown === 'solutions' && (
                <div className="pl-4 space-y-2 mt-2">
                  {solutions.map((solution) => (
                    <Link
                      key={solution.navLabel}
                      href={`/solutions#${solution.id}`}
                      className="block py-2 text-sm text-gray-400 hover:text-green-500 transition"
>
                      {solution.navLabel}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Dropdown 2 */}
            <div>
              <button
                onClick={() => handleDropdownClick('products')}
                className="w-full flex items-center justify-between py-2 text-green-500 hover:text-green-400 font-medium transition"
              >
                Products
                <svg
                  className={`w-4 h-4 transition-transform ${activeDropdown === 'products' ? 'rotate-180' : ''
                    }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeDropdown === 'products' && (
                <div className="pl-4 space-y-2 mt-2">
                  {productCategories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/products#${category.id}`}
                      className="block py-2 text-sm text-gray-400 hover:text-green-500 transition"
>
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/about"
              className="block py-2 text-green-500 hover:text-green-400 font-medium transition"
              onClick={closeMobileMenu}
            >
              About
            </Link>
            <Link
          href="/#demo-form"
          className="block py-2 text-green-500 hover:text-green-400 font-medium transition"
          onClick={closeMobileMenu}
        >
          Contact
        </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
