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

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {
    try {
      // Fetch landing page images for each category
      const res = await fetch('/api/portfolio?landingOnly=true');
      const data = await res.json();

      if (data.success) {
        const landingImages: PortfolioImage[] = data.data;

        // Create portfolio data for each category
        const categories: PortfolioCategory[] = ['wedding', 'pre-wedding', 'events', 'portraits', 'cinematic', 'corporate', 'maternity', 'baby'];

        const portfolioItems = await Promise.all(
          categories.map(async (category) => {
            const landingImage = landingImages.find(img => img.category === category);

            // Get count of images in this category
            const countRes = await fetch(`/api/portfolio?category=${category}`);
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
      console.error('Error fetching portfolio data:', error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = async (category: PortfolioCategory) => {
    setSelectedCategory(category);
    setModalOpen(true);

    try {
      const res = await fetch(`/api/portfolio?category=${category}`);
      const data = await res.json();

      if (data.success) {
        setAllImages(data.data);
      }
    } catch (error) {
      console.error('Error fetching category images:', error);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCategory(null);
    setAllImages([]);
  };

  if (loading) {
    return (
      <section id="portfolio" className="portfolio">
        <h2 className="section-title">Portfolio</h2>
        <p className="section-subtitle">Loading our finest work...</p>
      </section>
    );
  }

  return (
    <>
      <section id="portfolio" className="portfolio">
        <h2 className="section-title">Portfolio</h2>
        <p className="section-subtitle">A glimpse of our finest work</p>
        <div className="instagram-cta">
          <p>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }}>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
            Follow us on{' '}
            <a
              href="https://instagram.com/lv_clicks_"
              target="_blank"
              rel="noopener noreferrer"
              className="instagram-link"
            >
              @lv_clicks_
            </a>{' '}
            for our latest work!
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
                    <h3>{item.title}</h3>
                    <p>{item.subtitle}</p>
                    {item.count > 0 && (
                      <button className="view-more-btn">
                        View {item.count} {item.count === 1 ? 'Photo' : 'Photos'}
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <div className="portfolio-placeholder">
                  <p>No images yet</p>
                </div>
              )}
              <div className="portfolio-title-bar">
                <h4>{item.title}</h4>
                <span className="portfolio-count">{item.count} photos</span>
              </div>
            </div>
          ))}
        </div>
        <div className="portfolio-note">
          <p>
            For more recent work and behind-the-scenes content, visit our{' '}
            <a
              href="https://instagram.com/lv_clicks_"
              target="_blank"
              rel="noopener noreferrer"
              className="instagram-link"
            >
              Instagram profile
            </a>
            .
          </p>
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
              {allImages.length} {allImages.length === 1 ? 'Photo' : 'Photos'}
            </p>
            <div className="modal-gallery">
              {allImages.map((image) => (
                <div key={image._id} className="modal-image-wrapper">
                  <Image
                    src={image.url}
                    alt={selectedCategory || 'Portfolio'}
                    width={400}
                    height={400}
                    className="modal-image"
                  />
                  <div className="modal-image-label">
                    {categoryLabels[image.category].title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
