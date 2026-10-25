import React from 'react';

// Deep Burgundy Roses & Golden Foliage Garland for Arch Shoulders and Corners
export const BurgundyRoseGarland: React.FC<{
  className?: string;
  mirrored?: boolean;
}> = ({ className = "w-36 h-36", mirrored = false }) => {
  return (
    <div
      className={`pointer-events-none select-none transition-transform duration-700 ${
        mirrored ? '-scale-x-100' : ''
      } ${className}`}
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-[0_4px_10px_rgba(40,5,12,0.25)]"
      >
        {/* Soft Golden Vine Curves */}
        <path
          d="M20 180 Q60 120 110 90 Q150 70 185 25"
          stroke="url(#royalGoldGrad)"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
          opacity="0.9"
        />
        <path
          d="M40 160 Q80 140 115 150 Q160 160 175 130"
          stroke="url(#royalGoldGrad)"
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        />

        {/* Delicate Golden Leaves */}
        <path
          d="M85 105 C95 95, 110 95, 115 108 C105 118, 90 115, 85 105 Z"
          fill="url(#royalGoldGrad)"
          opacity="0.85"
        />
        <path
          d="M140 60 C150 50, 165 52, 168 65 C158 75, 145 70, 140 60 Z"
          fill="url(#royalGoldGrad)"
          opacity="0.85"
        />
        <path
          d="M50 145 C60 135, 75 138, 78 150 C68 158, 55 155, 50 145 Z"
          fill="url(#royalGoldGrad)"
          opacity="0.75"
        />

        {/* Botanical Deep Emerald / Sage Leaves */}
        <path
          d="M100 80 C112 65, 130 68, 132 82 C120 95, 105 92, 100 80 Z"
          fill="#3E5445"
          opacity="0.9"
        />
        <path
          d="M60 120 C72 105, 90 108, 92 122 C80 135, 65 132, 60 120 Z"
          fill="#4D6B56"
          opacity="0.85"
        />
        <path
          d="M130 40 C140 28, 155 30, 156 42 C145 52, 134 49, 130 40 Z"
          fill="#3E5445"
          opacity="0.8"
        />

        {/* Rose 1: Main Deep Burgundy Rose (Center) */}
        <g transform="translate(105, 75)">
          {/* Outer Petals */}
          <ellipse cx="0" cy="0" rx="30" ry="26" fill="#4A0814" />
          <path
            d="M-24 6 C-30 -14, -12 -26, 7 -24 C20 -22, 28 -9, 24 9 C20 22, -6 26, -24 6 Z"
            fill="#6B1222"
          />
          {/* Middle Petals */}
          <path
            d="M-17 -6 C-20 -17, -5 -22, 9 -18 C20 -13, 21 2, 15 13 C9 20, -9 18, -17 -6 Z"
            fill="#80182A"
          />
          {/* Inner Petal Layers */}
          <path
            d="M-9 -3 C-12 -12, 0 -16, 8 -12 C16 -7, 14 6, 7 10 C0 14, -7 9, -9 -3 Z"
            fill="#9C2237"
          />
          {/* Core Velvet Heart */}
          <ellipse cx="0" cy="0" rx="6" ry="5" fill="#30040A" />
          <circle cx="1" cy="-1" r="2.5" fill="#D4AF37" />
        </g>

        {/* Rose 2: Side Burgundy Rosebud */}
        <g transform="translate(55, 140)">
          <ellipse cx="0" cy="0" rx="20" ry="17" fill="#520C17" />
          <path
            d="M-15 3 C-19 -9, -6 -17, 4 -15 C13 -13, 18 -4, 15 6 C11 15, -4 17, -15 3 Z"
            fill="#751628"
          />
          <path
            d="M-10 -3 C-12 -10, 0 -13, 7 -10 C12 -7, 11 4, 6 8 C0 10, -7 6, -10 -3 Z"
            fill="#8F1F33"
          />
          <ellipse cx="0" cy="0" rx="4" ry="3.5" fill="#30040A" />
        </g>

        {/* Rose 3: Top Burgundy Rose Accent */}
        <g transform="translate(160, 30)">
          <ellipse cx="0" cy="0" rx="16" ry="14" fill="#5A0E1B" />
          <path
            d="M-12 2 C-15 -7, -5 -13, 3 -12 C10 -11, 14 -3, 12 5 C9 12, -3 14, -12 2 Z"
            fill="#7A182B"
          />
          <circle cx="0" cy="0" r="3.5" fill="#2E0409" />
          <circle cx="0.5" cy="-0.5" r="1.5" fill="#D4AF37" />
        </g>

        {/* Golden Stardust Accents */}
        <circle cx="120" cy="45" r="2.5" fill="url(#royalGoldGrad)" />
        <circle cx="80" cy="70" r="2" fill="url(#royalGoldGrad)" />
        <circle cx="170" cy="75" r="2.5" fill="url(#royalGoldGrad)" />
        <circle cx="45" cy="115" r="2" fill="url(#royalGoldGrad)" />
      </svg>
    </div>
  );
};

// Export alias for backwards compatibility
export const BlushRoseGarland = BurgundyRoseGarland;

