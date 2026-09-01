'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, SkipForward, SkipBack, RotateCcw } from 'lucide-react';

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
      // Wait slightly then play next verse
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
    <div className="flex flex-col sm:flex-row items-center gap-3 bg-[#0F4C3A]/5 dark:bg-[#C9A227]/10 p-3.5 rounded-2xl border border-[#0F4C3A]/15 dark:border-[#C9A227]/25 shadow-xs">
      <audio
        ref={audioRef}
        src={audioSrc}
        onEnded={handleEnded}
      />

      {/* Control Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={isAr ? handleNextVerse : handlePrevVerse}
          disabled={currentVerseIndex <= 0}
          className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 disabled:opacity-30 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          title={isAr ? 'الآية السابقة' : 'Previous Verse'}
        >
          <SkipBack className="w-4 h-4 text-gray-700 dark:text-gray-200" />
        </button>

        <button
          onClick={togglePlay}
          className="w-10 h-10 rounded-full bg-[#0F4C3A] text-white flex items-center justify-center hover:scale-105 transition-transform shadow-md shrink-0"
          title={isPlaying ? (isAr ? 'إيقاف مؤقت' : 'Pause') : (isAr ? 'تشغيل تلاوة الصفحة' : 'Play Page Recitation')}
        >
          {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
        </button>

        <button
          onClick={isAr ? handlePrevVerse : handleNextVerse}
          disabled={currentVerseIndex >= verses.length - 1}
          className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 disabled:opacity-30 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          title={isAr ? 'الآية التالية' : 'Next Verse'}
        >
          <SkipForward className="w-4 h-4 text-gray-700 dark:text-gray-200" />
        </button>
      </div>

      {/* Track Info */}
      <div className="flex flex-col flex-1 min-w-0 text-center sm:text-right">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <span className="text-xs font-bold text-[#0F4C3A] dark:text-[#C9A227] truncate">
            {title}
          </span>
          <span className="text-[10px] bg-[#0F4C3A]/10 text-[#0F4C3A] dark:bg-[#C9A227]/20 dark:text-[#C9A227] px-2 py-0.5 rounded-md font-bold">
            {isAr ? `الآية ${currentVerseIndex + 1} من ${verses.length}` : `Verse ${currentVerseIndex + 1} of ${verses.length}`}
          </span>
        </div>
        <span className="text-[10px] text-gray-500 mt-0.5">
          {isAr ? 'تلاوة الصفحة كاملة متتابعة - الشيخ مشاري بن راشد العفاسي' : 'Full Page Continuous Recitation - Sheikh Mishary Alafasy'}
        </span>
      </div>

      {/* Mute Toggle */}
      <button
        onClick={toggleMute}
        className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors"
      >
        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>
    </div>
  );
}
