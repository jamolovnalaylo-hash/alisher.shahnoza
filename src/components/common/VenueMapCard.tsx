import React from 'react';
import { MapPin, Navigation, Calendar as CalendarIcon, ExternalLink } from 'lucide-react';

interface VenueMapCardProps {
  venueName: string;
  venueAddress: string;
  mapUrl?: string;
  weddingDate: string;
  weddingTime: string;
  coupleNames: string;
  language?: 'uz' | 'ru';
  isDark?: boolean;
}

export const VenueMapCard: React.FC<VenueMapCardProps> = ({
  venueName,
  venueAddress,
  mapUrl,
  weddingDate,
  weddingTime,
  coupleNames,
  language = 'uz',
  isDark = false,
}) => {
  // Generate reliable map link fallback if mapUrl is empty
  const targetMapUrl = mapUrl && mapUrl.trim().length > 0
    ? mapUrl.trim()
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${venueName} ${venueAddress}`)}`;

  // Google Calendar event generator
  const getGoogleCalendarUrl = () => {
    try {
      const startDateTime = new Date(`${weddingDate}T${weddingTime || '18:00'}:00`);
      const endDateTime = new Date(startDateTime.getTime() + 4 * 60 * 60 * 1000); // 4 hours duration

      const formatIso = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, "");
      const title = encodeURIComponent(`${coupleNames} - Nikoh To‘yi`);
      const details = encodeURIComponent(`Bizning baxtli kunimizga xush kelibsiz! To'yxona: ${venueName}`);
      const location = encodeURIComponent(`${venueName}, ${venueAddress}`);

      return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formatIso(startDateTime)}/${formatIso(endDateTime)}&details=${details}&location=${location}`;
    } catch {
      return '#';
    }
  };

  const t = {
    uz: {
      venueTitle: "To‘yxona manzili",
      viewMap: "Xaritada ko‘rish",
      addToCalendar: "Taqvimga saqlash",
      openInMaps: "Google Maps orqali yo‘nalish olish",
    },
    ru: {
      venueTitle: "Место торжества",
      viewMap: "Посмотреть на карте",
      addToCalendar: "Добавить в календарь",
      openInMaps: "Маршрут в Google Maps",
    },
  }[language];

  return (
    <div
      className={`my-6 p-5 md:p-6 rounded-2xl border text-center transition-all duration-300 ${
        isDark
          ? 'bg-gradient-to-b from-[#24201C] to-[#161412] border-[#D4AF37]/35 shadow-xl text-stone-200'
          : 'bg-gradient-to-b from-[#FFFDF9] to-[#F7F2E7] border-[#D4AF37]/40 shadow-lg text-[#2E2820]'
      }`}
    >
      {/* Icon with Gold Ripple */}
      <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center bg-gradient-to-tr from-[#B38728] to-[#FDF2B5] shadow-gold-glow">
        <MapPin className="w-6 h-6 text-[#2E2312]" />
      </div>

      <span className="text-[11px] md:text-xs font-cinzel uppercase tracking-[0.25em] text-[#C5A047] font-semibold block mb-1">
        {t.venueTitle}
      </span>

      {/* Venue Name */}
      <h4 className="font-cinzel text-xl md:text-2xl font-bold tracking-wide text-gold-foil mb-2">
        {venueName || "Zarafshon Saroyi"}
      </h4>

      {/* Address */}
      <p className={`text-sm md:text-base font-serif max-w-sm mx-auto leading-relaxed mb-5 ${
        isDark ? 'text-stone-300' : 'text-stone-700'
      }`}>
        {venueAddress || "Toshkent shahri, Yunusobod tumani"}
      </p>

      {/* Action Buttons: Maps & Calendar */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href={targetMapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#C5A047] via-[#DFBF6A] to-[#B38728] text-[#1E170A] font-semibold text-xs md:text-sm tracking-wider uppercase shadow-md hover:shadow-gold-glow hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
        >
          <Navigation className="w-4 h-4" />
          <span>{t.viewMap}</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-70" />
        </a>

        <a
          href={getGoogleCalendarUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border text-xs md:text-sm tracking-wider font-medium transition-all duration-200 ${
            isDark
              ? 'border-[#C5A047]/50 text-[#F5EFEB] hover:bg-[#C5A047]/15'
              : 'border-[#B38728]/50 text-[#543E19] hover:bg-[#B38728]/10'
          }`}
        >
          <CalendarIcon className="w-4 h-4 text-[#C5A047]" />
          <span>{t.addToCalendar}</span>
        </a>
      </div>
    </div>
  );
};
