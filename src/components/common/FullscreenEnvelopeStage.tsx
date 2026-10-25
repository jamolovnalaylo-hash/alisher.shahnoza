import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { GoldCorner } from './GoldFoilDecorations';
import { BurgundyRoseGarland } from './FloralGoldDecorations';
import { Sparkles, MailOpen } from 'lucide-react';
import { royalAudioEngine } from '../../utils/audioPlayer';

interface FullscreenEnvelopeStageProps {
  brideName: string;
  groomName: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  musicTrack?: string;
  children: React.ReactNode;
}

export const FullscreenEnvelopeStage: React.FC<FullscreenEnvelopeStageProps> = ({
  brideName,
  groomName,
  isOpen,
  onOpen,
  onClose,
  musicTrack,
  children,
}) => {
  const [isOpeningAnim, setIsOpeningAnim] = useState(false);

  // Monogram initials: e.g. "M & A"
  const getInitials = () => {
    const b = brideName?.trim() ? brideName.trim()[0].toUpperCase() : 'M';
    const g = groomName?.trim() ? groomName.trim()[0].toUpperCase() : 'A';
    return `${b} & ${g}`;
  };

  const handleOpenEnvelope = () => {
    if (isOpen || isOpeningAnim) return;
    setIsOpeningAnim(true);

    // Launch fine golden stardust & rose petals
    try {
      confetti({
        particleCount: 70,
        spread: 80,
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

    // Smooth envelope opening sequence
    setTimeout(() => {
      onOpen();
      setIsOpeningAnim(false);
    }, 900);
  };

  return (
    <div className="relative w-full min-h-screen">
      {/* ================= FULLSCREEN BESPOKE CLOSED ENVELOPE ================= */}
      {!isOpen && (
        <div
          className="fixed inset-0 z-40 w-full h-full min-h-screen overflow-hidden flex flex-col justify-between select-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 40%, #FFFDF9 0%, #FAF3E6 50%, #ECE0CF 100%)',
          }}
        >
          {/* Subtle Fine Cotton Paper Grain & Watercolor Floral Inset */}
          <div className="absolute inset-0 bg-parchment opacity-70 pointer-events-none" />

          {/* Golden Filigree Corner Flourishes on 4 Corners of Fullscreen Envelope */}
          <GoldCorner position="top-left" className="absolute top-3 left-3 sm:top-6 sm:left-6 w-20 h-20 sm:w-28 sm:h-28 z-20 opacity-85" />
          <GoldCorner position="top-right" className="absolute top-3 right-3 sm:top-6 sm:right-6 w-20 h-20 sm:w-28 sm:h-28 z-20 opacity-85" />
          <GoldCorner position="bottom-left" className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 w-20 h-20 sm:w-28 sm:h-28 z-20 opacity-85" />
          <GoldCorner position="bottom-right" className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 w-20 h-20 sm:w-28 sm:h-28 z-20 opacity-85" />

          {/* Lush Burgundy & Blush Rose Garlands on Left & Right Sides */}
          <BurgundyRoseGarland className="absolute top-1/2 -translate-y-1/2 -left-6 sm:left-4 w-36 sm:w-56 h-36 sm:h-56 z-20 pointer-events-none opacity-90" />
          <BurgundyRoseGarland className="absolute top-1/2 -translate-y-1/2 -right-6 sm:right-4 w-36 sm:w-56 h-36 sm:h-56 z-20 pointer-events-none opacity-90" mirrored />

          {/* Fullscreen Envelope 3D Fold Geometry (SVG) */}
          <div className="absolute inset-0 pointer-events-none z-10">
            <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none" fill="none">
              {/* Left & Right Triangular Side Folds */}
              <polygon points="0,0 480,500 0,1000" fill="#F8F2E4" stroke="#D4AF37" strokeWidth="1.2" strokeOpacity="0.4" />
              <polygon points="1000,0 520,500 1000,1000" fill="#F8F2E4" stroke="#D4AF37" strokeWidth="1.2" strokeOpacity="0.4" />

              {/* Bottom Triangular Fold */}
              <polygon points="0,1000 500,520 1000,1000" fill="#F4ECE0" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity="0.5" />

              {/* Top Triangular Flap with 3D Flap Unfolding Animation */}
              <polygon
                points="0,0 500,530 1000,0"
                fill="#FFFDF7"
                stroke="#D4AF37"
                strokeWidth="2"
                strokeOpacity="0.7"
                className={`transition-all duration-700 origin-top ${
                  isOpeningAnim ? 'scale-y-[-0.8] opacity-25' : ''
                }`}
                style={{ filter: 'drop-shadow(0 12px 24px rgba(40,15,5,0.18))' }}
              />
            </svg>
          </div>

          {/* ================= TOP SECTION: SIZGA MAXSUS TAKLIFNOMA ================= */}
          <div className="relative z-20 text-center pt-8 sm:pt-14 px-4">
            <span className="font-cinzel text-[10px] sm:text-xs tracking-[0.4em] uppercase text-[#751628] font-bold block mb-1">
              NIKOH TO‘YI TAKLIFNOMASI
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-semibold text-[#2C2219] tracking-wide filter drop-shadow-[0_2px_4px_rgba(212,175,55,0.2)]">
              «Sizga maxsus taklifnoma»
            </h1>
            <div className="h-[1.5px] w-32 sm:w-48 mx-auto bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent my-2 sm:my-3" />
            <p className="font-script text-3xl sm:text-5xl text-gold-foil">
              {brideName || "Madina"} & {groomName || "Aziz"}
            </p>
          </div>

          {/* ================= CENTER SECTION: GRAND 3D WAX SEAL & OPEN CTA ================= */}
          <div className="relative z-30 flex flex-col items-center justify-center my-auto px-4">
            {/* 3D Burgundy Wax Stamp Button */}
            <button
              type="button"
              onClick={handleOpenEnvelope}
              aria-label="Taklifnomani ochish"
              className={`relative group cursor-pointer transition-all duration-500 transform ${
                isOpeningAnim ? 'scale-125 -translate-y-6 opacity-0 rotate-12' : 'hover:scale-108 active:scale-95'
              }`}
            >
              {/* Realistic 3D Burgundy Wax Stamp */}
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#8C182E] via-[#5C101F] to-[#2B050B] p-2 sm:p-2.5 shadow-[0_20px_45px_rgba(60,10,20,0.65),inset_0_3px_6px_rgba(255,255,255,0.45),inset_0_-4px_8px_rgba(0,0,0,0.7)] border-2 border-[#450812] flex items-center justify-center">
                <div className="w-full h-full rounded-full border-2 border-dashed border-[#F0CA7D]/70 flex flex-col items-center justify-center p-2 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
                  <span className="font-cinzel text-[8px] sm:text-[10px] tracking-widest uppercase text-[#FDEBD0]/80">
                    SPECIAL
                  </span>
                  <span className="font-pinyon text-2xl sm:text-4xl font-bold leading-none text-[#FDEBD0] my-0.5 filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                    {getInitials()}
                  </span>
                  <span className="font-sans text-[7px] sm:text-[9px] tracking-widest uppercase text-[#FDEBD0]/70">
                    INVITATION
                  </span>
                </div>
              </div>

              {/* Pulsing Subtle Golden Halo */}
              <div className="absolute -inset-3 rounded-full border border-[#D4AF37]/60 opacity-60 group-hover:opacity-100 transition-all duration-300 animate-pulse pointer-events-none" />
            </button>

            {/* «Taklifnomani ochish» CTA Button */}
            <button
              onClick={handleOpenEnvelope}
              className="mt-6 sm:mt-8 px-8 sm:px-10 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FFF0B2] to-[#AA771C] text-[#2C1808] text-xs sm:text-sm font-cinzel font-extrabold tracking-[0.25em] uppercase shadow-[0_8px_25px_rgba(212,175,55,0.45)] hover:shadow-[0_12px_35px_rgba(212,175,55,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#8C6618]" />
              <span>«Taklifnomani ochish»</span>
            </button>
          </div>

          {/* ================= BOTTOM SECTION: ELEGANT BLESSING ================= */}
          <div className="relative z-20 text-center pb-8 sm:pb-12 px-4">
            <span className="text-xs sm:text-sm font-serif italic text-stone-600">
              Ushbu hashamatli taklifnoma siz aziz mehmonimiz uchun maxsus tayyorlandi
            </span>
          </div>
        </div>
      )}

      {/* ================= INNER INVITATION CONTENT ================= */}
      {isOpen && (
        <div className="relative animate-fade-in transition-all duration-700">
          {/* Top Bar: Re-close envelope button */}
          <div className="flex justify-end pt-3 pb-1 px-4 max-w-2xl mx-auto no-print">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-xs font-cinzel tracking-wider text-[#751628] hover:text-[#4A0814] bg-white/85 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#751628]/40 shadow-sm transition-all hover:bg-white cursor-pointer"
              title="Konvertni qayta yopish va ochilish animatsiyasini yana ko‘rish"
            >
              <MailOpen className="w-3.5 h-3.5 text-[#751628]" />
              <span>Konvertni qayta yopish</span>
            </button>
          </div>

          {/* The Inner Card Content */}
          {children}
        </div>
      )}
    </div>
  );
};
