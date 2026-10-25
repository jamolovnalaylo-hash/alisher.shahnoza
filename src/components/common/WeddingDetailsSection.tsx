import React from 'react';
import { Calendar, Clock, MapPin, Navigation, Sparkles } from 'lucide-react';

interface WeddingDetailsSectionProps {
  weddingDate: string; // YYYY-MM-DD
  weddingTime: string; // HH:mm
  venueName: string;
  venueAddress: string;
  mapUrl?: string;
  coupleNames?: string;
}

export const WeddingDetailsSection: React.FC<WeddingDetailsSectionProps> = ({
  weddingDate,
  weddingTime,
  venueName,
  venueAddress,
  mapUrl,
  coupleNames = "Madina & Aziz",
}) => {
  // Format Uzbek Date: e.g., "20-Iyun, 2027-yil"
  const formatUzbekDate = (dateStr: string) => {
    if (!dateStr) return { formatted: "20-IYUN, 2027-YIL", dayOfWeek: "Yakshanba" };
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const year = parts[0];
        const monthNum = parseInt(parts[1], 10);
        const day = parseInt(parts[2], 10);

        const monthsUz = [
          "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
          "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"
        ];
        const monthName = monthsUz[monthNum - 1] || "Iyun";

        // Day of week
        const d = new Date(dateStr);
        const daysUz = ["Yakshanba", "Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"];
        const dayOfWeek = daysUz[d.getDay()] || "";

        return {
          formatted: `${day}-${monthName.toUpperCase()}, ${year}-YIL`,
          dayOfWeek: dayOfWeek,
        };
      }
    } catch {
      // fallback
    }
    return { formatted: dateStr, dayOfWeek: "" };
  };

  const dateInfo = formatUzbekDate(weddingDate);

  // Target Google Maps link
  const targetMapUrl =
    mapUrl && mapUrl.trim().length > 0
      ? mapUrl.trim()
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          `${venueName} ${venueAddress}`
        )}`;

  // Google Calendar Link generator
  const getGoogleCalendarUrl = () => {
    try {
      const startDateTime = new Date(`${weddingDate}T${weddingTime || '18:00'}:00`);
      const endDateTime = new Date(startDateTime.getTime() + 4 * 60 * 60 * 1000);
      const formatIso = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, "");
      const title = encodeURIComponent(`${coupleNames} - Nikoh To‘yi`);
      const details = encodeURIComponent(`Bizning baxtli kunimizga xush kelibsiz! To'yxona: ${venueName}`);
      const location = encodeURIComponent(`${venueName}, ${venueAddress}`);
      return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formatIso(startDateTime)}/${formatIso(endDateTime)}&details=${details}&location=${location}`;
    } catch {
      return '#';
    }
  };

  return (
    <div className="relative my-8 px-2 sm:px-4">
      {/* Luxury Gold Border Container */}
      <div className="relative rounded-3xl border-2 border-[#D4AF37]/60 p-5 sm:p-8 bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EC] to-[#F3EBE0] shadow-[0_16px_40px_rgba(40,25,10,0.14)] text-center overflow-hidden">
        {/* Subtle Cotton Paper Texture */}
        <div className="absolute inset-0 bg-parchment opacity-50 pointer-events-none" />

        {/* Section Header */}
        <div className="relative z-10 mb-6">
          <span className="font-cinzel text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#8C6D28] font-bold block mb-1">
            TANTANA TAFSILOTLARI
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#2C2219]">
            To‘y Ma’lumotlari
          </h3>
          <div className="h-[1.5px] w-28 mx-auto bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent my-2" />
        </div>

        {/* 3 Luxury Information Cards Grid */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
          {/* 1. SANA (Date) */}
          <div className="p-4 rounded-2xl border border-[#D4AF37]/50 bg-white/70 backdrop-blur-sm shadow-sm flex flex-col items-center justify-center transition-all duration-300 hover:shadow-md hover:border-[#D4AF37]">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#AA771C] flex items-center justify-center text-white mb-2 shadow-sm">
              <Calendar className="w-5 h-5 text-[#FFF9E6]" />
            </div>
            <span className="font-cinzel text-[10px] uppercase tracking-widest text-[#8C6D28] font-bold">
              TO‘Y SANASI
            </span>
            <span className="font-cinzel text-base sm:text-lg font-extrabold text-[#2C2219] mt-1">
              {dateInfo.formatted}
            </span>
            {dateInfo.dayOfWeek && (
              <span className="text-xs font-serif text-[#8C6D28] mt-0.5">
                {dateInfo.dayOfWeek}
              </span>
            )}
          </div>

          {/* 2. VAQT (Time) */}
          <div className="p-4 rounded-2xl border border-[#D4AF37]/50 bg-white/70 backdrop-blur-sm shadow-sm flex flex-col items-center justify-center transition-all duration-300 hover:shadow-md hover:border-[#D4AF37]">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#AA771C] flex items-center justify-center text-white mb-2 shadow-sm">
              <Clock className="w-5 h-5 text-[#FFF9E6]" />
            </div>
            <span className="font-cinzel text-[10px] uppercase tracking-widest text-[#8C6D28] font-bold">
              BOSHLANISH VAQTI
            </span>
            <span className="font-cinzel text-base sm:text-lg font-extrabold text-[#2C2219] mt-1">
              SOAT {weddingTime || "18:00"}
            </span>
            <span className="text-xs font-serif text-[#8C6D28] mt-0.5">
              Tantanali ziyofat
            </span>
          </div>

          {/* 3. TO'YXONA (Venue) */}
          <div className="p-4 rounded-2xl border border-[#D4AF37]/50 bg-white/70 backdrop-blur-sm shadow-sm flex flex-col items-center justify-center transition-all duration-300 hover:shadow-md hover:border-[#D4AF37]">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#AA771C] flex items-center justify-center text-white mb-2 shadow-sm">
              <MapPin className="w-5 h-5 text-[#FFF9E6]" />
            </div>
            <span className="font-cinzel text-[10px] uppercase tracking-widest text-[#8C6D28] font-bold">
              TO‘YXONA
            </span>
            <span className="font-cinzel text-base sm:text-lg font-extrabold text-gold-foil mt-1">
              {venueName || "Zarafshon Saroyi"}
            </span>
            <span className="text-xs font-serif text-stone-600 mt-0.5 line-clamp-1">
              {venueAddress || "Navoiy shahri"}
            </span>
          </div>
        </div>

        {/* Address Banner */}
        <div className="relative z-10 p-3 sm:p-4 rounded-xl border border-[#D4AF37]/35 bg-white/50 backdrop-blur-sm mb-6 max-w-lg mx-auto">
          <p className="font-serif text-sm sm:text-base text-stone-700 leading-relaxed">
            <span className="font-semibold text-[#8C6D28]">Manzil:</span> {venueAddress || "Navoiy shahri, Amir Temur shoh ko‘chasi"}
          </p>
        </div>

        {/* Action Buttons: «Xaritada ko‘rish» & «Taqvimga saqlash» */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          {/* «Xaritada ko‘rish» button as explicitly required */}
          <a
            href={targetMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F5E59E] to-[#AA771C] text-[#2C1F0C] font-cinzel font-bold text-xs sm:text-sm tracking-wider uppercase shadow-[0_4px_14px_rgba(170,119,28,0.3)] hover:shadow-gold-glow hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            <Navigation className="w-4 h-4 text-[#2C1F0C]" />
            <span>«Xaritada ko‘rish»</span>
          </a>

          {/* Add to Google Calendar button */}
          <a
            href={getGoogleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white/80 border border-[#D4AF37]/60 text-[#8C6D28] font-cinzel font-semibold text-xs sm:text-sm tracking-wider uppercase hover:bg-white hover:border-[#D4AF37] transition-all shadow-sm cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#C5A047]" />
            <span>Taqvimga saqlash</span>
          </a>
        </div>
      </div>
    </div>
  );
};
