import React from 'react';
import { BurgundyRoseGarland } from './FloralGoldDecorations';

interface SingleArchedCouplePhotoProps {
  src: string;
}

export const SingleArchedCouplePhoto: React.FC<SingleArchedCouplePhotoProps> = ({
  src,
}) => {
  return (
    <div className="relative w-full max-w-sm sm:max-w-md mx-auto my-6 px-4 flex justify-center">
      {/* Decorative Burgundy Rose Garlands on the Arch Shoulders */}
      <BurgundyRoseGarland className="absolute -top-6 -left-3 sm:-left-6 w-32 sm:w-40 h-32 sm:h-40 z-20 pointer-events-none" />
      <BurgundyRoseGarland className="absolute -top-6 -right-3 sm:-right-6 w-32 sm:w-40 h-32 sm:h-40 z-20 pointer-events-none" mirrored />

      {/* Main Single Grand Arched Frame */}
      <div
        className="relative p-2.5 sm:p-3 rounded-t-[140px] sm:rounded-t-[170px] rounded-b-3xl shadow-[0_20px_45px_rgba(40,10,18,0.25),0_0_15px_rgba(212,175,55,0.4)] border-2 border-[#D4AF37] transition-transform duration-500 hover:scale-[1.01]"
        style={{
          background: 'linear-gradient(135deg, #7A1424 0%, #4D0914 50%, #29040A 100%)',
        }}
      >
        {/* Top Gold Crest Medallion */}
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <svg width="48" height="20" viewBox="0 0 48 20" fill="none">
            <path d="M24 0 L29 8 L39 4 L34 16 L14 16 L9 4 L19 8 Z" fill="url(#royalGoldGrad)" />
            <circle cx="24" cy="2" r="2.5" fill="#FFFFFF" />
          </svg>
        </div>

        {/* Inner Fine Gold Inset Molding */}
        <div className="p-1 rounded-t-[130px] sm:rounded-t-[160px] rounded-b-[20px] bg-gradient-to-b from-[#FFF5B7] via-[#D4AF37] to-[#8C6618]">
          {/* Couple Photo Window */}
          <div className="relative w-60 h-80 sm:w-72 sm:h-96 md:w-80 md:h-[420px] rounded-t-[125px] sm:rounded-t-[155px] rounded-b-2xl overflow-hidden bg-stone-100 shadow-inner">
            <img
              src={src || "/images/bride-default.jpg"}
              alt="Kelin va Kuyov"
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/images/bride-default.jpg";
              }}
            />

            {/* Subtle Warm Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2E050D]/35 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 border border-[#D4AF37]/50 rounded-t-[125px] sm:rounded-t-[155px] rounded-b-2xl pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};
