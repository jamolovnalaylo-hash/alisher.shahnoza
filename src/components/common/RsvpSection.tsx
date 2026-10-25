import React, { useState } from 'react';
import { Send, CheckCircle2, Users, HeartHandshake } from 'lucide-react';
import { RsvpEntry } from '../../types';

interface RsvpSectionProps {
  onAddRsvp: (entry: Omit<RsvpEntry, 'id' | 'submittedAt'>) => void;
  rsvpCount?: number;
  language?: 'uz' | 'ru';
  isDark?: boolean;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({
  onAddRsvp,
  rsvpCount = 0,
  language = 'uz',
  isDark = false,
}) => {
  const [guestName, setGuestName] = useState('');
  const [guestsCount, setGuestsCount] = useState(2);
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    onAddRsvp({
      guestName: guestName.trim(),
      guestsCount,
      phone: phone.trim(),
      message: message.trim(),
    });

    setIsSubmitted(true);
  };

  const t = {
    uz: {
      title: "Tashrifingizni tasdiqlang",
      subtitle: "Hurmatli mehmon, to‘yimizda sizni kutamiz. Iltimos, ishtirokingizni tasdiqlang.",
      nameLabel: "Ism va familiyangiz *",
      namePlaceholder: "Masalan: Alisher & Dilnoza",
      countLabel: "Necha kishi bo‘lib kelasiz?",
      phoneLabel: "Telefon raqamingiz (ixtiyoriy)",
      phonePlaceholder: "+998 90 ...",
      msgLabel: "Kelin va kuyovga ezgu tilaklaringiz",
      msgPlaceholder: "Baxt tilaymiz...",
      submitBtn: "Tashrifni tasdiqlash",
      successTitle: "Tashrifingiz qabul qilindi!",
      successDesc: "Sizni kutib qolamiz va bayramimizda birga bo‘lishingizdan xursandmiz!",
      confirmedGuests: "tasdiqlangan mehmonlar",
    },
    ru: {
      title: "Подтвердите присутствие",
      subtitle: "Дорогой гость, мы будем рады разделить этот праздник с вами. Пожалуйста, подтвердите визит.",
      nameLabel: "Ваше имя и фамилия *",
      namePlaceholder: "Например: Алишер и Дильноза",
      countLabel: "Количество гостей",
      phoneLabel: "Телефон (необязательно)",
      phonePlaceholder: "+998 90 ...",
      msgLabel: "Пожелания молодоженам",
      msgPlaceholder: "Счастья и любви...",
      submitBtn: "Подтвердить присутствие",
      successTitle: "Ваш ответ принят!",
      successDesc: "Мы будем очень рады видеть вас на нашем торжестве!",
      confirmedGuests: "подтвержденных гостей",
    },
  }[language];

  return (
    <div
      className={`my-8 p-6 md:p-8 rounded-2xl border ${
        isDark
          ? 'bg-gradient-to-b from-[#211E1B] to-[#141210] border-[#D4AF37]/30 text-stone-200'
          : 'bg-[#FFFDFB] border-[#D4AF37]/40 text-[#2D261C]'
      } shadow-lg max-w-lg mx-auto text-left`}
    >
      <div className="text-center mb-6">
        <div className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center bg-[#D4AF37]/15 text-[#C5A047]">
          <HeartHandshake className="w-5 h-5" />
        </div>
        <h3 className="font-cinzel text-lg md:text-xl font-bold tracking-wide text-gold-foil">
          {t.title}
        </h3>
        <p className="text-xs md:text-sm font-serif opacity-80 mt-1 max-w-sm mx-auto">
          {t.subtitle}
        </p>
      </div>

      {isSubmitted ? (
        <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center animate-fade-in">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
          <h4 className="font-cinzel text-base md:text-lg font-bold text-emerald-600 dark:text-emerald-400">
            {t.successTitle}
          </h4>
          <p className="text-xs md:text-sm font-serif mt-1 opacity-90">
            {t.successDesc}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-cinzel font-semibold uppercase tracking-wider mb-1 text-[#B38728]">
              {t.nameLabel}
            </label>
            <input
              type="text"
              required
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder={t.namePlaceholder}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-serif transition-colors outline-none focus:ring-2 focus:ring-[#D4AF37] ${
                isDark
                  ? 'bg-[#181614] border-stone-700 text-stone-100 placeholder-stone-500'
                  : 'bg-white border-[#E0D5C1] text-stone-900 placeholder-stone-400'
              }`}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-cinzel font-semibold uppercase tracking-wider mb-1 text-[#B38728]">
                {t.countLabel}
              </label>
              <select
                value={guestsCount}
                onChange={(e) => setGuestsCount(Number(e.target.value))}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-serif outline-none focus:ring-2 focus:ring-[#D4AF37] ${
                  isDark
                    ? 'bg-[#181614] border-stone-700 text-stone-100'
                    : 'bg-white border-[#E0D5C1] text-stone-900'
                }`}
              >
                <option value={1}>1 kishi</option>
                <option value={2}>2 kishi (Er-xotin / Hamroh)</option>
                <option value={3}>3 kishi (Oila bilan)</option>
                <option value={4}>4 kishi (Katta oila)</option>
                <option value={5}>5+ kishi</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-cinzel font-semibold uppercase tracking-wider mb-1 text-[#B38728]">
                {t.phoneLabel}
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t.phonePlaceholder}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-serif transition-colors outline-none focus:ring-2 focus:ring-[#D4AF37] ${
                  isDark
                    ? 'bg-[#181614] border-stone-700 text-stone-100 placeholder-stone-500'
                    : 'bg-white border-[#E0D5C1] text-stone-900 placeholder-stone-400'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-cinzel font-semibold uppercase tracking-wider mb-1 text-[#B38728]">
              {t.msgLabel}
            </label>
            <textarea
              rows={2}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t.msgPlaceholder}
              className={`w-full px-3.5 py-2 rounded-xl border text-sm font-serif transition-colors outline-none focus:ring-2 focus:ring-[#D4AF37] resize-none ${
                isDark
                  ? 'bg-[#181614] border-stone-700 text-stone-100 placeholder-stone-500'
                  : 'bg-white border-[#E0D5C1] text-stone-900 placeholder-stone-400'
              }`}
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-full bg-gradient-to-r from-[#C5A047] via-[#DFBF6A] to-[#B38728] text-[#1E170A] font-cinzel font-bold text-xs md:text-sm tracking-widest uppercase shadow-md hover:shadow-gold-glow hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>{t.submitBtn}</span>
          </button>
        </form>
      )}

      {rsvpCount > 0 && (
        <div className="mt-4 pt-4 border-t border-[#D4AF37]/20 flex items-center justify-center gap-1.5 text-xs text-[#B38728] font-cinzel">
          <Users className="w-3.5 h-3.5" />
          <span>{rsvpCount} {t.confirmedGuests}</span>
        </div>
      )}
    </div>
  );
};
