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

export const BurgundyLuxuryDesign: React.FC<DesignProps> = ({ data, onAddRsvp }) => {
  return (
    <div
      id="invitation-card-container"
      className="relative w-full max-w-xl mx-auto rounded-3xl p-6 md:p-10 shadow-[0_20px_50px_rgba(50,10,20,0.2)] border-2 border-[#8C2538]/50 bg-gradient-to-b from-[#FAF6F2] via-[#F6ECEF] to-[#EFE2E5] overflow-hidden text-[#3B1119]"
    >
      {/* Decorative Burgundy Rose botanical branch vectors (Top left & Bottom right) */}
      <div className="absolute -top-10 -left-10 w-44 h-44 opacity-25 pointer-events-none">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="90" cy="80" r="45" fill="#751B2C" />
          <path d="M40 100 Q80 40 140 70 Q160 120 100 150 Z" fill="#5C1220" />
          <path d="M90 30 Q120 70 80 120" stroke="#C5A047" strokeWidth="2" />
        </svg>
      </div>
      <div className="absolute -bottom-10 -right-10 w-44 h-44 opacity-25 pointer-events-none rotate-180">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="90" cy="80" r="45" fill="#751B2C" />
          <path d="M40 100 Q80 40 140 70 Q160 120 100 150 Z" fill="#5C1220" />
          <path d="M90 30 Q120 70 80 120" stroke="#C5A047" strokeWidth="2" />
        </svg>
      </div>

      {/* Aristocratic Double Border Inset */}
      <div className="relative border-2 border-[#751B2C]/30 rounded-2xl p-5 md:p-8 text-center bg-white/40 backdrop-blur-[2px]">
        {/* Burgundy & Gold Royal Wax Stamp Monogram */}
        <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-[#7D1B28] to-[#420B13] p-1 shadow-wax-seal flex items-center justify-center border border-[#E8BD70]/60">
          <span className="font-pinyon text-2xl font-bold text-[#FDEBD0]">
            {data.brideName ? data.brideName[0] : 'M'}&{data.groomName ? data.groomName[0] : 'A'}
          </span>
        </div>

        <span className="text-[11px] md:text-xs font-cinzel uppercase tracking-[0.35em] text-[#751B2C] font-bold block mb-1">
          ARISTOKRAT NIKOH TO‘YI
        </span>
        <div className="h-[1px] w-24 mx-auto bg-gradient-to-r from-transparent via-[#751B2C] to-transparent my-2" />

        {/* Vintage Oval Portrait Frames with Burgundy & Antique Gold Accents */}
        <div className="my-6 flex items-center justify-center gap-3 sm:gap-6">
          {/* Bride Oval Frame */}
          <div className="flex flex-col items-center">
            <div className="relative p-1.5 rounded-full border-2 border-[#751B2C] shadow-lg bg-gradient-to-b from-[#FFFDF9] to-[#F2E0E4]">
              <div className="w-28 h-36 sm:w-34 sm:h-44 rounded-full overflow-hidden bg-stone-200 border border-[#D4AF37]/50 shadow-inner">
                <img
                  src={data.bridePhoto}
                  alt={data.brideName || "Kelin"}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <span className="font-cinzel text-xs font-semibold uppercase tracking-widest text-[#751B2C] mt-2">
              Kelin
            </span>
          </div>

          {/* Center Botanical Rose Emblem */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-8 h-8 rounded-full border border-[#8C2538] bg-[#F7EBEF] flex items-center justify-center text-[#751B2C]">
              ❦
            </div>
          </div>

          {/* Groom Oval Frame */}
          <div className="flex flex-col items-center">
            <div className="relative p-1.5 rounded-full border-2 border-[#751B2C] shadow-lg bg-gradient-to-b from-[#FFFDF9] to-[#F2E0E4]">
              <div className="w-28 h-36 sm:w-34 sm:h-44 rounded-full overflow-hidden bg-stone-200 border border-[#D4AF37]/50 shadow-inner">
                <img
                  src={data.groomPhoto}
                  alt={data.groomName || "Kuyov"}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <span className="font-cinzel text-xs font-semibold uppercase tracking-widest text-[#751B2C] mt-2">
              Kuyov
            </span>
          </div>
        </div>

        {/* Couple Names in Burgundy Velvet Tone with Gold Shimmer Underline */}
        <div className="my-4">
          <h2 className="font-script text-4xl sm:text-5xl md:text-6xl text-[#751B2C] leading-tight">
            {data.brideName || "Madina"}
          </h2>
          <p className="font-pinyon text-2xl text-[#C5A047] my-0.5">&</p>
          <h2 className="font-script text-4xl sm:text-5xl md:text-6xl text-[#751B2C] leading-tight">
            {data.groomName || "Aziz"}
          </h2>
        </div>

        {data.parentsNames && (
          <p className="text-xs md:text-sm font-serif italic text-stone-600 my-2">
            Hurmat bilan: {data.parentsNames}
          </p>
        )}

        <div className="my-5 max-w-md mx-auto whitespace-pre-line text-sm md:text-base font-serif leading-relaxed text-[#4A1620]">
          {data.invitationText}
        </div>

        {/* Date Plaque in Velvet Burgundy Ribbon */}
        <div className="my-5 inline-block py-2.5 px-7 rounded-full bg-gradient-to-r from-[#751B2C] via-[#8C2538] to-[#5C1220] text-[#FFF8ED] shadow-md border border-[#E8BD70]/40">
          <p className="font-cinzel text-base md:text-lg font-bold tracking-widest">
            {new Date(data.weddingDate).toLocaleDateString('uz-UZ', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
          <p className="font-cinzel text-xs uppercase tracking-widest text-[#FCD79B] mt-0.5">
            Soat {data.weddingTime || "18:00"} da
          </p>
        </div>

        {/* Countdown Timer */}
        <CountdownTimer
          weddingDate={data.weddingDate}
          weddingTime={data.weddingTime}
          language={data.language}
        />

        {/* Venue & Map Card */}
        <VenueMapCard
          venueName={data.venueName}
          venueAddress={data.venueAddress}
          mapUrl={data.mapUrl}
          weddingDate={data.weddingDate}
          weddingTime={data.weddingTime}
          coupleNames={`${data.brideName} & ${data.groomName}`}
          language={data.language}
        />

        {/* RSVP Section */}
        {onAddRsvp && (
          <RsvpSection
            onAddRsvp={onAddRsvp}
            rsvpCount={data.rsvpList?.length}
            language={data.language}
          />
        )}

        <div className="mt-6 pt-4 border-t border-[#751B2C]/20 flex items-center justify-center gap-1.5 text-xs text-[#751B2C] font-serif italic">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A047]" />
          <span>Sizning tashrifingiz baxtimizga baxt qo‘shadi</span>
        </div>
      </div>
    </div>
  );
};
