'use client';

import { useState } from 'react';

// SVG Icon Components
const WeddingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const VideoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="23 7 16 12 23 17 23 7"/>
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
  </svg>
);

const CoupleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const EventIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const PortraitIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const MaternityIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7"/>
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
  </svg>
);

export default function Services() {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      title: 'Wedding Photography',
      icon: <WeddingIcon />,
      tagline: 'Timeless Elegance',
      description: 'Capture the magic of your special day with our artistic wedding photography. From candid moments to traditional portraits, we preserve every emotion.',
      features: ['4K Video', 'Drone Shots', 'Same Day Edit', 'Full Day Coverage']
    },
    {
      title: 'Cinematic Videos',
      icon: <VideoIcon />,
      tagline: 'Storytelling Excellence',
      description: 'Create stunning cinematic videos that tell your story. Professional editing, color grading, and storytelling that brings your vision to life.',
      features: ['Color Grading', 'Motion Graphics', 'Sound Design', 'Multi-cam Setup']
    },
    {
      title: 'Pre-Wedding Shoots',
      icon: <CoupleIcon />,
      tagline: 'Romance Captured',
      description: 'Beautiful pre-wedding photography sessions in stunning locations. Let your love story unfold through our creative lens.',
      features: ['Location Scouting', 'Outfit Changes', 'Custom Themes', 'HD Prints']
    },
    {
      title: 'Event Coverage',
      icon: <EventIcon />,
      tagline: 'Moments Preserved',
      description: 'From birthdays to corporate events, we document every significant moment with professional photography and videography services.',
      features: ['Live Streaming', 'Photo Booth', 'Instant Prints', 'Full Coverage']
    },
    {
      title: 'Portrait Photography',
      icon: <PortraitIcon />,
      tagline: 'Professional Excellence',
      description: 'Professional portraits for individuals, families, and corporate needs. High-quality images that capture personality and elegance.',
      features: ['Studio Setup', 'Retouching', 'Multiple Looks', 'Print Ready']
    },
    {
      title: 'Maternity Photography',
      icon: <MaternityIcon />,
      tagline: 'Beautiful Journey',
      description: 'Celebrate the beauty of pregnancy with elegant maternity photoshoots. Gentle, artistic portraits that capture this precious journey.',
      features: ['Wardrobe Options', 'Studio/Outdoor', 'Partner Shots', 'Bump Albums']
    }
  ];

  return (
    <section id="services" className="services">
      <div className="services-header">
        <div className="services-intro">
          <span className="section-label">What We Offer</span>
          <h2 className="section-title">
            Professional Services
            <span className="title-accent"> Tailored For You</span>
          </h2>
          <p className="section-description">
            From weddings to corporate events, we deliver exceptional photography and videography experiences
          </p>
        </div>
      </div>

      <div className="services-showcase">
        <div className="services-tabs">
          {services.map((service, index) => (
            <button
              key={index}
              className={`service-tab ${activeService === index ? 'active' : ''}`}
              onClick={() => setActiveService(index)}
            >
              <span className="tab-icon">{service.icon}</span>
              <span className="tab-title">{service.title}</span>
            </button>
          ))}
        </div>

        <div className="service-detail">
          <div className="service-detail-content">
            <div className="service-badge">{services[activeService].tagline}</div>
            <h3 className="service-detail-title">{services[activeService].title}</h3>
            <p className="service-detail-description">{services[activeService].description}</p>

            <div className="service-features">
              {services[activeService].features.map((feature, idx) => (
                <div key={idx} className="feature-badge">
                  <span className="feature-check">✓</span>
                  {feature}
                </div>
              ))}
            </div>

            <button className="service-cta">
              Learn More <span className="arrow">→</span>
            </button>
          </div>

          <div className="service-detail-visual">
            <div className="visual-placeholder">
              <span className="visual-icon">{services[activeService].icon}</span>
              <div className="visual-gradient"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
