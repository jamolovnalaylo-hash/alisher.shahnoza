import React, { useState, useEffect } from 'react';
import { Clock, Sparkles } from 'lucide-react';

interface CountdownTimerProps {
  weddingDate: string; // YYYY-MM-DD
  weddingTime: string; // HH:mm
  language?: string;
  isDark?: boolean;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
  isToday: boolean;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  weddingDate,
  weddingTime,
  language = 'uz',
  isDark = false,
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
    isToday: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      if (!weddingDate) return;
      const targetTimeStr = `${weddingDate}T${weddingTime || '18:00'}:00`;
      const target = new Date(targetTimeStr).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (isNaN(target)) return;

      if (diff <= 0) {
        const diffAbs = Math.abs(diff);
        const isToday = diffAbs < 24 * 60 * 60 * 1000;
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPast: !isToday,
          isToday: isToday,
        });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isPast: false,
        isToday: false,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [weddingDate, weddingTime]);

  if (timeLeft.isPast) {
    return (
      <div className="my-6 p-4 rounded-2xl border-2 border-[#D4AF37]/50 bg-gradient-to-b from-[#FFFDF9] to-[#FAF3E6] text-center shadow-[0_8px_20px_rgba(184,134,11,0.15)]">
        <p className="font-cinzel text-sm sm:text-base font-semibold tracking-wider text-[#8C6D28]">
          ✨ Baxtli kunimiz boshlandi! Qadamingiz qutlug‘ bo‘lsin! ✨
        </p>
      </div>
    );
  }

  if (timeLeft.isToday) {
    return (
      <div className="my-6 p-4 rounded-2xl border-2 border-[#D4AF37] bg-[#FFF8EE] text-center shadow-lg animate-pulse">
        <p className="font-cinzel text-base sm:text-lg font-bold tracking-wider text-[#8C6D28]">
          🎉 Bugun bizning nikoh to‘yimiz! Xush kelibsiz! 🎉
        </p>
      </div>
    );
  }

  return (
    <div className="my-6 w-full max-w-lg mx-auto">
      {/* Title as requested: «Baxtli kunimizga qoldi» */}
      <div className="flex items-center justify-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-[#C5A047]" />
        <span className="text-xs sm:text-sm font-cinzel uppercase tracking-[0.25em] font-bold text-[#8C6D28]">
          «Baxtli kunimizga qoldi»
        </span>
        <Clock className="w-4 h-4 text-[#C5A047]" />
      </div>

      {/* Grid of 4 Timer Blocks: KUN | SOAT | DAQIQA | SONIYA */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
        {[
          { label: "KUN", value: timeLeft.days },
          { label: "SOAT", value: timeLeft.hours },
          { label: "DAQIQA", value: timeLeft.minutes },
          { label: "SONIYA", value: timeLeft.seconds },
        ].map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center py-3 px-1.5 rounded-2xl border-2 border-[#D4AF37]/50 bg-gradient-to-b from-white via-[#FCFBF7] to-[#F5ECE0] shadow-[0_6px_16px_rgba(184,134,11,0.12)] transition-all duration-300 hover:scale-105"
          >
            <span className="font-cinzel text-xl sm:text-3xl font-extrabold tracking-tight text-gold-foil">
              {String(item.value).padStart(2, '0')}
            </span>
            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent my-1" />
            <span className="text-[10px] sm:text-xs uppercase tracking-widest font-sans font-semibold text-[#8C6D28]">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
