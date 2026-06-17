'use client';

import React from 'react';
import { Map } from 'lucide-react';
import Image from 'next/image';

interface DestinationItem {
  name: string;
  altitude: string;
  image: string;
  description: string;
  distance: string;
}

const DESTINATIONS: DestinationItem[] = [
  {
    name: 'Pangong Tso Lake',
    altitude: '13,940 ft',
    image: '/pangong_lake.png',
    description: 'The famous high-altitude saline lake extending from India to China. Watch it change colors from turquoise blue to light green throughout the day.',
    distance: '140 km from Leh'
  },
  {
    name: 'Nubra Valley',
    altitude: '10,000 ft',
    image: '/nubra_valley.png',
    description: 'A breathtaking high-altitude cold desert famous for sand dunes, double-humped Bactrian camels, and the ancient Diskit Monastery.',
    distance: '160 km from Leh'
  },
  {
    name: 'Historic Leh Palace',
    altitude: '11,560 ft',
    image: '/leh_palace.png',
    description: 'A 9-story royal palace overlooking the town of Leh, designed in the Tibetan Potala style, offering majestic panoramic views of the Stok range.',
    distance: 'Located in Leh City'
  },
  {
    name: 'Khardung La Pass',
    altitude: '17,982 ft',
    image: '/hero_background.png',
    description: 'The gateway to Nubra and Shyok valleys. Famously known as one of the highest motorable mountain roads in the entire world.',
    distance: '39 km from Leh'
  }
];

export default function Destinations() {
  return (
    <section id="destinations" className="section-padding destinations-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header text-center">
          <span className="section-subtitle">Exotic Locations</span>
          <h2 className="section-title">Must-Visit Ladakh Destinations</h2>
          <p className="section-desc">
            Ladakh is a wonderland of landscapes, ranging from alpine turquoise lakes to snow-capped mountain passes and barren desert dunes.
          </p>
        </div>

        {/* Grid layout */}
        <div className="destinations-grid">
          {DESTINATIONS.map((dest, i) => (
            <div key={i} className="destination-card fade-in">
              <div className="dest-image-wrapper">
                <Image fill src={dest.image} alt={dest.name} className="dest-image" sizes="(max-width: 768px) 100vw, (max-width: 992px) 50vw, 25vw" />
                <div className="dest-overlay">
                  <div className="dest-meta">
                    <span className="dest-altitude">Altitude: {dest.altitude}</span>
                    <span className="dest-distance">{dest.distance}</span>
                  </div>
                  <h3 className="dest-name">{dest.name}</h3>
                  <p className="dest-desc">{dest.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Small Callout */}
        <div className="dest-callout glass-panel text-center fade-in">
          <Map size={32} className="dest-callout-icon" />
          <h3>Custom Sightseeing Requests?</h3>
          <p>
            Whether you want to visit Sham Valley, Hanle Observatory, or Tso Moriri Lake, we specialize in building customized itineraries for off-beat places.
          </p>
          <a href="#enquiry" className="btn-primary">Customize Your Route</a>
        </div>

      </div>
    </section>
  );
}
