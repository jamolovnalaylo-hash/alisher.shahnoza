import React, { useState } from 'react';
import { DESIGN_THEMES } from '../../data/sampleData';
import { InvitationDesignId } from '../../types';
import {
  Sparkles,
  Crown,
  Heart,
  Palette,
  ArrowRight,
  Music,
  MapPin,
  Clock,
  QrCode,
  Share2,
  CheckCircle2,
  Eye
} from 'lucide-react';
import { GoldCorner, RoyalDivider } from '../common/GoldFoilDecorations';

interface LandingPageProps {
  onStartCreating: (designId?: InvitationDesignId) => void;
  onPreviewDesign: (designId: InvitationDesignId) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartCreating,
  onPreviewDesign,
}) => {
  const [selectedGalleryDesign, setSelectedGalleryDesign] = useState<InvitationDesignId>('royal-gold');

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C241E] selection:bg-[#E5DAC6] selection:text-[#5C1220] overflow-x-hidden">
      {/* Top Luxury Studio Header */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#D4AF37]/30 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          {/* Logo & Studio Name */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full border border-[#D4AF37] bg-gradient-to-tr from-[#FFFDF9] to-[#F5EACB] flex items-center justify-center shadow-gold-glow">
              <Crown className="w-6 h-6 text-[#AA771C]" />
            </div>
            <div>
              <span className="font-cinzel text-lg sm:text-xl font-bold tracking-widest text-gold-foil block leading-none">
                ROYAL WEDDING
              </span>
              <span className="font-sans text-[9px] uppercase tracking-[0.35em] text-[#8C6D28] font-semibold">
                Studio & Atelier
              </span>
            </div>
          </div>

          {/* Nav Links & CTA */}
          <div className="flex items-center gap-4 sm:gap-6">
            <nav className="hidden md:flex items-center gap-6 font-cinzel text-xs font-semibold uppercase tracking-wider text-[#543E19]">
              <a href="#designs" className="hover:text-[#AA771C] transition-colors">
                Dizaynlar
              </a>
              <a href="#how-it-works" className="hover:text-[#AA771C] transition-colors">
                Qanday ishlaydi?
              </a>
              <a href="#features" className="hover:text-[#AA771C] transition-colors">
                Afzalliklar
              </a>
            </nav>

            <button
              onClick={() => onStartCreating()}
              className="px-5 sm:px-7 py-2.5 rounded-full bg-gradient-to-r from-[#C5A047] via-[#DFBF6A] to-[#B38728] text-[#1E170A] font-cinzel font-bold text-xs sm:text-sm tracking-wider uppercase shadow-gold-glow hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Taklifnoma yaratish</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 px-4 sm:px-6 overflow-hidden">
        {/* Subtle Decorative Arch Graphic in Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-[#D4AF37]/20 pointer-events-none animate-spin-very-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-[#D4AF37]/10 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/50 bg-white/70 backdrop-blur-sm mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#AA771C]" />
            <span className="font-cinzel text-xs tracking-widest text-[#8C6D28] uppercase font-semibold">
              Premium Elektron To‘y Taklifnomalari
            </span>
          </div>

          {/* Main Title */}
          <h1 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gold-foil leading-tight sm:leading-tight">
            Hashamatli to‘y taklifnomangizni yarating
          </h1>

          <p className="font-script text-3xl sm:text-4xl text-[#8C6D28] my-3">
            Madina & Aziz
          </p>

          <p className="font-serif text-base sm:text-xl text-stone-700 max-w-2xl mx-auto leading-relaxed mb-8">
            Nafis oltin jilo, ochiluvchi 3D mum muhrli konvert, jonli orqaga sanash va romantik musiqa bilan to‘yingiz taklifnomasini san’at asariga aylantiring.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onStartCreating()}
              className="w-full sm:w-auto px-9 py-4 rounded-full bg-gradient-to-r from-[#C5A047] via-[#DFBF6A] to-[#B38728] text-[#1E170A] font-cinzel font-bold text-sm tracking-widest uppercase shadow-gold-glow hover:scale-105 active:scale-95 transition-all cursor-pointer inline-flex items-center justify-center gap-2"
            >
              <span>Hozir yaratish</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#designs"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full border-2 border-[#D4AF37]/60 bg-white/70 text-[#543E19] font-cinzel font-semibold text-xs tracking-widest uppercase hover:bg-[#FAF5EB] transition-colors inline-flex items-center justify-center gap-2"
            >
              <span>Dizaynlar galereyasi</span>
            </a>
          </div>

          <RoyalDivider className="my-8 w-64" />
        </div>
      </section>

      {/* DESIGN GALLERY SECTION */}
      <section id="designs" className="py-16 md:py-24 px-4 sm:px-6 bg-[#F4ECE1]/60 border-y border-[#D4AF37]/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-cinzel text-xs font-bold uppercase tracking-[0.3em] text-[#8C6D28] block mb-2">
              KOLLEKSIYA
            </span>
            <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-[#2A2318]">
              Dizaynlar Galereyasi
            </h2>
            <p className="font-serif text-sm sm:text-base text-stone-600 mt-2">
              Har biri o‘zgacha falsafa, kompozitsiya va aristokratik jozibaga ega 6 ta hashamatli dizayn.
            </p>
          </div>

          {/* Grid of 6 Luxury Designs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {DESIGN_THEMES.map((theme, index) => (
              <div
                key={theme.id}
                className="group rounded-3xl border border-[#D4AF37]/40 bg-white overflow-hidden shadow-luxury-card hover:shadow-gold-glow transition-all duration-500 flex flex-col justify-between"
              >
                {/* Visual Card Header & Badge */}
                <div
                  className="relative p-6 h-48 flex flex-col justify-between overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${theme.envelopeColor} 0%, #FFFFFF 100%)`,
                  }}
                >
                  <div className="flex items-center justify-between z-10">
                    <span className="text-[10px] font-cinzel font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-[#D4AF37]/40 text-[#8C6D28]">
                      {theme.badge}
                    </span>
                    <span className="font-cinzel text-xs font-bold text-stone-400">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Center Monogram / Theme Preview */}
                  <div className="text-center z-10 my-auto">
                    <div className="w-14 h-14 rounded-full mx-auto border-2 border-[#D4AF37] flex items-center justify-center bg-white shadow-md">
                      <span className="font-pinyon text-2xl font-bold text-gold-foil">
                        M & A
                      </span>
                    </div>
                  </div>

                  {/* Corner Ornaments */}
                  <GoldCorner position="top-left" className="absolute top-1 left-1 w-10 h-10 opacity-40" />
                  <GoldCorner position="bottom-right" className="absolute bottom-1 right-1 w-10 h-10 opacity-40" />
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-cinzel text-lg font-bold text-[#2A2318] mb-1">
                      {theme.nameUz} ({theme.name})
                    </h3>
                    <p className="font-serif text-xs text-stone-600 leading-relaxed mb-4">
                      {theme.description}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-stone-100 flex items-center gap-3">
                    <button
                      onClick={() => onPreviewDesign(theme.id)}
                      className="flex-1 py-2.5 rounded-full border border-[#D4AF37]/60 text-xs font-cinzel font-semibold text-[#8C6D28] hover:bg-[#FAF5EB] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Katta ko‘rish</span>
                    </button>

                    <button
                      onClick={() => onStartCreating(theme.id)}
                      className="flex-1 py-2.5 rounded-full bg-gradient-to-r from-[#C5A047] to-[#B38728] text-white text-xs font-cinzel font-bold uppercase tracking-wider shadow-sm hover:shadow-gold-glow transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Tanlash</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-cinzel text-xs font-bold uppercase tracking-[0.3em] text-[#8C6D28] block mb-2">
              ODDIY VA TEZKOR
            </span>
            <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-[#2A2318]">
              Qanday ishlaydi?
            </h2>
            <p className="font-serif text-sm sm:text-base text-stone-600 mt-2">
              Hech qanday dasturlash bilimisiz, 3 daqiqa ichida mukammal taklifnomaga ega bo‘ling.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Dizaynni tanlang",
                desc: "6 ta hashamatli shohona dizayndan didingizga mosini tanlang.",
              },
              {
                step: "02",
                title: "Rasmlarni yuklang",
                desc: "Kelin va kuyovning haqiqiy rasmlarini telefoningizdan yuklang.",
              },
              {
                step: "03",
                title: "Ma’lumotlarni kiriting",
                desc: "Sana, vaqt, to‘yxona va shaxsiy taklif matnini kiriting.",
              },
              {
                step: "04",
                title: "Mehmonlarga ulashing",
                desc: "Tayyor havola yoki QR-kod orqali Telegram va WhatsApp orqali yuboring.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl border border-[#D4AF37]/30 bg-white/70 backdrop-blur-sm shadow-sm relative group hover:border-[#D4AF37] transition-all"
              >
                <span className="font-cinzel text-3xl font-bold text-gold-foil block mb-3">
                  {item.step}
                </span>
                <h3 className="font-cinzel text-base font-bold text-[#2A2318] mb-2">
                  {item.title}
                </h3>
                <p className="font-serif text-xs text-stone-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LUXURY FEATURES HIGHLIGHT */}
      <section id="features" className="py-16 md:py-24 px-4 sm:px-6 bg-[#F8F3EA] border-t border-[#D4AF37]/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-cinzel text-xs font-bold uppercase tracking-[0.3em] text-[#8C6D28] block mb-2">
              TEXNOLOGIYA VA MAHORAT
            </span>
            <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-[#2A2318]">
              Mehmonlaringizni lol qoldiradigan imkoniyatlar
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="p-6 rounded-3xl border border-[#D4AF37]/30 bg-white shadow-sm flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full mb-4 bg-[#FAF5EB] border border-[#D4AF37] flex items-center justify-center text-[#8C6D28]">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-cinzel text-base font-bold text-[#2A2318] mb-2">
                Ochiluvchi 3D Mum Muhrli Konvert
              </h3>
              <p className="font-serif text-xs text-stone-600 leading-relaxed">
                Mehmon havola ochganda, haqiqiy hashamatli konvertni muhridan bosib, oltin zarralar ostida tantanavor ochadi.
              </p>
            </div>

            <div className="p-6 rounded-3xl border border-[#D4AF37]/30 bg-white shadow-sm flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full mb-4 bg-[#FAF5EB] border border-[#D4AF37] flex items-center justify-center text-[#8C6D28]">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-cinzel text-base font-bold text-[#2A2318] mb-2">
                Jonli Orqaga Sanash Taymeri
              </h3>
              <p className="font-serif text-xs text-stone-600 leading-relaxed">
                To‘y kunigacha qolgan kunlar, soatlar va daqiqalar real vaqt rejimida dinamik hisoblab boriladi.
              </p>
            </div>

            <div className="p-6 rounded-3xl border border-[#D4AF37]/30 bg-white shadow-sm flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full mb-4 bg-[#FAF5EB] border border-[#D4AF37] flex items-center justify-center text-[#8C6D28]">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-cinzel text-base font-bold text-[#2A2318] mb-2">
                Bir Bosishda Xaritada Yo‘nalish
              </h3>
              <p className="font-serif text-xs text-stone-600 leading-relaxed">
                Mehmon to‘yxonani izlab sarson bo‘lmaydi. Google Maps tugmasi to‘g‘ridan-to‘g‘ri to‘yxonagacha yo‘nalish chizib beradi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-4 sm:px-6 bg-[#211D19] text-[#FAF7F2] border-t border-[#D4AF37]/40">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full border border-[#D4AF37] bg-white/10 flex items-center justify-center">
              <Crown className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <span className="font-cinzel text-base font-bold tracking-widest text-gold-foil block">
                ROYAL WEDDING STUDIO
              </span>
              <span className="text-[10px] uppercase tracking-widest text-stone-400">
                Hashamatli elektron to‘y taklifnomalari
              </span>
            </div>
          </div>

          <p className="text-xs font-serif text-stone-400">
            © 2026-2027 Royal Wedding Studio. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </footer>
    </div>
  );
};
