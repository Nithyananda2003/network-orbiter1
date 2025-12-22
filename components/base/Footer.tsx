import React from "react";
import Link from "next/link";
import { FaFacebook, FaLinkedin, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import Image from "next/image";

interface FooterLinkGroup {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}

interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const footerSections: FooterLinkGroup[] = [
  {
    title: "Network Orbiter?",
    links: [
      { label: "Why Us?", href: "/about#why-us" },
      { label: "About", href: "/about" },
      { label: "Team", href: "/about#team" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Wireless Transport/Backhaul", href: "/solutions#high-performance-wireless-backhaul" },
      { label: "WISP Access Networks", href: "/solutions#wisp-access-infrastructure" },
      { label: "Enterprise Private 5G", href: "/solutions#enterprise-private-5g" },
      { label: "Smart City Networks", href: "/solutions#smart-city-networks" },
      { label: "Industrial IoT Edge", href: "/solutions#industrial-iot-edge" },
    ],
  },
];

const socialLinks: SocialLink[] = [
  {
    name: "Facebook",
    href: "/",
    icon: <FaFacebook className="w-5 h-5" />,
  },
  {
    name: "LinkedIn",
    href: "/",
    icon: <FaLinkedin className="w-5 h-5" />,
  },
  {
    name: "Twitter / X",
    href: "/",
    icon: <FaTwitter className="w-5 h-5" />,
  },
  {
    name: "YouTube",
    href: "/",
    icon: <FaYoutube className="w-5 h-5" />,
  },
  {
    name: "Instagram",
    href: "/",
    icon: <FaInstagram className="w-5 h-5" />,
  },
];

const Footer: React.FC = () => {
  return (
    <footer id="footer-main" className="bg-neutral-950 text-gray-300 py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Upper section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
              <div>
            <Image
            src="/logo.png"
            alt="Footer Image"
            width={200}
            height={200}
            className="hidden lg:block lg:col-span-1"
          />
          </div>

          {/* Dynamic link sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="col-span-1 sm:col-span-1">
              <h3 className="font-semibold mb-4 text-white uppercase tracking-wide text-sm">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={link.external ? "_blank" : "_self"}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="hover:text-white transition text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-16 pt-8 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social icons */}
            <div className="flex gap-5">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="text-gray-400 hover:text-white transition"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-gray-400 text-center md:text-left">
              © {new Date().getFullYear()} Network Orbiter. All rights reserved.
            </p>

            {/* Policy links */}
            <ul className="flex flex-wrap justify-center gap-4 text-gray-400 text-sm">
              <li><Link href="/privacy-policy" className="hover:text-white">Privacy</Link></li>
              <li><Link href="/terms" target="_blank" rel="noopener" className="hover:text-white">Terms</Link></li>
              <li><Link href="/privacy-choices" target="_blank" rel="noopener" className="hover:text-white">Privacy Choices</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
