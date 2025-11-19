'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sections = ['home', 'services', 'portfolio', 'about', 'contact'];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -50% 0px',
        threshold: 0
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header className="header">
        <nav className="top-nav">
          <div className="logo">
            <Image
              src="/jjlogoblack.png"
              alt="JJ Clicks"
              className="logo-img"
              width={120}
              height={60}
              priority
            />
          </div>
          <ul className="nav-links">
            <li><Link href="#home" className={activeSection === 'home' ? 'active' : ''}>Home</Link></li>
            <li><Link href="#services" className={activeSection === 'services' ? 'active' : ''}>Services</Link></li>
            <li><Link href="#portfolio" className={activeSection === 'portfolio' ? 'active' : ''}>Portfolio</Link></li>
            <li><Link href="#about" className={activeSection === 'about' ? 'active' : ''}>About</Link></li>
            <li><Link href="#contact" className={activeSection === 'contact' ? 'active' : ''}>Contact</Link></li>
          </ul>
        </nav>
      </header>

      {/* iOS-style bottom navigation for mobile */}
      <nav className="bottom-nav">
        <Link href="#home" className={`bottom-nav-item ${activeSection === 'home' ? 'active' : ''}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          <span>Home</span>
        </Link>
        <Link href="#services" className={`bottom-nav-item ${activeSection === 'services' ? 'active' : ''}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
          </svg>
          <span>Services</span>
        </Link>
        <Link href="#portfolio" className={`bottom-nav-item ${activeSection === 'portfolio' ? 'active' : ''}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
          <span>Portfolio</span>
        </Link>
        <Link href="#about" className={`bottom-nav-item ${activeSection === 'about' ? 'active' : ''}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          <span>About</span>
        </Link>
        <Link href="#contact" className={`bottom-nav-item ${activeSection === 'contact' ? 'active' : ''}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          <span>Contact</span>
        </Link>
      </nav>
    </>
  );
}
