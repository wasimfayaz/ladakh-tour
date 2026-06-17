'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

interface HeaderProps {
  onEnquireClick: () => void;
}

export default function Header({ onEnquireClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <a href="#" className="logo" onClick={(e) => handleNavClick(e, 'hero')}>
          <span className="logo-icon">🏔️</span>
          <div className="logo-text">
            <span className="logo-title">Ladakh Tour</span>
            <span className="logo-subtitle">Package.com</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="desktop-nav">
          <a href="#hero" onClick={(e) => handleNavClick(e, 'hero')}>Home</a>
          <a href="#packages" onClick={(e) => handleNavClick(e, 'packages')}>Packages</a>
          <a href="#destinations" onClick={(e) => handleNavClick(e, 'destinations')}>Destinations</a>
          <a href="#why-choose-us" onClick={(e) => handleNavClick(e, 'why-choose-us')}>Why Us</a>
          <a href="#testimonials" onClick={(e) => handleNavClick(e, 'testimonials')}>Reviews</a>
          <a href="#enquiry" onClick={(e) => handleNavClick(e, 'enquiry')}>Contact</a>
        </nav>

        <div className="header-actions">
          <a href="tel:+919876543210" className="phone-link">
            <Phone size={18} />
            <span>+91 98765 43210</span>
          </a>
          <button className="btn-primary header-cta" onClick={onEnquireClick}>
            Enquire Now
          </button>
          
          {/* Mobile Menu Button */}
          <button className="mobile-menu-btn" onClick={toggleMobileMenu} aria-label="Toggle menu">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          <a href="#hero" onClick={(e) => handleNavClick(e, 'hero')}>Home</a>
          <a href="#packages" onClick={(e) => handleNavClick(e, 'packages')}>Packages</a>
          <a href="#destinations" onClick={(e) => handleNavClick(e, 'destinations')}>Destinations</a>
          <a href="#why-choose-us" onClick={(e) => handleNavClick(e, 'why-choose-us')}>Why Us</a>
          <a href="#testimonials" onClick={(e) => handleNavClick(e, 'testimonials')}>Reviews</a>
          <a href="#enquiry" onClick={(e) => handleNavClick(e, 'enquiry')}>Contact Us</a>
          
          <div className="mobile-nav-footer">
            <a href="tel:+919876543210" className="mobile-phone-link">
              <Phone size={18} />
              <span>+91 98765 43210</span>
            </a>
            <button className="btn-primary w-full" onClick={() => { setIsMobileMenuOpen(false); onEnquireClick(); }}>
              Enquire Now
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
