import React from 'react';

interface LogoProps {
  className?: string;        // Optional container class
  classNameText?: string;    // Controls the color/style of the main text
  classNameSubtitle?: string;// Controls the color of the subtitle
  onClick?: () => void;      // Optional click handler
  showSubtitle?: boolean;    // Option to hide/show subtitle
}

const Logo: React.FC<LogoProps> = ({ 
  className = "", 
  classNameText = "text-navy-900",
  classNameSubtitle = "text-slate-500",
  onClick,
  showSubtitle = true
}) => {
  return (
    <div 
      className={`flex items-center group cursor-pointer select-none ${className}`}
      onClick={onClick}
    >
      {/* Brand Logotype & Subtitle */}
      <div className="flex flex-col">
        <span className={`font-serif font-bold text-xl md:text-2xl tracking-tight leading-none ${classNameText} group-hover:text-cyan-800 transition-colors`}>
          FoundLab
        </span>
        {showSubtitle && (
          <span className={`text-[9px] md:text-[10px] uppercase tracking-[0.22em] font-bold mt-1 ${classNameSubtitle} transition-colors duration-300 ease-out group-hover:text-cyan-700`}>
            Auditable Trust Infrastructure
          </span>
        )}
      </div>
    </div>
  );
};

export default Logo;
