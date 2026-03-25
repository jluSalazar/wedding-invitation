'use client';

import { useState, useTransition } from 'react';
import { submitRSVP } from '@/app/actions/rsvp';
import Image from 'next/image';

interface RSVPSectionProps {
  customId: string;
  token: string;
  passesAllowed: number;
  status: 'pending' | 'confirmed' | 'declined';
  passesConfirmed: number;
}

type FormState = 'idle' | 'success' | 'error';

export default function RSVPSection({
  customId,
  token,
  passesAllowed,
  status,
  passesConfirmed,
}: RSVPSectionProps) {
  const [decision, setDecision] = useState<'confirmed' | 'declined' | null>(null);
  const [passes, setPasses] = useState<number>(passesAllowed);
  const [formState, setFormState] = useState<FormState>('idle');
  const [message, setMessage] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!decision) {
      setMessage('Por favor selecciona una opción.');
      setFormState('error');
      return;
    }

    startTransition(async () => {
      const result = await submitRSVP(
        customId,
        token,
        decision,
        decision === 'confirmed' ? passes : 0
      );

      if (result.success) {
        setFormState('success');
        setMessage(result.message);
      } else {
        setFormState('error');
        setMessage(result.error);
      }
    });
  };

  if (status !== 'pending') {
    const isConfirmed = status === 'confirmed';
    return (
      <section className="w-full px-6 pt-8 pb-16">
        <div
          className={`max-w-sm rounded-xl p-5 text-center ${isConfirmed ? 'bg-primary-50 text-primary-700' : 'bg-red-50 text-red-600'
            }`}
        >
          <p className="font-semibold text-lg">
            {isConfirmed
              ? `¡Confirmado! Te esperamos con ${passesConfirmed} pase${passesConfirmed !== 1 ? 's' : ''}.`
              : 'Lamentamos que no puedas acompañarnos.'}
          </p>
          <p className="text-sm mt-1 opacity-70">Tu respuesta ya fue registrada.</p>
        </div>
      </section>
    );
  }

  if (formState === 'success') {
    return (
      <section className="w-full px-6 pt-8 pb-16">
        <div className="max-w-sm mt-6 bg-green-50 rounded-xl p-6 text-center text-green-700">
          <p className="text-3xl mb-2">🎉</p>
          <p className="font-semibold text-lg">{message}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full px-6 pb-16 flex flex-col items-center"
      style={{
        backgroundImage: 'url(/img/goods_section_bg.avif)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* ── Decoración floral superior ── */}
      <div className="max-w-sm w-1/2 h-1/5 pointer-events-none select-none">
        <Image
          src="/img/floral-top.avif"
          alt="Floral Top"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-full object-contain object-top-right relative z-10"
        />
      </div>
      <form onSubmit={handleSubmit} className="max-w-sm mt-6 space-y-5 p-6 bg-white bg-opacity-80 backdrop-blur-sm rounded-xl shadow-md w-full relative z-10">
        <fieldset>
          <h3
            className="text-[44px] leading-none text-primary-800 text-center mb-4"
            style={{ fontFamily: 'var(--font-great-vibes)' }}
          >
            Confirma tu asistencia
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setDecision('confirmed')}
              className={`rounded-xl border-2 py-3 px-4 text-sm font-medium transition-all focus:outline-none
                ${decision === 'confirmed'
                  ? 'border-primary-600 bg-primary-600 text-white shadow-md'
                  : 'border-gray-200 text-gray-600 hover:border-primary-500 hover:text-primary-600'
                }`}
            >
              Sí, asistiré
            </button>
            <button
              type="button"
              onClick={() => setDecision('declined')}
              className={`rounded-xl border-2 py-3 px-4 text-sm font-medium transition-all focus:outline-none
                ${decision === 'declined'
                  ? 'border-rose-500 bg-rose-500 text-white shadow-md'
                  : 'border-gray-200 text-gray-600 hover:border-rose-400 hover:text-rose-500'
                }`}
            >
              No podré ir
            </button>
          </div>
        </fieldset>

        {decision === 'confirmed' && (
          <div className="animate-fade-in flex flex-col items-center">
            <label
              htmlFor="passes"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              ¿Cuántos pases usarás?{' '}
              <span className="text-gray-400 font-normal">(máximo {passesAllowed})</span>
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setPasses((p) => Math.max(1, p - 1))}
                className="w-9 h-9 rounded-full bg-primary-50 text-primary-700 font-bold hover:bg-primary-100 transition"
                aria-label="Reducir pases"
              >
                -
              </button>
              <span className="text-xl font-semibold text-primary-600 w-8 text-center">
                {passes}
              </span>
              <button
                type="button"
                onClick={() => setPasses((p) => Math.min(passesAllowed, p + 1))}
                className="w-9 h-9 rounded-full bg-primary-50 text-primary-700 font-bold hover:bg-primary-100 transition"
                aria-label="Aumentar pases"
              >
                +
              </button>
            </div>
          </div>
        )}

        {formState === 'error' && (
          <p className="text-rose-500 text-sm text-center">{message}</p>
        )}

        <button
          type="submit"
          disabled={isPending || !decision}
          className="w-full py-3 px-6 rounded-xl bg-primary-600 text-white font-medium
            hover:bg-[#6a4e38] transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? 'Enviando...' : 'Confirmar mi respuesta'}
        </button>
      </form>
    </section>
  );
}
