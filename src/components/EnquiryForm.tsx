'use client';

import React, { useState } from 'react';
import { User, Phone, Mail, MapPin, Calendar, Users, MessageSquare } from 'lucide-react';

interface InquiryFormData {
  name: string;
  phone: string;
  email: string;
  city: string;
  packageType: string;
  travelers: string;
  travelDate: string;
  message: string;
}

interface EnquiryFormProps {
  selectedPackage: string;
  onSubmitInquiry: (data: InquiryFormData) => void;
}

export default function EnquiryForm({ selectedPackage, onSubmitInquiry }: EnquiryFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    packageType: 'general',
    travelers: '2',
    travelDate: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [prevSelectedPackage, setPrevSelectedPackage] = useState(selectedPackage);
  if (selectedPackage !== prevSelectedPackage) {
    setPrevSelectedPackage(selectedPackage);
    setFormData(prev => ({ ...prev, packageType: selectedPackage }));
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    let valid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
      valid = false;
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      valid = false;
    } else if (!/^\+?[0-9\s\-]{10,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
      valid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
      valid = false;
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmitInquiry(formData);
      // Reset form but preserve package selection defaults
      setFormData({
        name: '',
        phone: '',
        email: '',
        city: '',
        packageType: 'general',
        travelers: '2',
        travelDate: '',
        message: ''
      });
    }
  };

  return (
    <section id="enquiry" className="section-padding enquiry-section">
      <div className="container enquiry-container">
        
        {/* Contact Info Sidebar */}
        <div className="enquiry-info fade-in">
          <span className="section-subtitle">Get In Touch</span>
          <h2 className="section-title">Let Us Plan Your Next Ladakh Adventure</h2>
          <p className="enquiry-info-desc">
            Fill out the form and our Ladakh travel expert will coordinate with you to craft a custom package matching your preferences, dates, and budget.
          </p>

          <div className="info-list">
            <div className="info-item">
              <span className="info-icon">📍</span>
              <div>
                <h4>Office Address</h4>
                <p>Main Bazar Road, Opposite SBI Bank, Leh, Ladakh - 194101</p>
              </div>
            </div>

            <div className="info-item">
              <span className="info-icon">📞</span>
              <div>
                <h4>Call / WhatsApp</h4>
                <p>+91 910-366-2018</p>
              </div>
            </div>

            <div className="info-item">
              <span className="info-icon">✉️</span>
              <div>
                <h4>Email Support</h4>
                <p>bookings@ladakhtourpackage.com</p>
              </div>
            </div>
          </div>

          <div className="permits-notice glass-panel">
            <h4>💡 Inner Line Permits & Oxygen</h4>
            <p>
              Inner Line Permits are mandatory to visit Pangong Lake and Nubra Valley. We arrange all permits and wildlife fees automatically in our packages. Oxygen cylinders are also loaded in your taxi.
            </p>
          </div>
        </div>

        {/* Detailed Form */}
        <div className="enquiry-form-card glass-panel fade-in">
          <h3>Send Travel Enquiry</h3>
          <p>Please enter details to check availability & best quotes</p>

          <form onSubmit={handleSubmit} className="detailed-form">
            <div className="form-group">
              <label htmlFor="enq-name">Your Full Name*</label>
              <div className="input-wrapper">
                <User size={18} className="input-icon" />
                <input
                  type="text"
                  id="enq-name"
                  name="name"
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="enq-phone">Contact Number*</label>
                <div className="input-wrapper">
                  <Phone size={18} className="input-icon" />
                  <input
                    type="tel"
                    id="enq-phone"
                    name="phone"
                    placeholder="e.g. +91 910-366-2018"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="enq-email">Email Address*</label>
                <div className="input-wrapper">
                  <Mail size={18} className="input-icon" />
                  <input
                    type="email"
                    id="enq-email"
                    name="email"
                    placeholder="e.g. john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="enq-city">Your Home City*</label>
                <div className="input-wrapper">
                  <MapPin size={18} className="input-icon" />
                  <input
                    type="text"
                    id="enq-city"
                    name="city"
                    placeholder="e.g. Mumbai"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
                {errors.city && <span className="error-text">{errors.city}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="enq-package">Select Ladakh Package</label>
                <div className="input-wrapper">
                  <Calendar size={18} className="input-icon" />
                  <select
                    id="enq-package"
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
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="enq-date">Tentative Travel Date</label>
                <div className="input-wrapper">
                  <Calendar size={18} className="input-icon" />
                  <input
                    type="date"
                    id="enq-date"
                    name="travelDate"
                    value={formData.travelDate}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="enq-travelers">Number of Travelers</label>
                <div className="input-wrapper">
                  <Users size={18} className="input-icon" />
                  <select
                    id="enq-travelers"
                    name="travelers"
                    value={formData.travelers}
                    onChange={handleChange}
                  >
                    <option value="1">1 Person</option>
                    <option value="2">2 People (Couple)</option>
                    <option value="3-5">3 - 5 People</option>
                    <option value="6-9">6 - 9 People</option>
                    <option value="10+">10+ Group</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="enq-message">Additional Requirements (Hotels, Cab types, etc.)</label>
              <div className="input-wrapper text-area-wrapper">
                <MessageSquare size={18} className="input-icon text-area-icon" />
                <textarea
                  id="enq-message"
                  name="message"
                  rows={3}
                  placeholder="Tell us about your flight timings, hotel preferences, or any specific requests..."
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            <button type="submit" className="btn-primary w-full form-submit-btn">
              SUBMIT ENQUIRY NOW
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
