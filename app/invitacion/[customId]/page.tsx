import connectToDatabase from '@/lib/mongodb';
import Guest from '@/models/Guest';
import Hero from './components/01-Hero';
import Countdown from './components/02-Countdown';
import EventLocations from './components/05-EventLocations';
import ParentsSection from './components/03-ParentsSection';
import Message from './components/04-Message';
import RSVPSection from './components/07-RSVPSection';
import DressCode from './components/06-DressCode';
import AudioPill from './components/08-AudioPill';

interface PageProps {
  params: Promise<{ customId: string }>;
  searchParams: Promise<{ token?: string }>;
}

export default async function InvitacionPage({ params, searchParams }: PageProps) {
  const { customId } = await params;
  const { token } = await searchParams;

  if (!token) {
    return <ErrorScreen message="Acceso denegado: falta el token de invitación." />;
  }

  await connectToDatabase();
  const guest = await Guest.findOne({ customId, token }).lean();

  if (!guest) {
    return (
      <ErrorScreen message="Invitación no encontrada o acceso denegado. Verifica el enlace que recibiste." />
    );
  }

  return (
    <main className="min-h-screen bg-[#dce4ec] flex flex-col items-center">

      {/* ── 01 HERO ── */}
      <section className="relative w-full flex flex-col items-center">
        <Hero 
          displayName={guest.displayName}
          passesAllowed={guest.passesAllowed}
        />

      </section>

      {/* ── 02 COUNTDOWN ── */}
      <Countdown />

      {/* ── 03 PARENTS & GODPARENTS ── */}
      <ParentsSection />

      {/* ── 04 MESSAGE ── */}
      <Message />

      {/* ── 05 EVENT LOCATIONS ── */}
      <EventLocations />

      {/* ── 06 DRESS CODE ── */}
      <DressCode />

      {/* ── 07 RSVP ── */}
      <RSVPSection
        customId={customId}
        token={token}
        passesAllowed={guest.passesAllowed}
        status={guest.status as 'pending' | 'confirmed' | 'declined'}
        passesConfirmed={guest.passesConfirmed}
      />

      <AudioPill />
  
    </main>
  );
}

/* ─────────────────────────────────────────
   Error screen
───────────────────────────────────────── */

function ErrorScreen({ message }: { message: string }) {
  return (
    <main className="min-h-screen bg-[#dce4ec] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-10 text-center">
        <p className="text-4xl mb-4">💔</p>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Algo salió mal</h2>
        <p className="text-gray-500 text-sm">{message}</p>
      </div>
    </main>
  );
}

