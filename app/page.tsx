export default function Home() {
  return (
    <main className="min-h-screen bg-[#fdf6ee] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <p className="text-5xl mb-6">💍</p>
        <h1 className="text-4xl font-serif font-light text-[#7c5c42] mb-3">
          Bienvenido
        </h1>
        <p className="text-gray-500 text-sm">
          Esta página es privada. Accede a través del enlace personalizado que
          recibiste en tu invitación.
        </p>
        <p className="mt-6 text-xs text-gray-400 font-mono bg-white rounded-lg px-4 py-2 inline-block shadow-sm">
          /invitacion/[tu-id]?token=...
        </p>
      </div>
    </main>
  );
}