'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

type PortfolioCategory = 'wedding' | 'pre-wedding' | 'events' | 'portraits' | 'cinematic' | 'corporate' | 'maternity' | 'baby';

interface PortfolioImage {
  _id: string;
  url: string;
  category: PortfolioCategory;
  isLandingPage: boolean;
}

interface CategoryData {
  category: PortfolioCategory;
  title: string;
  subtitle: string;
  image: string | null;
  count: number;
}

const categoryLabels: Record<PortfolioCategory, { title: string; subtitle: string }> = {
  wedding: { title: 'Wedding', subtitle: 'Intimate Ceremonies' },
  'pre-wedding': { title: 'Pre-Wedding', subtitle: 'Love Stories' },
  events: { title: 'Events', subtitle: 'Celebrations' },
  portraits: { title: 'Portraits', subtitle: 'Professional' },
  cinematic: { title: 'Cinematic', subtitle: 'Video Production' },
  corporate: { title: 'Corporate', subtitle: 'Events & Conferences' },
  maternity: { title: 'Maternity', subtitle: 'Pregnancy Journey' },
  baby: { title: 'Baby Shoot', subtitle: 'Newborn Memories' },
};

export default function Portfolio() {
  const [portfolioData, setPortfolioData] = useState<CategoryData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<PortfolioCategory | null>(null);
  const [allImages, setAllImages] = useState<PortfolioImage[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingImages, setLoadingImages] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {
    try {
      // Fetch landing page images for each category from JJ Clicks API
      const res = await fetch('/api/jj-portfolio?landingOnly=true');
      const data = await res.json();

      if (data.success) {
        const landingImages: PortfolioImage[] = data.data;

        // Create portfolio data for each category
        const categories: PortfolioCategory[] = ['wedding', 'pre-wedding', 'events', 'portraits', 'cinematic', 'corporate', 'maternity', 'baby'];

        const portfolioItems = await Promise.all(
          categories.map(async (category) => {
            const landingImage = landingImages.find(img => img.category === category);

            // Get count of images in this category from JJ Clicks API
            const countRes = await fetch(`/api/jj-portfolio?category=${category}`);
            const countData = await countRes.json();
            const count = countData.success ? countData.data.length : 0;

            return {
              category,
              title: categoryLabels[category].title,
              subtitle: categoryLabels[category].subtitle,
              image: landingImage?.url || null,
              count,
            };
          })
        );

        setPortfolioData(portfolioItems);
      }
    } catch (error) {
      console.error('Error fetching JJ portfolio data:', error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = async (category: PortfolioCategory) => {
    setSelectedCategory(category);
    setModalOpen(true);
    setLoadingImages(true);

    try {
      const res = await fetch(`/api/jj-portfolio?category=${category}`);
      const data = await res.json();

      if (data.success) {
        setAllImages(data.data);
      }
    } catch (error) {
      console.error('Error fetching JJ category images:', error);
    } finally {
      setLoadingImages(false);
    }
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;

      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, allImages.length]);

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCategory(null);
    setAllImages([]);
    setLoadingImages(false);
  };

  if (loading) {
    return (
      <section id="portfolio" className="portfolio">
        <div className="portfolio-loading">
          <div className="loading-spinner">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
            </svg>
          </div>
          <h2 className="section-title">Loading Portfolio</h2>
          <p className="section-subtitle">Preparing our finest work...</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="portfolio" className="portfolio">
        <div className="portfolio-header">
          <span className="section-label">Our Work</span>
          <h2 className="section-title">
            Captured Moments
            <span className="title-accent"> That Last Forever</span>
          </h2>
          <p className="section-description">
            Explore our diverse portfolio showcasing weddings, events, and intimate moments
          </p>
        </div>

        <div className="portfolio-grid">
          {portfolioData.map((item) => (
            <div
              key={item.category}
              className="portfolio-item"
              onClick={() => item.count > 0 && openModal(item.category)}
              style={{ cursor: item.count > 0 ? 'pointer' : 'default' }}
            >
              <div className="portfolio-image-wrapper">
                {item.image ? (
                  <>
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={600}
                      height={600}
                      className="portfolio-image"
                    />
                    <div className="portfolio-overlay">
                      <div className="portfolio-overlay-content">
                        <h3>{item.title}</h3>
                        <p>{item.subtitle}</p>
                        {item.count > 0 && (
                          <button className="view-more-btn">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="11" cy="11" r="8"/>
                              <path d="m21 21-4.35-4.35"/>
                            </svg>
                            View Gallery
                          </button>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="portfolio-placeholder">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21 15 16 10 5 21"/>
                    </svg>
                    <p>Coming Soon</p>
                  </div>
                )}
              </div>
              <div className="portfolio-info">
                <div className="portfolio-info-text">
                  <h4>{item.title}</h4>
                  <p>{item.subtitle}</p>
                </div>
                <span className="portfolio-count">{item.count}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="portfolio-cta">
          <div className="instagram-badge">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <div>
              <p className="instagram-text">Follow us on Instagram</p>
              <a
                href="https://instagram.com/j_j_clicks"
                target="_blank"
                rel="noopener noreferrer"
                className="instagram-handle"
              >
                @j_j_clicks
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {modalOpen && (
        <div className="portfolio-modal" onClick={closeModal}>
          <div className="portfolio-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              ✕
            </button>
            <h2>{selectedCategory && categoryLabels[selectedCategory].title}</h2>
            <p className="modal-subtitle">
              {loadingImages ? 'Loading...' : `${allImages.length} ${allImages.length === 1 ? 'Photo' : 'Photos'}`}
            </p>
            <div className="modal-gallery">
              {loadingImages ? (
                <div className="modal-loading">
                  <div className="loading-spinner">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                    </svg>
                  </div>
                  <p>Loading images...</p>
                </div>
              ) : (
                allImages.map((image, index) => (
                  <div
                    key={image._id}
                    className="modal-image-wrapper"
                    onClick={() => openLightbox(index)}
                  >
                    <Image
                      src={image.url}
                      alt={selectedCategory || 'Portfolio'}
                      width={400}
                      height={400}
                      className="modal-image"
                    />
                    <div className="modal-image-overlay">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                      </svg>
                    </div>
                    <div className="modal-image-label">
                      {categoryLabels[image.category].title}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && allImages.length > 0 && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          <button className="lightbox-nav lightbox-prev" onClick={(e) => { e.stopPropagation(); prevImage(); }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>

          <button className="lightbox-nav lightbox-next" onClick={(e) => { e.stopPropagation(); nextImage(); }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>

          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-image-wrapper">
              <Image
                src={allImages[lightboxIndex].url}
                alt={`${selectedCategory} photo ${lightboxIndex + 1}`}
                width={1920}
                height={1080}
                className="lightbox-image"
                priority
              />
            </div>
            <div className="lightbox-info">
              <div className="lightbox-category">
                {selectedCategory && categoryLabels[selectedCategory].title}
              </div>
              <div className="lightbox-counter">
                {lightboxIndex + 1} / {allImages.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
