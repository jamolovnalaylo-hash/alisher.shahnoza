import React from 'react';

interface BurgundyCornerFloralProps {
  position: 'top-right' | 'bottom-left' | 'top-left' | 'bottom-right';
  className?: string;
}

export const BurgundyCornerFloral: React.FC<BurgundyCornerFloralProps> = ({
  position,
  className = "w-36 h-36 sm:w-44 sm:h-44",
}) => {
  const transformClass = {
    'top-right': 'top-0 right-0',
    'bottom-left': 'bottom-0 left-0 rotate-180',
    'top-left': 'top-0 left-0 -scale-x-100',
    'bottom-right': 'bottom-0 right-0 scale-x-[-1] rotate-180',
  }[position];

  return (
    <div
      className={`absolute ${transformClass} pointer-events-none select-none z-10 ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-[0_4px_12px_rgba(40,5,12,0.22)]"
      >
        {/* Subtle Golden Splatter / Glitter Dots */}
        <g opacity="0.85">
          <circle cx="175" cy="45" r="2.5" fill="url(#royalGoldGrad)" />
          <circle cx="160" cy="25" r="3" fill="url(#royalGoldGrad)" />
          <circle cx="140" cy="50" r="2" fill="url(#royalGoldGrad)" />
          <circle cx="185" cy="75" r="2.5" fill="url(#royalGoldGrad)" />
          <circle cx="120" cy="30" r="1.5" fill="url(#royalGoldGrad)" />
          <circle cx="150" cy="80" r="2" fill="url(#royalGoldGrad)" />
          <circle cx="95" cy="45" r="1.5" fill="url(#royalGoldGrad)" />
          <circle cx="110" cy="90" r="2" fill="url(#royalGoldGrad)" />
          <circle cx="65" cy="65" r="1.5" fill="url(#royalGoldGrad)" />
        </g>

        {/* Golden Foil Stems and Leaf Veins */}
        <path
          d="M200 0 C160 30, 110 70, 60 130"
          stroke="url(#royalGoldGrad)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M170 10 C140 40, 110 50, 75 80"
          stroke="url(#royalGoldGrad)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Burgundy Velvet Main Flower (Top Right Corner) */}
        <g transform="translate(145, 45)">
          {/* Flower Petals Layer 1 - Deepest Velvet Burgundy */}
          <path
            d="M0 -38 C18 -38, 32 -22, 28 0 C38 10, 36 28, 20 34 C5 38, -15 36, -26 22 C-38 6, -34 -15, -20 -28 C-12 -35, -5 -38, 0 -38 Z"
            fill="#4A0814"
          />
          {/* Petals Layer 2 - Rich Royal Maroon */}
          <path
            d="M-5 -28 C10 -32, 24 -18, 20 0 C28 8, 25 22, 12 26 C0 30, -15 26, -20 15 C-26 2, -22 -12, -12 -22 Z"
            fill="#6B1222"
          />
          {/* Petals Layer 3 - Lush Wine Tone */}
          <path
            d="M-3 -18 C8 -22, 18 -12, 14 0 C18 6, 16 16, 7 18 C-2 20, -10 16, -14 8 C-18 -2, -14 -10, -7 -15 Z"
            fill="#8C182E"
          />
          {/* Petals Layer 4 - Crimson Highlights */}
          <path
            d="M-2 -10 C5 -12, 12 -6, 9 0 C12 4, 10 10, 4 12 C-2 13, -6 10, -8 5 C-11 -1, -8 -6, -4 -9 Z"
            fill="#A8253D"
          />
          {/* Golden Pistils & Stardust Core */}
          <circle cx="0" cy="0" r="4.5" fill="#2E0409" />
          <circle cx="0" cy="0" r="2.5" fill="url(#royalGoldGrad)" />
          <circle cx="2" cy="-2" r="1" fill="#FFFFFF" />
        </g>

        {/* Second Flower (Slightly Smaller, Offset) */}
        <g transform="translate(95, 95)">
          <path
            d="M0 -26 C12 -26, 22 -15, 18 0 C24 6, 22 18, 12 22 C2 25, -10 23, -16 14 C-24 4, -20 -10, -12 -18 Z"
            fill="#520C17"
          />
          <path
            d="M-3 -18 C6 -20, 15 -10, 12 0 C16 4, 14 12, 6 15 C-2 17, -8 14, -12 7 C-15 -1, -12 -8, -6 -13 Z"
            fill="#751628"
          />
          <path
            d="M-2 -10 C4 -12, 10 -6, 8 0 C10 3, 9 8, 4 10 C-1 11, -5 8, -7 4 Z"
            fill="#911F35"
          />
          <circle cx="0" cy="0" r="3" fill="#2E0409" />
          <circle cx="0" cy="0" r="1.5" fill="url(#royalGoldGrad)" />
        </g>

        {/* Third Flower Bud (Edge) */}
        <g transform="translate(180, 115)">
          <path
            d="M-8 -14 C2 -16, 12 -6, 8 4 C12 10, 6 18, -2 16 C-10 14, -14 4, -8 -14 Z"
            fill="#6B1222"
          />
          <path
            d="M-5 -9 C1 -10, 8 -3, 5 3 C6 7, 2 12, -2 10 C-7 8, -9 2, -5 -9 Z"
            fill="#8C182E"
          />
          <circle cx="0" cy="0" r="1.5" fill="url(#royalGoldGrad)" />
        </g>

        {/* Golden Foil Flourish Tendril */}
        <path
          d="M130 110 Q145 140 165 155 Q175 160 185 150"
          stroke="url(#royalGoldGrad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="185" cy="150" r="2" fill="url(#royalGoldGrad)" />
      </svg>
    </div>
  );
};
