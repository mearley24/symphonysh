
import React from 'react';
import Header from '../Header';
import Footer from '../Footer';

interface iPadLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  className?: string;
}

export const iPadLayout = ({ 
  children, 
  showHeader = true, 
  showFooter = true,
  className = ""
}: iPadLayoutProps) => {
  return (
    <div className="min-h-screen bg-primary flex flex-col">
      {showHeader && <Header />}
      
      <main className={`flex-1 px-4 md:px-8 lg:px-12 ${showHeader ? 'pt-20 sm:pt-24' : ''} ${className}`}>
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>
      
      {showFooter && <Footer />}
    </div>
  );
};

export default iPadLayout;
