import React, { useState, useEffect } from 'react';
import { WeddingInvitationData } from '../../types';
import { InvitationDesignRenderer } from '../designs/InvitationDesignRenderer';
import { InteractiveEnvelope } from '../common/InteractiveEnvelope';
import { royalAudioEngine } from '../../utils/audioPlayer';
import {
  Volume2,
  VolumeX,
  Share2,
  Edit3,
  Sparkles,
  ArrowLeft
} from 'lucide-react';

interface GuestInvitationViewProps {
  data: WeddingInvitationData;
  onBackToEditor?: () => void;
  onOpenShareModal: () => void;
  onAddRsvp: (entry: { guestName: string; guestsCount: number; phone?: string; message?: string }) => void;
  isGuestMode?: boolean;
}

export const GuestInvitationView: React.FC<GuestInvitationViewProps> = ({
  data,
  onBackToEditor,
  onOpenShareModal,
  onAddRsvp,
  isGuestMode = false,
}) => {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  useEffect(() => {
    // Check initial playing state
    setIsPlayingMusic(royalAudioEngine.getIsPlaying());
  }, []);

  const toggleMusic = () => {
    const newState = royalAudioEngine.toggle(data.musicTrack);
    setIsPlayingMusic(newState);
  };

  // Determine wax seal color by design
  const getWaxColor = () => {
    switch (data.designId) {
      case 'burgundy-luxury':
        return 'burgundy';
      case 'pink-romance':
        return 'rose';
      case 'modern-royal':
        return 'dark';
      case 'royal-gold':
      case 'imperial-arch':
      case 'floral-palace':
      default:
        return 'gold';
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2A2318] selection:bg-[#E5DAC6] selection:text-[#5C1220] py-4 px-2 sm:px-4">
      {/* Floating Floating Utility Bar (Fixed Top) */}
      <div className="fixed top-3 left-1/2 -translate-x-1/2 z-40 bg-white/80 backdrop-blur-md border border-[#D4AF37]/40 px-4 py-2 rounded-full shadow-lg flex items-center gap-3 no-print">
        {onBackToEditor && (
          <button
            onClick={onBackToEditor}
            className="flex items-center gap-1.5 text-xs font-cinzel font-semibold text-[#8C6D28] hover:text-[#543E19] transition-colors cursor-pointer"
            title="Tahrirlash paneliga qaytish"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Tahrirlash</span>
          </button>
        )}

        <div className="h-4 w-[1px] bg-stone-300" />

        {/* Music Player Button */}
        <button
          onClick={toggleMusic}
          className={`flex items-center gap-1.5 text-xs font-cinzel font-semibold transition-colors cursor-pointer ${
            isPlayingMusic ? 'text-[#8C6D28]' : 'text-stone-400'
          }`}
          title={isPlayingMusic ? "Musiqani to‘xtatish" : "Musiqani yoqish"}
        >
          {isPlayingMusic ? (
            <Volume2 className="w-4 h-4 text-[#C5A047] animate-pulse" />
          ) : (
            <VolumeX className="w-4 h-4 text-stone-400" />
          )}
          <span className="hidden sm:inline">
            {isPlayingMusic ? "Musiqa yangramoqda" : "Musiqani yoqish"}
          </span>
        </button>

        <div className="h-4 w-[1px] bg-stone-300" />

        {/* Share Button */}
        <button
          onClick={onOpenShareModal}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#C5A047] to-[#B38728] text-white text-xs font-cinzel font-bold tracking-wider uppercase shadow-sm hover:shadow-gold-glow cursor-pointer transition-all"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Ulashish</span>
        </button>
      </div>

      {/* Main Container with Envelope Interaction */}
      <div className="pt-16 pb-12 max-w-3xl mx-auto">
        <InteractiveEnvelope
          brideName={data.brideName}
          groomName={data.groomName}
          waxColor={getWaxColor()}
          isOpen={isEnvelopeOpen}
          onOpen={() => setIsEnvelopeOpen(true)}
          onClose={() => setIsEnvelopeOpen(false)}
          musicTrack={data.musicTrack}
        >
          {/* Render the selected luxury design inside */}
          <InvitationDesignRenderer
            data={data}
            onAddRsvp={onAddRsvp}
          />
        </InteractiveEnvelope>
      </div>
    </div>
  );
};
