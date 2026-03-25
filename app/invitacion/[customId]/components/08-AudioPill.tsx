'use client';

import { useEffect, useRef, useState } from 'react';

export default function AudioPill() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleEnded = () => setIsPlaying(false);

        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
            audio.removeEventListener('ended', handleEnded);
        };
    }, []);

    useEffect(() => {
        const pauseAudio = () => {
            const audio = audioRef.current;
            if (!audio || audio.paused) return;
            audio.pause();
        };

        const handleVisibility = () => {
            if (document.hidden) {
                pauseAudio();
            }
        };

        window.addEventListener('pagehide', pauseAudio);
        window.addEventListener('beforeunload', pauseAudio);
        document.addEventListener('visibilitychange', handleVisibility);

        return () => {
            window.removeEventListener('pagehide', pauseAudio);
            window.removeEventListener('beforeunload', pauseAudio);
            document.removeEventListener('visibilitychange', handleVisibility);
        };
    }, []);

    const togglePlayback = async () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (!audio.paused) {
            audio.pause();
            return;
        }

        try {
            await audio.play();
        } catch {
            setIsPlaying(false);
        }
    };

    return (
        <div className="fixed bottom-4 left-4 z-50 group">
            <audio ref={audioRef} src="/audio/song.webm" preload="metadata" />

            <div className="flex items-center rounded-full border border-primary-300 bg-white/90 backdrop-blur px-2 py-2 shadow-md">
                <button
                    type="button"
                    onClick={togglePlayback}
                    className="rounded-full border border-primary-300 p-2 text-primary-700 transition-colors hover:bg-primary-50"
                    aria-label={isPlaying ? 'Pausar musica' : 'Reproducir musica'}
                >
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 ${isPlaying ? 'animate-[spin_2.8s_linear_infinite]' : ''}`}
                    >
                        <path
                            d="M9 19C9 20.1046 7.65685 21 6 21C4.34315 21 3 20.1046 3 19C3 17.8954 4.34315 17 6 17C7.65685 17 9 17.8954 9 19ZM9 19V5L21 3V17M21 17C21 18.1046 19.6569 19 18 19C16.3431 19 15 18.1046 15 17C15 15.8954 16.3431 15 18 15C19.6569 15 21 15.8954 21 17ZM9 9L21 7"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>

                <div className="overflow-hidden max-w-0 opacity-0 transition-all duration-300 group-hover:max-w-36 group-hover:opacity-100 group-focus-within:max-w-36 group-focus-within:opacity-100">
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={volume}
                        onChange={(e) => setVolume(Number(e.target.value))}
                        className="w-28 accent-primary-600"
                        aria-label="Volumen de musica"
                    />
                </div>
            </div>
        </div>
    );
}
