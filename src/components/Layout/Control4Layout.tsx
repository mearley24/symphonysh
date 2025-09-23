import React from 'react';
import Header from '../Header';
import Footer from '../Footer';

interface Control4LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  className?: string;
}

export const Control4Layout = ({ 
  children, 
  showHeader = true, 
  showFooter = true,
  className = ""
}: Control4LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(120,119,198,0.1),_transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(120,119,198,0.05),_transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,_rgba(59,130,246,0.03),_transparent_50%)] pointer-events-none" />
      
      {showHeader && <Header />}
      
      <main className={`flex-1 px-4 md:px-8 lg:px-12 relative z-10 ${showHeader ? 'pt-20 sm:pt-24' : ''} ${className}`}>
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
      
      {showFooter && <Footer />}
    </div>
  );
};

export default Control4Layout;