"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function AudioPlayer() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.volume = 0.3; // Volumen suave de fondo

        // Intentar reproducir automáticamente
        const attemptPlay = async () => {
            try {
                await audio.play();
                setIsPlaying(true);
            } catch (error) {
                console.log("Autoplay bloqueado por el navegador. Se reproducirá al interactuar.");
            }
        };

        attemptPlay();

        // Si el autoplay falla, se empezará a reproducir en el primer click
        const playOnInteraction = () => {
            if (!isPlaying && audioRef.current) {
                audioRef.current.play().then(() => {
                    setIsPlaying(true);
                }).catch(() => { });
            }
            document.removeEventListener("click", playOnInteraction);
            document.removeEventListener("keydown", playOnInteraction);
        };

        document.addEventListener("click", playOnInteraction);
        document.addEventListener("keydown", playOnInteraction);

        return () => {
            document.removeEventListener("click", playOnInteraction);
            document.removeEventListener("keydown", playOnInteraction);
        };
    }, [isPlaying]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <>
            <audio ref={audioRef} src="/birthday/Imagine%20Dragons.mp3" loop />
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                onClick={togglePlay}
                className="fixed bottom-6 right-6 z-50 w-10 md:w-12 h-10 md:h-12 rounded-full bg-void/50 border border-accent-nebula/30 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white hover:border-accent-nebula/80 hover:bg-accent-nebula/20 transition-all hover:scale-110 shadow-[0_0_15px_rgba(167,139,250,0.1)] group"
            >
                <span className="material-symbols-rounded text-xl md:text-2xl transition-transform group-hover:scale-110">
                    {isPlaying ? "volume_up" : "volume_off"}
                </span>
            </motion.button>
        </>
    );
}
