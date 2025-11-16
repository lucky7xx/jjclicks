import Image from 'next/image';

export default function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-section">
            <div className="footer-logo">
              <Image
                src="/lv-logo.png"
                alt="LV Clicks"
                className="footer-logo-img"
                width={120}
                height={60}
              />
            </div>
            <h3>LV Clicks</h3>
            <p className="footer-description">
              Professional photography and videography services that capture your precious moments
              with artistic excellence and creative vision.
            </p>
          </div>

          {/* Social Section */}
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a
                href="https://instagram.com/lv_clicks_"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Instagram - @lv_clicks_"
              >
                <i className="fab fa-instagram fa-2x"></i>
              </a>
              <a
                href="https://www.facebook.com/lensvideoproduction/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Facebook - Lens Video Productions"
              >
                <i className="fab fa-facebook-f fa-2x"></i>
              </a>
              <a
                href="https://youtube.com/@lv_clicks"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="YouTube - @lv_clicks"
              >
                <i className="fab fa-youtube fa-2x"></i>
              </a>
              <a
                href="https://wa.me/919428012269"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="WhatsApp"
              >
                <i className="fab fa-whatsapp fa-2x"></i>
              </a>
            </div>
          </div>

          {/* Contact Section */}
          <div className="footer-section">
            <h3>Get In Touch</h3>
            <div className="footer-contact">
              <p className="footer-contact-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }}>
                  <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
                </svg>
                Professional Photography & Videography
              </p>
              <p className="footer-contact-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }}>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                Gujarat, India
              </p>
              <p className="footer-contact-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }}>
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
                Creating memories that last a lifetime
              </p>
            </div>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p className="footer-text">
            &copy; 2025 LV Clicks - Lens Video Productions. All rights reserved. Crafted with{' '}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block', verticalAlign: 'middle', margin: '0 4px', color: '#D4AF37' }}>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            {' '}by{' '}
            <a
              href="https://mystiq.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="mystiq-link"
            >
              mystiq.tech
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
