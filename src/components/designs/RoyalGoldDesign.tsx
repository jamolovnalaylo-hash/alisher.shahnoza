import React from 'react';
import { WeddingInvitationData } from '../../types';
import { GoldCorner, RoyalDivider } from '../common/GoldFoilDecorations';
import { CountdownTimer } from '../common/CountdownTimer';
import { VenueMapCard } from '../common/VenueMapCard';
import { RsvpSection } from '../common/RsvpSection';
import { Heart, Sparkles } from 'lucide-react';

interface DesignProps {
  data: WeddingInvitationData;
  onAddRsvp?: (entry: { guestName: string; guestsCount: number; phone?: string; message?: string }) => void;
}

export const RoyalGoldDesign: React.FC<DesignProps> = ({ data, onAddRsvp }) => {
  return (
    <div
      id="invitation-card-container"
      className="relative w-full max-w-xl mx-auto rounded-3xl p-6 md:p-10 shadow-[0_20px_50px_rgba(40,30,10,0.15)] border-2 border-[#D4AF37]/60 bg-gradient-to-b from-[#FDFBF7] via-[#F8F3E8] to-[#EFE5D3] overflow-hidden text-[#2A2218]"
    >
      {/* Background Subtle Damask Arabesque */}
      <div className="absolute inset-0 bg-parchment opacity-70 pointer-events-none" />

      {/* Gold Foliate Corners */}
      <GoldCorner position="top-left" className="absolute top-2 left-2 w-16 h-16" />
      <GoldCorner position="top-right" className="absolute top-2 right-2 w-16 h-16" />
      <GoldCorner position="bottom-left" className="absolute bottom-2 left-2 w-16 h-16" />
      <GoldCorner position="bottom-right" className="absolute bottom-2 right-2 w-16 h-16" />

      {/* Dual Inner Gold Border Inset */}
      <div className="relative border border-[#AA771C]/40 rounded-2xl p-5 md:p-8 text-center">
        {/* Monogram Seal Crest */}
        <div className="w-14 h-14 mx-auto mb-3 rounded-full border-2 border-[#D4AF37] flex items-center justify-center bg-gradient-to-tr from-[#FFFDF9] to-[#F5EACB] shadow-gold-glow">
          <span className="font-pinyon text-2xl font-bold text-gold-foil">
            {data.brideName ? data.brideName[0] : 'M'}&{data.groomName ? data.groomName[0] : 'A'}
          </span>
        </div>

        <span className="text-[11px] md:text-xs font-cinzel uppercase tracking-[0.3em] text-[#8C6D28] font-bold block mb-1">
          SHOHONA NIKOH TO‘YI
        </span>
        <h1 className="font-cinzel text-xs tracking-widest text-[#B38728] uppercase opacity-90">
          BAXT VA MUHABBAT OQSHOMI
        </h1>

        <RoyalDivider className="my-3 w-48" />

        {/* Dual Arched Couple Photos in Royal Gold Harmony */}
        <div className="relative my-6 flex items-center justify-center gap-3 sm:gap-5">
          {/* Bride Photo - Arched Gold Frame */}
          <div className="flex flex-col items-center">
            <div className="relative p-1.5 rounded-t-[100px] rounded-b-2xl border-2 border-[#D4AF37] shadow-lg bg-gradient-to-b from-[#FFFDF9] to-[#EFE2C6]">
              <div className="w-28 h-38 sm:w-36 sm:h-48 rounded-t-[92px] rounded-b-xl overflow-hidden bg-stone-200 shadow-inner">
                <img
                  src={data.bridePhoto}
                  alt={data.brideName || "Kelin"}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <span className="font-cinzel text-xs font-semibold uppercase tracking-widest text-[#8C6D28] mt-2">
              Kelin
            </span>
          </div>

          {/* Central Golden Intertwined Rings Symbol */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-9 h-9 rounded-full border border-[#D4AF37] bg-white/80 shadow-md flex items-center justify-center text-[#B38728]">
              <Heart className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
            </div>
          </div>

          {/* Groom Photo - Arched Gold Frame */}
          <div className="flex flex-col items-center">
            <div className="relative p-1.5 rounded-t-[100px] rounded-b-2xl border-2 border-[#D4AF37] shadow-lg bg-gradient-to-b from-[#FFFDF9] to-[#EFE2C6]">
              <div className="w-28 h-38 sm:w-36 sm:h-48 rounded-t-[92px] rounded-b-xl overflow-hidden bg-stone-200 shadow-inner">
                <img
                  src={data.groomPhoto}
                  alt={data.groomName || "Kuyov"}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <span className="font-cinzel text-xs font-semibold uppercase tracking-widest text-[#8C6D28] mt-2">
              Kuyov
            </span>
          </div>
        </div>

        {/* Bride & Groom Names in Magnificent Gold Foil Shimmer */}
        <div className="my-4">
          <h2 className="font-script text-4xl sm:text-5xl md:text-6xl text-gold-foil leading-tight filter drop-shadow-[0_2px_4px_rgba(180,140,40,0.3)]">
            {data.brideName || "Madina"}
          </h2>
          <div className="flex items-center justify-center gap-3 my-1">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <span className="font-pinyon text-2xl text-[#8C6D28]">&</span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>
          <h2 className="font-script text-4xl sm:text-5xl md:text-6xl text-gold-foil leading-tight filter drop-shadow-[0_2px_4px_rgba(180,140,40,0.3)]">
            {data.groomName || "Aziz"}
          </h2>
        </div>

        {/* Parents' Names if provided */}
        {data.parentsNames && (
          <p className="text-xs md:text-sm font-serif italic text-stone-600 my-2">
            Hurmat bilan: {data.parentsNames}
          </p>
        )}

        {/* Custom Invitation Message */}
        <div className="my-5 max-w-md mx-auto whitespace-pre-line text-sm md:text-base font-serif leading-relaxed text-[#382C1E]">
          {data.invitationText}
        </div>

        {/* Wedding Date & Time Gilded Plaque */}
        <div className="my-5 inline-block py-2.5 px-6 rounded-full border border-[#D4AF37] bg-gradient-to-r from-[#FAF5EC] via-[#FFFDF9] to-[#FAF5EC] shadow-sm">
          <p className="font-cinzel text-base md:text-lg font-bold tracking-widest text-gold-foil">
            {new Date(data.weddingDate).toLocaleDateString('uz-UZ', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
          <p className="font-cinzel text-xs uppercase tracking-widest text-[#8C6D28] mt-0.5">
            Soat {data.weddingTime || "18:00"} da
          </p>
        </div>

        {/* Countdown Timer */}
        <CountdownTimer
          weddingDate={data.weddingDate}
          weddingTime={data.weddingTime}
          language={data.language}
        />

        {/* Venue & Google Maps Navigation */}
        <VenueMapCard
          venueName={data.venueName}
          venueAddress={data.venueAddress}
          mapUrl={data.mapUrl}
          weddingDate={data.weddingDate}
          weddingTime={data.weddingTime}
          coupleNames={`${data.brideName} & ${data.groomName}`}
          language={data.language}
        />

        {/* Interactive RSVP Form */}
        {onAddRsvp && (
          <RsvpSection
            onAddRsvp={onAddRsvp}
            rsvpCount={data.rsvpList?.length}
            language={data.language}
          />
        )}

        <div className="mt-6 pt-4 border-t border-[#D4AF37]/30 flex items-center justify-center gap-1.5 text-xs text-[#8C6D28] font-cinzel">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Sizning tashrifingiz biz uchun cheksiz sharafdir</span>
        </div>
      </div>
    </div>
  );
};
