import { ReactNode } from "react";

interface PageBackgroundProps {
  image: string;
  children: ReactNode;
}

const PageBackground = ({ image, children }: PageBackgroundProps) => {
  return (
    <div className="min-h-screen bg-primary text-primary-foreground relative">
      {/* Full-page background image */}
      <div className="fixed inset-0 z-0">
        <img
          src={image}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/75 to-primary/90" />
      </div>

      <div className="relative z-10 animate-fade-in">
        {children}
      </div>
    </div>
  );
};

export default PageBackground;
