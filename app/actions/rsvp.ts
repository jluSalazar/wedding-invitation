'use server';

import connectToDatabase from '@/lib/mongodb';
import Guest from '@/models/Guest';

export type RSVPResult =
  | { success: true; message: string }
  | { success: false; error: string };

export async function submitRSVP(
  customId: string,
  token: string,
  decision: 'confirmed' | 'declined',
  passesConfirmed: number
): Promise<RSVPResult> {
  try {
    await connectToDatabase();

    const guest = await Guest.findOne({ customId });

    // Validate existence and token
    if (!guest || guest.token !== token) {
      return { success: false, error: 'Invitación no válida o token incorrecto.' };
    }

    // Prevent double submissions
    if (guest.status !== 'pending') {
      return {
        success: false,
        error: 'Tu respuesta ya fue registrada anteriormente.',
      };
    }

    // Validate passes
    if (decision === 'confirmed') {
      if (passesConfirmed < 1 || passesConfirmed > guest.passesAllowed) {
        return {
          success: false,
          error: `El número de pases debe estar entre 1 y ${guest.passesAllowed}.`,
        };
      }
    }

    guest.status = decision;
    guest.passesConfirmed = decision === 'confirmed' ? passesConfirmed : 0;
    await guest.save();

    return {
      success: true,
      message:
        decision === 'confirmed'
          ? `¡Confirmado! Te esperamos con ${passesConfirmed} pase${passesConfirmed > 1 ? 's' : ''}.`
          : 'Recibimos tu respuesta. Lamentamos que no puedas acompañarnos.',
    };
  } catch (err) {
    console.error('[submitRSVP] Error:', err);
    return { success: false, error: 'Ocurrió un error inesperado. Intenta de nuevo.' };
  }
}
