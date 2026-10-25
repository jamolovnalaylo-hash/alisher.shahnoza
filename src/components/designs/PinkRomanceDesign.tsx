import React from 'react';
import { WeddingInvitationData } from '../../types';
import { CountdownTimer } from '../common/CountdownTimer';
import { VenueMapCard } from '../common/VenueMapCard';
import { RsvpSection } from '../common/RsvpSection';
import { Heart, Sparkles } from 'lucide-react';

interface DesignProps {
  data: WeddingInvitationData;
  onAddRsvp?: (entry: { guestName: string; guestsCount: number; phone?: string; message?: string }) => void;
}

export const PinkRomanceDesign: React.FC<DesignProps> = ({ data, onAddRsvp }) => {
  return (
    <div
      id="invitation-card-container"
      className="relative w-full max-w-xl mx-auto rounded-3xl p-6 md:p-10 shadow-[0_20px_50px_rgba(180,80,100,0.15)] border-2 border-[#E5B6A8]/70 bg-gradient-to-b from-[#FFF5F6] via-[#FDF0F2] to-[#F7E4E7] overflow-hidden text-[#4A2228]"
    >
      {/* Delicate watercolor petal elements in background */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#FFD3DB]/40 to-transparent rounded-bl-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#FFD3DB]/40 to-transparent rounded-tr-full pointer-events-none" />

      {/* Inner Rose Gold Scalloped Frame */}
      <div className="relative border border-[#D49B8A]/50 rounded-2xl p-5 md:p-8 text-center bg-white/50 backdrop-blur-sm">
        {/* Rose Gold Floral Monogram */}
        <div className="w-14 h-14 mx-auto mb-3 rounded-full border border-[#D49B8A] bg-gradient-to-tr from-[#FFF0F2] to-[#FFE0E6] flex items-center justify-center shadow-md">
          <span className="font-alex text-3xl text-[#B76E79]">
            {data.brideName ? data.brideName[0] : 'M'}&{data.groomName ? data.groomName[0] : 'A'}
          </span>
        </div>

        <span className="text-[11px] md:text-xs font-serif uppercase tracking-[0.3em] text-[#B76E79] font-bold block mb-1">
          ROMANTIK NIKOH TO‘YI
        </span>
        <p className="font-alex text-2xl text-[#C68B77] leading-none mb-4">
          Muhabbat afsonasi
        </p>

        {/* Dual Soft Arched Portraits with Rose Gold Wreaths */}
        <div className="my-6 flex items-center justify-center gap-3 sm:gap-6">
          {/* Bride Photo */}
          <div className="flex flex-col items-center">
            <div className="relative p-1.5 rounded-t-full rounded-b-3xl border-2 border-[#D49B8A] shadow-md bg-white">
              <div className="w-28 h-36 sm:w-34 sm:h-44 rounded-t-full rounded-b-2xl overflow-hidden bg-stone-100 shadow-inner">
                <img
                  src={data.bridePhoto}
                  alt={data.brideName || "Kelin"}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <span className="font-serif text-xs font-medium uppercase tracking-widest text-[#B76E79] mt-2">
              Kelin
            </span>
          </div>

          {/* Heart Emblem */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-8 h-8 rounded-full border border-[#E5B6A8] bg-[#FFF0F3] flex items-center justify-center text-[#B76E79]">
              <Heart className="w-4 h-4 fill-[#B76E79]/30 text-[#B76E79]" />
            </div>
          </div>

          {/* Groom Photo */}
          <div className="flex flex-col items-center">
            <div className="relative p-1.5 rounded-t-full rounded-b-3xl border-2 border-[#D49B8A] shadow-md bg-white">
              <div className="w-28 h-36 sm:w-34 sm:h-44 rounded-t-full rounded-b-2xl overflow-hidden bg-stone-100 shadow-inner">
                <img
                  src={data.groomPhoto}
                  alt={data.groomName || "Kuyov"}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <span className="font-serif text-xs font-medium uppercase tracking-widest text-[#B76E79] mt-2">
              Kuyov
            </span>
          </div>
        </div>

        {/* Couple Names in Rose Gold */}
        <div className="my-4">
          <h2 className="font-alex text-5xl sm:text-6xl text-[#B76E79] leading-tight">
            {data.brideName || "Madina"}
          </h2>
          <span className="font-pinyon text-2xl text-[#D49B8A] block my-0.5">va</span>
          <h2 className="font-alex text-5xl sm:text-6xl text-[#B76E79] leading-tight">
            {data.groomName || "Aziz"}
          </h2>
        </div>

        {data.parentsNames && (
          <p className="text-xs md:text-sm font-serif italic text-stone-600 my-2">
            Hurmat bilan: {data.parentsNames}
          </p>
        )}

        <div className="my-5 max-w-md mx-auto whitespace-pre-line text-sm md:text-base font-serif leading-relaxed text-[#542B32]">
          {data.invitationText}
        </div>

        {/* Date Plaque */}
        <div className="my-5 inline-block py-2.5 px-7 rounded-full bg-gradient-to-r from-[#FDE8EC] via-[#FFF5F7] to-[#FDE8EC] border border-[#D49B8A]/60 shadow-sm">
          <p className="font-cinzel text-base md:text-lg font-bold tracking-widest text-[#B76E79]">
            {new Date(data.weddingDate).toLocaleDateString('uz-UZ', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
          <p className="font-cinzel text-xs uppercase tracking-widest text-[#C68B77] mt-0.5">
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

        <div className="mt-6 pt-4 border-t border-[#D49B8A]/30 flex items-center justify-center gap-1.5 text-xs text-[#B76E79] font-serif italic">
          <Sparkles className="w-3.5 h-3.5 text-[#D49B8A]" />
          <span>Biz bilan birga bo‘lishingizdan baxtiyormiz</span>
        </div>
      </div>
    </div>
  );
};
