'use client';

import React, { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Packages from '../components/Packages';
import Destinations from '../components/Destinations';
import TrustIndicators from '../components/TrustIndicators';
import WhatsAppButton from '../components/WhatsAppButton';
import CallButton from '../components/CallButton';
import EnquiryModal from '../components/EnquiryModal';
import { Check, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

interface InquiryDetails {
  name: string;
  phone: string;
  email?: string;
  city?: string;
  packageType: string;
  travelers?: string;
  travelDate?: string;
  message?: string;
}

export default function Home() {
  const [selectedPackage, setSelectedPackage] = useState<string>('general');
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [inquiryDetails, setInquiryDetails] = useState<InquiryDetails | null>(null);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState<boolean>(false);

  const handleBookPackage = (packageId: string) => {
    setSelectedPackage(packageId);
    
    // Smooth scroll to hero section
    const element = document.getElementById('hero');
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

  const handleEnquireClick = () => {
    // Smooth scroll to hero section without resetting package type
    const element = document.getElementById('hero');
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

  const handleSubmitInquiry = async (formData: InquiryDetails) => {
    setInquiryDetails(formData);
    setShowSuccessModal(true);
    document.body.style.overflow = 'hidden';

    try {
      await fetch('https://formsubmit.co/ajax/sheltertrips@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Name: formData.name,
          Phone: formData.phone,
          'Package Type': getPackageName(formData.packageType),
          'No. of Travelers': formData.travelers || '2',
          'Travel Date': formData.travelDate || 'Not Provided',
          Message: formData.message || 'No additional message',
          _subject: `🏔️ New Ladakh Tour Inquiry from ${formData.name}`,
          _captcha: 'false'
        })
      });
    } catch (error) {
      console.error('Error submitting form to sheltertrips@gmail.com:', error);
    }
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    setInquiryDetails(null);
    document.body.style.overflow = 'auto';
  };

  // Convert package ID code to display name
  const getPackageName = (id: string) => {
    switch(id) {
      case 'scenic': return 'Scenic Ladakh Family Special (5D/4N)';
      case 'adventure': return 'Magical Ladakh Couple Getaway (6D/5N)';
      case 'ultimate': return 'Ultimate Ladakh Caravan Adventure (7D/6N)';
      case 'custom': return 'Customised Ladakh Tour Design';
      default: return 'General Enquiry / Custom Package';
    }
  };

  return (
    <div className="app-wrapper">
      <Header onEnquireClick={() => setIsEnquiryModalOpen(true)} />
      
      <main>
        <Hero selectedPackage={selectedPackage} onSubmitInquiry={handleSubmitInquiry} />
        <Packages onBookPackage={(pkgId) => {
          handleBookPackage(pkgId);
          setIsEnquiryModalOpen(true); // also open the modal if they request customization in itinerary
        }} />
        <Destinations />
        <TrustIndicators />
      </main>

      {isEnquiryModalOpen && (
        <EnquiryModal 
          selectedPackage={selectedPackage} 
          onSubmitInquiry={handleSubmitInquiry} 
          onClose={() => setIsEnquiryModalOpen(false)} 
        />
      )}

      {/* Premium Footer */}
      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <span className="footer-logo">🏔️ Ladakh Tour</span>
            <p className="footer-brand-desc">
              Your trusted travel partner for custom-made holidays to the Land of High Passes. Registered local operator based in Leh.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Instagram">📸</a>
              <a href="#" aria-label="Twitter">🐦</a>
            </div>
          </div>

          <div className="footer-links-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#hero" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Home</a></li>
              <li><a href="#packages" onClick={(e) => { e.preventDefault(); handleBookPackage('general'); }}>Tour Packages</a></li>
              <li><a href="#destinations" onClick={(e) => { e.preventDefault(); handleBookPackage('general'); }}>Destinations</a></li>
              <li><a href="#why-choose-us" onClick={(e) => { e.preventDefault(); handleBookPackage('general'); }}>Why Choose Us</a></li>
              <li><a href="#testimonials" onClick={(e) => { e.preventDefault(); handleBookPackage('general'); }}>Reviews</a></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4>Tour Packages</h4>
            <ul>
              <li><a href="#packages" onClick={(e) => { e.preventDefault(); handleBookPackage('scenic'); }}>Scenic Ladakh Family (5D)</a></li>
              <li><a href="#packages" onClick={(e) => { e.preventDefault(); handleBookPackage('adventure'); }}>Magical Ladakh Couple (6D)</a></li>
              <li><a href="#packages" onClick={(e) => { e.preventDefault(); handleBookPackage('ultimate'); }}>Ultimate Caravan Adventure (7D)</a></li>
              <li><a href="#hero" onClick={handleEnquireClick}>Custom Tour Design</a></li>
            </ul>
          </div>

          <div className="footer-contact-col">
            <h4>Contact Details</h4>
            <div className="footer-contact-item">
              <MapPin size={16} />
              <span>Main Bazar, Leh, Ladakh - 194101</span>
            </div>
            <div className="footer-contact-item">
              <Phone size={16} />
              <span>+91 910-366-2018</span>
            </div>
            <div className="footer-contact-item">
              <Mail size={16} />
              <span>bookings@ladakhtourpackage.com</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container footer-bottom-container">
            <p>&copy; {new Date().getFullYear()} Ladakhtourpackage.com. All Rights Reserved. Managed by Local Experts.</p>
            <p className="footer-developer-credit">
              Designed with 💙 for Ladakh Tourism
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Widgets */}
      <WhatsAppButton />
      <CallButton />

      {/* Success Modal */}
      {showSuccessModal && inquiryDetails && (
        <div className="modal-backdrop flex-center" onClick={closeSuccessModal}>
          <div className="modal-content success-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="success-icon-wrapper flex-center">
              <Check size={40} className="success-check-icon" />
            </div>
            
            <h3 className="success-title">Thank You, {inquiryDetails.name}!</h3>
            <p className="success-subtitle">Your Travel Enquiry Has Been Received Successfully.</p>
            
            <div className="success-details-card">
              <h4>Enquiry Details Summary:</h4>
              <div className="success-details-row">
                <span className="success-label">Selected Package:</span>
                <span className="success-value">{getPackageName(inquiryDetails.packageType)}</span>
              </div>
              <div className="success-details-row">
                <span className="success-label">Mobile Number:</span>
                <span className="success-value">{inquiryDetails.phone}</span>
              </div>
              {inquiryDetails.email && inquiryDetails.email !== 'Not Provided' && (
                <div className="success-details-row">
                  <span className="success-label">Email Address:</span>
                  <span className="success-value">{inquiryDetails.email}</span>
                </div>
              )}
              <div className="success-details-row">
                <span className="success-label">Travelers count:</span>
                <span className="success-value">{inquiryDetails.travelers || '2'} People</span>
              </div>
              {inquiryDetails.travelDate && (
                <div className="success-details-row">
                  <span className="success-label">Travel Date:</span>
                  <span className="success-value">{inquiryDetails.travelDate}</span>
                </div>
              )}
            </div>

            <p className="success-message">
              Our Ladakh trip specialist will contact you on <strong>{inquiryDetails.phone}</strong> within 12 hours with customized itineraries, hotel recommendations, and the best quote.
            </p>

            <div className="success-actions flex-center">
              <button className="btn-primary" onClick={closeSuccessModal}>
                Back to Site
              </button>
              
              <a 
                href={`https://wa.me/919103662018?text=Hi!%20My%20name%20is%20${encodeURIComponent(inquiryDetails.name)}.%20I%20just%20submitted%20an%20enquiry%20for%20the%20${encodeURIComponent(getPackageName(inquiryDetails.packageType))}.${inquiryDetails.travelers ? `%20Travelers:%20${inquiryDetails.travelers}` : ''}${inquiryDetails.travelDate ? `%20Travel%20Date:%20${inquiryDetails.travelDate}` : ''}%20Please%20connect%20me%20with%20an%20expert.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent flex-center"
              >
                Chat on WhatsApp Now
                <ExternalLink size={14} style={{ marginLeft: '6px' }} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
