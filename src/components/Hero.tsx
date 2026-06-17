'use client';

import React, { useState } from 'react';
import { Calendar, User, Phone, Mail, MapPin } from 'lucide-react';

interface HeroProps {
  selectedPackage?: string;
  onSubmitInquiry: (data: { name: string; phone: string; email: string; city: string; packageType: string }) => void;
}

export default function Hero({ selectedPackage = 'general', onSubmitInquiry }: HeroProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    packageType: selectedPackage
  });

  const [prevSelectedPackage, setPrevSelectedPackage] = useState(selectedPackage);
  if (selectedPackage !== prevSelectedPackage) {
    setPrevSelectedPackage(selectedPackage);
    setFormData(prev => ({ ...prev, packageType: selectedPackage }));
  }

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    email: '',
    city: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    let valid = true;
    const newErrors = { name: '', phone: '', email: '', city: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      valid = false;
    } else if (!/^\+?[0-9\s\-]{10,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Enter a valid phone number';
      valid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Enter a valid email address';
      valid = false;
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City / Message is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmitInquiry(formData);
      setFormData({
        name: '',
        phone: '',
        email: '',
        city: '',
        packageType: 'general'
      });
    }
  };

  return (
    <section id="hero" className="hero-section">
      <div className="hero-background-overlay"></div>
      <div className="container hero-container">
        
        {/* Hero Left Content */}
        <div className="hero-content fade-in">
          <span className="hero-badge">🏔️ Plan Your Dream Ladakh Trip</span>
          <h1 className="hero-title">
            Discover the Land of <br />
            <span className="text-highlight">High Passes & Lakes</span>
          </h1>
          <p className="hero-subtitle">
            Experience the mesmerizing beauty of Leh Ladakh, Nubra Valley, and the magical Pangong Lake. Custom itineraries tailored specifically for couples, families, and adventure groups.
          </p>
          <div className="hero-features">
            <div className="hero-feature-item">
              <span className="hero-feature-icon">🛡️</span>
              <span>Local Experts</span>
            </div>
            <div className="hero-feature-item">
              <span className="hero-feature-icon">🌟</span>
              <span>4.9/5 Rated Tours</span>
            </div>
            <div className="hero-feature-item">
              <span className="hero-feature-icon">💰</span>
              <span>Best Price Guarantee</span>
            </div>
          </div>
        </div>

        {/* Hero Right Enquiry Form */}
        <div className="hero-form-container glass-panel-dark fade-in">
          <div className="form-header">
            <h3>Plan Your Ladakh Tour</h3>
            <p>Get a customized itinerary & free quote from our experts</p>
          </div>
          
          <form onSubmit={handleSubmit} className="hero-form">
            <div className="form-group">
              <label htmlFor="hero-name">Name*</label>
              <div className="input-wrapper">
                <User size={16} className="input-icon" />
                <input
                  type="text"
                  id="hero-name"
                  name="name"
                  placeholder="Enter Name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="hero-phone">Phone*</label>
                <div className="input-wrapper">
                  <Phone size={16} className="input-icon" />
                  <input
                    type="tel"
                    id="hero-phone"
                    name="phone"
                    placeholder="Enter Phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="hero-email">Email*</label>
                <div className="input-wrapper">
                  <Mail size={16} className="input-icon" />
                  <input
                    type="email"
                    id="hero-email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="hero-city">City*</label>
              <div className="input-wrapper">
                <MapPin size={16} className="input-icon" />
                <input
                  type="text"
                  id="hero-city"
                  name="city"
                  placeholder="Enter City"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              {errors.city && <span className="error-text">{errors.city}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="hero-package">Preferred Package*</label>
              <div className="input-wrapper">
                <Calendar size={16} className="input-icon" />
                <select
                  id="hero-package"
                  name="packageType"
                  value={formData.packageType}
                  onChange={handleChange}
                >
                  <option value="general">Select a Tour Package</option>
                  <option value="scenic">Scenic Ladakh (5D / 4N)</option>
                  <option value="adventure">Adventure Ladakh (6D / 5N)</option>
                  <option value="ultimate">Ultimate Ladakh Caravan (7D / 6N)</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn-accent w-full form-submit-btn">
              GET FREE QUOTE NOW
            </button>
            <p className="form-disclaimer">*One of our travel experts will contact you within 24 hours.</p>
          </form>
        </div>

      </div>
    </section>
  );
}
