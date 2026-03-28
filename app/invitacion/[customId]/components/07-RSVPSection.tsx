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
  const [currentStatus, setCurrentStatus] = useState<'pending' | 'confirmed' | 'declined'>(status);
  const [currentPassesConfirmed, setCurrentPassesConfirmed] = useState<number>(passesConfirmed);
  const [isEditing, setIsEditing] = useState(false);
  const [formState, setFormState] = useState<FormState>('idle');
  const [message, setMessage] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleDecisionSubmit = (selectedDecision: 'confirmed' | 'declined') => {
    setDecision(selectedDecision);
    setMessage('');
    setFormState('idle');

    startTransition(async () => {
      const result = await submitRSVP(
        customId,
        token,
        selectedDecision,
        selectedDecision === 'confirmed' ? passesAllowed : 0
      );

      if (result.success) {
        setCurrentStatus(selectedDecision);
        setCurrentPassesConfirmed(selectedDecision === 'confirmed' ? passesAllowed : 0);
        setIsEditing(false);
        setFormState('idle');
        setMessage(result.message);
      } else {
        setFormState('error');
        setMessage(result.error);
      }
    });
  };

  const handleBackToForm = () => {
    setIsEditing(true);
    setDecision(null);
    setFormState('idle');
    setMessage('');
  };

  if (currentStatus !== 'pending' && !isEditing) {
    const isConfirmed = currentStatus === 'confirmed';
    return (
      <section className="w-full px-6 pt-8 pb-16 flex items-center justify-center">
        <div
          className={`max-w-sm rounded-xl p-5 text-center ${isConfirmed ? 'bg-primary-50 text-primary-700' : 'bg-red-50 text-red-600'
            }`}
        >
          <p className="font-semibold text-lg">
            {isConfirmed
              ? `¡Confirmado! Te esperamos con ${currentPassesConfirmed} pase${currentPassesConfirmed !== 1 ? 's' : ''}.`
              : 'Lamentamos que no puedas acompañarnos.'}
          </p>
          <p className="text-sm mt-1 opacity-70">Tu respuesta ya fue registrada.</p>
          <button
            type="button"
            onClick={handleBackToForm}
            className={`mt-4 inline-flex items-center justify-center rounded-lg border px-4 py-2 text-sm font-medium transition
              ${isConfirmed
                ? 'border-primary-300 text-primary-700 hover:bg-primary-100'
                : 'border-red-300 text-red-700 hover:bg-red-100'
              }`}
          >
            Volver a contestar
          </button>
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
      <div className="max-w-sm mt-6 space-y-5 p-6 bg-white bg-opacity-80 backdrop-blur-sm rounded-xl shadow-md w-full relative z-10">
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
              onClick={() => handleDecisionSubmit('confirmed')}
              disabled={isPending}
              className={`rounded-xl border-2 py-3 px-4 text-sm font-medium transition-all focus:outline-none
                ${isPending ? 'opacity-50 cursor-not-allowed' : ''}
                ${decision === 'confirmed'
                  ? 'border-primary-600 bg-primary-600 text-white shadow-md'
                  : 'border-gray-200 text-gray-600 hover:border-primary-500 hover:text-primary-600'
                }`}
            >
              Sí, asistiré
            </button>
            <button
              type="button"
              onClick={() => handleDecisionSubmit('declined')}
              disabled={isPending}
              className={`rounded-xl border-2 py-3 px-4 text-sm font-medium transition-all focus:outline-none
                ${isPending ? 'opacity-50 cursor-not-allowed' : ''}
                ${decision === 'declined'
                  ? 'border-rose-500 bg-rose-500 text-white shadow-md'
                  : 'border-gray-200 text-gray-600 hover:border-rose-400 hover:text-rose-500'
                }`}
            >
              No podré ir
            </button>
          </div>
        </fieldset>

        <p className="text-sm text-gray-600 text-center">
          {isPending
            ? 'Enviando tu respuesta...'
            : decision === 'confirmed'
              ? `Tu invitación incluye ${passesAllowed} pase${passesAllowed !== 1 ? 's' : ''}.`
              : isEditing
                ? 'Vuelve a elegir una opción para actualizar tu respuesta.'
                : 'Elige una opción para enviar tu respuesta.'}
        </p>

        {formState === 'error' && (
          <p className="text-rose-500 text-sm text-center">{message}</p>
        )}
      </div>
    </section>
  );
}
