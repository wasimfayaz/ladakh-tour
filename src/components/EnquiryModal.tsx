'use client';

import React, { useState } from 'react';
import { User, Phone, Users, Calendar, Clock, ArrowRight, Check, X } from 'lucide-react';

interface EnquiryModalProps {
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
  onClose: () => void;
}

export default function EnquiryModal({ selectedPackage = 'general', onSubmitInquiry, onClose }: EnquiryModalProps) {
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
      onClose(); // close modal after submission
    }
  };

  return (
    <div className="modal-backdrop flex-center" style={{ zIndex: 1100 }} onClick={onClose}>
      <div 
        className="solid-white-modal-card fade-in" 
        style={{ 
          width: '90%', 
          maxWidth: '500px', 
          position: 'relative',
          padding: '2.5rem 2rem 2rem 2rem' 
        }} 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          onClick={onClose} 
          className="modal-close-x"
        >
          <X size={20} />
        </button>

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
          <button type="submit" className="btn-glass-submit" style={{ marginTop: '1rem' }}>
            <span>GET MY FREE LADAKH ITINERARY</span>
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
