'use client';

import { useEffect, useState } from 'react';
import { weddingConfig } from '@/lib/wedding-config';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const target = new Date(`${weddingConfig.event.date}T${weddingConfig.event.time}:00`).getTime();
  const now = Date.now();
  const diff = Math.max(0, target - now);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft());
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { label: 'Días', value: timeLeft?.days },
    { label: 'Horas', value: timeLeft?.hours },
    { label: 'Minutos', value: timeLeft?.minutes },
    { label: 'Segundos', value: timeLeft?.seconds },
  ];

  return (
    <section
      className="relative w-full flex flex-col items-center justify-end overflow-hidden"
      style={{
        minHeight: '70vh',
        backgroundImage: 'url(/img/6.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center 60%',
      }}
    >
      {/* Gradiente inferior para legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#2a3d50]/80 via-transparent to-transparent" />

      {/* Contador */}
      <div className="relative z-10 w-full px-6 pb-10 pt-20 flex flex-col items-center gap-2">
        <h3
          className="text-[44px] leading-none text-primary-50 text-center"
          style={{ fontFamily: 'var(--font-great-vibes)', WebkitTextStroke: '0.25px black', WebkitTextFillColor: 'white' }}
        >
          Faltan
        </h3>

        <div className="flex gap-3 sm:gap-6">
          {units.map(({ label, value }) => (
            <div key={label} className="flex flex-col items-center">
              <span
                className="text-white text-[40px] sm:text-[52px] leading-none font-medium tabular-nums"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                {timeLeft === null ? '--' : pad(value!)}
              </span>
              <span
                className="text-white/70 text-[10px] tracking-widest uppercase mt-1"
                style={{ fontFamily: 'var(--font-cormorant)' }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        <p
          className="text-primary-50 text-s tracking-[0.2em] uppercase mt-1"
          style={{ fontFamily: 'var(--font-cormorant)' }}
        >
          {weddingConfig.event.displayDate} &bull; {weddingConfig.event.timeDisplay}
        </p>
      </div>
    </section>
  );
}
