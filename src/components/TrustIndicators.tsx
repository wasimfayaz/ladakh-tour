'use client';

import React, { useState } from 'react';
import { Star, ShieldCheck, HeartHandshake, Compass, Headset, ChevronLeft, ChevronRight } from 'lucide-react';

interface TestimonialItem {
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
  avatar: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    name: 'Rahul & Sneha Sharma',
    location: 'Mumbai, Maharashtra',
    rating: 5,
    text: 'We booked the Magical Ladakh 6D/5N package. The arrangements at Pangong Lake luxury tents were breathtaking, and the food was delicious. Our driver, Tashi, was incredibly professional and navigated the passes with ease. Best holiday ever!',
    date: 'June 2026',
    avatar: 'RS'
  },
  {
    name: 'Vikramjit Singh',
    location: 'New Delhi',
    rating: 5,
    text: 'Highly professional tour operators! They handled all inner line permits and wildlife fees beforehand. The private Innova provided was clean, in excellent condition, and equipped with oxygen cylinders. The tour Coordinator kept in touch daily.',
    date: 'May 2026',
    avatar: 'VS'
  },
  {
    name: 'Ananya Srinivasan',
    location: 'Bangalore, Karnataka',
    rating: 5,
    text: 'Visiting Turtuk village and seeing the Balti culture was an eye-opener. The customized itinerary was executed seamlessly. Hotel stays in Leh were extremely comfortable, with heaters and hot running water. Highly recommended!',
    date: 'June 2026',
    avatar: 'AS'
  }
];

export default function TrustIndicators() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <>
      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="section-padding why-choose-us-section">
        <div className="container">
          
          <div className="section-header text-center">
            <span className="section-subtitle">Our Promise</span>
            <h2 className="section-title">Why Travel With Us?</h2>
            <p className="section-desc">
              We are a registered local tour agency based in Leh. We ensure your safety, comfort, and an unforgettable journey.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-item-card glass-panel fade-in">
              <div className="feature-icon-wrapper">
                <Compass className="feature-icon" />
              </div>
              <h3>10+ Years Local Expertise</h3>
              <p>Our deep knowledge of Ladakh&apos;s geography, culture, and weather ensures a smooth, well-crafted experience without surprises.</p>
            </div>

            <div className="feature-item-card glass-panel fade-in">
              <div className="feature-icon-wrapper">
                <ShieldCheck className="feature-icon" />
              </div>
              <h3>Safety & Health Priority</h3>
              <p>We provide complimentary oxygen cylinders in all our SUVs and pre-arrange emergency logistics so you can travel stress-free.</p>
            </div>

            <div className="feature-item-card glass-panel fade-in">
              <div className="feature-icon-wrapper">
                <HeartHandshake className="feature-icon" />
              </div>
              <h3>Handpicked Accommodations</h3>
              <p>We partner only with A-grade hotels and lakeside luxury camps that feature running hot water, insulated structures, and great food.</p>
            </div>

            <div className="feature-item-card glass-panel fade-in">
              <div className="feature-icon-wrapper">
                <Headset className="feature-icon" />
              </div>
              <h3>24/7 Ground Assistance</h3>
              <p>Our dedicated tour coordinators are stationed locally in Leh and are always a phone call away to resolve any on-road query.</p>
            </div>
          </div>

        </div>
      </section>

      {/* Testimonials Slider Section */}
      <section id="testimonials" className="section-padding testimonials-section">
        <div className="container">
          
          <div className="section-header text-center">
            <span className="section-subtitle">Reviews</span>
            <h2 className="section-title">What Our Guests Say</h2>
          </div>

          <div className="testimonial-slider-container fade-in">
            <div className="testimonial-card-main glass-panel">
              <div className="testimonial-stars flex-center">
                {Array.from({ length: TESTIMONIALS[activeTestimonial].rating }).map((_, i) => (
                  <Star key={i} size={18} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              
              <p className="testimonial-text">
                &quot;{TESTIMONIALS[activeTestimonial].text}&quot;
              </p>

              <div className="testimonial-author-row">
                <div className="author-avatar">{TESTIMONIALS[activeTestimonial].avatar}</div>
                <div className="author-info">
                  <h4 className="author-name">{TESTIMONIALS[activeTestimonial].name}</h4>
                  <span className="author-location">{TESTIMONIALS[activeTestimonial].location}</span>
                </div>
              </div>
              
              <span className="testimonial-date">{TESTIMONIALS[activeTestimonial].date}</span>

              {/* Slider Arrows */}
              <button className="slider-arrow prev" onClick={prevTestimonial} aria-label="Previous Review">
                <ChevronLeft size={20} />
              </button>
              <button className="slider-arrow next" onClick={nextTestimonial} aria-label="Next Review">
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Indicator Dots */}
            <div className="slider-dots flex-center">
              {TESTIMONIALS.map((_, i) => (
                <button 
                  key={i}
                  className={`dot ${activeTestimonial === i ? 'active' : ''}`}
                  onClick={() => setActiveTestimonial(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
