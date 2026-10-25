import React from 'react';
import { BurgundyCornerFloral } from './BurgundyCornerFloral';

interface WeddingCalendarSectionProps {
  weddingDate: string; // YYYY-MM-DD
}

export const WeddingCalendarSection: React.FC<WeddingCalendarSectionProps> = ({
  weddingDate,
}) => {
  // Parse year, month, day
  const dateObj = new Date(weddingDate || '2027-06-20');
  const year = dateObj.getFullYear() || 2027;
  const monthIndex = isNaN(dateObj.getMonth()) ? 5 : dateObj.getMonth();
  const targetDay = isNaN(dateObj.getDate()) ? 20 : dateObj.getDate();

  const monthsUz = [
    'YANVAR', 'FEVRAL', 'MART', 'APREL', 'MAY', 'IYUN',
    'IYUL', 'AVGUST', 'SENTABR', 'OKTABR', 'NOYABR', 'DEKABR'
  ];
  const monthName = monthsUz[monthIndex] || 'IYUN';

  // Calculate days in month
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  // Day of week of the 1st of month (Monday as first day of week: 0 = Mon, 6 = Sun)
  const firstDay = new Date(year, monthIndex, 1).getDay();
  // In JS getDay(): 0 is Sunday, 1 is Monday... so convert to Monday-first:
  const startOffset = (firstDay + 6) % 7;

  // Calendar cells
  const cells: (number | null)[] = [];
  for (let i = 0; i < startOffset; i++) {
    cells.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(d);
  }

  const weekHeaders = ['DU', 'SE', 'CH', 'PA', 'JU', 'SH', 'YA'];

  return (
    <div className="relative w-full max-w-md mx-auto my-10 py-10 px-6 sm:px-8 rounded-3xl border border-[#D4AF37]/50 bg-gradient-to-b from-[#FFFDF9] via-[#FAF6EE] to-[#F5EBE1] shadow-[0_20px_50px_rgba(40,10,18,0.18)] overflow-hidden text-center">
      {/* Corner Burgundy Floral Decor matching video */}
      <BurgundyCornerFloral position="top-right" className="w-36 h-36" />
      <BurgundyCornerFloral position="bottom-left" className="w-36 h-36" />

      {/* Subtle Luxury Damask Texture */}
      <div className="absolute inset-0 bg-parchment opacity-60 pointer-events-none" />

      {/* Calendar Header: e.g. "SENTABR 2026" or "IYUN 2027" */}
      <div className="relative z-10 mb-6">
        <h3 className="font-cinzel text-lg sm:text-xl font-bold tracking-[0.25em] text-[#751628] uppercase">
          {monthName} {year}
        </h3>
        <div className="h-[1.5px] w-20 mx-auto bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent my-1.5" />
      </div>

      {/* Weekday Labels: DU SE CH PA JU SH YA */}
      <div className="relative z-10 grid grid-cols-7 gap-1 sm:gap-2 mb-3 text-center">
        {weekHeaders.map((head, idx) => (
          <span
            key={idx}
            className="text-[11px] sm:text-xs font-cinzel font-semibold text-[#8C6D28] tracking-wider"
          >
            {head}
          </span>
        ))}
      </div>

      {/* Days Grid */}
      <div className="relative z-10 grid grid-cols-7 gap-1 sm:gap-2 text-center text-xs sm:text-sm font-sans font-medium text-stone-700">
        {cells.map((day, idx) => {
          if (!day) {
            return <div key={`empty-${idx}`} className="h-9 sm:h-10" />;
          }

          const isWeddingDay = day === targetDay;

          return (
            <div
              key={`day-${day}`}
              className="h-9 sm:h-10 flex items-center justify-center relative"
            >
              {isWeddingDay ? (
                // Heart shape circling the wedding date as in screenshot 4
                <div className="relative flex items-center justify-center animate-pulse">
                  <svg
                    viewBox="0 0 32 32"
                    className="w-8 h-8 sm:w-9 sm:h-9 fill-[#751628] filter drop-shadow-[0_3px_6px_rgba(117,22,40,0.45)]"
                  >
                    <path d="M16 29 C7 20, 2 15, 2 9.5 C2 5, 5.5 1.5, 10 1.5 C12.5 1.5, 14.8 2.7, 16 4.5 C17.2 2.7, 19.5 1.5, 22 1.5 C26.5 1.5, 30 5, 30 9.5 C30 15, 25 20, 16 29 Z" />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center font-cinzel font-bold text-white text-xs sm:text-sm pt-0.5">
                    {day}
                  </span>
                </div>
              ) : (
                <span className="hover:text-[#751628] transition-colors">
                  {day}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Subtle Down Indicator */}
      <div className="relative z-10 mt-6 pt-2 flex justify-center text-[#751628]/60">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </div>
  );
};
