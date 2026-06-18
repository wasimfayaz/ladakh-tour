'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ArrowRight } from 'lucide-react';

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
          <div className="logo-discover-ladakh">
            <span className="discover-text">LADAKH TOUR</span>
            <span className="destination-text">PACK.COM</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="desktop-nav">
          <a href="#hero" onClick={(e) => handleNavClick(e, 'hero')}>Home</a>
          <a href="#why-choose-us" onClick={(e) => handleNavClick(e, 'why-choose-us')}>About Us</a>
          <a href="#packages" onClick={(e) => handleNavClick(e, 'packages')}>Package</a>
          <a href="#destinations" onClick={(e) => handleNavClick(e, 'destinations')}>Activities</a>
          <a href="#testimonials" onClick={(e) => handleNavClick(e, 'testimonials')}>Testimonials</a>
          <a href="#hero" onClick={(e) => handleNavClick(e, 'hero')}>Contact Us</a>
        </nav>

        <div className="header-actions">
          <a href="tel:+919103662018" className="phone-link">
            <Phone size={18} />
            <span>+91 910-366-2018</span>
          </a>
          <button className="header-book-now-btn" onClick={onEnquireClick}>
            <span>BOOK NOW</span>
            <ArrowRight size={14} />
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
          <a href="#why-choose-us" onClick={(e) => handleNavClick(e, 'why-choose-us')}>About Us</a>
          <a href="#packages" onClick={(e) => handleNavClick(e, 'packages')}>Package</a>
          <a href="#destinations" onClick={(e) => handleNavClick(e, 'destinations')}>Activities</a>
          <a href="#testimonials" onClick={(e) => handleNavClick(e, 'testimonials')}>Testimonials</a>
          <a href="#hero" onClick={(e) => handleNavClick(e, 'hero')}>Contact Us</a>
          
          <div className="mobile-nav-footer">
            <a href="tel:+919103662018" className="mobile-phone-link">
              <Phone size={18} />
              <span>+91 910-366-2018</span>
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
