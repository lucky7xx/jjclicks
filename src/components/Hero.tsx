'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero-background" style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
        <div className="hero-overlay"></div>
      </div>

      <div className="hero-content">
        <h1 className="hero-main-title">JJ Clicks</h1>

        <p className="hero-tagline">
          Create Your Memories With Our Passion
        </p>

        <p className="hero-description">
          Professional photography and videography services that capture the essence of your special moments
        </p>

        <div className="cta-buttons">
          <Link href="#portfolio" className="cta-button cta-primary">
            View Our Work
            <span className="button-arrow">→</span>
          </Link>
          <Link href="#contact" className="cta-button cta-secondary">
            Get In Touch
          </Link>
        </div>

        <div className="hero-scroll-indicator">
          <div className="scroll-mouse">
            <div className="scroll-wheel"></div>
          </div>
          <span>Scroll to explore</span>
        </div>
      </div>
    </section>
  );
}
