'use client';

import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Users, Hotel, Car, Check, ArrowRight, Phone, MessageSquare } from 'lucide-react';
import Image from 'next/image';

interface PackagesProps {
  onBookPackage: (packageName: string) => void;
}

interface PackageItem {
  id: string;
  name: string;
  duration: string;
  type: string;
  price: string;
  route: string;
  image: string;
  description: string;
  inclusions: string[];
  itinerary: { day: number; title: string; desc: string }[];
}

const TOUR_PACKAGES: PackageItem[] = [
  {
    id: 'scenic',
    name: 'Scenic Ladakh Family Special',
    duration: '5D / 4N',
    type: 'Family & Friends',
    price: '₹14,999',
    route: 'Leh - Sham Valley - Pangong Lake - Leh',
    image: '/leh_palace.png',
    description: 'Perfect short trip layout covering the essential beauty spots of Leh, Sham Valley monasteries, and a full day trip to Pangong Lake.',
    inclusions: ['3-Star Premium Hotel', 'Daily Breakfast & Dinner', 'Private Cab for Sightseeing', 'Inner Line Permits & Tolls', 'Airport Pick & Drop'],
    itinerary: [
      { day: 1, title: 'Arrival in Leh & Acclimatization', desc: 'Transfer to hotel. Complete rest is mandatory to acclimatize to high altitude.' },
      { day: 2, title: 'Leh local & Sham Valley Sightseeing', desc: 'Visit Hall of Fame, Magnetic Hill, Confluence of Indus & Zanskar rivers (Sangam), and Gurudwara Pathar Sahib.' },
      { day: 3, title: 'Leh to Pangong Lake (Day Trip)', desc: 'Travel to Pangong Lake via Chang La Pass (17,590 ft). Spend a beautiful afternoon by the lake, then drive back to Leh.' },
      { day: 4, title: 'Monastery Tour & Local Markets', desc: 'Visit Thiksey Monastery, Shey Palace, and spend the evening shopping at the local Leh Market.' },
      { day: 5, title: 'Departure from Leh', desc: 'Check out and transfer to Leh airport for your flight back home with sweet memories.' }
    ]
  },
  {
    id: 'adventure',
    name: 'Magical Ladakh Couple Getaway',
    duration: '6D / 5N',
    type: 'Couples & Honeymoon',
    price: '₹18,499',
    route: 'Leh - Nubra Valley - Pangong Lake - Leh',
    image: '/pangong_lake.png',
    description: 'An immersive experience featuring romantic nights under the starlit sky at Pangong Lake and sand dunes safari in Nubra Valley.',
    inclusions: ['Premium Hotels & Lakefront Camps', 'All Meals (Breakfast & Dinner)', 'Private SUV (Innova/Xylo)', 'Camel Ride in Hunder', 'Oxygen Cylinder in Cab'],
    itinerary: [
      { day: 1, title: 'Arrive in Leh & Rest', desc: 'Check-in, welcome tea, and rest to adjust to the mountain environment. Evening walk to Shanti Stupa.' },
      { day: 2, title: 'Leh to Nubra Valley via Khardung La', desc: 'Drive through Khardung La (17,982 ft) - the world\'s highest motorable road. Ride double-humped camels in Hunder sand dunes.' },
      { day: 3, title: 'Nubra Valley to Pangong Lake via Shyok', desc: 'Drive alongside the scenic Shyok River to Pangong Lake. Witness the dramatic colors of the water. Overnight stay in luxury Swiss tents.' },
      { day: 4, title: 'Pangong Lake to Leh', desc: 'Wake up to a breathtaking sunrise. Drive back to Leh via Chang La Pass. Evening free for leisure.' },
      { day: 5, title: 'Sham Valley Excursion', desc: 'Visit Magnetic Hill, Sangam confluence, and Alchi Monastery. Enjoy a traditional Ladakhi dinner.' },
      { day: 6, title: 'Departure from Leh airport', desc: 'Say goodbye to Ladakh as you board your morning return flight.' }
    ]
  },
  {
    id: 'ultimate',
    name: 'Ultimate Ladakh Caravan Adventure',
    duration: '7D / 6N',
    type: 'Adventure Groups',
    price: '₹22,999',
    route: 'Leh - Nubra Valley - Turtuk - Pangong Lake - Leh',
    image: '/nubra_valley.png',
    description: 'Explore the unexplored. Drive to Turtuk (the last village of India near Baltistan border) and experience the raw, pristine beauty of northern Ladakh.',
    inclusions: ['Handpicked Luxury Stays & Camps', 'Daily Breakfast & Dinner', 'Private 4x4 SUV', 'Inner Line Permits & Wildlife Fees', 'Dedicated Tour Coordinator'],
    itinerary: [
      { day: 1, title: 'Welcome to Leh & Acclimatization', desc: 'Airport pick up, transfer to hotel. Rest, adapt to altitude. Evening tea and briefing.' },
      { day: 2, title: 'Leh Sightseeing & Acclimatization Ride', desc: 'Explore Leh Palace, Spituk Monastery, Magnetic Hill, and Sangam confluence to test physical readiness.' },
      { day: 3, title: 'Leh to Nubra Valley (Hunder)', desc: 'Cross Khardung La pass. Visit Diskit Monastery and see the giant Buddha statue. Camel safari in Hunder sand dunes.' },
      { day: 4, title: 'Turtuk Day Excursion', desc: 'Visit Turtuk, a Balti village annexed in 1971. Discover distinct culture, apricot orchards, and views of K2 range peaks.' },
      { day: 5, title: 'Nubra to Pangong Lake via Shyok', desc: 'Scenic journey to Pangong Lake. Enjoy bonfire night under a crystal clear starry sky.' },
      { day: 6, title: 'Pangong to Leh via Chang La', desc: 'Return journey to Leh. Visit Hemis Monastery, the wealthiest monastery in Ladakh, on the way back.' },
      { day: 7, title: 'Fly back home', desc: 'Check out and transfer to airport. Depart with lifetime adventure memories.' }
    ]
  },
  {
    id: 'custom',
    name: 'Customised Ladakh Tour Design',
    duration: 'Flexible',
    type: 'Tailor Made',
    price: 'On Request',
    route: 'Your Preferred Destinations (Leh, Nubra, Pangong, Turtuk, etc.)',
    image: '/leh_palace.png',
    description: 'Design your own dream vacation to Ladakh. Select your own dates, stays, cab types, and destinations. Speak to our local travel experts now.',
    inclusions: ['Tailor-made Stays & Route', 'Custom Cab Options (SUV/Tempo)', 'Flexible Daily Itineraries', 'Dedicated Expert Planning', 'Inner Line Permit Handling'],
    itinerary: [
      { day: 1, title: 'Arrival in Leh & Complete Rest', desc: 'Transfer to your Leh hotel. Rest completely to acclimatize to high altitude and thin air.' },
      { day: 2, title: 'Your Custom Sightseeing Choice', desc: 'Visit Leh Palace, Spituk Gompa, Magnetic Hill, Zanskar river rafting, or monastery excursions according to your plan.' },
      { day: 3, title: 'Nubra Valley / Pangong Lake Flexible Trip', desc: 'Head to Nubra Valley via Khardung La or Pangong Lake via Chang La. Stay in lakefront luxury Swiss tents or local homestays.' },
      { day: 4, title: 'Tailor Made Return & Departure', desc: 'Check out from Leh hotel and transfer to Leh airport for departure with lifetime memories.' }
    ]
  }
];

