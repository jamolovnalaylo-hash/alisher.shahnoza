import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, MailOpen } from 'lucide-react';
import { royalAudioEngine } from '../../utils/audioPlayer';

interface BurgundyVelvetCurtainsProps {
  brideName: string;
  groomName: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  customMusic?: string;
  children: React.ReactNode;
}

export const BurgundyVelvetCurtains: React.FC<BurgundyVelvetCurtainsProps> = ({
  brideName,
  groomName,
  isOpen,
  onOpen,
  onClose,
  customMusic,
  children,
}) => {
  const [isOpeningAnim, setIsOpeningAnim] = useState(false);
  const [showNamesReveal, setShowNamesReveal] = useState(false);

  // Monogram initials: e.g. "M & A"
  const getInitials = () => {
    const b = brideName?.trim() ? brideName.trim()[0].toUpperCase() : 'M';
    const g = groomName?.trim() ? groomName.trim()[0].toUpperCase() : 'A';
    return `${b} & ${g}`;
  };

  const handleOpenCurtains = () => {
    if (isOpen || isOpeningAnim) return;
    setIsOpeningAnim(true);

    // Launch fine golden stardust & rose petals
    try {
      confetti({
        particleCount: 65,
        spread: 85,
        origin: { y: 0.55 },
        colors: ['#D4AF37', '#FDF2B5', '#AA771C', '#80182A', '#FFE4E6', '#FFFFFF'],
        ticks: 220,
        gravity: 0.75,
        scalar: 1.15,
      });
    } catch {
      // ignore
    }

    // Start romantic music playback on user gesture
    if (customMusic) {
      royalAudioEngine.setCustomAudio(customMusic);
    }
    royalAudioEngine.play();

    // 1. Reveal glowing names center-stage
    setShowNamesReveal(true);

    // 2. Curtains sweep open to the sides smoothly
    setTimeout(() => {
      onOpen();
      setIsOpeningAnim(false);
      setShowNamesReveal(false);
    }, 1200);
  };

  return (
    <div className="relative w-full min-h-screen">
      {/* ================= FULLSCREEN BURGUNDY VELVET CURTAINS ================= */}
      {!isOpen && (
        <div className="fixed inset-0 z-40 w-full h-full overflow-hidden flex items-center justify-center select-none bg-[#1F0408]">
          {/* LEFT CURTAIN PANEL */}
          <div
            className={`absolute top-0 left-0 w-1/2 h-full z-10 transition-transform duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)] ${
              isOpeningAnim ? '-translate-x-full' : 'translate-x-0'
            }`}
            style={{
              background: 'radial-gradient(ellipse at 30% 50%, #7A1424 0%, #520C17 45%, #2E050D 100%)',
              boxShadow: 'inset -20px 0 40px rgba(0,0,0,0.8), 10px 0 30px rgba(0,0,0,0.6)',
            }}
          >
            {/* Velvet Pleats / Vertical Drapery Shadow Folds */}
            <div
              className="absolute inset-0 opacity-45 pointer-events-none"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(90deg, transparent, transparent 35px, rgba(0,0,0,0.5) 55px, rgba(255,255,255,0.08) 75px, transparent 110px)',
              }}
            />

            {/* Inner Golden Embroidered Trim on Center Meeting Edge */}
            <div className="absolute top-0 right-0 w-3 h-full bg-gradient-to-b from-[#D4AF37] via-[#FFF3A8] to-[#AA771C] opacity-85 shadow-[0_0_12px_rgba(212,175,55,0.8)]" />

            {/* Golden Rope & Hanging Tassel (Left Tieback) */}
            <div className="absolute top-1/2 left-4 sm:left-12 -translate-y-1/2 pointer-events-none opacity-80">
              <svg width="40" height="120" viewBox="0 0 40 120" fill="none">
                <path d="M5 0 C15 30, 30 60, 20 120" stroke="url(#royalGoldGrad)" strokeWidth="3" fill="none" />
                <circle cx="20" cy="55" r="7" fill="url(#royalGoldGrad)" />
                <path d="M14 62 L26 62 L28 115 L12 115 Z" fill="url(#royalGoldGrad)" />
              </svg>
            </div>
          </div>

          {/* RIGHT CURTAIN PANEL */}
          <div
            className={`absolute top-0 right-0 w-1/2 h-full z-10 transition-transform duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)] ${
              isOpeningAnim ? 'translate-x-full' : 'translate-x-0'
            }`}
            style={{
              background: 'radial-gradient(ellipse at 70% 50%, #7A1424 0%, #520C17 45%, #2E050D 100%)',
              boxShadow: 'inset 20px 0 40px rgba(0,0,0,0.8), -10px 0 30px rgba(0,0,0,0.6)',
            }}
          >
            {/* Velvet Pleats */}
            <div
              className="absolute inset-0 opacity-45 pointer-events-none"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(90deg, transparent, transparent 35px, rgba(0,0,0,0.5) 55px, rgba(255,255,255,0.08) 75px, transparent 110px)',
              }}
            />

            {/* Inner Golden Embroidered Trim */}
            <div className="absolute top-0 left-0 w-3 h-full bg-gradient-to-b from-[#D4AF37] via-[#FFF3A8] to-[#AA771C] opacity-85 shadow-[0_0_12px_rgba(212,175,55,0.8)]" />

            {/* Golden Rope & Hanging Tassel (Right Tieback) */}
            <div className="absolute top-1/2 right-4 sm:right-12 -translate-y-1/2 pointer-events-none opacity-80 scale-x-[-1]">
              <svg width="40" height="120" viewBox="0 0 40 120" fill="none">
                <path d="M5 0 C15 30, 30 60, 20 120" stroke="url(#royalGoldGrad)" strokeWidth="3" fill="none" />
                <circle cx="20" cy="55" r="7" fill="url(#royalGoldGrad)" />
                <path d="M14 62 L26 62 L28 115 L12 115 Z" fill="url(#royalGoldGrad)" />
              </svg>
            </div>
          </div>

          {/* TOP CURTAIN VALANCE / DRAPERY SWAG */}
          <div className="absolute top-0 inset-x-0 h-20 sm:h-28 z-20 pointer-events-none bg-gradient-to-b from-[#35050C] via-[#5C0F1D] to-transparent flex items-center justify-around overflow-hidden">
            <div className="w-full h-full border-b-2 border-[#D4AF37]/60 flex items-center justify-center">
              {/* Golden Fringe along the top valance */}
              <div className="w-full h-3 bg-gradient-to-r from-[#D4AF37] via-[#FFF5B7] to-[#AA771C] opacity-80 shadow-md self-end" />
            </div>
          </div>

          {/* ================= STAGE CENTER: WAX SEAL & INVITATION CALL ================= */}
          <div
            className={`relative z-30 flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto transition-all duration-700 ${
              isOpeningAnim ? 'scale-110 opacity-0 -translate-y-8' : 'scale-100 opacity-100'
            }`}
          >
            {/* Top Ornamental Gold Medallion */}
            <div className="mb-3">
              <svg width="60" height="28" viewBox="0 0 60 28" fill="none">
                <path d="M30 2 L36 10 L48 5 L42 22 L18 22 L12 5 L24 10 Z" fill="url(#royalGoldGrad)" />
                <circle cx="30" cy="2" r="3" fill="url(#royalGoldGrad)" />
                <path d="M8 26 C20 22, 40 22, 52 26" stroke="url(#royalGoldGrad)" strokeWidth="1.5" />
              </svg>
            </div>

            {/* «Sizga maxsus taklifnoma» */}
            <span className="font-cinzel text-xs sm:text-sm tracking-[0.35em] uppercase text-[#F8E2A8] font-bold block mb-1 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              NIKOH TO‘YI
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-[#FFF8ED] tracking-wide filter drop-shadow-[0_3px_8px_rgba(0,0,0,0.9)] mb-2">
              «Sizga maxsus taklifnoma»
            </h1>
            <div className="h-[1.5px] w-32 mx-auto bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent my-2" />

            {/* Couple Names Preview on Curtain */}
            <p className="font-script text-3xl sm:text-4xl text-gold-foil filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] mb-6">
              {brideName || "Madina"} & {groomName || "Aziz"}
            </p>

            {/* 3D Burgundy Wax Seal Button */}
            <button
              type="button"
              onClick={handleOpenCurtains}
              aria-label="Taklifnomani ochish"
              className="relative group cursor-pointer my-2 transform hover:scale-108 active:scale-95 transition-all duration-300"
            >
              {/* Realistic 3D Burgundy Wax Stamp */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#8C1B2E] via-[#5C101F] to-[#2B050B] p-2 shadow-[0_16px_36px_rgba(0,0,0,0.85),inset_0_3px_6px_rgba(255,255,255,0.4),inset_0_-4px_8px_rgba(0,0,0,0.7)] border-2 border-[#450812] flex items-center justify-center">
                <div className="w-full h-full rounded-full border border-dashed border-[#F0CA7D]/60 flex flex-col items-center justify-center p-2 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
                  <span className="font-cinzel text-[9px] tracking-widest uppercase text-[#FDEBD0]/80">
                    TO‘Y
                  </span>
                  <span className="font-pinyon text-2xl sm:text-3xl font-bold leading-none text-[#FDEBD0] my-0.5 filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                    {getInitials()}
                  </span>
                  <span className="font-sans text-[8px] tracking-widest uppercase text-[#FDEBD0]/70">
                    MUHRI
                  </span>
                </div>
              </div>

              {/* Pulsing golden halo ring */}
              <div className="absolute -inset-2.5 rounded-full border border-[#D4AF37]/70 opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 animate-pulse pointer-events-none" />
            </button>

            {/* «Taklifnomani ochish» CTA Button */}
            <button
              onClick={handleOpenCurtains}
              className="mt-6 px-8 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FFF0B2] to-[#AA771C] text-[#2C1808] text-xs sm:text-sm font-cinzel font-extrabold tracking-[0.25em] uppercase shadow-[0_8px_25px_rgba(212,175,55,0.45)] hover:shadow-[0_10px_35px_rgba(212,175,55,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#8C6618]" />
              <span>«Taklifnomani ochish»</span>
            </button>
          </div>

          {/* ================= NAMES EMERGENCE ANIMATION WHEN CURTAINS PART ================= */}
          {showNamesReveal && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none text-center animate-fade-in">
              <span className="font-cinzel text-xs sm:text-sm uppercase tracking-[0.4em] text-[#D4AF37] font-semibold mb-2">
                HAYOTIMIZNING ENG BAXTLI KUNI
              </span>
              <h2 className="font-script text-6xl sm:text-8xl md:text-9xl text-gold-foil leading-tight filter drop-shadow-[0_4px_12px_rgba(184,134,11,0.5)] scale-105 transition-transform duration-1000">
                {brideName || "Madina"} & {groomName || "Aziz"}
              </h2>
            </div>
          )}
        </div>
      )}

      {/* ================= UNFOLDED CARD STAGE ================= */}
      {isOpen && (
        <div className="relative animate-fade-in transition-all duration-700">
          {/* Top Bar: Re-close curtains button */}
          <div className="flex justify-end pt-2 pb-1 px-4 max-w-2xl mx-auto no-print">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-xs font-cinzel tracking-wider text-[#8C2538] hover:text-[#540F19] bg-white/85 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#8C2538]/40 shadow-sm transition-all hover:bg-white cursor-pointer"
              title="Pardani qayta yopish va ochilish animatsiyasini yana ko‘rish"
            >
              <MailOpen className="w-3.5 h-3.5 text-[#8C2538]" />
              <span>Pardani qayta yopish</span>
            </button>
          </div>

          {/* The Main Invitation Content */}
          {children}
        </div>
      )}
    </div>
  );
};
