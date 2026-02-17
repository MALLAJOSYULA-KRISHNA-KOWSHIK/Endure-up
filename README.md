# ENDURE UP - Fitness Club Website

A modern, high-performance fitness club website built with **React**, **TypeScript**, **Tailwind CSS**, and **Vite**. ENDURE UP is built for those who refuse to quit - showcasing elite strength training, fat loss, and functional fitness programs.

## 🚀 Features

- **Modern Design**: Dark theme with dynamic red accents, smooth animations, and responsive layout
- **Hero Section**: Eye-catching landing section with call-to-action
- **About Section**: Mission and core values (Strength, Consistency, Community, Growth)
- **Programs Section**: Highlight fitness programs and training methodologies
- **Highlights Section**: Showcase achievements and testimonials
- **Contact Section**: Location, phone, Instagram, and business hours
- **Responsive**: Fully responsive design for mobile, tablet, and desktop
- **Performance**: Optimized with Vite for fast build times and instant HMR

## 📋 Project Structure

```
src/
├── components/          # React components
│   ├── Navbar.tsx      # Navigation bar
│   ├── HeroSection.tsx # Hero section
│   ├── AboutSection.tsx
│   ├── ProgramsSection.tsx
│   ├── HighlightsSection.tsx
│   ├── EventsSection.tsx
│   ├── GallerySection.tsx
│   ├── ContactSection.tsx
│   ├── Footer.tsx
│   └── ui/            # UI component library (Shadcn)
├── assets/            # Images and static files
├── lib/              # Utility functions
├── App.tsx           # Main app component
├── main.tsx          # Entry point
└── index.css         # Global styles
```

## 🛠️ Tech Stack

- **Frontend Framework**: React 18+
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Animations**: Framer Motion
- **Routing**: React Router
- **State Management**: React Query (TanStack)
- **Form Handling**: React Hook Form
- **Linting**: ESLint

## 📦 Installation

1. **Clone the repository**
```bash
git clone <YOUR_GIT_URL>
cd endure-project-ignition
```

2. **Install dependencies**
```bash
npm install
# or with bun
bun install
```

3. **Start the development server**
```bash
npm run dev
```

The site will be available at `http://localhost:8080` (or the next available port)

## 🏗️ Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

## 👀 Preview

```bash
npm run preview
```

Preview the production build locally.

## 🧪 Testing

Run tests with Vitest:
```bash
npm run test      # Run tests once
npm run test:watch # Run tests in watch mode
```

## 📝 Linting

```bash
npm run lint
```

## 🎨 Customization

### Colors & Theme
Edit `src/index.css` to customize color variables and theme.

### Navigation Links
Update navigation in `src/components/Navbar.tsx`

### Section Content
Each section component (`AboutSection.tsx`, `ProgramsSection.tsx`, etc.) can be customized independently.

### Assets
Replace images in `src/assets/` with your own:
- `endure-up-logo.jpg` - Logo used throughout the site
- `hero-bg.jpg` - Hero section background
- Gallery images: `gallery-1.jpg`, `gallery-2.jpg`, etc.

## 🚀 Deployment

The site can be deployed to any static hosting platform:

- **Vercel**: Connect your Git repo for automatic deployments
- **Netlify**: Similar Git-based deployment
- **GitHub Pages**: Configure GitHub Actions for CI/CD
- **Traditional Hosting**: Upload the `dist/` folder to your web server

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is built with Lovable and is ready for production deployment.

## 💪 About ENDURE UP

**Location**: Visakhapatnam, Andhra Pradesh  
**Phone**: +91 6309704219  
**Instagram**: @endure_up  
**Hours**: Every Sunday (Locations updated a day before)

---

Built with ❤️ for those who refuse to quit. Push Beyond Limits.
