'use client';

import React from 'react';
import { Phone } from 'lucide-react';

export default function CallButton() {
  const phoneNumber = "tel:+919103662018";

  return (
    <a 
      href={phoneNumber} 
      className="call-float-btn"
      aria-label="Call Ladakh Tour Expert"
    >
      <Phone size={26} className="call-svg" />
      <span className="call-tooltip">Call Ladakh Expert</span>
    </a>
  );
}
