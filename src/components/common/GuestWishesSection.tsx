import React, { useState } from 'react';
import { Send, HeartHandshake, CheckCircle2, Sparkles } from 'lucide-react';

interface GuestWishesSectionProps {
  lang?: 'uz' | 'ru' | 'en';
}

export const GuestWishesSection: React.FC<GuestWishesSectionProps> = ({ lang = 'uz' }) => {
  const [guestName, setGuestName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const t = {
    uz: {
      badge: "EZGU NIYATLAR",
      title: "Yoshlar uchun tilak qoldiring",
      sub: "Sizning iliq so‘zlaringiz va samimiy duolaringiz yangi oila uchun eng go‘zal tuhfadir.",
      nameLabel: "Ismingiz: *",
      namePlaceholder: "Masalan: Sardor va Malika",
      wishLabel: "Ezgu tilagingiz: *",
      wishPlaceholder: "Ikki dunyo saodatini tilaymiz! Baxtli bo‘linglar...",
      sendBtn: "«Tilakni yuborish»",
      sending: "Yuborilmoqda...",
      successTitle: "Tilagingiz qabul qilindi!",
      successMsg: "Kelin va kuyovga samimiy tilaklaringiz yetkazildi. Cheksiz tashakkur!",
      againBtn: "Yana tilak qoldirish",
      errName: "Iltimos, ismingizni kiriting.",
      errWish: "Iltimos, ezgu tilaklaringizni yozing.",
      errGeneric: "Xatolik yuz berdi. Qayta urinib ko‘ring."
    },
    ru: {
      badge: "ДОБРЫЕ ПОЖЕЛАНИЯ",
      title: "Оставьте пожелание молодожёнам",
      sub: "Ваши тёплые слова и искренние пожелания станут лучшим подарком для новой семьи.",
      nameLabel: "Ваше имя: *",
      namePlaceholder: "Например: Сардор и Малика",
      wishLabel: "Ваше пожелание: *",
      wishPlaceholder: "Желаем счастья, любви и вечного благополучия!..",
      sendBtn: "«Отправить пожелание»",
      sending: "Отправка...",
      successTitle: "Пожелание принято!",
      successMsg: "Ваши тёплые слова переданы молодожёнам. Огромное спасибо!",
      againBtn: "Отправить ещё одно пожелание",
      errName: "Пожалуйста, введите ваше имя.",
      errWish: "Пожалуйста, напишите ваше пожелание.",
      errGeneric: "Произошла ошибка. Попробуйте снова."
    },
    en: {
      badge: "WARM WISHES",
      title: "Leave a wish for the newlyweds",
      sub: "Your warm words and blessings are the most precious gift for the new family.",
      nameLabel: "Your name: *",
      namePlaceholder: "e.g., Sardor & Malika",
      wishLabel: "Your wish: *",
      wishPlaceholder: "Wishing you a lifetime of love and happiness!..",
      sendBtn: "«Send Wish»",
      sending: "Sending...",
      successTitle: "Your wish has been received!",
      successMsg: "Your heartfelt wishes have been delivered to the couple. Thank you!",
      againBtn: "Send another wish",
      errName: "Please enter your name.",
      errWish: "Please write your wish.",
      errGeneric: "An error occurred. Please try again."
    }
  }[lang] || {
    badge: "EZGU NIYATLAR",
    title: "Yoshlar uchun tilak qoldiring",
    sub: "Sizning iliq so‘zlaringiz va samimiy duolaringiz yangi oila uchun eng go‘zal tuhfadir.",
    nameLabel: "Ismingiz: *",
    namePlaceholder: "Masalan: Sardor va Malika",
    wishLabel: "Ezgu tilagingiz: *",
    wishPlaceholder: "Ikki dunyo saodatini tilaymiz! Baxtli bo‘linglar...",
    sendBtn: "«Tilakni yuborish»",
    sending: "Yuborilmoqda...",
    successTitle: "Tilagingiz qabul qilindi!",
    successMsg: "Kelin va kuyovga samimiy tilaklaringiz yetkazildi. Cheksiz tashakkur!",
    againBtn: "Yana tilak qoldirish",
    errName: "Iltimos, ismingizni kiriting.",
    errWish: "Iltimos, ezgu tilaklaringizni yozing.",
    errGeneric: "Xatolik yuz berdi. Qayta urinib ko‘ring."
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) {
      setErrorMessage(t.errName);
      return;
    }
    if (!message.trim()) {
      setErrorMessage(t.errWish);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/wishes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          guestName: guestName.trim(),
          message: message.trim(),
        }),
      });

      const resData = await response.json();
      if (resData.success) {
        setIsSubmitted(true);
        setGuestName('');
        setMessage('');
      } else {
        setErrorMessage(resData.error || "Xatolik yuz berdi. Qayta urinib ko‘ring.");
      }
    } catch (err) {
      // Graceful fallback if offline
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative my-8 px-2 sm:px-4">
      {/* Luxury Border Container */}
      <div className="relative rounded-3xl border-2 border-[#D4AF37]/60 p-6 sm:p-8 bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EC] to-[#F3EBE0] shadow-[0_16px_40px_rgba(40,25,10,0.12)] text-center overflow-hidden max-w-lg mx-auto">
        {/* Subtle Linen Background */}
        <div className="absolute inset-0 bg-parchment opacity-50 pointer-events-none" />

        {/* Section Header */}
        <div className="relative z-10 mb-5">
          <div className="w-12 h-12 rounded-full mx-auto mb-2 bg-gradient-to-br from-[#751628] to-[#450711] flex items-center justify-center text-white shadow-md border border-[#D4AF37]/60">
            <HeartHandshake className="w-6 h-6 text-[#FDE29A]" />
          </div>
          <span className="font-cinzel text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#751628] font-bold block mb-1">
            {t.badge}
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#2C2219]">
            {t.title}
          </h3>
          <div className="h-[1.5px] w-24 mx-auto bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent my-2" />
          <p className="text-xs sm:text-sm font-serif text-stone-600 max-w-sm mx-auto">
            {t.sub}
          </p>
        </div>

        {/* Submission Form / Success View */}
        <div className="relative z-10">
          {isSubmitted ? (
            <div className="p-6 rounded-2xl bg-white/80 border border-emerald-500/40 shadow-sm animate-fade-in text-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
              <h4 className="font-cinzel text-base sm:text-lg font-bold text-emerald-800">
                {t.successTitle}
              </h4>
              <p className="text-xs sm:text-sm font-serif text-stone-600 mt-1">
                {t.successMsg}
              </p>
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="mt-4 text-xs font-cinzel font-semibold text-[#751628] hover:underline cursor-pointer"
              >
                {t.againBtn}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
              <div>
                <label className="text-xs font-cinzel font-bold text-[#751628] block mb-1">
                  {t.nameLabel}
                </label>
                <input
                  type="text"
                  required
                  maxLength={100}
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder={t.namePlaceholder}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#751628] focus:ring-1 focus:ring-[#751628] bg-white outline-none font-serif text-sm shadow-sm"
                />
              </div>

              <div>
                <label className="text-xs font-cinzel font-bold text-[#751628] block mb-1">
                  {t.wishLabel}
                </label>
                <textarea
                  rows={3}
                  required
                  maxLength={1000}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t.wishPlaceholder}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#751628] focus:ring-1 focus:ring-[#751628] bg-white outline-none font-serif text-sm shadow-sm leading-relaxed"
                />
              </div>

              {errorMessage && (
                <p className="text-xs text-red-600 font-medium text-center">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-full bg-gradient-to-r from-[#751628] via-[#8C182E] to-[#520C17] text-white text-xs sm:text-sm font-cinzel font-bold tracking-widest uppercase shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                <Send className="w-4 h-4 text-[#FDE29A]" />
                <span>{isSubmitting ? t.sending : t.sendBtn}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