export default function Packages({ onBookPackage }: PackagesProps) {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedPackage, setSelectedPackage] = useState<PackageItem | null>(null);

  const filteredPackages = activeTab === 'all' 
    ? TOUR_PACKAGES 
    : TOUR_PACKAGES.filter(p => p.id === activeTab);

  useEffect(() => {
    if (selectedPackage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedPackage]);

  const openItineraryModal = (pkg: PackageItem) => {
    setSelectedPackage(pkg);
  };

  const closeItineraryModal = () => {
    setSelectedPackage(null);
  };

  return (
    <section id="packages" className="section-padding packages-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header text-center">
          <span className="section-subtitle">Trending Packages</span>
          <h2 className="section-title">Popular Ladakh Tour Itineraries</h2>
          <p className="section-desc">
            Handcrafted tour packages designed to give you the perfect balance of adventure, comfort, and local exploration.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="package-tabs flex-center">
          <button 
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Packages
          </button>
          <button 
            className={`tab-btn ${activeTab === 'scenic' ? 'active' : ''}`}
            onClick={() => setActiveTab('scenic')}
          >
            Family Special
          </button>
          <button 
            className={`tab-btn ${activeTab === 'adventure' ? 'active' : ''}`}
            onClick={() => setActiveTab('adventure')}
          >
            Couple Getaway
          </button>
          <button 
            className={`tab-btn ${activeTab === 'ultimate' ? 'active' : ''}`}
            onClick={() => setActiveTab('ultimate')}
          >
            Caravan Adventure
          </button>
          <button 
            className={`tab-btn ${activeTab === 'custom' ? 'active' : ''}`}
            onClick={() => setActiveTab('custom')}
          >
            Customised Tour
          </button>
        </div>

        {/* Package Cards Grid */}
        <div className="packages-grid">
          {filteredPackages.map((pkg) => (
            <div key={pkg.id} className="package-card fade-in">
              <div className="pkg-image-wrapper">
                <Image fill src={pkg.image} alt={pkg.name} className="pkg-image" sizes="(max-width: 768px) 100vw, (max-width: 992px) 50vw, 33vw" />
                <span className="pkg-badge">{pkg.type}</span>
                <span className="pkg-duration">
                  <Clock size={14} style={{ marginRight: '4px' }} />
                  {pkg.duration}
                </span>
              </div>
              
              <div className="pkg-content">
                <div className="pkg-route-wrapper">
                  <MapPin size={14} className="pkg-route-icon" />
                  <span className="pkg-route-text">{pkg.route}</span>
                </div>
                
                <h3 className="pkg-title">{pkg.name}</h3>
                <p className="pkg-desc">{pkg.description}</p>
                
                <div className="pkg-highlights-brief">
                  <div className="pkg-highlight-icon-item">
                    <Hotel size={16} />
                    <span>3* Stays / Camps</span>
                  </div>
                  <div className="pkg-highlight-icon-item">
                    <Car size={16} />
                    <span>Private SUV</span>
                  </div>
                  <div className="pkg-highlight-icon-item">
                    <Users size={16} />
                    <span>Local Guides</span>
                  </div>
                </div>

                <div className="pkg-price-row">
                  <div className="pkg-price">
                    {pkg.price === 'On Request' ? (
                      <span className="pkg-price-value" style={{ fontSize: '1.45rem', fontWeight: 800 }}>{pkg.price}</span>
                    ) : (
                      <>
                        <span className="pkg-price-label">Starting from</span>
                        <span className="pkg-price-value">{pkg.price}</span>
                        <span className="pkg-price-person">/ person</span>
                      </>
                    )}
                  </div>
                  <button 
                    className="btn-outline-primary btn-sm"
                    onClick={() => openItineraryModal(pkg)}
                  >
                    Itinerary Details
                  </button>
                </div>

                <div className="pkg-enquire-buttons-row">
                  <a href="tel:+919103662018" className="btn-call-enquire">
                    <Phone size={14} />
                    <span>Enquiry Now</span>
                  </a>
                  <a 
                    href={`https://wa.me/919103662018?text=Hi!%20I'm%20interested%20in%20the%20${encodeURIComponent(pkg.name)}%20package.%20Please%20send%20details.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp-enquire"
                  >
                    <MessageSquare size={14} />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Itinerary Modal */}
        {selectedPackage && (
          <div className="modal-backdrop flex-center" onClick={closeItineraryModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div>
                  <span className="pkg-badge">{selectedPackage.type}</span>
                  <h3 className="modal-title">{selectedPackage.name} ({selectedPackage.duration})</h3>
                </div>
                <button className="modal-close" onClick={closeItineraryModal}>&times;</button>
              </div>
              
              <div className="modal-body">
                <div className="modal-split">
                  {/* Left Column: Itinerary */}
                  <div className="modal-itinerary">
                    <h4>Day-Wise Itinerary Plan</h4>
                    <div className="itinerary-timeline">
                      {selectedPackage.itinerary.map((day) => (
                        <div key={day.day} className="timeline-item">
                          <div className="timeline-day">Day {day.day}</div>
                          <div className="timeline-content">
                            <h5>{day.title}</h5>
                            <p>{day.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Inclusions */}
                  <div className="modal-side">
                    <div className="modal-inclusions-card">
                      <h4>What is Included:</h4>
                      <ul className="inclusions-list">
                        {selectedPackage.inclusions.map((inc, i) => (
                          <li key={i}>
                            <Check size={16} className="inclusion-check" />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="modal-cta-box text-center">
                        <div className="modal-price">
                          <span className="pkg-price-label">Price per person</span>
                          <span className="pkg-price-value text-accent">{selectedPackage.price}</span>
                        </div>
                        <button 
                          className="btn-accent w-full"
                          style={{ marginBottom: '0.75rem' }}
                          onClick={() => {
                            closeItineraryModal();
                            onBookPackage(selectedPackage.id);
                          }}
                        >
                          Customise & Send Enquiry
                        </button>
                        
                        <div className="pkg-enquire-buttons-row" style={{ marginTop: '0.5rem', gridTemplateColumns: '1fr 1fr' }}>
                          <a href="tel:+919103662018" className="btn-call-enquire" style={{ padding: '0.6rem' }}>
                            <Phone size={13} />
                            <span>Enquiry Now</span>
                          </a>
                          <a 
                            href={`https://wa.me/919103662018?text=Hi!%20I'm%20interested%20in%20the%20${encodeURIComponent(selectedPackage.name)}%20package.%20Please%20send%20details.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-whatsapp-enquire"
                            style={{ padding: '0.6rem' }}
                          >
                            <MessageSquare size={13} />
                            <span>WhatsApp</span>
                          </a>
                        </div>
                        <p className="modal-cta-note" style={{ marginTop: '0.75rem' }}>Includes inner line permit fees & local taxes</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
