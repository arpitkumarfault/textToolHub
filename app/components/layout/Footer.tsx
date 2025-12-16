"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "../../config/site";
import { HiSparkles, HiHeart } from "react-icons/hi";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    tools: [
      { name: "Grammar Checker", href: "/tools/grammar-checker" },
      { name: "Word Counter", href: "/tools/word-counter" },
      { name: "Spell Checker", href: "/tools/spell-checker" },
      { name: "Text Formatter", href: "/tools/text-formatter" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Contact", href: "/contact" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms of Service", href: "/terms-of-service" },
      { name: "Disclaimer", href: "/disclaimer" },
    ],
  };


  return (
    <footer className="border-t border-border bg-surface/50 backdrop-blur-sm">
      {/* Gradient Divider */}
      <div className="h-1 w-full bg-gradient-to-r from-primary via-secondary to-accent" />

      <div className="container-custom py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary via-secondary to-accent">
                <HiSparkles className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-bold text-text-primary">{siteConfig.name}</h3>
            </div>
            <p className="text-sm text-text-secondary mb-4">
              Free professional text editing tools for everyone. No registration required.
            </p>
          
          </motion.div>

          {/* Popular Tools */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="mb-4 font-semibold text-text-primary">Popular Tools</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.tools.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-text-secondary transition-colors hover:text-primary hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="mb-4 font-semibold text-text-primary">Company</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-text-secondary transition-colors hover:text-primary hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="mb-4 font-semibold text-text-primary">Legal</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-text-secondary transition-colors hover:text-primary hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-12 border-t border-border pt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-sm text-text-secondary flex items-center justify-center gap-2">
            © {currentYear} {siteConfig.name}. Made with{" "}
            <HiHeart className="h-4 w-4 text-error animate-pulse" /> for writers everywhere.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;