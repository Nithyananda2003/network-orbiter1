import React from "react";
import { FaFacebook, FaLinkedin, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";

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
      { label: "Why Us?", href: "/" },
      { label: "About", href: "/" },
      { label: "Team", href: "/" },
      { label: "Contact", href: "/" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Wireless Transport/Backhaul", href: "/" },
      { label: "WISP Access Networks", href: "/" },
      { label: "Enterprise Private 5G", href: "/" },
      { label: "Smart City Networks", href: "/" },
      { label: "Industrial IoT Edge", href: "/" },
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Logo & quick links */}
          <div className="col-span-1">
            <a href="/" title="Network Orbiter" className="block mb-6">
              {/* Placeholder for logo */}
              <span className="text-white text-xl font-semibold">Network Orbiter</span>
            </a>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/contact" className="text-green-500 hover:text-green-400 transition font-medium">
                  CONTACT US
                </a>
              </li>
              <li>
                <a href="/support" className="hover:text-white transition">
                  SUPPORT
                </a>
              </li>
              <li>
                <a href="/demo" className="hover:text-white transition">
                  REQUEST A DEMO
                </a>
              </li>
            </ul>
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
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : "_self"}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="hover:text-white transition text-sm"
                    >
                      {link.label}
                    </a>
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
              <li><a href="/privacy-policy" className="hover:text-white">Privacy</a></li>
              <li><a href="/terms" target="_blank" rel="noopener" className="hover:text-white">Terms</a></li>
              <li><a href="/privacy-choices" target="_blank" rel="noopener" className="hover:text-white">Privacy Choices</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
