import React, { useState, useEffect, useRef } from 'react'
import { Volume2, VolumeX, Music } from 'lucide-react'
import songUrl from '../static/song.mp3'
import { useLanguage } from '../context/LanguageContext'

export default function AudioPlayer({ autoStart = false }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const audioRef = useRef(null)
  const { lang } = useLanguage ? useLanguage() : { lang: 'en' }

  // Initialize audio element with fallback paths
  useEffect(() => {
    const audio = new Audio()
    // Prefer Vite-bundled URL with fallback to public static path
    audio.src = songUrl || '/static/song.mp3'
    audio.loop = true
    audio.volume = 0.6
    audio.preload = 'auto'

    const handleCanPlay = () => setIsLoaded(true)
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleError = () => {
      // Fallback to static path if bundle URL fails
      if (audio.src !== window.location.origin + '/static/song.mp3') {
        audio.src = '/static/song.mp3'
        audio.load()
      }
    }

    audio.addEventListener('canplaythrough', handleCanPlay)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('error', handleError)

    audioRef.current = audio

    if (autoStart) {
      // Attempt autoplay (usually permitted immediately after a user click like unsealing)
      const playPromise = audio.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.log("Autoplay waiting for user gesture:", err)
            setIsPlaying(false)
          })
      }
    }

    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlay)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('error', handleError)
      audio.pause()
      audio.currentTime = 0
    }
  }, [autoStart])

  const toggleMusic = (e) => {
    if (e) e.stopPropagation()
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Audio playback failed:", err)
        })
    }
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 sm:gap-3 select-none">
      {/* Sound wave badge indicator */}
      {isPlaying && (
        <div 
          onClick={toggleMusic}
          className="hidden sm:flex items-center gap-1.5 bg-[#2A0713]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-amber-400/50 text-amber-200 text-xs shadow-xl cursor-pointer hover:bg-[#380918] transition-all"
        >
          <Music className="w-3.5 h-3.5 animate-pulse text-amber-300" />
          <span className="font-serif italic tracking-wide">
            {lang === 'hi' ? "विवाह धुन" : "Wedding Music"}
          </span>
          <div className="flex items-center gap-0.5 ml-1.5 h-3">
            <span className="w-0.5 h-full bg-amber-300 animate-[pulse_0.8s_ease-in-out_infinite]" />
            <span className="w-0.5 h-2 bg-amber-200 animate-[pulse_1.2s_ease-in-out_infinite]" />
            <span className="w-0.5 h-3.5 bg-yellow-300 animate-[pulse_0.6s_ease-in-out_infinite]" />
            <span className="w-0.5 h-2 bg-amber-300 animate-[pulse_1.0s_ease-in-out_infinite]" />
          </div>
        </div>
      )}

      {/* Floating Audio Button */}
      <button
        onClick={toggleMusic}
        aria-label={isPlaying ? "Mute Background Music" : "Play Wedding Music"}
        className={`group relative p-3 sm:p-3.5 rounded-full shadow-2xl transition-all duration-300 transform active:scale-95 cursor-pointer touch-manipulation ${
          isPlaying
            ? 'bg-gradient-to-tr from-[#7B1834] to-[#520B19] text-amber-100 ring-2 ring-[#D4AF37]/80 shadow-[0_4px_25px_rgba(212,175,55,0.4)]'
            : 'bg-[#1C020B]/95 text-amber-200/80 hover:text-white border border-[#D4AF37]/40 hover:border-[#D4AF37] shadow-[0_4px_20px_rgba(0,0,0,0.6)]'
        }`}
      >
        {/* Pulsing ring when playing */}
        {isPlaying && (
          <span className="absolute -inset-1 rounded-full bg-amber-400/25 animate-ping pointer-events-none" />
        )}

        {isPlaying ? (
          <Volume2 className="w-5 h-5 transition-transform group-hover:scale-110 text-amber-300" />
        ) : (
          <VolumeX className="w-5 h-5 transition-transform group-hover:scale-110 text-amber-200/80" />
        )}
      </button>
    </div>
  )
}