// Grand Neoclassical Wedding Arch Header with Burgundy & Gold
export const GrandBurgundyArchHeader: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="relative w-full pt-6 pb-2 px-2 sm:px-6">
      {/* Decorative Burgundy Rose Garlands on Arch Left & Right Shoulders */}
      <BurgundyRoseGarland className="absolute -top-4 -left-4 sm:-left-6 w-32 sm:w-44 h-32 sm:h-44 z-20" />
      <BurgundyRoseGarland className="absolute -top-4 -right-4 sm:-right-6 w-32 sm:w-44 h-32 sm:h-44 z-20" mirrored />

      {/* Main Arch Structure with Burgundy & Gold Molding */}
      <div className="relative rounded-t-[140px] sm:rounded-t-[200px] border-2 border-[#D4AF37]/80 p-2 sm:p-3 bg-gradient-to-b from-[#FFFDF9]/90 via-[#FDF9F2]/60 to-transparent shadow-[0_0_30px_rgba(117,22,40,0.18)]">
        {/* Inner Burgundy Damask Border with Gold Filigree */}
        <div className="relative rounded-t-[125px] sm:rounded-t-[185px] border-2 border-[#751628]/40 p-4 sm:p-6 text-center bg-gradient-to-b from-[#FDFBF7] to-transparent">
          {/* Apex Golden & Burgundy Imperial Crown Crest */}
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#FAF7F2] px-4 py-1 z-20 flex items-center justify-center border-b border-[#D4AF37]/40 rounded-full">
            <svg
              width="64"
              height="32"
              viewBox="0 0 64 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="filter drop-shadow-[0_2px_5px_rgba(117,22,40,0.35)]"
            >
              <path
                d="M32 2 L38 12 L52 6 L46 24 L18 24 L12 6 L26 12 Z"
                fill="url(#royalGoldGrad)"
              />
              <circle cx="32" cy="1" r="3.5" fill="#751628" stroke="url(#royalGoldGrad)" strokeWidth="1" />
              <circle cx="12" cy="5" r="2.5" fill="#751628" />
              <circle cx="52" cy="5" r="2.5" fill="#751628" />
              <circle cx="32" cy="18" r="3" fill="#FFFFFF" />
              <path
                d="M10 28 C22 24, 42 24, 54 28"
                stroke="url(#royalGoldGrad)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="32" cy="28" r="2" fill="url(#royalGoldGrad)" />
            </svg>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};

// ================= INDIVIDUAL BURGUNDY ARCH PHOTO FRAME =================
// As explicitly requested: 2 separate arches, NO names underneath the photos!
export const BurgundyArchPhotoFrame: React.FC<{
  src: string;
  role: 'KELIN' | 'KUYOV';
  mirrored?: boolean;
}> = ({ src, role, mirrored = false }) => {
  return (
    <div className="flex flex-col items-center group relative">
      {/* Outer Grand Burgundy Architectural Arch */}
      <div
        className="relative p-2 sm:p-2.5 rounded-t-[100px] sm:rounded-t-[130px] rounded-b-2xl shadow-[0_16px_36px_rgba(50,8,16,0.35),0_0_15px_rgba(212,175,55,0.45)] border-2 border-[#D4AF37] transition-all duration-500 group-hover:scale-[1.03]"
        style={{
          background: 'linear-gradient(135deg, #7A1424 0%, #4D0914 50%, #29040A 100%)',
        }}
      >
        {/* Burgundy Velvet Texture & Gold Arabesque Filigree Details on Arch Header */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <svg width="42" height="18" viewBox="0 0 42 18" fill="none">
            <path d="M21 0 L25 7 L34 3 L30 14 L12 14 L8 3 L17 7 Z" fill="url(#royalGoldGrad)" />
            <circle cx="21" cy="1" r="2" fill="#FFFFFF" />
          </svg>
        </div>

        {/* Delicate Burgundy Rose Sprig on Arch Shoulder */}
        <div
          className={`absolute -top-3 ${
            mirrored ? '-left-3' : '-right-3'
          } w-10 h-10 pointer-events-none z-30`}
        >
          <svg viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="12" fill="#6B1222" />
            <circle cx="20" cy="20" r="8" fill="#8C1B2E" />
            <circle cx="20" cy="20" r="4" fill="#D4AF37" />
          </svg>
        </div>

        {/* Inner Fine Gold Border Molding */}
        <div className="p-1 rounded-t-[92px] sm:rounded-t-[122px] rounded-b-[14px] bg-gradient-to-b from-[#FFF5B7] via-[#D4AF37] to-[#8C6618]">
          {/* Photo Window inside the Arch */}
          <div className="relative w-36 h-50 sm:w-48 sm:h-64 md:w-52 md:h-72 rounded-t-[88px] sm:rounded-t-[118px] rounded-b-xl overflow-hidden bg-stone-100 shadow-inner">
            <img
              src={src}
              alt={role}
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-108"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (role === 'KELIN') {
                  target.src = "/images/bride-default.jpg";
                } else {
                  target.src = "/images/groom-default.jpg";
                }
              }}
            />

            {/* Subtle Warm Vignette & Fine Gold Inset Ring */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2E050D]/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 border border-[#D4AF37]/50 rounded-t-[88px] sm:rounded-t-[118px] rounded-b-xl pointer-events-none" />
          </div>
        </div>
      </div>
      {/* Notice: As strictly requested by user, NO names or labels under the photos! */}
    </div>
  );
};
