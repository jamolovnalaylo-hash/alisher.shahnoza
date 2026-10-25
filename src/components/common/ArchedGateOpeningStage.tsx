import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, MailOpen } from 'lucide-react';
import { royalAudioEngine } from '../../utils/audioPlayer';

interface ArchedGateOpeningStageProps {
  brideName: string;
  groomName: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  musicTrack?: string;
  children: React.ReactNode;
}

export const ArchedGateOpeningStage: React.FC<ArchedGateOpeningStageProps> = ({
  brideName,
  groomName,
  isOpen,
  onOpen,
  onClose,
  musicTrack,
  children,
}) => {
  const [isOpeningAnim, setIsOpeningAnim] = useState(false);

  const handleOpenGate = () => {
    if (isOpen || isOpeningAnim) return;
    setIsOpeningAnim(true);

    // Launch fine golden stardust & rose petals
    try {
      confetti({
        particleCount: 75,
        spread: 85,
        origin: { y: 0.58 },
        colors: ['#D4AF37', '#FDF2B5', '#AA771C', '#80182A', '#F7D6D0', '#FFFFFF'],
        ticks: 220,
        gravity: 0.75,
        scalar: 1.15,
      });
    } catch {
      // ignore
    }

    // Start background music automatically on user interaction
    if (musicTrack) {
      royalAudioEngine.setCustomAudio(musicTrack);
    }
    royalAudioEngine.play();

    // Smooth gate unfolding sequence
    setTimeout(() => {
      onOpen();
      setIsOpeningAnim(false);
    }, 950);
  };

  return (
    <div className="relative w-full min-h-screen">
      {/* ================= FULLSCREEN ARCHED DOUBLE GATE (Matching Video Screenshots 5 & 1) ================= */}
      {!isOpen && (
        <div
          className="fixed inset-0 z-40 w-full h-full min-h-screen overflow-hidden flex flex-col justify-between select-none cursor-pointer"
          onClick={handleOpenGate}
          style={{
            background: 'radial-gradient(ellipse at 50% 35%, #FFFDF9 0%, #FAF2E8 50%, #EDE1D0 100%)',
          }}
        >
          {/* Subtle Fine Cotton Paper Grain Texture */}
          <div className="absolute inset-0 bg-parchment opacity-70 pointer-events-none" />

          {/* ================= GRAND ARCH WITH BLUSH ROSES & HANGING LANTERNS ================= */}
          <div className="absolute top-0 inset-x-0 h-72 sm:h-96 pointer-events-none z-20">
            <svg className="w-full h-full" viewBox="0 0 500 350" preserveAspectRatio="none" fill="none">
              {/* Grand Arch Line */}
              <path
                d="M30 350 L30 180 Q30 30 250 30 Q470 30 470 180 L470 350"
                stroke="#D4AF37"
                strokeWidth="2"
                strokeDasharray="4 4"
                opacity="0.6"
              />

              {/* Draped Floral Swag across the Arch Top */}
              <path
                d="M50 180 Q140 35 250 35 Q360 35 450 180"
                stroke="#C5A059"
                strokeWidth="3"
                opacity="0.8"
              />

              {/* Left Hanging Lantern Cord & Lantern */}
              <line x1="120" y1="90" x2="120" y2="160" stroke="#AA771C" strokeWidth="1.5" />
              {/* Lantern Body */}
              <g transform="translate(108, 160)">
                <polygon points="12,0 24,10 20,38 4,38 0,10" fill="#FFF8EE" stroke="#8C6618" strokeWidth="1.5" />
                <circle cx="12" cy="22" r="5" fill="#FFA500" opacity="0.85" filter="drop-shadow(0 0 8px #FFD700)" />
                <line x1="6" y1="10" x2="18" y2="10" stroke="#8C6618" strokeWidth="1" />
                <line x1="8" y1="38" x2="16" y2="38" stroke="#8C6618" strokeWidth="1.5" />
              </g>

              {/* Right Hanging Lantern Cord & Lantern */}
              <line x1="380" y1="90" x2="380" y2="160" stroke="#AA771C" strokeWidth="1.5" />
              <g transform="translate(368, 160)">
                <polygon points="12,0 24,10 20,38 4,38 0,10" fill="#FFF8EE" stroke="#8C6618" strokeWidth="1.5" />
                <circle cx="12" cy="22" r="5" fill="#FFA500" opacity="0.85" filter="drop-shadow(0 0 8px #FFD700)" />
                <line x1="6" y1="10" x2="18" y2="10" stroke="#8C6618" strokeWidth="1" />
                <line x1="8" y1="38" x2="16" y2="38" stroke="#8C6618" strokeWidth="1.5" />
              </g>

              {/* Lush Roses & Flower Buds clustered on the Arch Top */}
              <g>
                <circle cx="250" cy="40" r="14" fill="#F7CFCA" />
                <circle cx="250" cy="40" r="9" fill="#DE8C82" />
                <circle cx="250" cy="40" r="4" fill="#80182A" />

                <circle cx="215" cy="50" r="11" fill="#FCE4E1" />
                <circle cx="215" cy="50" r="7" fill="#E8A59B" />
                <circle cx="285" cy="50" r="11" fill="#FCE4E1" />
                <circle cx="285" cy="50" r="7" fill="#E8A59B" />

                <circle cx="170" cy="75" r="12" fill="#F7D3CD" />
                <circle cx="170" cy="75" r="8" fill="#D97F74" />
                <circle cx="330" cy="75" r="12" fill="#F7D3CD" />
                <circle cx="330" cy="75" r="8" fill="#D97F74" />

                <circle cx="95" cy="135" r="11" fill="#FCE4E1" />
                <circle cx="95" cy="135" r="7" fill="#E8A59B" />
                <circle cx="405" cy="135" r="11" fill="#FCE4E1" />
                <circle cx="405" cy="135" r="7" fill="#E8A59B" />
              </g>
            </svg>
          </div>

          {/* ================= LEFT GATE DOOR ================= */}
          <div
            className={`absolute top-0 left-0 w-1/2 h-full z-10 border-r border-[#D4AF37]/60 transition-transform duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)] origin-left ${
              isOpeningAnim ? '-translate-x-full opacity-30' : 'translate-x-0'
            }`}
            style={{
              background: 'linear-gradient(135deg, #FFFDF9 0%, #F8F2E4 60%, #EFE3D0 100%)',
              boxShadow: 'inset -8px 0 20px rgba(117,22,40,0.06)',
            }}
          >
            {/* Fine Inner Molding */}
            <div className="absolute inset-4 sm:inset-8 border border-[#D4AF37]/35 rounded-t-[100px] pointer-events-none" />
          </div>

          {/* ================= RIGHT GATE DOOR ================= */}
          <div
            className={`absolute top-0 right-0 w-1/2 h-full z-10 border-l border-[#D4AF37]/60 transition-transform duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)] origin-right ${
              isOpeningAnim ? 'translate-x-full opacity-30' : 'translate-x-0'
            }`}
            style={{
              background: 'linear-gradient(225deg, #FFFDF9 0%, #F8F2E4 60%, #EFE3D0 100%)',
              boxShadow: 'inset 8px 0 20px rgba(117,22,40,0.06)',
            }}
          >
            {/* Fine Inner Molding */}
            <div className="absolute inset-4 sm:inset-8 border border-[#D4AF37]/35 rounded-t-[100px] pointer-events-none" />
          </div>

          {/* ================= TOP TITLE (Visible on closed gate) ================= */}
          <div className="relative z-30 text-center pt-8 sm:pt-14 px-4">
            <span className="font-cinzel text-[10px] sm:text-xs tracking-[0.4em] uppercase text-[#751628] font-bold block mb-1">
              NIKOH TO‘YI TAKLIFNOMASI
            </span>
            <p className="font-script text-3xl sm:text-5xl text-gold-foil">
              {brideName || "Madina"} & {groomName || "Aziz"}
            </p>
          </div>

          {/* ================= CENTER RED/BURGUNDY WAX SEAL (Matching Image 5) ================= */}
          <div
            className={`relative z-30 flex flex-col items-center justify-center my-auto px-4 transition-all duration-700 ${
              isOpeningAnim ? 'scale-125 opacity-0' : 'scale-100'
            }`}
          >
            <div className="relative group my-2">
              {/* Ribbon Tail coming out from seal bottom */}
              <div className="absolute top-16 left-1/2 -translate-x-1/2 w-8 h-20 pointer-events-none z-10">
                <svg viewBox="0 0 32 80" fill="none">
                  <path d="M12 0 L6 75 L16 65 L26 75 L20 0 Z" fill="#751628" opacity="0.95" />
                  <line x1="16" y1="0" x2="16" y2="65" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 3" />
                </svg>
              </div>

              {/* 3D Round Burgundy Wax Seal with Tree of Life relief */}
              <div className="relative z-20 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#9E1E34] via-[#751628] to-[#3B060F] p-2 sm:p-2.5 shadow-[0_16px_36px_rgba(60,10,20,0.55),inset_0_3px_6px_rgba(255,255,255,0.45),inset_0_-4px_8px_rgba(0,0,0,0.7)] border-2 border-[#540B18] flex items-center justify-center transition-transform duration-300 group-hover:scale-108">
                {/* Organic Wax Irregular Rim Texture */}
                <div className="w-full h-full rounded-full border-2 border-dashed border-[#F0CA7D]/70 flex flex-col items-center justify-center p-2 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]">
                  {/* Tree of Life Relief Emblem */}
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    <circle cx="18" cy="18" r="16" stroke="#FDEBD0" strokeWidth="1" strokeDasharray="2 2" fill="none" opacity="0.6" />
                    {/* Trunk and branches */}
                    <path d="M18 30 L18 16 M18 20 Q12 16 9 12 M18 20 Q24 16 27 12 M18 16 Q13 12 14 6 M18 16 Q23 12 22 6 M18 16 L18 5" stroke="#FDEBD0" strokeWidth="2" strokeLinecap="round" />
                    {/* Golden foliage dots */}
                    <circle cx="14" cy="5" r="2" fill="#FDEBD0" />
                    <circle cx="18" cy="4" r="2" fill="#FDEBD0" />
                    <circle cx="22" cy="5" r="2" fill="#FDEBD0" />
                    <circle cx="9" cy="11" r="2" fill="#FDEBD0" />
                    <circle cx="27" cy="11" r="2" fill="#FDEBD0" />
                  </svg>
                </div>
              </div>

              {/* Pulsing subtle golden halo */}
              <div className="absolute -inset-3 rounded-full border border-[#D4AF37]/70 opacity-60 group-hover:opacity-100 transition-all duration-300 animate-pulse pointer-events-none" />
            </div>

            {/* «Taklifnomani ochish» CTA Button */}
            <button
              type="button"
              className="mt-8 px-8 sm:px-10 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FFF0B2] to-[#AA771C] text-[#2C1808] text-xs sm:text-sm font-cinzel font-extrabold tracking-[0.25em] uppercase shadow-[0_8px_25px_rgba(212,175,55,0.4)] hover:shadow-[0_12px_35px_rgba(212,175,55,0.65)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2.5 cursor-pointer z-30"
            >
              <Sparkles className="w-4 h-4 text-[#8C6618]" />
              <span>«Taklifnomani ochish»</span>
            </button>
          </div>

          {/* ================= BOTTOM PROMPT ================= */}
          <div className="relative z-30 text-center pb-8 sm:pb-12 px-4">
            <span className="text-xs sm:text-sm font-serif italic text-stone-600">
              Ushbu hashamatli taklifnoma siz aziz mehmonimiz uchun tayyorlandi
            </span>
          </div>
        </div>
      )}

      {/* ================= INNER INVITATION CONTENT ================= */}
      {isOpen && (
        <div className="relative animate-fade-in transition-all duration-700">
          {/* Top Bar: Re-close gate button */}
          <div className="flex justify-end pt-3 pb-1 px-4 max-w-2xl mx-auto no-print">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-xs font-cinzel tracking-wider text-[#751628] hover:text-[#4A0814] bg-white/85 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#751628]/40 shadow-sm transition-all hover:bg-white cursor-pointer"
              title="Eshikni qayta yopish va ochilish animatsiyasini yana ko‘rish"
            >
              <MailOpen className="w-3.5 h-3.5 text-[#751628]" />
              <span>Eshikni qayta yopish</span>
            </button>
          </div>

          {/* The Inner Card Content */}
          {children}
        </div>
      )}
    </div>
  );
};
