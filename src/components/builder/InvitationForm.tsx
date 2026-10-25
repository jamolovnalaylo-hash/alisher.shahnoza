import React, { useRef } from 'react';
import { WeddingInvitationData, InvitationDesignId, Language } from '../../types';
import { DESIGN_THEMES, DEFAULT_BRIDE_PHOTO, DEFAULT_GROOM_PHOTO } from '../../data/sampleData';
import { PhotoUploader } from './PhotoUploader';
import {
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Music,
  Languages,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Heart,
  Palette,
  FileText,
  Upload
} from 'lucide-react';
import { royalAudioEngine } from '../../utils/audioPlayer';

interface InvitationFormProps {
  data: WeddingInvitationData;
  onChange: (updated: Partial<WeddingInvitationData>) => void;
  currentStep: number;
  onSetStep: (step: number) => void;
  onPreviewFull: () => void;
}

export const InvitationForm: React.FC<InvitationFormProps> = ({
  data,
  onChange,
  currentStep,
  onSetStep,
  onPreviewFull,
}) => {
  const audioInputRef = useRef<HTMLInputElement>(null);

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('audio/')) {
      alert("Iltimos, faqat audio fayl (MP3, WAV, M4A) yuklang.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const audioUrl = event.target?.result as string;
      if (audioUrl) {
        onChange({
          musicTrack: audioUrl,
          musicTitle: file.name.replace(/\.[^/.]+$/, ""),
        });
        royalAudioEngine.setCustomAudio(audioUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const stepsList = [
    { num: 1, label: "Dizayn" },
    { num: 2, label: "Rasmlar" },
    { num: 3, label: "Ismlar" },
    { num: 4, label: "Sana & Vaqt" },
    { num: 5, label: "To‘yxona" },
    { num: 6, label: "Matn & Til" },
    { num: 7, label: "Musiqa" },
    { num: 8, label: "Yakunlash" },
  ];

  return (
    <div className="w-full bg-white/80 backdrop-blur-md rounded-3xl border border-[#D4AF37]/30 p-5 sm:p-7 shadow-luxury-card">
      {/* Step Progress Tracker */}
      <div className="mb-6 overflow-x-auto pb-2 scrollbar-none">
        <div className="flex items-center justify-between min-w-[500px] sm:min-w-0">
          {stepsList.map((st) => {
            const isActive = currentStep === st.num;
            const isCompleted = currentStep > st.num;

            return (
              <button
                key={st.num}
                type="button"
                onClick={() => onSetStep(st.num)}
                className="flex flex-col items-center gap-1 group flex-1 cursor-pointer"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-cinzel text-xs font-bold transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#C5A047] to-[#B38728] text-white shadow-gold-glow scale-110'
                      : isCompleted
                      ? 'bg-[#EFE5D3] text-[#8C6D28] border border-[#D4AF37]'
                      : 'bg-stone-100 text-stone-400 border border-stone-200'
                  }`}
                >
                  {isCompleted ? <CheckCircle className="w-4 h-4 text-[#8C6D28]" /> : st.num}
                </div>
                <span
                  className={`text-[10px] sm:text-[11px] font-cinzel uppercase tracking-wider font-semibold whitespace-nowrap transition-colors ${
                    isActive ? 'text-[#8C6D28]' : 'text-stone-400 group-hover:text-stone-600'
                  }`}
                >
                  {st.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 1: DIZAYN TANLASH */}
      {currentStep === 1 && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <Palette className="w-5 h-5 text-[#C5A047]" />
            <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#2A2318]">
              1-qadam: Hashamatli dizaynni tanlang
            </h3>
          </div>
          <p className="text-xs sm:text-sm font-serif text-stone-600 mb-4">
            Har bir dizayn o‘ziga xos arxitektura, gullar, mum muhri va ranglar uyg‘unligiga ega.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {DESIGN_THEMES.map((theme) => {
              const isSelected = data.designId === theme.id;
              return (
                <div
                  key={theme.id}
                  onClick={() => onChange({ designId: theme.id })}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#C5A047] bg-[#FAF5EB] shadow-gold-glow scale-[1.02]'
                      : 'border-stone-200 bg-white hover:border-[#D4AF37]/50 hover:bg-[#FAF8F5]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="w-4 h-4 rounded-full border border-black/20 shadow-sm"
                        style={{ backgroundColor: theme.previewColor }}
                      />
                      <span className="text-[9px] font-cinzel uppercase tracking-wider px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 font-semibold">
                        {theme.badge}
                      </span>
                    </div>
                    <h4 className="font-cinzel text-sm font-bold text-[#2B2318]">
                      {theme.nameUz}
                    </h4>
                    <p className="text-[11px] font-serif text-stone-500 mt-1 line-clamp-2">
                      {theme.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-stone-200/60 flex items-center justify-between">
                    <span className="text-[10px] font-cinzel tracking-wider text-[#8C6D28]">
                      {isSelected ? "Tanlangan ✓" : "Tanlash"}
                    </span>
                    {isSelected && <CheckCircle className="w-4 h-4 text-[#C5A047]" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 2: RASMLARNI YUKLASH */}
      {currentStep === 2 && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <Upload className="w-5 h-5 text-[#C5A047]" />
            <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#2A2318]">
              2-qadam: Kelin va kuyov rasmlarini yuklang
            </h3>
          </div>
          <p className="text-xs sm:text-sm font-serif text-stone-600 mb-4">
            Kompyuter yoki telefon xotirasidan haqiqiy rasmlarni yuklang. Rasmlar buzilmasdan, tanlangan ramka ichida nafis aks etadi.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <PhotoUploader
              label="Kelin rasmi"
              role="kelin"
              currentPhoto={data.bridePhoto}
              onPhotoChange={(url) => onChange({ bridePhoto: url })}
              onPhotoReset={() => onChange({ bridePhoto: DEFAULT_BRIDE_PHOTO })}
            />

            <PhotoUploader
              label="Kuyov rasmi"
              role="kuyov"
              currentPhoto={data.groomPhoto}
              onPhotoChange={(url) => onChange({ groomPhoto: url })}
              onPhotoReset={() => onChange({ groomPhoto: DEFAULT_GROOM_PHOTO })}
            />
          </div>
        </div>
      )}

      {/* STEP 3: ISMLAR */}
      {currentStep === 3 && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-5 h-5 text-[#C5A047]" />
            <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#2A2318]">
              3-qadam: Kelin va kuyov ismlari
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-cinzel font-semibold uppercase tracking-wider text-[#8C6D28] mb-1.5">
                Kelin ismi *
              </label>
              <input
                type="text"
                required
                value={data.brideName}
                onChange={(e) => onChange({ brideName: e.target.value })}
                placeholder="Masalan: Madina"
                className="w-full px-4 py-2.5 rounded-xl border border-[#D4AF37]/50 bg-white text-stone-900 font-serif text-sm focus:ring-2 focus:ring-[#C5A047] outline-none shadow-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-cinzel font-semibold uppercase tracking-wider text-[#8C6D28] mb-1.5">
                Kuyov ismi *
              </label>
              <input
                type="text"
                required
                value={data.groomName}
                onChange={(e) => onChange({ groomName: e.target.value })}
                placeholder="Masalan: Aziz"
                className="w-full px-4 py-2.5 rounded-xl border border-[#D4AF37]/50 bg-white text-stone-900 font-serif text-sm focus:ring-2 focus:ring-[#C5A047] outline-none shadow-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-cinzel font-semibold uppercase tracking-wider text-[#8C6D28] mb-1.5">
              Ota-onalar ismlari (ixtiyoriy)
            </label>
            <input
              type="text"
              value={data.parentsNames || ''}
              onChange={(e) => onChange({ parentsNames: e.target.value })}
              placeholder="Masalan: Karimovlar va Rahimovlar xonadonlari"
              className="w-full px-4 py-2.5 rounded-xl border border-[#D4AF37]/50 bg-white text-stone-900 font-serif text-sm focus:ring-2 focus:ring-[#C5A047] outline-none shadow-sm"
            />
          </div>
        </div>
      )}

      {/* STEP 4: SANA VA VAQT */}
      {currentStep === 4 && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-[#C5A047]" />
            <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#2A2318]">
              4-qadam: To‘y sanasi va boshlanish vaqti
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-cinzel font-semibold uppercase tracking-wider text-[#8C6D28] mb-1.5">
                To‘y sanasi *
              </label>
              <div className="relative">
                <input
                  type="date"
                  required
                  value={data.weddingDate}
                  onChange={(e) => onChange({ weddingDate: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D4AF37]/50 bg-white text-stone-900 font-serif text-sm focus:ring-2 focus:ring-[#C5A047] outline-none shadow-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-cinzel font-semibold uppercase tracking-wider text-[#8C6D28] mb-1.5">
                Boshlanish vaqti *
              </label>
              <div className="relative">
                <input
                  type="time"
                  required
                  value={data.weddingTime}
                  onChange={(e) => onChange({ weddingTime: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D4AF37]/50 bg-white text-stone-900 font-serif text-sm focus:ring-2 focus:ring-[#C5A047] outline-none shadow-sm"
                />
              </div>
            </div>
          </div>

          <p className="text-xs font-serif text-stone-500 mt-2">
            Ushbu sana asosida orqaga sanash hisoblagichi (kunlar, soatlar, daqiqalar) avtomatik ishlaydi.
          </p>
        </div>
      )}

      {/* STEP 5: TO'YXONA VA MANZIL */}
      {currentStep === 5 && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-5 h-5 text-[#C5A047]" />
            <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#2A2318]">
              5-qadam: To‘yxona va xarita manzili
            </h3>
          </div>

          <div>
            <label className="block text-xs font-cinzel font-semibold uppercase tracking-wider text-[#8C6D28] mb-1.5">
              To‘yxona (Restoran / Saroy) nomi *
            </label>
            <input
              type="text"
              required
              value={data.venueName}
              onChange={(e) => onChange({ venueName: e.target.value })}
              placeholder="Masalan: Zarafshon Saroyi"
              className="w-full px-4 py-2.5 rounded-xl border border-[#D4AF37]/50 bg-white text-stone-900 font-serif text-sm focus:ring-2 focus:ring-[#C5A047] outline-none shadow-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-cinzel font-semibold uppercase tracking-wider text-[#8C6D28] mb-1.5">
              To‘yxonaning to‘liq manzili *
            </label>
            <input
              type="text"
              required
              value={data.venueAddress}
              onChange={(e) => onChange({ venueAddress: e.target.value })}
              placeholder="Masalan: Toshkent shahri, Yunusobod tumani, Amir Temur ko‘chasi, 24-uy"
              className="w-full px-4 py-2.5 rounded-xl border border-[#D4AF37]/50 bg-white text-stone-900 font-serif text-sm focus:ring-2 focus:ring-[#C5A047] outline-none shadow-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-cinzel font-semibold uppercase tracking-wider text-[#8C6D28] mb-1.5">
              Google Maps havolasi (ixtiyoriy)
            </label>
            <input
              type="url"
              value={data.mapUrl}
              onChange={(e) => onChange({ mapUrl: e.target.value })}
              placeholder="https://maps.google.com/..."
              className="w-full px-4 py-2.5 rounded-xl border border-[#D4AF37]/50 bg-white text-stone-900 font-serif text-sm focus:ring-2 focus:ring-[#C5A047] outline-none shadow-sm"
            />
            <span className="text-[11px] font-serif text-stone-500 block mt-1">
              Agar havola kiritmasangiz, ilova to‘yxona nomi va manzili orqali Google Maps qidiruvini avtomatik ulaydi.
            </span>
          </div>
        </div>
      )}

      {/* STEP 6: MATN VA TIL */}
      {currentStep === 6 && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-5 h-5 text-[#C5A047]" />
            <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#2A2318]">
              6-qadam: Taklifnoma matni va tili
            </h3>
          </div>

          <div>
            <label className="block text-xs font-cinzel font-semibold uppercase tracking-wider text-[#8C6D28] mb-1.5">
              Taklifnoma tili
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => onChange({ language: 'uz' })}
                className={`px-4 py-2 rounded-xl border text-xs font-cinzel font-bold tracking-wider cursor-pointer transition-all ${
                  data.language === 'uz'
                    ? 'border-[#C5A047] bg-[#FAF5EB] text-[#8C6D28] shadow-sm'
                    : 'border-stone-200 bg-white text-stone-500'
                }`}
              >
                O‘zbekcha
              </button>

              <button
                type="button"
                onClick={() => onChange({ language: 'ru' })}
                className={`px-4 py-2 rounded-xl border text-xs font-cinzel font-bold tracking-wider cursor-pointer transition-all ${
                  data.language === 'ru'
                    ? 'border-[#C5A047] bg-[#FAF5EB] text-[#8C6D28] shadow-sm'
                    : 'border-stone-200 bg-white text-stone-500'
                }`}
              >
                Русский
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-cinzel font-semibold uppercase tracking-wider text-[#8C6D28] mb-1.5">
              Taklifnoma matni *
            </label>
            <textarea
              rows={5}
              required
              value={data.invitationText}
              onChange={(e) => onChange({ invitationText: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-[#D4AF37]/50 bg-white text-stone-900 font-serif text-sm leading-relaxed focus:ring-2 focus:ring-[#C5A047] outline-none shadow-sm"
            />
          </div>
        </div>
      )}

      {/* STEP 7: MUSIQA */}
      {currentStep === 7 && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <Music className="w-5 h-5 text-[#C5A047]" />
            <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#2A2318]">
              7-qadam: Fon musiqasini sozlash
            </h3>
          </div>
          <p className="text-xs sm:text-sm font-serif text-stone-600 mb-4">
            Taklifnoma ochilganda mehmonlar uchun mayin, romantik musiqa ohanglari yangraydi.
          </p>

          <div className="p-4 rounded-2xl border border-[#D4AF37]/40 bg-[#FAF7F2]">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-cinzel text-sm font-bold text-[#2A2318]">
                  {data.musicTitle || "Shohona vals va arfa ohanglari"}
                </h4>
                <p className="text-xs font-serif text-stone-500">
                  {data.musicTrack ? "O‘z audio faylingiz yuklandi" : "O‘rnatilgan mayin romantik kuylar"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => royalAudioEngine.toggle(data.musicTrack)}
                className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#C5A047] to-[#B38728] text-white text-xs font-cinzel font-bold uppercase tracking-wider shadow-sm hover:shadow-gold-glow cursor-pointer"
              >
                Tinglab ko‘rish
              </button>
            </div>

            <div className="mt-3 pt-3 border-t border-stone-200 flex items-center justify-between">
              <span className="text-xs font-serif text-stone-600">
                O‘z audio faylingizni yuklashni xohlaysizmi?
              </span>

              <input
                ref={audioInputRef}
                type="file"
                accept="audio/*"
                onChange={handleAudioUpload}
                className="hidden"
              />

              <button
                type="button"
                onClick={() => audioInputRef.current?.click()}
                className="text-xs font-cinzel text-[#8C6D28] underline hover:text-[#543E19] cursor-pointer"
              >
                Fayl tanlash (MP3)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 8: YAKUNLASH VA ULASHISH */}
      {currentStep === 8 && (
        <div className="space-y-4 animate-fade-in text-center py-4">
          <div className="w-16 h-16 rounded-full mx-auto mb-3 bg-gradient-to-tr from-[#C5A047] to-[#FDF2B5] flex items-center justify-center shadow-gold-glow">
            <Sparkles className="w-8 h-8 text-[#2E2312]" />
          </div>

          <h3 className="font-cinzel text-xl font-bold text-[#2A2318]">
            Taklifnomangiz tayyor!
          </h3>
          <p className="text-sm font-serif text-stone-600 max-w-md mx-auto">
            Barcha ma’lumotlar kiritildi. Endi siz taklifnomani to‘liq ekranda ko‘rishingiz, QR-kod yaratishingiz, rasm yoki PDF yuklab olishingiz hamda mehmonlarga havola yuborishingiz mumkin.
          </p>

          <button
            type="button"
            onClick={onPreviewFull}
            className="mt-4 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C5A047] via-[#DFBF6A] to-[#B38728] text-[#1E170A] font-cinzel font-bold text-sm tracking-widest uppercase shadow-gold-glow hover:scale-105 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <span>Taklifnomani ochish va ko‘rish</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Navigation Buttons: Previous / Next */}
      <div className="mt-8 pt-5 border-t border-stone-200 flex items-center justify-between">
        <button
          type="button"
          disabled={currentStep === 1}
          onClick={() => onSetStep(Math.max(1, currentStep - 1))}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-xs font-cinzel font-bold uppercase tracking-wider transition-all ${
            currentStep === 1
              ? 'border-stone-200 text-stone-300 cursor-not-allowed'
              : 'border-[#D4AF37]/60 text-[#8C6D28] hover:bg-[#FAF5EB] cursor-pointer'
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Orqaga</span>
        </button>

        {currentStep < 8 ? (
          <button
            type="button"
            onClick={() => onSetStep(Math.min(8, currentStep + 1))}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#C5A047] to-[#B38728] text-[#1E170A] text-xs font-cinzel font-bold uppercase tracking-wider shadow-md hover:shadow-gold-glow cursor-pointer transition-all"
          >
            <span>Davom etish</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onPreviewFull}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#C5A047] via-[#DFBF6A] to-[#B38728] text-[#1E170A] text-xs font-cinzel font-bold uppercase tracking-wider shadow-gold-glow cursor-pointer transition-all"
          >
            <span>Ko‘rish</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
