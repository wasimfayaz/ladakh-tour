'use client';

import React, { useState } from 'react';
import { User, Phone, Users, Calendar, Clock, ArrowRight, Check, MapPin, Headset, Star } from 'lucide-react';

interface HeroProps {
  selectedPackage?: string;
  onSubmitInquiry: (data: {
    name: string;
    phone: string;
    email: string;
    city: string;
    packageType: string;
    travelers?: string;
    travelDate?: string;
    message?: string;
  }) => void;
}

export default function Hero({ selectedPackage = 'general', onSubmitInquiry }: HeroProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    travelers: '',
    travelDate: '',
    duration: '',
    packageType: selectedPackage
  });

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    travelers: '',
    travelDate: '',
    duration: ''
  });

  const [isDateFocused, setIsDateFocused] = useState(false);

  // Keep package selection in sync if it changes from page level (e.g. package booking buttons)
  const [prevSelectedPackage, setPrevSelectedPackage] = useState(selectedPackage);
  if (selectedPackage !== prevSelectedPackage) {
    setPrevSelectedPackage(selectedPackage);
    setFormData(prev => ({ ...prev, packageType: selectedPackage }));
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    let valid = true;
    const newErrors = { name: '', phone: '', travelers: '', travelDate: '', duration: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
      valid = false;
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      valid = false;
    } else if (!/^\+?[0-9\s\-]{10,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Enter a valid phone number';
      valid = false;
    }
    if (!formData.travelers) {
      newErrors.travelers = 'Select travelers count';
      valid = false;
    }
    if (!formData.travelDate) {
      newErrors.travelDate = 'Select travel date';
      valid = false;
    }
    if (!formData.duration) {
      newErrors.duration = 'Select trip duration';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmitInquiry({
        name: formData.name,
        phone: formData.phone,
        email: 'Not Provided',
        city: 'Leh',
        packageType: formData.packageType,
        travelers: formData.travelers,
        travelDate: formData.travelDate,
        message: `Requested Trip Duration: ${formData.duration}`
      });
      // Reset form fields
      setFormData({
        name: '',
        phone: '',
        travelers: '',
        travelDate: '',
        duration: '',
        packageType: 'general'
      });
    }
  };

  // Scroll to enquiry section function
  const handleScrollDown = () => {
    const element = document.getElementById('packages');
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
    <section id="hero" className="hero-section">
      <div className="hero-background-overlay"></div>
      
      <div className="container hero-container">
        
        {/* Left Side Content */}
        <div className="hero-content fade-in">
          {/* Location Badge */}
          <div className="hero-badges-container">
            <span className="hero-badge-pill">
              <MapPin size={14} />
              <span>Leh, Ladakh, India</span>
            </span>
          </div>

          {/* Title */}
          <h1 className="hero-title">
            Ladakh, the way <br />
            <span className="hero-title-highlight">only locals</span> know it.
          </h1>

          {/* Feature Badges */}
          <div className="hero-badges-container" style={{ marginBottom: '1.8rem' }}>
            <div className="hero-badge-pill">
              <Users size={14} />
              <span>3,000+ Travelers</span>
            </div>
            <div className="hero-badge-pill">
              <MapPin size={14} />
              <span>Locally Based in Leh</span>
            </div>
            <div className="hero-badge-pill">
              <Headset size={14} />
              <span>24/7 Support</span>
            </div>
          </div>

          {/* Subtitle */}
          <p className="hero-paragraph">
            We're not just a travel agency. We're your local Ladakh insiders. Hidden valleys, remote homestays, high-altitude lake camps, off-season trails. No tourist traps.
          </p>

          {/* Social Proof */}
          <div className="hero-social-proof">
            {/* Avatars */}
            <div className="avatar-group-container">
              <div className="avatar-group">
                <div className="avatar-item" style={{ background: 'linear-gradient(135deg, #ff7b00 0%, #ff5100 100%)' }}>TS</div>
                <div className="avatar-item" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' }}>AS</div>
                <div className="avatar-item" style={{ background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)' }}>RD</div>
                <div className="avatar-item" style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)' }}>+</div>
              </div>
              <span className="avatar-text">
                <strong>3,000+ travelers</strong> have planned their trip with us
              </span>
            </div>

            {/* Google Rating */}
            <div className="google-rating-pill">
              <div className="google-g-logo">
                <svg viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
              </div>
              <div className="rating-info">
                <div className="rating-stars-row">
                  <span className="rating-number">5.0</span>
                  <div className="rating-stars">
                    <Star size={11} fill="#ffb700" color="#ffb700" />
                    <Star size={11} fill="#ffb700" color="#ffb700" />
                    <Star size={11} fill="#ffb700" color="#ffb700" />
                    <Star size={11} fill="#ffb700" color="#ffb700" />
                    <Star size={11} fill="#ffb700" color="#ffb700" />
                  </div>
                </div>
                <span className="rating-reviews-count">651 Google reviews</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Form (Premium Glassmorphic) */}
        <div className="fade-in">
          <div className="premium-glass-card">
            
            {/* Form Header */}
            <div className="glass-form-header">
              <div className="glass-form-title-row">
                <Check size={22} strokeWidth={3} />
                <h3>Get My Free Itinerary</h3>
              </div>
              <p className="glass-form-subtitle">
                100% free · No commitment · Reply within 2 hours
              </p>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="hero-form">
              {/* Full Name */}
              <div className="form-group">
                <div className="glass-input-wrapper">
                  <User size={18} className="glass-input-icon" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className="glass-input-field"
                  />
                </div>
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>

              {/* Phone */}
              <div className="form-group">
                <div className="glass-input-wrapper">
                  <Phone size={18} className="glass-input-icon" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Contact number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="glass-input-field"
                  />
                </div>
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>

              {/* No. of Travelers & Arrival Date Grid */}
              <div className="form-row">
                <div className="form-group">
                  <div className="glass-input-wrapper">
                    <Users size={18} className="glass-input-icon" />
                    <input
                      type="text"
                      name="travelers"
                      placeholder="No. of travelers"
                      value={formData.travelers}
                      onChange={handleChange}
                      className="glass-input-field"
                    />
                  </div>
                  {errors.travelers && <span className="error-text">{errors.travelers}</span>}
                </div>

                <div className="form-group">
                  <div 
                    className="glass-input-wrapper"
                    style={{ cursor: 'pointer' }}
                    onClick={(e) => {
                      setIsDateFocused(true);
                      const input = e.currentTarget.querySelector('input') as HTMLInputElement | null;
                      if (input) {
                        try {
                          (input as any).showPicker?.();
                          input.focus();
                        } catch (err) {}
                      }
                    }}
                  >
                    <Calendar size={18} className="glass-input-icon" />
                    <input
                      type={isDateFocused || formData.travelDate ? 'date' : 'text'}
                      name="travelDate"
                      value={formData.travelDate}
                      onChange={handleChange}
                      className="glass-input-field"
                      placeholder="Arrival date"
                      style={{ cursor: 'pointer' }}
                      onFocus={(e) => {
                        setIsDateFocused(true);
                        try {
                          (e.currentTarget as any).showPicker?.();
                        } catch (err) {}
                      }}
                      onBlur={() => setIsDateFocused(false)}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsDateFocused(true);
                        try {
                          (e.currentTarget as any).showPicker?.();
                        } catch (err) {}
                      }}
                    />
                  </div>
                  {errors.travelDate && <span className="error-text">{errors.travelDate}</span>}
                </div>
              </div>

              {/* Trip Duration */}
              <div className="form-group">
                <div className="glass-input-wrapper">
                  <Clock size={18} className="glass-input-icon" />
                  <input
                    type="text"
                    name="duration"
                    placeholder="Trip duration (e.g. 6 Days)"
                    value={formData.duration}
                    onChange={handleChange}
                    className="glass-input-field"
                  />
                </div>
                {errors.duration && <span className="error-text">{errors.duration}</span>}
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn-glass-submit">
                <span>GET MY FREE LADAKH ITINERARY</span>
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>

      </div>

      {/* Scroll Down mouse animation indicator */}
      <div className="hero-scroll-down" onClick={handleScrollDown}>
        <span>Scroll Down</span>
        <div className="scroll-mouse-icon">
          <div className="scroll-mouse-wheel"></div>
        </div>
      </div>
    </section>
  );
}
