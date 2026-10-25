import React from 'react';
import { WeddingInvitationData } from '../../types';
import { CountdownTimer } from '../common/CountdownTimer';
import { VenueMapCard } from '../common/VenueMapCard';
import { RsvpSection } from '../common/RsvpSection';
import { Sparkles } from 'lucide-react';

interface DesignProps {
  data: WeddingInvitationData;
  onAddRsvp?: (entry: { guestName: string; guestsCount: number; phone?: string; message?: string }) => void;
}

export const ModernRoyalDesign: React.FC<DesignProps> = ({ data, onAddRsvp }) => {
  return (
    <div
      id="invitation-card-container"
      className="relative w-full max-w-xl mx-auto rounded-3xl p-6 md:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.6)] border border-[#D4AF37]/40 bg-modern-dark overflow-hidden text-[#F5F2EB]"
    >
      {/* Subtle modern geometric gold grid lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="0" x2="100%" y2="100%" stroke="#D4AF37" strokeWidth="0.5" />
          <line x1="100%" y1="0" x2="0" y2="100%" stroke="#D4AF37" strokeWidth="0.5" />
          <circle cx="50%" cy="50%" r="40%" stroke="#D4AF37" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      {/* Sleek Modern Gold Geometric Arch Container */}
      <div className="relative border border-[#D4AF37]/50 rounded-t-[140px] rounded-b-2xl p-5 md:p-8 text-center bg-[#181615]/90 backdrop-blur-md shadow-2xl">
        {/* Geometric Diamond Monogram */}
        <div className="w-14 h-14 mx-auto mb-3 rotate-45 border border-[#D4AF37] bg-[#221F1C] flex items-center justify-center shadow-gold-glow">
          <span className="-rotate-45 font-cinzel text-xl font-bold text-gold-foil">
            {data.brideName ? data.brideName[0] : 'M'}{data.groomName ? data.groomName[0] : 'A'}
          </span>
        </div>

        <span className="font-sans text-[11px] md:text-xs uppercase tracking-[0.4em] text-[#C5A047] font-semibold block mb-1">
          MODERN ROYAL
        </span>
        <p className="font-cinzel text-xs tracking-widest text-stone-400 uppercase">
          NIKOH TO‘YI MAROSIMI
        </p>

        {/* Contemporary Vertical Dual Arches */}
        <div className="my-8 flex items-center justify-center gap-3 sm:gap-6">
          {/* Bride Modern Arch */}
          <div className="flex flex-col items-center">
            <div className="relative p-1 rounded-t-[100px] border border-[#D4AF37] bg-[#24211E] shadow-gold-glow">
              <div className="w-28 h-40 sm:w-34 sm:h-48 rounded-t-[96px] overflow-hidden bg-stone-900 shadow-inner">
                <img
                  src={data.bridePhoto}
                  alt={data.brideName || "Kelin"}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500 filter brightness-95 contrast-105"
                />
              </div>
            </div>
            <span className="font-sans text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#C5A047] mt-2">
              Kelin
            </span>
          </div>

          {/* Minimalist Gold Slash Symbol */}
          <div className="flex flex-col items-center justify-center">
            <span className="font-cinzel text-2xl text-[#D4AF37] font-light">
              /
            </span>
          </div>

          {/* Groom Modern Arch */}
          <div className="flex flex-col items-center">
            <div className="relative p-1 rounded-t-[100px] border border-[#D4AF37] bg-[#24211E] shadow-gold-glow">
              <div className="w-28 h-40 sm:w-34 sm:h-48 rounded-t-[96px] overflow-hidden bg-stone-900 shadow-inner">
                <img
                  src={data.groomPhoto}
                  alt={data.groomName || "Kuyov"}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500 filter brightness-95 contrast-105"
                />
              </div>
            </div>
            <span className="font-sans text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#C5A047] mt-2">
              Kuyov
            </span>
          </div>
        </div>

        {/* Striking Gold Typography */}
        <div className="my-5">
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold tracking-wider text-gold-foil leading-tight">
            {data.brideName || "Madina"}
          </h2>
          <div className="flex items-center justify-center gap-3 my-2">
            <div className="h-[1px] w-14 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <span className="font-script text-3xl text-[#E8D49E]">&</span>
            <div className="h-[1px] w-14 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold tracking-wider text-gold-foil leading-tight">
            {data.groomName || "Aziz"}
          </h2>
        </div>

        {data.parentsNames && (
          <p className="text-xs md:text-sm font-sans tracking-wide text-stone-400 my-2">
            Hurmat bilan: {data.parentsNames}
          </p>
        )}

        <div className="my-6 max-w-md mx-auto whitespace-pre-line text-sm md:text-base font-serif leading-relaxed text-stone-300">
          {data.invitationText}
        </div>

        {/* Minimalist Date Badge */}
        <div className="my-6 inline-block py-2.5 px-8 rounded-full border border-[#D4AF37] bg-[#221F1C] shadow-lg">
          <p className="font-cinzel text-base md:text-lg font-bold tracking-widest text-gold-foil">
            {new Date(data.weddingDate).toLocaleDateString('uz-UZ', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-[#C5A047] mt-0.5">
            Soat {data.weddingTime || "18:00"} da
          </p>
        </div>

        {/* Countdown Timer in Dark Theme */}
        <CountdownTimer
          weddingDate={data.weddingDate}
          weddingTime={data.weddingTime}
          language={data.language}
          isDark={true}
        />

        {/* Venue & Map in Dark Theme */}
        <VenueMapCard
          venueName={data.venueName}
          venueAddress={data.venueAddress}
          mapUrl={data.mapUrl}
          weddingDate={data.weddingDate}
          weddingTime={data.weddingTime}
          coupleNames={`${data.brideName} & ${data.groomName}`}
          language={data.language}
          isDark={true}
        />

        {/* RSVP in Dark Theme */}
        {onAddRsvp && (
          <RsvpSection
            onAddRsvp={onAddRsvp}
            rsvpCount={data.rsvpList?.length}
            language={data.language}
            isDark={true}
          />
        )}

        <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-center gap-1.5 text-xs text-[#C5A047] font-sans tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Tashrifingiz biz uchun aziz va qadrlidir</span>
        </div>
      </div>
    </div>
  );
};
