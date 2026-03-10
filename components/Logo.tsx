import React from 'react';

interface LogoProps {
  className?: string;     // Controls the size of the icon container
  classNameText?: string; // Controls the color/style of the main text
  classNameIcon?: string; // Controls the color of the SVG icon
  classNameSubtitle?: string; // Controls the color of the subtitle
  onClick?: () => void;   // Optional click handler
}

const Logo: React.FC<LogoProps> = ({ 
  className = "w-8 h-8", 
  classNameText = "text-navy-900",
  classNameIcon = "text-navy-900",
  classNameSubtitle = "text-slate-600",
  onClick
}) => {
  return (
    <div 
      className="flex items-center gap-3 md:gap-4 group cursor-pointer select-none"
      onClick={onClick}
    >
      <div className={`relative ${className} transition-transform duration-700 ease-out group-hover:rotate-180`}>
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-full h-full ${classNameIcon}`}>
          {/* Abstract Cube/Fortress Shape */}
          <path d="M20 2L3.5359 11.5V30.5L20 40L36.4641 30.5V11.5L20 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-20"/>
          <path d="M20 2V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-20"/>
          <path d="M3.5359 11.5L20 21L36.4641 11.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-20"/>
          
          {/* Inner Core - The "Found" Object */}
          <path d="M20 12L12 16.5V25.5L20 30L28 25.5V16.5L20 12Z" fill="currentColor" className="group-hover:text-gold-500 transition-colors duration-500"/>
          <path d="M20 12L20 21" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M12 16.5L20 21L28 16.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
      <div className="flex flex-col">
        <span className={`font-serif font-bold text-xl md:text-2xl tracking-tight leading-none ${classNameText}`}>
          FoundLab
        </span>
        <span className={`text-[10px] uppercase tracking-[0.25em] font-bold mt-1 group-hover:text-gold-500 transition-colors duration-300 ${classNameSubtitle}`}>
          Infrastructure
        </span>
      </div>
    </div>
  );
};

export default Logo;
