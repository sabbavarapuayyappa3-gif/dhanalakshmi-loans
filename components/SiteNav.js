"use client";

import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import BrandLogo from "./BrandLogo";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Loans", href: "#loans" },
  { label: "Why DLL", href: "#why-dll" },
  { label: "Reels & Stories", href: "#stories" },
  { label: "Contact", href: "#contact" },
];

export default function SiteNav({ onApply }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <div className="nav-wrap">
          <BrandLogo />
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>{link.label}</a>
            ))}
          </nav>
          <button className="button button--nav" onClick={onApply} type="button">
            Apply Now <ArrowUpRight size={16} aria-hidden="true" />
          </button>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
        <nav id="mobile-navigation" className={`mobile-nav${menuOpen ? " mobile-nav--open" : ""}`} aria-label="Mobile navigation" hidden={!menuOpen}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu}>{link.label}</a>
          ))}
          <button className="button button--primary mobile-nav__cta" onClick={() => { closeMenu(); onApply(); }} type="button">
            Apply Now <ArrowUpRight size={16} aria-hidden="true" />
          </button>
        </nav>
      </header>
    </>
  );
}
