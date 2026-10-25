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

export const FloralPalaceDesign: React.FC<DesignProps> = ({ data, onAddRsvp }) => {
  return (
    <div
      id="invitation-card-container"
      className="relative w-full max-w-xl mx-auto rounded-3xl p-6 md:p-10 shadow-[0_25px_60px_rgba(30,40,30,0.15)] border-2 border-[#C5A047]/50 bg-marble overflow-hidden text-[#252320]"
    >
      {/* Top Floral Palace Garland SVG Banner */}
      <div className="absolute top-0 left-0 right-0 h-28 pointer-events-none opacity-40 overflow-hidden">
        <svg viewBox="0 0 500 120" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0 0 C150 70, 350 70, 500 0 L500 0 L0 0 Z" fill="#2E4A3B" opacity="0.15" />
          <circle cx="250" cy="30" r="35" fill="#F8E5CA" opacity="0.6" />
          <circle cx="210" cy="20" r="25" fill="#FFFFFF" opacity="0.8" />
          <circle cx="290" cy="20" r="25" fill="#FFFFFF" opacity="0.8" />
          <path d="M180 30 Q250 80 320 30" stroke="#C5A047" strokeWidth="2" fill="none" />
        </svg>
      </div>

      {/* Ornate Baroque Inner Border */}
      <div className="relative border-2 border-[#D4AF37]/50 rounded-2xl p-5 md:p-8 text-center bg-white/70 backdrop-blur-sm shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
        {/* Botanical Crest */}
        <div className="w-14 h-14 mx-auto mb-2 rounded-full border border-[#C5A047] bg-[#FAF9F5] flex items-center justify-center shadow-sm">
          <span className="font-pinyon text-3xl text-gold-foil">
            {data.brideName ? data.brideName[0] : 'M'}&{data.groomName ? data.groomName[0] : 'A'}
          </span>
        </div>

        <span className="text-[11px] md:text-xs font-serif uppercase tracking-[0.35em] text-[#3D5A47] font-bold block mb-1">
          GULLI SAROY MAROSIMI
        </span>
        <div className="flex items-center justify-center gap-2 my-1">
          <div className="h-[1px] w-12 bg-[#D4AF37]" />
          <span className="text-xs font-serif italic text-stone-500">Nikoh To‘yi</span>
          <div className="h-[1px] w-12 bg-[#D4AF37]" />
        </div>

        {/* Baroque Gilded Medallion Portrait Frames */}
        <div className="my-6 flex items-center justify-center gap-3 sm:gap-6">
          {/* Bride Medallion */}
          <div className="flex flex-col items-center">
            <div className="relative p-2 rounded-full border-2 border-[#D4AF37] shadow-xl bg-gradient-to-tr from-[#FAF8F5] via-[#FFFFFF] to-[#F1E8D9]">
              <div className="w-28 h-36 sm:w-34 sm:h-44 rounded-full overflow-hidden bg-stone-100 shadow-inner">
                <img
                  src={data.bridePhoto}
                  alt={data.brideName || "Kelin"}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <span className="font-serif text-xs font-semibold uppercase tracking-widest text-[#3D5A47] mt-2">
              Kelin
            </span>
          </div>

          {/* Golden Rose Cluster */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-9 h-9 rounded-full border border-[#D4AF37] bg-white flex items-center justify-center text-[#C5A047] shadow-sm">
              <span className="text-lg">🌿</span>
            </div>
          </div>

          {/* Groom Medallion */}
          <div className="flex flex-col items-center">
            <div className="relative p-2 rounded-full border-2 border-[#D4AF37] shadow-xl bg-gradient-to-tr from-[#FAF8F5] via-[#FFFFFF] to-[#F1E8D9]">
              <div className="w-28 h-36 sm:w-34 sm:h-44 rounded-full overflow-hidden bg-stone-100 shadow-inner">
                <img
                  src={data.groomPhoto}
                  alt={data.groomName || "Kuyov"}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <span className="font-serif text-xs font-semibold uppercase tracking-widest text-[#3D5A47] mt-2">
              Kuyov
            </span>
          </div>
        </div>

        {/* Couple Names */}
        <div className="my-4">
          <h2 className="font-pinyon text-5xl sm:text-6xl text-gold-foil leading-tight filter drop-shadow-[0_1px_2px_rgba(100,80,30,0.2)]">
            {data.brideName || "Madina"}
          </h2>
          <span className="font-serif italic text-xl text-[#3D5A47] block my-0.5">hamda</span>
          <h2 className="font-pinyon text-5xl sm:text-6xl text-gold-foil leading-tight filter drop-shadow-[0_1px_2px_rgba(100,80,30,0.2)]">
            {data.groomName || "Aziz"}
          </h2>
        </div>

        {data.parentsNames && (
          <p className="text-xs md:text-sm font-serif italic text-stone-600 my-2">
            Hurmat bilan: {data.parentsNames}
          </p>
        )}

        <div className="my-5 max-w-md mx-auto whitespace-pre-line text-sm md:text-base font-serif leading-relaxed text-[#2C2925]">
          {data.invitationText}
        </div>

        {/* Date Plaque */}
        <div className="my-5 inline-block py-2.5 px-7 rounded-full bg-gradient-to-r from-[#FAF8F3] via-[#FFFFFF] to-[#FAF8F3] border border-[#D4AF37] shadow-sm">
          <p className="font-cinzel text-base md:text-lg font-bold tracking-widest text-gold-foil">
            {new Date(data.weddingDate).toLocaleDateString('uz-UZ', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
          <p className="font-cinzel text-xs uppercase tracking-widest text-[#5C5035] mt-0.5">
            Soat {data.weddingTime || "18:00"} da
          </p>
        </div>

        {/* Countdown */}
        <CountdownTimer
          weddingDate={data.weddingDate}
          weddingTime={data.weddingTime}
          language={data.language}
        />

        {/* Venue & Map */}
        <VenueMapCard
          venueName={data.venueName}
          venueAddress={data.venueAddress}
          mapUrl={data.mapUrl}
          weddingDate={data.weddingDate}
          weddingTime={data.weddingTime}
          coupleNames={`${data.brideName} & ${data.groomName}`}
          language={data.language}
        />

        {/* RSVP */}
        {onAddRsvp && (
          <RsvpSection
            onAddRsvp={onAddRsvp}
            rsvpCount={data.rsvpList?.length}
            language={data.language}
          />
        )}

        <div className="mt-6 pt-4 border-t border-[#D4AF37]/30 flex items-center justify-center gap-1.5 text-xs text-[#3D5A47] font-serif italic">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A047]" />
          <span>Gulli saroyimizda sizni kutib qolamiz</span>
        </div>
      </div>
    </div>
  );
};
