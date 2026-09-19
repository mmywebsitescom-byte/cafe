import React from 'react';
import { BrowserRouter, HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CafeProvider } from './context/CafeContext';
import { MenuProvider } from './context/MenuContext';
import { ReviewProvider } from './context/ReviewContext';
import { GalleryProvider } from './context/GalleryContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ScrollToTop } from './components/common/ScrollToTop';
import { ErrorBoundary } from './components/common/ErrorBoundary';

// Pages
import { Home } from './pages/Home';
import { MenuPage } from './pages/Menu';
import { GalleryPage } from './pages/Gallery';
import { AboutPage } from './pages/About';
import { ContactPage } from './pages/Contact';
import { AdminPage } from './pages/Admin';

// Determine if HashRouter or BrowserRouter with basename is needed
// On GitHub Pages without server-side rewrites, HashRouter or automatic basename avoids blank screen
const RouterComponent: React.ComponentType<{ children: React.ReactNode }> = ({ children }) => {
  // Check if deployed on github.io or standard domain
  const isGithubPages = window.location.hostname.endsWith('github.io');

  if (isGithubPages) {
    return <HashRouter>{children}</HashRouter>;
  }

  return <BrowserRouter>{children}</BrowserRouter>;
};

export default function App() {
  return (
    <ErrorBoundary>
      <CafeProvider>
        <MenuProvider>
          <ReviewProvider>
            <GalleryProvider>
              <FavoritesProvider>
                <RouterComponent>
                  <ScrollToTop />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/menu" element={<MenuPage />} />
                    <Route path="/gallery" element={<GalleryPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </RouterComponent>
              </FavoritesProvider>
            </GalleryProvider>
          </ReviewProvider>
        </MenuProvider>
      </CafeProvider>
    </ErrorBoundary>
  );
}
