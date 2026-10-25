import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, VolumeX, ArrowUp, Globe, Music, MapPin } from 'lucide-react';
import { WeddingInvitationData } from '../../types';
import { GuestWishesSection } from '../common/GuestWishesSection';

interface MasterWeddingInvitationProps {
  data: WeddingInvitationData;
  onAdminClick?: () => void;
}

export const MasterWeddingInvitation: React.FC<MasterWeddingInvitationProps> = ({
  data,
  onAdminClick,
}) => {
  const [isGateOpen, setIsGateOpen] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [language, setLanguage] = useState<'uz' | 'ru' | 'en'>('uz');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  // Parse wedding date (Target: 2026-11-03)
  const dateObj = new Date(data.weddingDate || '2026-11-03');
  const year = isNaN(dateObj.getFullYear()) ? 2026 : dateObj.getFullYear();
  const monthIdx = isNaN(dateObj.getMonth()) ? 10 : dateObj.getMonth();
  const targetDay = isNaN(dateObj.getDate()) ? 3 : dateObj.getDate();

  // Translations
  const t = {
    uz: {
      groom: data.groomName || 'Alisher',
      bride: data.brideName || 'Shahnoza',
      monthNames: ['YANVAR', 'FEVRAL', 'MART', 'APREL', 'MAY', 'IYUN', 'IYUL', 'AVGUST', 'SENTABR', 'OKTYABR', 'NOYABR', 'DEKABR'],
      timePrefix: 'SOAT',
      weekdays: ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'],
      greetingTitle: data.greetingTitle || 'Hurmatli aziz mehmonimiz!',
      greetingBody: data.invitationText || `Sizni ${data.groomName || 'Alisher'} va ${data.brideName || 'Shahnoza'}ning nikoh to‘yi munosabati bilan quvonchli oqshomimizga taklif etamiz. Baxtli kunimizga sherik bo‘ling!`,
      parents: data.parentsNames || 'Buxoro xonadoni',
      locationTitle: 'To‘yxona lokatsiyasi',
      viewMap: 'Xaritada ko‘rish',
      countdownTitle: 'Baxtli kunimizga qoldi',
      days: 'KUN',
      hours: 'SOAT',
      minutes: 'DAQIQA',
      seconds: 'SONIYA',
      backToTop: 'Boshiga qaytish',
      footerNote: data.footerNote || '«Sizning tashrifingiz to‘yimizga cheksiz quvonch bag‘ishlaydi!»',
      openGate: 'Taklifnomani ochish',
      muteMusic: 'Musiqani o‘chirish',
      playMusic: 'Musiqani yoqish',
    },
    ru: {
      groom: data.groomName || 'Алишер',
      bride: data.brideName || 'Шахноза',
      monthNames: ['ЯНВАРЬ', 'ФЕВРАЛЬ', 'МАРТ', 'АПРЕЛЬ', 'МАЙ', 'ИЮНЬ', 'ИЮЛЬ', 'АВГУСТ', 'СЕНТЯБРЬ', 'ОКТЯБРЬ', 'НОЯБРЬ', 'ДЕКАБРЬ'],
      timePrefix: 'В',
      weekdays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      greetingTitle: data.greetingTitle || 'Дорогие и уважаемые гости!',
      greetingBody: data.invitationText || `Приглашаем вас разделить с нами радость торжественного события — дня бракосочетания ${data.groomName || 'Алишера'} и ${data.brideName || 'Шахнозы'}. Будем счастливы видеть вас на нашем празднике!`,
      parents: data.parentsNames ? 'Семья жениха и невесты' : '',
      locationTitle: 'Локация ресторана',
      viewMap: 'Посмотреть на карте',
      countdownTitle: 'До нашего счастливого дня осталось',
      days: 'ДНЕЙ',
      hours: 'ЧАСОВ',
      minutes: 'МИНУТ',
      seconds: 'СЕКУНД',
      backToTop: 'Вернуться в начало',
      footerNote: data.footerNote || '«Ваше присутствие сделает наш праздник незабываемым!»',
      openGate: 'Открыть приглашение',
      muteMusic: 'Выключить музыку',
      playMusic: 'Включить музыку',
    },
    en: {
      groom: data.groomName || 'Alisher',
      bride: data.brideName || 'Shahnoza',
      monthNames: ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'],
      timePrefix: 'AT',
      weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
      greetingTitle: data.greetingTitle || 'Dear Honored Guests!',
      greetingBody: data.invitationText || `We warmly invite you to celebrate the joyous wedding of ${data.groomName || 'Alisher'} and ${data.brideName || 'Shahnoza'}. We would be honored by your presence on our special day!`,
      parents: data.parentsNames ? 'The Family' : '',
      locationTitle: 'Wedding Venue Location',
      viewMap: 'View on Google Maps',
      countdownTitle: 'Countdown to our special day',
      days: 'DAYS',
      hours: 'HOURS',
      minutes: 'MINS',
      seconds: 'SECS',
      backToTop: 'Back to top',
      footerNote: data.footerNote || '«Your presence will make our wedding day truly memorable!»',
      openGate: 'Open Invitation',
      muteMusic: 'Mute music',
      playMusic: 'Play music',
    },
  }[language];

  const monthName = t.monthNames[monthIdx] || 'NOYABR';

  // Days in month
  const daysInMonth = new Date(year, monthIdx + 1, 0).getDate();
  const firstDay = new Date(year, monthIdx, 1).getDay();
  const startOffset = (firstDay + 6) % 7;

  const emptyCells = Array.from({ length: startOffset });
  const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Monogram initials: Alisher -> A, Shahnoza -> S
  const groomInitial = (data.groomName || 'Alisher').charAt(0).toUpperCase();
  const brideInitial = (data.brideName || 'Shahnoza').charAt(0).toUpperCase();

  // Photo & Music
  const couplePhoto = data.bridePhoto || data.groomPhoto || '/assets/couple-alisher-shaxnoza.jpg';
  const musicSrc = data.musicTrack || '/assets/choli-qushi.mp3';

  // Countdown State
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateCountdown = () => {
      const targetTimeStr = `${data.weddingDate || '2026-11-03'}T${data.weddingTime || '18:00'}:00`;
      const target = new Date(targetTimeStr).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, [data.weddingDate, data.weddingTime]);

  // Reveal observer
  useEffect(() => {
    if (!contentRef.current) return;
    const reveals = contentRef.current.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isGateOpen, language]);

  // Handle Door Click (Open Door + Play Music)
  const handleDoorClick = () => {
    if (isGateOpen) return;
    setIsGateOpen(true);

    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlayingMusic(true);
      }).catch((err) => {
        console.warn('Autoplay prevented:', err);
      });
    }

    try {
      confetti({
        particleCount: 85,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#FAF0CD', '#751628', '#FFFFFF', '#B76E79'],
      });
    } catch {
      // ignore
    }
  };

  // Toggle Music (Play / Mute)
  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (isPlayingMusic) {
      audioRef.current.pause();
      setIsPlayingMusic(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlayingMusic(true);
      }).catch((err) => {
        console.warn('Playback error:', err);
      });
    }
  };

  // Scroll Actions
  const scrollToGreeting = () => {
    contentRef.current?.querySelector('.text-scene--greeting')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="page">
      {/* Background Audio (Çalıkuşu theme by default) */}
      <audio
        ref={audioRef}
        src={musicSrc}
        loop
        preload="auto"
        onPlay={() => setIsPlayingMusic(true)}
        onPause={() => setIsPlayingMusic(false)}
      />

      {/* ================= INVITATION CARD COMPONENT (430px Mobile & Desktop Centered) ================= */}
      <section className="invitation relative" aria-label="Nikoh taklifnomasi">

        {/* ================= 1. PROMINENT FLOATING TOP CONTROLS (ALWAYS ANCHORED INSIDE THE CARD) ================= */}
        {/* Requirement: "musiqani ochirish belgisi bolsin rus ingliz tillariga ham otkazsa boladigan belgi bolsin" */}
        <header className="absolute top-3 inset-x-3 z-40 flex items-center justify-between pointer-events-none select-none">
          {/* Left: Language Selector */}
          <nav
            className="pointer-events-auto inline-flex items-center gap-1 bg-white/95 backdrop-blur-md border border-[#C89D35] rounded-full p-1 shadow-[0_4px_16px_rgba(0,0,0,0.22)]"
            aria-label="Tilni tanlash"
          >
            <Globe className="w-3.5 h-3.5 text-[#631722] ml-1.5" />
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setLanguage('uz'); }}
              className={`px-2 py-0.5 rounded-full text-[11px] font-cinzel font-bold transition-all cursor-pointer ${
                language === 'uz'
                  ? 'bg-[#631722] text-[#FAF0CD] shadow-sm'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              O‘z
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setLanguage('ru'); }}
              className={`px-2 py-0.5 rounded-full text-[11px] font-cinzel font-bold transition-all cursor-pointer ${
                language === 'ru'
                  ? 'bg-[#631722] text-[#FAF0CD] shadow-sm'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              Ру
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setLanguage('en'); }}
              className={`px-2 py-0.5 rounded-full text-[11px] font-cinzel font-bold transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-[#631722] text-[#FAF0CD] shadow-sm'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              En
            </button>
          </nav>

          {/* Right: UNMISTAKABLE MUSIC TOGGLE BUTTON WITH HIGH CONTRAST & CLEAR TEXT */}
          <button
            type="button"
            onClick={toggleMusic}
            className={`pointer-events-auto flex items-center gap-2 py-1.5 px-3 sm:px-4 rounded-full text-xs font-bold transition-all transform active:scale-95 shadow-[0_4px_18px_rgba(0,0,0,0.35)] cursor-pointer ${
              isPlayingMusic
                ? 'bg-gradient-to-r from-[#4A0713] via-[#631722] to-[#4A0713] text-[#FAF0CD] border-2 border-[#FFD700] ring-2 ring-[#FFD700]/50'
                : 'bg-stone-800 text-stone-200 border-2 border-stone-500'
            }`}
            title={isPlayingMusic ? t.muteMusic : t.playMusic}
            aria-label={isPlayingMusic ? t.muteMusic : t.playMusic}
          >
            {isPlayingMusic ? (
              <>
                <div
                  className="w-4 h-4 rounded-full bg-[#FFD700] text-[#4A0713] flex items-center justify-center animate-spin"
                  style={{ animationDuration: '3s' }}
                >
                  <Music className="w-2.5 h-2.5" />
                </div>
                <Volume2 className="w-4 h-4 text-[#FFD700] animate-pulse" />
                <span className="font-serif tracking-wide text-[11px] sm:text-xs text-[#FAF0CD]">
                  {t.muteMusic}
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-red-400" />
                <span className="font-serif tracking-wide text-[11px] sm:text-xs text-stone-200">
                  {t.playMusic}
                </span>
              </>
            )}
          </button>
        </header>

        {/* ================= 2. VISUAL LAYERS ================= */}
        <div className="invitation__visual" aria-hidden="true">
          {/* Base paper texture */}
          <img
            className="invitation__layer"
            src="/assets/background-C6pNkJtI.png"
            alt=""
          />
          {/* 360-degree rotating spiritual circle */}
          <img
            className="invitation__circle"
            src="/assets/background-sircle-transparent-DZPBmiv7.png"
            alt=""
          />
          {/* Arabic calligraphy watermark on right */}
          <img
            className="invitation__arabic"
            src="/assets/arabic-background-DBU534Xs.png"
            alt=""
          />
          {/* Deep burgundy corner flower clusters */}
          <img
            className="invitation__layer invitation__layer--flowers"
            src="/assets/background-red-transparent-iSRlZ9M0.png"
            alt=""
          />
        </div>

        {/* ================= 3. CONTENT SCENES (WITH ULTRA-HIGH CONTRAST) ================= */}
        <div className="invitation__content" ref={contentRef}>

          {/* SCENE 1: TOP HERO (Couple Names, Date Badge, Bouncing Down Arrow) */}
          <section className="text-scene text-scene--top pt-20 sm:pt-24 pb-8">
            <div className="reveal text-scene__heading w-full">
              {/* Couple Names Hero Box */}
              <div className="py-3 px-4 rounded-3xl bg-white/80 backdrop-blur-sm border border-[#C89D35]/40 shadow-sm max-w-[350px] mx-auto">
                <h1 className="royal-couple-hero">
                  <span className="block">{t.groom}</span>
                  <span className="royal-ampersand">&</span>
                  <span className="block">{t.bride}</span>
                </h1>
              </div>

              {/* Date & Time Badge */}
              <div className="royal-date-badge">
                <span className="royal-date-day">
                  {targetDay}-{monthName}
                </span>
                <span className="royal-date-time">
                  {data.weddingTime ? `${t.timePrefix} ${data.weddingTime}` : `${t.timePrefix} 18:00`}
                </span>
              </div>

              {/* Scroll cue down */}
              <button
                className="scroll-cue mt-8"
                type="button"
                onClick={scrollToGreeting}
                aria-label="Pastga tushish"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
            </div>
          </section>

          {/* SCENE 2: INVITATION GREETING MESSAGE */}
          <section className="text-scene text-scene--greeting py-12">
            <div className="reveal royal-card-box">
              <div className="text-[#C89D35] text-sm tracking-widest mb-1">❖ ✦ ❖</div>
              <h2 className="royal-heading text-2xl sm:text-3xl mb-3">
                {t.greetingTitle}
              </h2>
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#C89D35] to-transparent mx-auto mb-4" />
              <p className="royal-body-text">
                {t.greetingBody}
              </p>
              {t.parents && (
                <div className="mt-5 pt-3 border-t border-[#C89D35]/40">
                  <span className="block text-[#680C1A] font-serif font-bold text-lg tracking-wide">
                    {t.parents}
                  </span>
                </div>
              )}
              <div className="text-[#C89D35] text-sm tracking-widest mt-4">❖ ✦ ❖</div>
            </div>
          </section>

          {/* SCENE 3: SINGLE COUPLE PHOTO (User's real uploaded Bukhara portrait!) */}
          <section className="text-scene text-scene--photo py-10">
            <div className="reveal royal-card-box p-3 sm:p-4">
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#C89D35] shadow-lg">
                <img
                  src={couplePhoto}
                  alt={`${t.groom} & ${t.bride}`}
                  className="w-full object-cover max-h-[75vh]"
                />
              </div>
              <p className="mt-3 text-base sm:text-lg font-cinzel font-bold text-[#3D050E] tracking-wider">
                {t.groom} & {t.bride}
              </p>
            </div>
          </section>

          {/* SCENE 4: WEDDING MONTH CALENDAR WITH BURGUNDY HEART HIGHLIGHT */}
          <section className="text-scene text-scene--calendar py-10">
            <div className="reveal royal-card-box">
              <h3 className="royal-heading text-xl sm:text-2xl mb-4 tracking-wider">
                {monthName} {year}
              </h3>
              <div className="grid grid-cols-7 gap-1 text-xs font-bold uppercase text-[#7A1422] mb-3 pb-2 border-b border-[#C89D35]/30">
                {t.weekdays.map((day) => (
                  <span key={day} className="text-center">{day}</span>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1.5 text-sm sm:text-base font-bold text-[#1A110D]">
                {emptyCells.map((_, i) => (
                  <span key={`empty-${i}`} className="h-8"></span>
                ))}
                {monthDays.map((dayNum) => {
                  const isEvent = dayNum === targetDay;
                  return (
                    <div
                      key={dayNum}
                      className={`h-8 sm:h-9 flex items-center justify-center rounded-full relative transition-all ${
                        isEvent
                          ? 'bg-gradient-to-br from-[#7A1422] to-[#4A0713] text-white font-extrabold shadow-md ring-2 ring-[#FFD700]'
                          : 'text-[#1A110D] hover:bg-amber-100/60'
                      }`}
                    >
                      {isEvent && (
                        <span className="absolute -top-1 -right-0.5 text-[10px] text-[#FFD700] animate-ping">
                          ❤
                        </span>
                      )}
                      <span>{dayNum}</span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 pt-3 border-t border-[#C89D35]/30 text-xs font-bold text-[#7A1422] tracking-wider">
                ✦ 3-NOYABR TO‘Y KUNI ✦
              </div>
            </div>
          </section>

          {/* SCENE 5: VENUE LOCATION & GOOGLE MAPS ("Charag'on restorani, Qorako'l tumani") */}
          <section className="text-scene text-scene--location py-10">
            <div className="reveal royal-card-box">
              <h3 className="royal-heading text-2xl sm:text-3xl mb-2">
                {t.locationTitle}
              </h3>
              <img
                className="w-48 sm:w-56 h-auto mx-auto my-2 object-contain drop-shadow-md"
                src="/assets/lokatsiya-cutout-C5i7Qws-.png"
                alt="To‘yxona binosi"
              />
              <address className="not-italic text-xl sm:text-2xl font-serif font-bold text-[#3D050E] tracking-wide mt-2">
                {data.venueName || '"Charag‘on" restorani'}
              </address>
              <p className="royal-body-text text-sm sm:text-base mt-1 mb-5">
                {data.venueAddress || 'Buxoro viloyati, Qorako‘l tumani, Charag‘on restorani'}
              </p>
              <a
                className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-gradient-to-r from-[#631722] via-[#751628] to-[#631722] text-[#FAF0CD] border-2 border-[#D4AF37] font-cinzel font-bold text-sm sm:text-base shadow-lg hover:scale-105 active:scale-95 transition-all"
                href={
                  data.mapUrl ||
                  'https://www.google.com/maps/search/?api=1&query=Qorako%27l+tumani+Charag%27on+restarani'
                }
                target="_blank"
                rel="noreferrer"
              >
                <MapPin className="w-4 h-4 text-[#FFD700]" />
                <span>{t.viewMap}</span>
              </a>
            </div>
          </section>

          {/* SCENE 6: COUNTDOWN, WISHES, BACK TO TOP & FOOTER */}
          <section className="text-scene text-scene--extra py-10">
            <div className="reveal royal-card-box">
              <div className="text-2xl text-[#8C182E] mb-1">❤</div>
              <p className="text-xl sm:text-2xl font-cinzel font-bold text-[#3D050E] mb-1">
                {t.groom} & {t.bride}
              </p>
              <h2 className="royal-heading text-xl sm:text-2xl mb-5">
                {t.countdownTitle}
              </h2>

              {/* 4-Box Countdown Timer */}
              <div className="grid grid-cols-4 gap-2 mb-6">
                <div className="bg-white border-2 border-[#C89D35] rounded-xl p-2.5 shadow-sm">
                  <strong className="block text-2xl sm:text-3xl font-extrabold text-[#3D050E]">
                    {timeLeft.days}
                  </strong>
                  <span className="text-[10px] sm:text-xs font-bold text-[#7A1422] uppercase tracking-wider">
                    {t.days}
                  </span>
                </div>
                <div className="bg-white border-2 border-[#C89D35] rounded-xl p-2.5 shadow-sm">
                  <strong className="block text-2xl sm:text-3xl font-extrabold text-[#3D050E]">
                    {timeLeft.hours}
                  </strong>
                  <span className="text-[10px] sm:text-xs font-bold text-[#7A1422] uppercase tracking-wider">
                    {t.hours}
                  </span>
                </div>
                <div className="bg-white border-2 border-[#C89D35] rounded-xl p-2.5 shadow-sm">
                  <strong className="block text-2xl sm:text-3xl font-extrabold text-[#3D050E]">
                    {timeLeft.minutes}
                  </strong>
                  <span className="text-[10px] sm:text-xs font-bold text-[#7A1422] uppercase tracking-wider">
                    {t.minutes}
                  </span>
                </div>
                <div className="bg-white border-2 border-[#C89D35] rounded-xl p-2.5 shadow-sm">
                  <strong className="block text-2xl sm:text-3xl font-extrabold text-[#3D050E]">
                    {timeLeft.seconds}
                  </strong>
                  <span className="text-[10px] sm:text-xs font-bold text-[#7A1422] uppercase tracking-wider">
                    {t.seconds}
                  </span>
                </div>
              </div>

              {/* Guest Wishes Submission Form */}
              <div className="mt-6 text-left">
                <GuestWishesSection lang={language} />
              </div>

              {/* ================= BOSHIGA QAYTISH TUGMASI (Back to top) ================= */}
              <div className="mt-8 mb-4 text-center">
                <button
                  type="button"
                  onClick={scrollToTop}
                  className="inline-flex items-center gap-2 py-2.5 px-6 rounded-full bg-gradient-to-r from-[#4A0713] via-[#631722] to-[#4A0713] text-[#FAF0CD] border-2 border-[#D4AF37] shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer font-cinzel font-bold text-xs uppercase tracking-wider"
                  title={t.backToTop}
                >
                  <ArrowUp className="w-4 h-4 text-[#FFD700] animate-bounce" />
                  <span>{t.backToTop}</span>
                </button>
              </div>

              {/* Footer Note */}
              <div className="mt-5 pt-3 border-t border-[#C89D35]/30 text-center">
                <p className="text-xs sm:text-sm text-stone-700 italic font-medium">
                  {t.footerNote}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* ================= 4. ARCHED DOUBLE GATE OVERLAY ================= */}
        <button
          className={`door ${isGateOpen ? 'door--open' : ''}`}
          type="button"
          onClick={handleDoorClick}
          aria-label={t.openGate}
        >
          {/* Floor shadow effect */}
          <span className="door__floor-shadow" aria-hidden="true" />

          {/* Left Door Panel: A (Alisher) */}
          <span className="door__panel door__panel--left">
            <img src="/assets/door-without-seal-Cf0oMNfE.webp" alt="" />
            <span className="door__monogram" aria-hidden="true">
              {groomInitial}
            </span>
          </span>

          {/* Right Door Panel: S (Shaxnoza) */}
          <span className="door__panel door__panel--right">
            <img src="/assets/door-without-seal-Cf0oMNfE.webp" alt="" />
            <span className="door__monogram" aria-hidden="true">
              {brideInitial}
            </span>
          </span>

          {/* Center Burgundy Wax Seal / Opener */}
          <img
            className="door__seal"
            src="/assets/door-opener-DJNfHF4K.webp"
            alt={t.openGate}
          />

          {/* Elegant Open Invitation Prompt Badge */}
          <div className="absolute top-[78%] left-1/2 -translate-x-1/2 z-30 pointer-events-none text-center">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#3D050E]/90 text-[#FAF0CD] border-2 border-[#D4AF37] shadow-2xl text-xs sm:text-sm font-cinzel font-bold tracking-wider uppercase animate-bounce">
              ✦ {t.openGate} ✦
            </span>
          </div>
        </button>
      </section>

      {/* ================= 5. TINY DISCREET ADMIN LINK AT BOTTOM (VISIBLE ON ENTRY) ================= */}
      {/* Explicit requirement: "kirgandan adminlikka kirish soralmasin kirganda pastda kichik qilib admin yozilgan bolsin osha joydan admin panelga kirilsin" */}
      {onAdminClick && (
        <div className="fixed bottom-1.5 inset-x-0 z-50 flex justify-center pointer-events-auto select-none">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onAdminClick();
            }}
            className="text-[10px] text-stone-500/70 hover:text-stone-300 transition-colors cursor-pointer tracking-widest lowercase py-1 px-3"
            title="Admin panelga kirish"
          >
            admin
          </button>
        </div>
      )}
    </main>
  );
};
