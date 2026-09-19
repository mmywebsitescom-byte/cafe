import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { FavoritesDrawer } from '../favorites/FavoritesDrawer';
import { ScrollProgressBar } from '../common/ScrollProgressBar';
import { ScrollToTopButton } from '../common/ScrollToTopButton';
import { DemoCafeSwitcher } from '../common/DemoCafeSwitcher';

interface PageContainerProps {
  children: React.ReactNode;
  transparentNav?: boolean;
}

export const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#17120F] text-[#F8F3EC] relative">
      <ScrollProgressBar />
      <Navbar />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
      <FavoritesDrawer />
      <ScrollToTopButton />
      <DemoCafeSwitcher />
    </div>
  );
};
