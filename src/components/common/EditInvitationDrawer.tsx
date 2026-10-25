import React, { useRef, useState } from 'react';
import { WeddingInvitationData } from '../../types';
import { DEFAULT_BRIDE_PHOTO, DEFAULT_GROOM_PHOTO } from '../../data/sampleData';
import { royalAudioEngine } from '../../utils/audioPlayer';
import {
  X,
  Upload,
  Calendar,
  Clock,
  MapPin,
  FileText,
  User,
  Heart,
  RefreshCw,
  Check,
  Music,
  Camera,
  Play,
  Pause,
  LogOut
} from 'lucide-react';

interface EditInvitationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: WeddingInvitationData;
  onUpdate: (updated: Partial<WeddingInvitationData>) => void;
  onReset: () => void;
  onLogoutAdmin?: () => void;
}

export const EditInvitationDrawer: React.FC<EditInvitationDrawerProps> = ({
  isOpen,
  onClose,
  data,
  onUpdate,
  onReset,
  onLogoutAdmin,
}) => {
  const brideFileInputRef = useRef<HTMLInputElement | null>(null);
  const groomFileInputRef = useRef<HTMLInputElement | null>(null);
  const audioFileInputRef = useRef<HTMLInputElement | null>(null);

  const [isPlayingTestAudio, setIsPlayingTestAudio] = useState(false);

  if (!isOpen) return null;

  // Handle Photo File Upload (JPG, PNG, WEBP)
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, role: 'bride' | 'groom') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert("Iltimos, JPG, PNG yoki WEBP formatidagi rasm tanlang.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (role === 'bride') {
        onUpdate({ bridePhoto: result });
      } else {
        onUpdate({ groomPhoto: result });
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle Music File Upload (MP3, WAV, AAC, M4A)
  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const audioDataUrl = event.target?.result as string;
      onUpdate({
        musicTrack: audioDataUrl,
        musicTitle: file.name.replace(/\.[^/.]+$/, ""),
      });
      // Immediately test and set custom audio in player
      royalAudioEngine.setCustomAudio(audioDataUrl);
    };
    reader.readAsDataURL(file);
  };

  const toggleTestPlayMusic = () => {
    if (data.musicTrack) {
      royalAudioEngine.setCustomAudio(data.musicTrack);
    }
    const state = royalAudioEngine.toggle();
    setIsPlayingTestAudio(state);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Slide-over Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] border-l-2 border-[#D4AF37]/50 shadow-2xl flex flex-col overflow-y-auto">
          {/* Drawer Header (Strictly NO "royal studio") */}
          <div className="sticky top-0 z-20 px-6 py-4 bg-gradient-to-r from-[#FAF5EC] to-[#F3EBE0] border-b border-[#D4AF37]/40 flex items-center justify-between shadow-sm">
            <div>
              <span className="font-cinzel text-[10px] uppercase tracking-[0.25em] text-[#751628] font-bold block">
                ADMIN BOSHQARUV PANELI (934362504)
              </span>
              <h2 className="font-serif text-xl font-bold text-[#2C2219]">
                Taklifnomani Tahrirlash
              </h2>
            </div>
            <div className="flex items-center gap-2">
              {onLogoutAdmin && (
                <button
                  onClick={onLogoutAdmin}
                  className="p-2 rounded-full hover:bg-stone-200/70 text-[#751628] hover:text-[#4A0814] transition-colors cursor-pointer"
                  title="Admin rejimidan chiqish"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-stone-200/70 text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
                aria-label="Yopish"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Drawer Body Form */}
          <div className="p-6 space-y-6 flex-1 text-sm text-[#2C2219]">
            {/* Status note */}
            <div className="p-3 rounded-xl bg-[#FAF0D9]/80 border border-[#D4AF37]/50 text-xs text-[#7A5B18] flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#751628] shrink-0" />
              <span>Kiritilgan barcha o‘zgarishlar darhol saqlanadi va taklifnomada yangilanadi.</span>
            </div>

            {/* 1. Kelin & Kuyov Rasmlarini Yuklash */}
            <div className="space-y-4 pt-1">
              <label className="font-cinzel text-xs uppercase tracking-widest text-[#751628] font-bold flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-[#C5A047]" />
                <span>1. Fotosuratlarni yuklash (JPG, PNG, WEBP)</span>
              </label>

              <div className="grid grid-cols-2 gap-3">
                {/* Kelin Rasmi */}
                <div className="p-3 rounded-2xl border border-[#751628]/30 bg-white shadow-sm flex flex-col items-center text-center">
                  <div className="w-20 h-26 rounded-t-[30px] rounded-b-lg overflow-hidden border border-[#D4AF37] mb-2 bg-stone-100">
                    <img
                      src={data.bridePhoto}
                      alt="Kelin"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <span className="font-cinzel text-xs font-semibold text-[#751628] mb-2">
                    Kelin rasmi
                  </span>
                  <input
                    type="file"
                    ref={brideFileInputRef}
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={(e) => handlePhotoUpload(e, 'bride')}
                  />
                  <button
                    type="button"
                    onClick={() => brideFileInputRef.current?.click()}
                    className="w-full py-1.5 px-2 rounded-lg bg-[#FAF3E6] border border-[#D4AF37]/60 text-[11px] font-cinzel font-semibold text-[#8C6D28] hover:bg-[#F3E7CF] transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Upload className="w-3 h-3" />
                    <span>Rasm tanlash</span>
                  </button>
                  {data.bridePhoto !== DEFAULT_BRIDE_PHOTO && (
                    <button
                      type="button"
                      onClick={() => onUpdate({ bridePhoto: DEFAULT_BRIDE_PHOTO })}
                      className="text-[10px] text-stone-500 hover:text-stone-800 mt-1.5 underline cursor-pointer"
                    >
                      Asliga qaytarish
                    </button>
                  )}
                </div>

                {/* Kuyov Rasmi */}
                <div className="p-3 rounded-2xl border border-[#751628]/30 bg-white shadow-sm flex flex-col items-center text-center">
                  <div className="w-20 h-26 rounded-t-[30px] rounded-b-lg overflow-hidden border border-[#D4AF37] mb-2 bg-stone-100">
                    <img
                      src={data.groomPhoto}
                      alt="Kuyov"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <span className="font-cinzel text-xs font-semibold text-[#751628] mb-2">
                    Kuyov rasmi
                  </span>
                  <input
                    type="file"
                    ref={groomFileInputRef}
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={(e) => handlePhotoUpload(e, 'groom')}
                  />
                  <button
                    type="button"
                    onClick={() => groomFileInputRef.current?.click()}
                    className="w-full py-1.5 px-2 rounded-lg bg-[#FAF3E6] border border-[#D4AF37]/60 text-[11px] font-cinzel font-semibold text-[#8C6D28] hover:bg-[#F3E7CF] transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Upload className="w-3 h-3" />
                    <span>Rasm tanlash</span>
                  </button>
                  {data.groomPhoto !== DEFAULT_GROOM_PHOTO && (
                    <button
                      type="button"
                      onClick={() => onUpdate({ groomPhoto: DEFAULT_GROOM_PHOTO })}
                      className="text-[10px] text-stone-500 hover:text-stone-800 mt-1.5 underline cursor-pointer"
                    >
                      Asliga qaytarish
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* 2. Ismlar */}
            <div className="space-y-3 pt-2">
              <label className="font-cinzel text-xs uppercase tracking-widest text-[#751628] font-bold flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#C5A047]" />
                <span>2. Kelin va Kuyov Ismlari</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-stone-600 block mb-1">
                    Kelin ismi:
                  </label>
                  <input
                    type="text"
                    value={data.brideName}
                    onChange={(e) => onUpdate({ brideName: e.target.value })}
                    placeholder="Masalan: Madina"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:border-[#751628] focus:ring-1 focus:ring-[#751628] bg-white outline-none font-serif text-base"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-stone-600 block mb-1">
                    Kuyov ismi:
                  </label>
                  <input
                    type="text"
                    value={data.groomName}
                    onChange={(e) => onUpdate({ groomName: e.target.value })}
                    placeholder="Masalan: Aziz"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:border-[#751628] focus:ring-1 focus:ring-[#751628] bg-white outline-none font-serif text-base"
                  />
                </div>
              </div>
            </div>

            {/* 3. Musiqa Tanlash va Yuklash */}
            <div className="space-y-3 pt-2 p-3.5 rounded-2xl border border-[#751628]/35 bg-gradient-to-br from-[#FFFDF9] to-[#FAF2EE]">
              <label className="font-cinzel text-xs uppercase tracking-widest text-[#751628] font-bold flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Music className="w-4 h-4 text-[#C5A047]" />
                  <span>3. Fon Musiqasi</span>
                </span>
                <span className="text-[10px] text-stone-500 font-sans font-normal">
                  {data.musicTitle || "Shohona vals ohanglari"}
                </span>
              </label>

              <div className="space-y-2">
                <input
                  type="file"
                  ref={audioFileInputRef}
                  accept="audio/*"
                  className="hidden"
                  onChange={handleAudioUpload}
                />
                <button
                  type="button"
                  onClick={() => audioFileInputRef.current?.click()}
                  className="w-full py-2 px-3 rounded-xl bg-white border border-[#D4AF37]/70 text-xs font-cinzel font-semibold text-[#8C6D28] hover:bg-[#FAF5EC] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Kompyuterdan musiqa yuklash (MP3, WAV)</span>
                </button>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={toggleTestPlayMusic}
                    className="flex-1 py-1.5 px-3 rounded-xl bg-gradient-to-r from-[#751628] to-[#520C17] text-white text-xs font-cinzel font-semibold flex items-center justify-center gap-1.5 shadow-sm hover:opacity-95 cursor-pointer"
                  >
                    {isPlayingTestAudio ? (
                      <>
                        <Pause className="w-3.5 h-3.5" />
                        <span>Musiqani to‘xtatish</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5" />
                        <span>Tinglab ko‘rish</span>
                      </>
                    )}
                  </button>

                  {data.musicTrack && (
                    <button
                      type="button"
                      onClick={() => {
                        onUpdate({ musicTrack: undefined, musicTitle: "Shohona vals ohanglari" });
                        royalAudioEngine.setCustomAudio(null);
                        setIsPlayingTestAudio(false);
                      }}
                      className="py-1.5 px-3 rounded-xl border border-stone-300 text-stone-600 hover:bg-stone-100 text-xs font-sans cursor-pointer"
                    >
                      Asliga qaytarish
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* 4. To'y Sanasi va Vaqti */}
            <div className="space-y-3 pt-2">
              <label className="font-cinzel text-xs uppercase tracking-widest text-[#751628] font-bold flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#C5A047]" />
                <span>4. To‘y Sanasi va Vaqti</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-stone-600 block mb-1">
                    To‘y sanasi:
                  </label>
                  <input
                    type="date"
                    value={data.weddingDate}
                    onChange={(e) => onUpdate({ weddingDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:border-[#751628] bg-white outline-none text-xs font-sans"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-stone-600 block mb-1">
                    Boshlanish vaqti:
                  </label>
                  <input
                    type="time"
                    value={data.weddingTime}
                    onChange={(e) => onUpdate({ weddingTime: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:border-[#751628] bg-white outline-none text-xs font-sans"
                  />
                </div>
              </div>
            </div>

            {/* 5. To'yxona Nomi va Manzili */}
            <div className="space-y-3 pt-2">
              <label className="font-cinzel text-xs uppercase tracking-widest text-[#751628] font-bold flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#C5A047]" />
                <span>5. To‘yxona va Manzil</span>
              </label>
              <div>
                <label className="text-xs font-medium text-stone-600 block mb-1">
                  To‘yxona nomi:
                </label>
                <input
                  type="text"
                  value={data.venueName}
                  onChange={(e) => onUpdate({ venueName: e.target.value })}
                  placeholder="Masalan: Zarafshon Saroyi"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:border-[#751628] bg-white outline-none font-serif text-base"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-stone-600 block mb-1">
                  To‘yxona manzili:
                </label>
                <input
                  type="text"
                  value={data.venueAddress}
                  onChange={(e) => onUpdate({ venueAddress: e.target.value })}
                  placeholder="Masalan: Navoiy shahri, Amir Temur shoh ko‘chasi"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:border-[#751628] bg-white outline-none text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-stone-600 block mb-1">
                  Google Maps havolasi:
                </label>
                <input
                  type="url"
                  value={data.mapUrl || ''}
                  onChange={(e) => onUpdate({ mapUrl: e.target.value })}
                  placeholder="https://maps.google.com/?q=..."
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:border-[#751628] bg-white outline-none text-xs font-mono"
                />
              </div>
            </div>

            {/* 6. Taklifnoma Matni & Ota-onalar */}
            <div className="space-y-3 pt-2">
              <label className="font-cinzel text-xs uppercase tracking-widest text-[#751628] font-bold flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#C5A047]" />
                <span>6. Taklifnoma Matni</span>
              </label>
              <div>
                <label className="text-xs font-medium text-stone-600 block mb-1">
                  Asosiy taklif so‘zlari:
                </label>
                <textarea
                  rows={4}
                  value={data.invitationText}
                  onChange={(e) => onUpdate({ invitationText: e.target.value })}
                  className="w-full p-3 rounded-xl border border-stone-300 focus:border-[#751628] bg-white outline-none text-xs font-serif leading-relaxed"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-stone-600 block mb-1">
                  Ota-onalar xonadoni (hurmat bilan):
                </label>
                <input
                  type="text"
                  value={data.parentsNames || ''}
                  onChange={(e) => onUpdate({ parentsNames: e.target.value })}
                  placeholder="Masalan: Karimovlar va Rahimovlar xonadonlari"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:border-[#751628] bg-white outline-none text-xs"
                />
              </div>
            </div>
          </div>

          {/* Drawer Footer Actions */}
          <div className="sticky bottom-0 p-4 bg-gradient-to-r from-[#FAF5EC] to-[#F3EBE0] border-t border-[#D4AF37]/40 flex items-center justify-between gap-3 shadow-lg">
            <button
              type="button"
              onClick={onReset}
              className="px-3 py-2 rounded-xl border border-stone-300 text-stone-600 hover:bg-stone-200/60 text-xs font-cinzel font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Namunaga qaytarish</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#751628] to-[#520C17] text-white text-xs font-cinzel font-bold tracking-wider uppercase shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Saqlash va Yopish</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
