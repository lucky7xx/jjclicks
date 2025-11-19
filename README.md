# JJ Clicks - Professional Photography Portfolio

A modern, full-stack Next.js website for **JJ Clicks** featuring a complete admin panel for managing portfolio images.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![Cloudinary](https://img.shields.io/badge/Cloudinary-CDN-blue)

---

## ✨ Features

### Public Website
- 🎨 Beautiful coral orange & blue themed design
- 📱 Fully responsive (mobile, tablet, desktop)
- 🖼️ 8 portfolio categories
- 🎬 Smooth animations and transitions
- 🔍 Modal galleries for viewing all photos
- 📸 Instagram integration
- 📧 Contact form
- ⚡ Lightning fast with Next.js

### Admin Panel
- 🔐 Secure authentication system
- 📤 Upload up to 20 images per category
- ⭐ Set featured "landing page" images
- 🗑️ Delete images with one click
- 📊 Real-time image counter
- 📱 Mobile-friendly admin interface
- 🚪 Secure logout

---

## 🚀 Quick Start

**Get started in 5 minutes!** → See [QUICKSTART.md](./QUICKSTART.md)

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your MongoDB and Cloudinary credentials

# 3. Create admin user
npm run create-admin

# 4. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📚 Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** - Get running in 5 minutes
- **[SETUP.md](./SETUP.md)** - Complete setup guide with MongoDB & Cloudinary
- **[ADMIN_FEATURES.md](./ADMIN_FEATURES.md)** - Admin panel documentation
- **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Technical overview

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: MongoDB Atlas (Free tier)
- **Image Storage**: Cloudinary (Free tier)
- **Authentication**: NextAuth.js
- **Styling**: Custom CSS (coral orange & blue theme)
- **Fonts**: Google Fonts (Oswald & Lato)

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin panel pages
│   ├── api/               # API routes
│   └── globals.css        # Styling
├── components/            # React components
├── lib/                   # Database & utilities
├── models/                # MongoDB models
└── types/                 # TypeScript types
```

---

## 🎯 Portfolio Categories

1. **Wedding** - Ceremonies & receptions
2. **Pre-Wedding** - Engagement shoots
3. **Events** - Parties & celebrations
4. **Portraits** - Individual & family
5. **Cinematic** - Video production
6. **Corporate** - Business events
7. **Maternity** - Pregnancy shoots
8. **Baby & Newborn** - Baby photography

---

## 🔐 Admin Access

- **Login URL**: http://localhost:3000/admin/login
- **Dashboard**: http://localhost:3000/admin/dashboard

Create your admin account:
```bash
npm run create-admin
```

---

## 🌐 Environment Variables

Required in `.env.local`:

```env
# MongoDB Atlas
MONGODB_URI=mongodb+srv://...

# NextAuth
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

---

## 📊 Free Tier Limits

- **MongoDB Atlas**: 512 MB storage (FREE)
- **Cloudinary**: 25 GB storage + bandwidth (FREE)
- **Total Cost**: $0/month 🎉

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
```

Or connect your GitHub repo to Vercel for automatic deployments.

---

## 📱 Screenshots

### Public Website
- Hero section with animated shimmer text
- Portfolio grid with 8 categories
- Modal gallery for viewing all images
- Contact form
- Responsive mobile design

### Admin Panel
- Secure login page
- Dashboard with category sidebar
- Image upload interface
- Gallery management
- Real-time counters

---

## 🎨 Color Theme

```css
--primary: #FF6B35      /* Coral Orange */
--dark-primary: #E55A2B
--light-primary: #FFB5A0
--accent: #004E89       /* Deep Blue */
--light-accent: #1A6DB5
--black: #0A0A0A
--dark-gray: #1A1A1A
--cream: #F7F7FF
```

---

## 🤝 Contributing

This is a private project for JJ Clicks.

---

## 📄 License

All rights reserved - JJ Clicks © 2025

---

## 🆘 Support

Having issues? Check:
1. [SETUP.md](./SETUP.md) - Troubleshooting section
2. [QUICKSTART.md](./QUICKSTART.md) - Common setup issues
3. Environment variables are correct
4. MongoDB Atlas and Cloudinary are configured

---

## ✨ Credits

- **Design & Development**: [mystiq.tech](https://mystiq.tech)
- **Photography**: JJ Clicks
- **Built with**: Next.js, MongoDB, Cloudinary

---

**Built with ❤️ for professional photographers**
