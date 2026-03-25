import { weddingConfig } from '@/lib/wedding-config';

export default function Message() {
    return (
        <section className="relative w-full overflow-hidden py-16 px-6 flex flex-col items-center bg-primary-400 text-white">
            {/* Comilla de apertura - Posicionada de forma absoluta para no romper el flujo */}
            <svg
                fill="currentColor"
                className="absolute top-8 left-8 w-24 h-24 opacity-10"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M9.563 8.469l-0.813-1.25c-5.625 3.781-8.75 8.375-8.75 12.156 0 3.656 2.688 5.375 4.969 5.375 2.875 0 4.906-2.438 4.906-5 0-2.156-1.375-4-3.219-4.688-0.531-0.188-1.031-0.344-1.031-1.25 0-1.156 0.844-2.875 3.938-5.344zM21.969 8.469l-0.813-1.25c-5.563 3.781-8.75 8.375-8.75 12.156 0 3.656 2.75 5.375 5.031 5.375 2.906 0 4.969-2.438 4.969-5 0-2.156-1.406-4-3.313-4.688-0.531-0.188-1-0.344-1-1.25 0-1.156 0.875-2.875 3.875-5.344z" />
            </svg>

            {/* Contenedor del texto */}
            <div className="z-10 max-w-3xl text-center space-y-6">
                <span className="block text-m md:text-xl font-serif italic leading-relaxed tracking-tight">
                    "Ahora que Dios nos permite realizar nuestro sueño de convertirnos en una sola persona, y ser los nuevos pilares de una familia, reafirmamos nuestro compromiso de amor, fidelidad y respeto ante Dios y la sociedad, uniendonos para toda la vida con la bendicion de Dios y nuestros padres"
                </span>

                {/* Línea decorativa opcional */}
                <div className="w-12 h-1 bg-white/30 mx-auto rounded-full" />
            </div>

            {/* Comilla de cierre */}
            <svg
                fill="currentColor"
                className="absolute bottom-8 right-8 w-24 h-24 opacity-10 rotate-180"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M9.563 8.469l-0.813-1.25c-5.625 3.781-8.75 8.375-8.75 12.156 0 3.656 2.688 5.375 4.969 5.375 2.875 0 4.906-2.438 4.906-5 0-2.156-1.375-4-3.219-4.688-0.531-0.188-1.031-0.344-1.031-1.25 0-1.156 0.844-2.875 3.938-5.344zM21.969 8.469l-0.813-1.25c-5.563 3.781-8.75 8.375-8.75 12.156 0 3.656 2.75 5.375 5.031 5.375 2.906 0 4.969-2.438 4.969-5 0-2.156-1.406-4-3.313-4.688-0.531-0.188-1-0.344-1-1.25 0-1.156 0.875-2.875 3.875-5.344z" />
            </svg>
        </section>
    )
}
