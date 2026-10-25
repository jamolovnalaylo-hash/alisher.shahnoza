import React from 'react';
import { WeddingInvitationData } from '../../types';
import { CountdownTimer } from '../common/CountdownTimer';
import { VenueMapCard } from '../common/VenueMapCard';
import { RsvpSection } from '../common/RsvpSection';
import { Sparkles, Crown } from 'lucide-react';

interface DesignProps {
  data: WeddingInvitationData;
  onAddRsvp?: (entry: { guestName: string; guestsCount: number; phone?: string; message?: string }) => void;
}

export const ImperialArchDesign: React.FC<DesignProps> = ({ data, onAddRsvp }) => {
  return (
    <div
      id="invitation-card-container"
      className="relative w-full max-w-xl mx-auto rounded-3xl p-6 md:p-10 shadow-[0_25px_60px_rgba(30,20,10,0.2)] border-2 border-[#AA771C]/60 bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EB] to-[#ECE1CC] overflow-hidden text-[#24201A]"
    >
      {/* Grand Architectural Arch Outline */}
      <div className="relative border-4 border-[#C5A047]/60 rounded-t-[160px] md:rounded-t-[200px] rounded-b-2xl p-4 md:p-8 text-center bg-white/60 shadow-[inset_0_0_20px_rgba(180,140,50,0.1)]">
        {/* Imperial Crown & Pediment Ornament */}
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center bg-[#FAF5EB] px-5 py-1 rounded-full border border-[#AA771C]/50 shadow-md">
          <Crown className="w-6 h-6 text-[#AA771C] fill-[#AA771C]/20" />
        </div>

        <div className="mt-4">
          <span className="font-cinzelDeco text-xs sm:text-sm font-bold uppercase tracking-[0.35em] text-[#8C6618] block mb-1">
            IMPERATOR ARCH
          </span>
          <p className="font-cinzel text-xs tracking-widest text-[#B38728] uppercase">
            SHOHONA NIKOH MAROSIMI
          </p>
        </div>

        {/* Grand Architectural Pillars framing the couple */}
        <div className="my-8 relative px-2">
          {/* Left Column Graphic */}
          <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-4 border-r-2 border-l-2 border-[#D4AF37]/50 bg-gradient-to-r from-transparent via-[#FAF0D4] to-transparent" />
          {/* Right Column Graphic */}
          <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-4 border-r-2 border-l-2 border-[#D4AF37]/50 bg-gradient-to-r from-transparent via-[#FAF0D4] to-transparent" />

          {/* Central Portrait Composition: Twin Palatial Arched Windows */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 py-2">
            {/* Bride Arch */}
            <div className="flex flex-col items-center">
              <div className="relative p-2 rounded-t-[90px] border-2 border-[#AA771C] bg-gradient-to-b from-[#FFFDF9] to-[#E9DCBF] shadow-lg">
                <div className="w-28 h-40 sm:w-34 sm:h-48 rounded-t-[82px] overflow-hidden bg-stone-200 shadow-inner">
                  <img
                    src={data.bridePhoto}
                    alt={data.brideName || "Kelin"}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <span className="font-cinzelDeco text-xs font-bold uppercase tracking-widest text-[#8C6618] mt-2">
                Kelin
              </span>
            </div>

            {/* Imperial Center Monogram */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-full border-2 border-[#AA771C] bg-[#FAF5EC] flex items-center justify-center shadow-gold-glow">
                <span className="font-pinyon text-2xl font-bold text-gold-foil">
                  &
                </span>
              </div>
            </div>

            {/* Groom Arch */}
            <div className="flex flex-col items-center">
              <div className="relative p-2 rounded-t-[90px] border-2 border-[#AA771C] bg-gradient-to-b from-[#FFFDF9] to-[#E9DCBF] shadow-lg">
                <div className="w-28 h-40 sm:w-34 sm:h-48 rounded-t-[82px] overflow-hidden bg-stone-200 shadow-inner">
                  <img
                    src={data.groomPhoto}
                    alt={data.groomName || "Kuyov"}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <span className="font-cinzelDeco text-xs font-bold uppercase tracking-widest text-[#8C6618] mt-2">
                Kuyov
              </span>
            </div>
          </div>
        </div>

        {/* Majestic Typography */}
        <div className="my-5">
          <h2 className="font-cinzelDeco text-3xl sm:text-4xl md:text-5xl font-bold text-gold-foil leading-tight tracking-wider">
            {data.brideName || "Madina"}
          </h2>
          <div className="my-1 text-sm font-cinzel text-[#8C6618] tracking-widest uppercase">
            va
          </div>
          <h2 className="font-cinzelDeco text-3xl sm:text-4xl md:text-5xl font-bold text-gold-foil leading-tight tracking-wider">
            {data.groomName || "Aziz"}
          </h2>
        </div>

        {data.parentsNames && (
          <p className="text-xs md:text-sm font-serif italic text-stone-600 my-2">
            Hurmat bilan: {data.parentsNames}
          </p>
        )}

        <div className="my-5 max-w-md mx-auto whitespace-pre-line text-sm md:text-base font-serif leading-relaxed text-[#30281E]">
          {data.invitationText}
        </div>

        {/* Imperial Date & Time Banner */}
        <div className="my-6 inline-block py-3 px-8 rounded-xl border-2 border-[#AA771C] bg-gradient-to-r from-[#FAF5EB] via-[#FFFDF8] to-[#FAF5EB] shadow-md">
          <p className="font-cinzel text-lg md:text-xl font-bold tracking-[0.2em] text-gold-foil">
            {new Date(data.weddingDate).toLocaleDateString('uz-UZ', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
          <p className="font-cinzel text-xs uppercase tracking-[0.3em] text-[#8C6618] mt-1 font-semibold">
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

        <div className="mt-6 pt-4 border-t border-[#AA771C]/30 flex items-center justify-center gap-1.5 text-xs text-[#8C6618] font-cinzel tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A047]" />
          <span>Sizning tashrifingiz — saroyimiz ko‘rki</span>
        </div>
      </div>
    </div>
  );
};
