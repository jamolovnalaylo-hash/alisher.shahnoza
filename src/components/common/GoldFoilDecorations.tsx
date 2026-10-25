import React from 'react';

// Common Golden Gradients Definition used by SVG components
export const SvgGoldGradients: React.FC = () => (
  <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
    <defs>
      <linearGradient id="royalGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#AA771C" />
        <stop offset="25%" stopColor="#FBF5B7" />
        <stop offset="50%" stopColor="#D4AF37" />
        <stop offset="75%" stopColor="#FDF2B5" />
        <stop offset="100%" stopColor="#8C6618" />
      </linearGradient>

      <linearGradient id="roseGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#9E4F5A" />
        <stop offset="30%" stopColor="#FFEBEB" />
        <stop offset="50%" stopColor="#D48995" />
        <stop offset="70%" stopColor="#FFD6D6" />
        <stop offset="100%" stopColor="#B76E79" />
      </linearGradient>

      <linearGradient id="burgundyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#751B2C" />
        <stop offset="50%" stopColor="#5C1220" />
        <stop offset="100%" stopColor="#3A0811" />
      </linearGradient>

      <filter id="goldGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>

      <filter id="waxShadowFilter" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.45" />
      </filter>
    </defs>
  </svg>
);

// Ornate Corner Flourish (Victorian / Baroque Gold Ornament)
export const GoldCorner: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
  isRoseGold?: boolean;
}> = ({ position, className = "w-16 h-16", isRoseGold = false }) => {
  const rotationClass = {
    'top-left': '',
    'top-right': 'rotate-90',
    'bottom-right': 'rotate-180',
    'bottom-left': '-rotate-90',
  }[position];

  const strokeUrl = isRoseGold ? "url(#roseGoldGrad)" : "url(#royalGoldGrad)";

  return (
    <svg
      viewBox="0 0 100 100"
      className={`${className} ${rotationClass} pointer-events-none transition-transform duration-700`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 5 L60 5 C45 15, 30 25, 25 45 C20 30, 15 15, 5 5 Z"
        stroke={strokeUrl}
        strokeWidth="1.5"
        fill="none"
        opacity="0.8"
      />
      <path
        d="M8 8 Q45 8, 45 45 Q45 15, 8 8"
        stroke={strokeUrl}
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M5 5 L5 60 C15 45, 25 30, 45 25 C30 20, 15 15, 5 5 Z"
        stroke={strokeUrl}
        strokeWidth="1.5"
        fill="none"
        opacity="0.8"
      />
      <circle cx="16" cy="16" r="3" fill={strokeUrl} />
      <circle cx="28" cy="8" r="1.5" fill={strokeUrl} />
      <circle cx="8" cy="28" r="1.5" fill={strokeUrl} />
      <path d="M5 80 L5 5 L80 5" stroke={strokeUrl} strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
    </svg>
  );
};

// Royal Crest / Divider with Imperial Monogram Crown
export const RoyalDivider: React.FC<{
  className?: string;
  isRoseGold?: boolean;
}> = ({ className = "w-64 h-8 my-4", isRoseGold = false }) => {
  const strokeUrl = isRoseGold ? "url(#roseGoldGrad)" : "url(#royalGoldGrad)";

  return (
    <div className={`flex items-center justify-center ${className} mx-auto`}>
      <svg
        viewBox="0 0 320 36"
        className="w-full h-full pointer-events-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left flourish line */}
        <path d="M10 18 Q70 18, 110 18" stroke={strokeUrl} strokeWidth="1.2" />
        <circle cx="10" cy="18" r="2.5" fill={strokeUrl} />
        <path d="M75 14 Q95 8, 115 18" stroke={strokeUrl} strokeWidth="1" fill="none" />
        <path d="M75 22 Q95 28, 115 18" stroke={strokeUrl} strokeWidth="1" fill="none" />

        {/* Center Imperial Crown & Fleur-de-lis */}
        <g transform="translate(145, 4)">
          <path
            d="M15 0 L20 12 L28 4 L25 22 L5 22 L2 4 L10 12 Z"
            fill={strokeUrl}
            opacity="0.9"
          />
          <circle cx="15" cy="-2" r="2.5" fill={strokeUrl} />
          <circle cx="1" cy="2" r="1.5" fill={strokeUrl} />
          <circle cx="29" cy="2" r="1.5" fill={strokeUrl} />
          <path d="M8 25 L22 25" stroke={strokeUrl} strokeWidth="1.5" />
          <circle cx="15" cy="14" r="2" fill="#FFFFFF" />
        </g>

        {/* Right flourish line */}
        <path d="M210 18 Q250 18, 310 18" stroke={strokeUrl} strokeWidth="1.2" />
        <circle cx="310" cy="18" r="2.5" fill={strokeUrl} />
        <path d="M205 18 Q225 8, 245 14" stroke={strokeUrl} strokeWidth="1" fill="none" />
        <path d="M205 18 Q225 28, 245 22" stroke={strokeUrl} strokeWidth="1" fill="none" />
      </svg>
    </div>
  );
};

// Grand Palatial Decorative Arch SVG Frame (Crown + Double Arches + Column Details)
export const GrandGoldArch: React.FC<{
  className?: string;
  children?: React.ReactNode;
  variant?: 'royal' | 'baroque' | 'modern';
}> = ({ className = "", children, variant = 'royal' }) => {
  return (
    <div className={`relative p-4 md:p-6 ${className}`}>
      {/* Outer Arch Border */}
      <div className="relative border-2 border-[#D4AF37]/50 rounded-t-[140px] md:rounded-t-[180px] p-2.5 md:p-3 shadow-[0_0_20px_rgba(212,175,55,0.15)] bg-gradient-to-b from-white/30 to-transparent">
        {/* Inner Fine Gold Border with Dotted Inset */}
        <div className="relative border border-[#AA771C]/40 rounded-t-[125px] md:rounded-t-[165px] p-3 md:p-5">
          {/* Top Decorative Filigree Crest */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center justify-center bg-[#FAF7F2] px-3 z-10">
            <svg width="48" height="24" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 0 L28 8 L38 3 L34 16 L14 16 L10 3 L20 8 Z" fill="url(#royalGoldGrad)" />
              <circle cx="24" cy="20" r="3" fill="url(#royalGoldGrad)" />
              <path d="M8 22 C16 18, 32 18, 40 22" stroke="url(#royalGoldGrad)" strokeWidth="1.5" />
            </svg>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};

// 3D Wax Seal with Interactive Clicking / Monogram
export const InteractiveWaxSeal: React.FC<{
  monogram?: string;
  onClick?: () => void;
  color?: 'burgundy' | 'gold' | 'rose' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  isHoverable?: boolean;
}> = ({
  monogram = "M & A",
  onClick,
  color = 'burgundy',
  size = 'md',
  isHoverable = true,
}) => {
  const sizeClasses = {
    sm: 'w-16 h-16 text-xs',
    md: 'w-20 h-20 text-sm md:w-24 md:h-24 md:text-base',
    lg: 'w-28 h-28 text-lg',
  }[size];

  const colorStyles = {
    burgundy: {
      bg: 'bg-gradient-to-br from-[#7D1B28] via-[#540F19] to-[#34070F]',
      border: 'border-[#420B13]',
      innerBorder: 'border-[#A33446]/40',
      text: 'text-[#E8BD70]',
      shadow: 'shadow-[0_12px_24px_rgba(50,10,16,0.6),inset_0_2px_4px_rgba(255,255,255,0.35),inset_0_-4px_6px_rgba(0,0,0,0.6)]',
    },
    gold: {
      bg: 'bg-gradient-to-br from-[#D8B459] via-[#B58B2E] to-[#8C6418]',
      border: 'border-[#735012]',
      innerBorder: 'border-[#FFE7A8]/50',
      text: 'text-[#FFF8E6]',
      shadow: 'shadow-[0_12px_24px_rgba(70,50,10,0.5),inset_0_2px_4px_rgba(255,255,255,0.5),inset_0_-4px_6px_rgba(0,0,0,0.6)]',
    },
    rose: {
      bg: 'bg-gradient-to-br from-[#C87F8D] via-[#A85868] to-[#783743]',
      border: 'border-[#632934]',
      innerBorder: 'border-[#FFD2DB]/40',
      text: 'text-[#FFE8EC]',
      shadow: 'shadow-[0_12px_24px_rgba(70,25,35,0.5),inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-4px_6px_rgba(0,0,0,0.6)]',
    },
    dark: {
      bg: 'bg-gradient-to-br from-[#2D2825] via-[#1B1715] to-[#0D0B0A]',
      border: 'border-[#080606]',
      innerBorder: 'border-[#8C7A60]/40',
      text: 'text-[#DFBF7A]',
      shadow: 'shadow-[0_12px_24px_rgba(0,0,0,0.7),inset_0_2px_4px_rgba(255,255,255,0.25),inset_0_-4px_6px_rgba(0,0,0,0.8)]',
    },
  }[color];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative rounded-full flex items-center justify-center p-1 select-none transition-all duration-300 ${sizeClasses} ${colorStyles.bg} ${colorStyles.shadow} ${
        isHoverable ? 'hover:scale-105 active:scale-95 cursor-pointer' : ''
      }`}
      aria-label="Muhri bosish va taklifnomani ochish"
    >
      {/* Organic Wax Irregular Ridges */}
      <div className="absolute inset-0 rounded-full border-2 border-white/20 opacity-40 pointer-events-none" />

      {/* Wax Rim Texture Ring */}
      <div className={`w-full h-full rounded-full border border-dashed ${colorStyles.innerBorder} flex items-center justify-center p-2`}>
        {/* Inner Stamped Seal */}
        <div className="w-full h-full rounded-full flex flex-col items-center justify-center border border-white/10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]">
          <span className="font-cinzel text-[9px] tracking-widest uppercase opacity-75 text-white/70">
            ROYAL
          </span>
          <span className={`font-pinyon font-bold leading-none my-0.5 tracking-wide ${colorStyles.text} filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]`}>
            {monogram}
          </span>
          <span className="text-[8px] font-sans tracking-widest uppercase opacity-60 text-white/60">
            SEAL
          </span>
        </div>
      </div>
    </button>
  );
};
