import React from 'react';

interface DateTimePillBadgeProps {
  weddingDate: string; // YYYY-MM-DD
  weddingTime: string; // HH:mm
}

export const DateTimePillBadge: React.FC<DateTimePillBadgeProps> = ({
  weddingDate,
  weddingTime,
}) => {
  // Format Date: e.g. "21 SENTABR 2026"
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "20 IYUN 2027";
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const year = parts[0];
        const monthNum = parseInt(parts[1], 10);
        const day = parseInt(parts[2], 10);

        const months = [
          'YANVAR', 'FEVRAL', 'MART', 'APREL', 'MAY', 'IYUN',
          'IYUL', 'AVGUST', 'SENTABR', 'OKTABR', 'NOYABR', 'DEKABR'
        ];
        const monthName = months[monthNum - 1] || 'IYUN';
        return `${day} ${monthName} ${year}`;
      }
    } catch {
      // fallback
    }
    return dateStr;
  };

  return (
    <div className="flex flex-col items-center justify-center my-6">
      {/* The Rounded Luxury Badge matching Image 2 */}
      <div className="relative px-8 py-3 rounded-2xl bg-white/90 backdrop-blur-md border border-[#D4AF37]/60 shadow-[0_4px_16px_rgba(40,10,18,0.1)] flex flex-col items-center justify-center">
        {/* Subtle Decorative Burgundy Diamond Accents on Left & Right Sides */}
        <div className="absolute left-2.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rotate-45 bg-[#751628]" />
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rotate-45 bg-[#751628]" />

        <span className="font-cinzel text-xs sm:text-sm font-bold tracking-[0.2em] text-[#751628] uppercase">
          {formatDate(weddingDate)}
        </span>
        <span className="font-sans text-xs sm:text-sm font-semibold tracking-widest text-stone-600 mt-0.5">
          {weddingTime || "18:00"}
        </span>
      </div>

      {/* Down Arrow Indicator as seen in Image 2 */}
      <div className="mt-4 text-[#751628]/60 animate-bounce">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </div>
  );
};
