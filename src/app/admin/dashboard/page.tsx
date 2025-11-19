'use client';

import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

type PortfolioCategory =
  | 'wedding'
  | 'pre-wedding'
  | 'events'
  | 'portraits'
  | 'cinematic'
  | 'corporate'
  | 'maternity'
  | 'baby';

interface PortfolioImage {
  _id: string;
  url: string;
  category: PortfolioCategory;
  isLandingPage: boolean;
  order: number;
}

const categories: { value: PortfolioCategory; label: string; icon: string }[] = [
  { value: 'wedding', label: 'Wedding', icon: '💍' },
  { value: 'pre-wedding', label: 'Pre-Wedding', icon: '💑' },
  { value: 'events', label: 'Events', icon: '🎉' },
  { value: 'portraits', label: 'Portraits', icon: '📸' },
  { value: 'cinematic', label: 'Cinematic', icon: '🎬' },
  { value: 'corporate', label: 'Corporate', icon: '💼' },
  { value: 'maternity', label: 'Maternity', icon: '🤰' },
  { value: 'baby', label: 'Baby & Newborn', icon: '👶' },
];

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<PortfolioCategory>('wedding');
  const [images, setImages] = useState<PortfolioImage[]>([]);
  const [allImages, setAllImages] = useState<PortfolioImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [isLandingPage, setIsLandingPage] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchImages();
      fetchAllImages();
    }
  }, [selectedCategory, session]);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/jj-portfolio?category=${selectedCategory}`);
      const data = await res.json();
      if (data.success) {
        setImages(data.data);
      }
    } catch (error) {
      console.error('Error fetching JJ images:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllImages = async () => {
    try {
      const res = await fetch('/api/jj-portfolio');
      const data = await res.json();
      if (data.success) {
        setAllImages(data.data);
      }
    } catch (error) {
      console.error('Error fetching all JJ images:', error);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) return;

    if (images.length >= 20) {
      alert('Maximum 20 images allowed per category');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', uploadFile);
    formData.append('category', selectedCategory);
    formData.append('isLandingPage', isLandingPage.toString());

    try {
      const res = await fetch('/api/jj-portfolio', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        alert('Image uploaded successfully!');
        setUploadFile(null);
        setIsLandingPage(false);
        fetchImages();
        fetchAllImages();
      } else {
        alert(data.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      const res = await fetch(`/api/jj-portfolio?id=${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (data.success) {
        alert('Image deleted successfully!');
        fetchImages();
        fetchAllImages();
      } else {
        alert(data.error || 'Delete failed');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete image');
    }
  };

  const toggleLandingPage = async (id: string, currentValue: boolean) => {
    try {
      const res = await fetch('/api/jj-portfolio', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isLandingPage: !currentValue }),
      });

      const data = await res.json();
      if (data.success) {
        fetchImages();
      } else {
        alert(data.error || 'Update failed');
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('Failed to update image');
    }
  };

  if (status === 'loading') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#F5F6F0' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', color: '#636B2F' }}>⏳</div>
          <div style={{ marginTop: '1rem', color: '#5A6333' }}>Loading...</div>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-container">
          <div className="header-content">
            <div className="logo-section">
              <Image src="/jjlogoblack.png" alt="JJ Clicks" width={100} height={50} />
              <div className="logo-divider"></div>
              <span className="dashboard-title">Admin Dashboard</span>
            </div>
            <div className="header-actions">
              <span className="user-name">👋 {session.user?.name}</span>
              <a href="/" className="btn-secondary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                </svg>
                View Site
              </a>
              <button onClick={() => signOut({ callbackUrl: '/admin/login' })} className="btn-logout">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="admin-main">
        <div className="admin-container">
          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #636B2F 0%, #7A8447 100%)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <path d="M21 15l-5-5L5 21"/>
                </svg>
              </div>
              <div className="stat-content">
                <div className="stat-value">{allImages.length}</div>
                <div className="stat-label">Total Images</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #4A5228 0%, #636B2F 100%)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
              </div>
              <div className="stat-content">
                <div className="stat-value">{images.length}/20</div>
                <div className="stat-label">Category Images</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #7A8447 0%, #A8B574 100%)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M3 3h18v18H3zM21 9H3M21 15H3M12 3v18"/>
                </svg>
              </div>
              <div className="stat-content">
                <div className="stat-value">8</div>
                <div className="stat-label">Categories</div>
              </div>
            </div>
          </div>

          {/* Upload Section */}
          <div className="upload-section">
            <div className="section-header">
              <h2>Upload New Image</h2>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as PortfolioCategory)}
                className="category-select"
              >
                {categories.map((cat) => {
                  const count = allImages.filter((img) => img.category === cat.value).length;
                  return (
                    <option key={cat.value} value={cat.value}>
                      {cat.icon} {cat.label} ({count}/20)
                    </option>
                  );
                })}
              </select>
            </div>

            <form onSubmit={handleUpload} className="upload-form">
              <div className="upload-card">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                  required
                  id="file-input"
                  className="file-input"
                />
                <label htmlFor="file-input" className="file-label">
                  <div className="upload-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="17 8 12 3 7 8"/>
                      <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                  </div>
                  {uploadFile ? (
                    <div className="file-info">
                      <div className="file-name">{uploadFile.name}</div>
                      <div className="file-size">{(uploadFile.size / 1024 / 1024).toFixed(2)} MB</div>
                    </div>
                  ) : (
                    <div className="upload-text">
                      <div className="upload-title">Click to upload or drag and drop</div>
                      <div className="upload-subtitle">PNG, JPG, GIF up to 10MB</div>
                    </div>
                  )}
                </label>

                <div className="upload-options">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={isLandingPage}
                      onChange={(e) => setIsLandingPage(e.target.checked)}
                      className="checkbox-input"
                    />
                    <span className="checkbox-text">Set as category landing page image</span>
                  </label>
                </div>

                <button type="submit" disabled={!uploadFile || uploading} className="btn-upload">
                  {uploading ? (
                    <>
                      <svg className="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                      </svg>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="17 8 12 3 7 8"/>
                        <line x1="12" y1="3" x2="12" y2="15"/>
                      </svg>
                      Upload Image
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Images Grid */}
          <div className="images-section">
            <div className="section-header">
              <h2>
                {categories.find((c) => c.value === selectedCategory)?.icon}{' '}
                {categories.find((c) => c.value === selectedCategory)?.label} Images
              </h2>
              <div className="images-count">{images.length} / 20 images</div>
            </div>

            {loading ? (
              <div className="loading-state">
                <div className="loading-spinner"></div>
                <div>Loading images...</div>
              </div>
            ) : images.length === 0 ? (
              <div className="empty-state">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
                <h3>No images yet</h3>
                <p>Upload your first image to this category</p>
              </div>
            ) : (
              <div className="images-grid">
                {images.map((image) => (
                  <div key={image._id} className="image-card">
                    <div className="image-wrapper">
                      <Image
                        src={image.url}
                        alt="Portfolio"
                        width={400}
                        height={300}
                        className="image"
                      />
                      {image.isLandingPage && (
                        <div className="landing-badge">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                          Landing
                        </div>
                      )}
                    </div>
                    <div className="image-actions">
                      <button
                        onClick={() => toggleLandingPage(image._id, image.isLandingPage)}
                        className={`btn-action ${image.isLandingPage ? 'active' : ''}`}
                        title={image.isLandingPage ? 'Remove as landing' : 'Set as landing'}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill={image.isLandingPage ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(image._id)}
                        className="btn-action btn-delete"
                        title="Delete image"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6"/>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <style jsx>{`
        .admin-dashboard {
          min-height: 100vh;
          background: #F5F6F0;
        }

        .admin-header {
          background: white;
          border-bottom: 1px solid rgba(99, 107, 47, 0.1);
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .admin-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 0;
          gap: 2rem;
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .logo-divider {
          width: 1px;
          height: 32px;
          background: rgba(99, 107, 47, 0.2);
        }

        .dashboard-title {
          font-family: 'Oswald', sans-serif;
          font-size: 1.25rem;
          color: #2C3318;
          font-weight: 600;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .user-name {
          color: #5A6333;
          font-weight: 500;
          padding: 0 1rem;
          border-right: 1px solid rgba(99, 107, 47, 0.2);
        }

        .btn-secondary {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.625rem 1.25rem;
          background: #F5F6F0;
          color: #636B2F;
          border: 1px solid rgba(99, 107, 47, 0.2);
          border-radius: 8px;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.2s;
        }

        .btn-secondary:hover {
          background: rgba(99, 107, 47, 0.1);
          border-color: var(--primary);
        }

        .btn-logout {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.625rem 1.25rem;
          background: white;
          color: #dc3545;
          border: 1px solid rgba(220, 53, 69, 0.3);
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-logout:hover {
          background: #dc3545;
          color: white;
          border-color: #dc3545;
        }

        .admin-main {
          padding: 2.5rem 0;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .stat-card {
          background: white;
          padding: 1.75rem;
          border-radius: 12px;
          border: 1px solid rgba(99, 107, 47, 0.1);
          display: flex;
          align-items: center;
          gap: 1.25rem;
          transition: all 0.3s;
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(99, 107, 47, 0.15);
          border-color: var(--primary);
        }

        .stat-icon {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .stat-content {
          flex: 1;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 700;
          color: #2C3318;
          font-family: 'Oswald', sans-serif;
          line-height: 1;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          color: #5A6333;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .upload-section,
        .images-section {
          background: white;
          border-radius: 16px;
          padding: 2rem;
          margin-bottom: 2rem;
          border: 1px solid rgba(99, 107, 47, 0.1);
        }

        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 2px solid rgba(99, 107, 47, 0.1);
        }

        .section-header h2 {
          font-family: 'Oswald', sans-serif;
          font-size: 1.75rem;
          color: #2C3318;
          font-weight: 600;
          margin: 0;
        }

        .category-select {
          padding: 0.75rem 1.25rem;
          border: 1px solid rgba(99, 107, 47, 0.3);
          border-radius: 8px;
          background: #F5F6F0;
          color: #2C3318;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .category-select:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(99, 107, 47, 0.1);
        }

        .upload-form {
          max-width: 800px;
          margin: 0 auto;
        }

        .upload-card {
          border: 2px dashed rgba(99, 107, 47, 0.3);
          border-radius: 12px;
          padding: 3rem 2rem;
          text-align: center;
          transition: all 0.3s;
        }

        .upload-card:hover {
          border-color: var(--primary);
          background: rgba(99, 107, 47, 0.02);
        }

        .file-input {
          display: none;
        }

        .file-label {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          cursor: pointer;
          margin-bottom: 2rem;
        }

        .upload-icon {
          color: var(--primary);
        }

        .upload-text {
          color: #5A6333;
        }

        .upload-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #2C3318;
          margin-bottom: 0.5rem;
        }

        .upload-subtitle {
          font-size: 0.9rem;
          color: #5A6333;
        }

        .file-info {
          color: #2C3318;
        }

        .file-name {
          font-weight: 600;
          font-size: 1.125rem;
          margin-bottom: 0.5rem;
        }

        .file-size {
          color: #5A6333;
          font-size: 0.9rem;
        }

        .upload-options {
          margin-bottom: 2rem;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          cursor: pointer;
        }

        .checkbox-input {
          width: 20px;
          height: 20px;
          cursor: pointer;
          accent-color: var(--primary);
        }

        .checkbox-text {
          color: #2C3318;
          font-weight: 500;
        }

        .btn-upload {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 2.5rem;
          background: var(--primary);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-upload:hover:not(:disabled) {
          background: var(--dark-primary);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(99, 107, 47, 0.3);
        }

        .btn-upload:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .spinner {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .images-count {
          padding: 0.5rem 1rem;
          background: rgba(99, 107, 47, 0.1);
          color: var(--primary);
          border-radius: 20px;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .images-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .image-card {
          background: #F5F6F0;
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s;
          border: 2px solid transparent;
        }

        .image-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(99, 107, 47, 0.2);
          border-color: var(--primary);
        }

        .image-wrapper {
          position: relative;
          aspect-ratio: 4/3;
          overflow: hidden;
        }

        .image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .landing-badge {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          background: var(--primary);
          color: white;
          padding: 0.375rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.375rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .image-actions {
          display: flex;
          padding: 0.75rem;
          gap: 0.5rem;
        }

        .btn-action {
          flex: 1;
          padding: 0.625rem;
          background: white;
          border: 1px solid rgba(99, 107, 47, 0.2);
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #5A6333;
        }

        .btn-action:hover {
          background: rgba(99, 107, 47, 0.1);
          border-color: var(--primary);
          color: var(--primary);
        }

        .btn-action.active {
          background: var(--primary);
          border-color: var(--primary);
          color: white;
        }

        .btn-delete {
          color: #dc3545;
        }

        .btn-delete:hover {
          background: rgba(220, 53, 69, 0.1);
          border-color: #dc3545;
        }

        .loading-state,
        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          color: #5A6333;
        }

        .loading-spinner {
          width: 48px;
          height: 48px;
          border: 4px solid rgba(99, 107, 47, 0.1);
          border-top-color: var(--primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 1rem;
        }

        .empty-state svg {
          color: rgba(99, 107, 47, 0.3);
          margin-bottom: 1rem;
        }

        .empty-state h3 {
          font-size: 1.5rem;
          color: #2C3318;
          margin-bottom: 0.5rem;
        }

        .empty-state p {
          color: #5A6333;
        }

        @media (max-width: 768px) {
          .admin-container {
            padding: 0 1rem;
          }

          .header-content {
            flex-direction: column;
            gap: 1rem;
            padding: 1rem 0;
          }

          .logo-section {
            width: 100%;
          }

          .logo-divider {
            display: none;
          }

          .header-actions {
            width: 100%;
            flex-wrap: wrap;
          }

          .user-name {
            width: 100%;
            padding: 0.5rem;
            text-align: center;
            border: none;
            border-bottom: 1px solid rgba(99, 107, 47, 0.2);
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .section-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .images-grid {
            grid-template-columns: 1fr;
          }

          .upload-card {
            padding: 2rem 1rem;
          }
        }
      `}</style>
    </div>
  );
}
