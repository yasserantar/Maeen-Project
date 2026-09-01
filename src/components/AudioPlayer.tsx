'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, SkipForward, SkipBack, Sparkles } from 'lucide-react';

export interface AudioPlayerVerse {
  id: number;
  verse_key: string;
  verse_number: number;
  audio_url?: string;
}

interface AudioPlayerProps {
  verses: AudioPlayerVerse[];
  title: string;
  isAr?: boolean;
  onActiveVerseChange?: (verseIndex: number | null) => void;
}

export function AudioPlayer({ verses, title, isAr = true, onActiveVerseChange }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Reset when verses list changes (page change)
  useEffect(() => {
    setIsPlaying(false);
    setCurrentVerseIndex(0);
    if (onActiveVerseChange) onActiveVerseChange(null);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [verses]);

  // When active verse changes during play
  useEffect(() => {
    if (onActiveVerseChange) {
      onActiveVerseChange(isPlaying ? currentVerseIndex : null);
    }
  }, [currentVerseIndex, isPlaying, onActiveVerseChange]);

  const currentVerse = verses[currentVerseIndex];
  const audioSrc = currentVerse?.audio_url || `https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3`;

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(e => console.warn('Audio playback error', e));
    }
  };

  const handleEnded = () => {
    if (currentVerseIndex < verses.length - 1) {
      const nextIndex = currentVerseIndex + 1;
      setCurrentVerseIndex(nextIndex);
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play().catch(e => console.warn('Next verse play error', e));
        }
      }, 200);
    } else {
      setIsPlaying(false);
      setCurrentVerseIndex(0);
    }
  };

  const handleNextVerse = () => {
    if (currentVerseIndex < verses.length - 1) {
      const nextIndex = currentVerseIndex + 1;
      setCurrentVerseIndex(nextIndex);
      if (isPlaying && audioRef.current) {
        setTimeout(() => audioRef.current?.play(), 100);
      }
    }
  };

  const handlePrevVerse = () => {
    if (currentVerseIndex > 0) {
      const prevIndex = currentVerseIndex - 1;
      setCurrentVerseIndex(prevIndex);
      if (isPlaying && audioRef.current) {
        setTimeout(() => audioRef.current?.play(), 100);
      }
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0A382C]/10 via-[#0F4C3A]/5 to-[#C9A227]/10 dark:from-[#0F4C3A]/20 dark:via-[#14211D] dark:to-[#C9A227]/15 p-4 border border-[#0F4C3A]/15 dark:border-[#C9A227]/20 shadow-xs backdrop-blur-md transition-all">
      <audio
        ref={audioRef}
        src={audioSrc}
        onEnded={handleEnded}
      />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Playback Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={isAr ? handleNextVerse : handlePrevVerse}
            disabled={currentVerseIndex <= 0}
            className="w-8 h-8 rounded-xl bg-white dark:bg-gray-800 disabled:opacity-25 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center transition-all shadow-2xs border border-gray-200/60 dark:border-gray-700"
            title={isAr ? 'الآية السابقة' : 'Previous Verse'}
          >
            <SkipBack className="w-4 h-4 text-gray-700 dark:text-gray-200" />
          </button>

          <button
            onClick={togglePlay}
            className="w-12 h-12 rounded-2xl bg-[#0A382C] hover:bg-[#0F4C3A] text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md shrink-0 border border-[#C9A227]/30"
            title={isPlaying ? (isAr ? 'إيقاف مؤقت' : 'Pause') : (isAr ? 'تشغيل تلاوة الصفحة' : 'Play Page Recitation')}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-white" />
            ) : (
              <Play className="w-5 h-5 fill-white ml-0.5" />
            )}
          </button>

          <button
            onClick={isAr ? handlePrevVerse : handleNextVerse}
            disabled={currentVerseIndex >= verses.length - 1}
            className="w-8 h-8 rounded-xl bg-white dark:bg-gray-800 disabled:opacity-25 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center transition-all shadow-2xs border border-gray-200/60 dark:border-gray-700"
            title={isAr ? 'الآية التالية' : 'Next Verse'}
          >
            <SkipForward className="w-4 h-4 text-gray-700 dark:text-gray-200" />
          </button>
        </div>

        {/* Track Details with Live Waveform */}
        <div className="flex flex-col flex-1 min-w-0 text-center sm:text-right">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="text-xs sm:text-sm font-bold text-[#0A382C] dark:text-[#C9A227] truncate">
              {title}
            </span>
            <span className="text-[10px] bg-[#0A382C]/10 text-[#0A382C] dark:bg-[#C9A227]/20 dark:text-[#C9A227] px-2.5 py-0.5 rounded-full font-bold">
              {isAr ? `الآية ${currentVerseIndex + 1} من ${verses.length}` : `Verse ${currentVerseIndex + 1} of ${verses.length}`}
            </span>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-2 mt-1 text-[11px] text-gray-500 dark:text-gray-400">
            <span>{isAr ? 'تلاوة متتابعة: الشيخ مشاري بن راشد العفاسي' : 'Reciter: Sheikh Mishary Rashid Alafasy'}</span>
            
            {/* Animated Sound Waveform Indicator */}
            {isPlaying && (
              <div className="inline-flex items-center gap-0.5 h-4 ml-1">
                <span className="w-0.5 bg-[#C9A227] rounded-full wave-bar-1" />
                <span className="w-0.5 bg-[#C9A227] rounded-full wave-bar-2" />
                <span className="w-0.5 bg-[#C9A227] rounded-full wave-bar-3" />
                <span className="w-0.5 bg-[#C9A227] rounded-full wave-bar-4" />
              </div>
            )}
          </div>
        </div>

        {/* Mute Button */}
        <button
          onClick={toggleMute}
          className="p-2.5 rounded-xl bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-all shadow-2xs border border-gray-200/60 dark:border-gray-700"
          title={isMuted ? (isAr ? 'إلغاء الكتم' : 'Unmute') : (isAr ? 'كتم الصوت' : 'Mute')}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
