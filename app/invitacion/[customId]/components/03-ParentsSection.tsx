import Image from 'next/image';
import { weddingConfig } from '@/lib/wedding-config';

const { family } = weddingConfig;

export default function ParentsSection() {
  return (
    <section
      className="relative w-full overflow-hidden py-0 px-6 flex flex-col items-center"
      style={{ backgroundImage: 'url(/img/goods_section_bg.avif)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
    >
      {/* ── Decoración floral superior ── */}
      <div className="w-1/2 h-1/5 sm:h-52 pointer-events-none select-none">
        <Image
            src="/img/floral-top.avif"
            alt="Floral Top"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-full object-contain object-top-right relative z-10"
        />
      </div>


      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-14">

        {/* ══ NUESTROS PADRES ══ */}
        <div className="w-full flex flex-col items-center gap-8">
          <h2
            className="text-[42px] sm:text-[52px] leading-none text-center text-primary-700"
            style={{ fontFamily: 'var(--font-great-vibes)' }}
          >
            Nuestros Padres
          </h2>

          {/* Dos columnas */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-6">

            {/* Novia */}
            <div className="flex flex-col items-center gap-2">
              <p
                className="text-xs tracking-[0.2em] uppercase mb-1 text-primary-500"
                style={{ fontFamily: 'var(--font-cormorant)' }}
              >
                Novia
              </p>
              {family.parents.bride.map((name) => (
                <p
                  key={name}
                  className="text-lg text-center text-primary-700"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  {name}
                </p>
              ))}
            </div>

            {/* Novio */}
            <div className="flex flex-col items-center gap-2">
              <p
                className="text-xs tracking-[0.2em] uppercase mb-1 text-primary-500"
                style={{ fontFamily: 'var(--font-cormorant)' }}
              >
                Novio
              </p>
              {family.parents.groom.map((name) => (
                <p
                  key={name}
                  className="text-lg text-center text-primary-700"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  {name}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Divisor */}
        <div className="w-24 h-px bg-primary-500" style={{ opacity: 0.4 }} />

        {/* ══ NUESTROS PADRINOS ══ */}
        <div className="w-full flex flex-col items-center gap-8">
          <h2
            className="text-[42px] sm:text-[52px] leading-none text-center text-primary-700"
            style={{ fontFamily: 'var(--font-great-vibes)' }}
          >
            Nuestros Padrinos
          </h2>

          <div className="flex flex-col items-center gap-2">
            <p
              className="text-xs tracking-[0.2em] uppercase mb-1 text-primary-500"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              Padrinos
            </p>
            {family.godparents.general.map((name) => (
              <p
                key={name}
                className="text-lg text-center text-primary-700"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                {name}
              </p>
            ))}
          </div>
        </div>

      </div>

      {/* ── Decoración floral inferior ── */}
      <div className="w-1/2 h-1/5 sm:h-52 pointer-events-none select-none">
        <Image
            src="/img/blue-leaf.avif"
            alt="Floral Top"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-full object-contain object-bottom relative z-10 "
        />
      </div>
    </section>
  );
}
