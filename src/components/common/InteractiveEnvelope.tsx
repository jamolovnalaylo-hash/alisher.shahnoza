import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { GoldCorner } from './GoldFoilDecorations';
import { BlushRoseGarland } from './FloralGoldDecorations';
import { Sparkles, MailOpen } from 'lucide-react';
import { royalAudioEngine } from '../../utils/audioPlayer';

interface InteractiveEnvelopeProps {
  brideName: string;
  groomName: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  waxColor?: string;
  musicTrack?: string;
  children: React.ReactNode;
}

export const InteractiveEnvelope: React.FC<InteractiveEnvelopeProps> = ({
  brideName,
  groomName,
  isOpen,
  onOpen,
  onClose,
  waxColor = 'burgundy',
  musicTrack,
  children,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  // Compute initials for the wax seal: e.g. "M & A"
  const getInitials = () => {
    const b = brideName?.trim() ? brideName.trim()[0].toUpperCase() : 'M';
    const g = groomName?.trim() ? groomName.trim()[0].toUpperCase() : 'A';
    return `${b} & ${g}`;
  };

  const handleOpenClick = () => {
    if (isOpen || isAnimating) return;
    setIsAnimating(true);

    // Launch fine golden particles and subtle blush petals
    try {
      confetti({
        particleCount: 55,
        spread: 70,
        origin: { y: 0.62 },
        colors: ['#D4AF37', '#FDF2B5', '#AA771C', '#E8A598', '#FFFFFF', '#F7D6D0'],
        ticks: 200,
        gravity: 0.8,
        scalar: 1.1,
      });
    } catch {
      // ignore
    }

    // Automatically trigger gentle royal music playback on user gesture
    royalAudioEngine.play();

    // Smooth staggered unfolding sequence:
    // 1. Wax seal lifts & dissolves
    // 2. Flap unfolds in 3D
    // 3. Card emerges into full view
    setTimeout(() => {
      onOpen();
      setIsAnimating(false);
    }, 850);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto py-2 sm:py-6 px-2 sm:px-4">
      {!isOpen ? (
        /* ================= CLOSED ROYAL ENVELOPE ================= */
        <div className="relative mx-auto my-6 w-full max-w-lg aspect-[1.42/1] rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-between shadow-[0_30px_70px_-15px_rgba(25,12,6,0.35),0_0_0_1px_rgba(212,175,55,0.4)] border-2 border-[#D4AF37]/50 bg-gradient-to-b from-[#FFFDF9] via-[#F7F1E5] to-[#EAE0D0] overflow-hidden transition-all duration-700">
          {/* Subtle Cotton / Parchment Texture Background */}
          <div className="absolute inset-0 bg-parchment opacity-70 pointer-events-none" />

          {/* Golden Filigree Corner Flourishes */}
          <GoldCorner position="top-left" className="absolute top-2 left-2 w-16 h-16 opacity-90" />
          <GoldCorner position="top-right" className="absolute top-2 right-2 w-16 h-16 opacity-90" />
          <GoldCorner position="bottom-left" className="absolute bottom-2 left-2 w-16 h-16 opacity-90" />
          <GoldCorner position="bottom-right" className="absolute bottom-2 right-2 w-16 h-16 opacity-90" />

          {/* Delicate Blush Rose Garlands on Left & Right Sides */}
          <BlushRoseGarland className="absolute top-1/2 -translate-y-1/2 -left-8 w-32 h-32 opacity-95 pointer-events-none" />
          <BlushRoseGarland className="absolute top-1/2 -translate-y-1/2 -right-8 w-32 h-32 opacity-95 pointer-events-none" mirrored />

          {/* Realistic Envelope Flap Lines & 3D Geometry */}
          <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 500 350" fill="none" preserveAspectRatio="none">
              {/* Flap shape with 3D folding simulation */}
              <polygon
                points="0,0 250,205 500,0"
                fill="#FAF5EB"
                stroke="#D4AF37"
                strokeWidth="1.5"
                strokeOpacity="0.6"
                className={`transition-all duration-700 origin-top ${
                  isAnimating ? 'scale-y-[-0.7] opacity-20' : ''
                }`}
              />
              {/* Bottom Envelope Diagonals */}
              <path
                d="M0 350 L250 185 L500 350"
                stroke="#D4AF37"
                strokeWidth="1.2"
                strokeOpacity="0.4"
                fill="none"
              />
            </svg>
          </div>

          {/* Top Envelope Header: Sizga maxsus taklifnoma */}
          <div className="relative z-10 text-center pt-2">
            <span className="font-cinzel text-[11px] sm:text-xs tracking-[0.35em] uppercase text-[#8C6D28] font-bold block mb-1">
              ARISTOKRAT NIKOH TO‘YI
            </span>
            <h1 className="font-serif text-xl sm:text-2xl font-semibold text-[#2E241B] tracking-wide">
              «Sizga maxsus taklifnoma»
            </h1>
            <div className="h-[1px] w-28 mx-auto bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent my-1.5" />
            <p className="font-script text-xl sm:text-2xl text-gold-foil">
              {brideName || "Madina"} & {groomName || "Aziz"}
            </p>
          </div>

          {/* Center 3D Deep Burgundy Wax Seal & Action Button */}
          <div className="relative z-20 flex flex-col items-center justify-center my-auto">
            {/* Burgundy Wax Seal */}
            <button
              type="button"
              onClick={handleOpenClick}
              aria-label="Taklifnomani ochish"
              className={`relative group cursor-pointer transition-all duration-500 transform ${
                isAnimating ? 'scale-125 -translate-y-4 opacity-0 rotate-12' : 'hover:scale-108'
              }`}
            >
              {/* Realistic 3D Burgundy Wax Body */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#80182A] via-[#5C1324] to-[#34070F] p-1.5 shadow-[0_15px_30px_rgba(60,10,20,0.55),inset_0_3px_5px_rgba(255,255,255,0.4),inset_0_-4px_8px_rgba(0,0,0,0.7)] border border-[#420B13] flex items-center justify-center">
                {/* Organic Irregular Rim Texture */}
                <div className="w-full h-full rounded-full border border-dashed border-[#E8BD70]/50 flex flex-col items-center justify-center p-2 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]">
                  <span className="font-cinzel text-[8px] sm:text-[9px] tracking-widest uppercase text-[#FDEBD0]/80">
                    SPECIAL
                  </span>
                  {/* Embossed Gold Initials */}
                  <span className="font-pinyon text-xl sm:text-2xl font-bold leading-none text-[#FDEBD0] my-0.5 filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
                    {getInitials()}
                  </span>
                  <span className="font-sans text-[7px] sm:text-[8px] tracking-widest uppercase text-[#FDEBD0]/70">
                    INVITATION
                  </span>
                </div>
              </div>

              {/* Pulsing Subtle Golden Halo */}
              <div className="absolute -inset-2 rounded-full border border-[#D4AF37]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping pointer-events-none" />
            </button>

            {/* «Taklifnomani ochish» Button */}
            <button
              onClick={handleOpenClick}
              className="mt-4 px-6 py-2 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F5E59E] to-[#AA771C] text-[#2C1F0C] text-xs sm:text-sm font-cinzel font-bold tracking-[0.2em] uppercase shadow-[0_4px_16px_rgba(170,119,28,0.35)] hover:shadow-[0_6px_22px_rgba(212,175,55,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#8C6D28]" />
              <span>«Taklifnomani ochish»</span>
            </button>
          </div>

          {/* Bottom Envelope Footer Note */}
          <div className="relative z-10 text-center pb-2">
            <span className="text-[10px] sm:text-xs font-serif italic text-stone-500">
              Ushbu maxsus taklifnoma siz aziz mehmonimiz uchun tayyorlandi
            </span>
          </div>
        </div>
      ) : (
        /* ================= UNFOLDED INVITATION CONTENT ================= */
        <div className="relative animate-fade-in transition-all duration-700">
          {/* Subtle Top Bar: Re-seal envelope button */}
          <div className="flex justify-end mb-3 no-print">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-xs font-cinzel tracking-wider text-[#8C6D28] hover:text-[#543E19] bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#D4AF37]/40 shadow-sm transition-all hover:bg-white cursor-pointer"
              title="Konvertni qayta yopish va ochilish animatsiyasini yana ko‘rish"
            >
              <MailOpen className="w-3.5 h-3.5 text-[#C5A047]" />
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
