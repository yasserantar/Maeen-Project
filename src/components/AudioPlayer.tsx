'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, SkipForward, SkipBack, Gauge } from 'lucide-react';

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

const PLAYBACK_SPEEDS = [0.75, 1, 1.25, 1.5];

export function AudioPlayer({ verses, title, isAr = true, onActiveVerseChange }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [speedIndex, setSpeedIndex] = useState(1); // 1.0x by default
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const getAudioUrl = (idx: number) => {
    const v = verses[idx];
    if (!v) return 'https://everyayah.com/data/Alafasy_128kbps/001001.mp3';
    if (v.audio_url) return v.audio_url;
    try {
      const parts = v.verse_key.split(':');
      const s = String(parseInt(parts[0])).padStart(3, '0');
      const a = String(parseInt(parts[1])).padStart(3, '0');
      return `https://everyayah.com/data/Alafasy_128kbps/${s}${a}.mp3`;
    } catch {
      return 'https://everyayah.com/data/Alafasy_128kbps/001001.mp3';
    }
  };

  // Reset when page / verses change
  useEffect(() => {
    setIsPlaying(false);
    setCurrentVerseIndex(0);
    if (onActiveVerseChange) onActiveVerseChange(null);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [verses]);

  // Sync highlight with current playing verse
  useEffect(() => {
    if (onActiveVerseChange) {
      onActiveVerseChange(isPlaying ? currentVerseIndex : null);
    }
  }, [currentVerseIndex, isPlaying, onActiveVerseChange]);

  const playVerse = (idx: number) => {
    if (!audioRef.current) return;
    const url = getAudioUrl(idx);
    audioRef.current.src = url;
    audioRef.current.playbackRate = PLAYBACK_SPEEDS[speedIndex];
    audioRef.current.muted = isMuted;

    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn('Playback error:', err);
          setIsPlaying(false);
        });
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      playVerse(currentVerseIndex);
    }
  };

  const handleEnded = () => {
    if (currentVerseIndex < verses.length - 1) {
      const nextIdx = currentVerseIndex + 1;
      setCurrentVerseIndex(nextIdx);
      playVerse(nextIdx);
    } else {
      setIsPlaying(false);
      setCurrentVerseIndex(0);
    }
  };

  const handleSkipNext = () => {
    if (currentVerseIndex < verses.length - 1) {
      const nextIdx = currentVerseIndex + 1;
      setCurrentVerseIndex(nextIdx);
      if (isPlaying) {
        playVerse(nextIdx);
      }
    }
  };

  const handleSkipPrev = () => {
    if (currentVerseIndex > 0) {
      const prevIdx = currentVerseIndex - 1;
      setCurrentVerseIndex(prevIdx);
      if (isPlaying) {
        playVerse(prevIdx);
      }
    }
  };

  const cycleSpeed = () => {
    const nextIdx = (speedIndex + 1) % PLAYBACK_SPEEDS.length;
    setSpeedIndex(nextIdx);
    if (audioRef.current) {
      audioRef.current.playbackRate = PLAYBACK_SPEEDS[nextIdx];
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0A382C]/10 via-[#0F4C3A]/5 to-[#C9A227]/10 dark:from-[#132B22] dark:via-[#101F19] dark:to-[#2A230F] p-4 border border-[#0F4C3A]/15 dark:border-[#F0CA50]/30 shadow-xs backdrop-blur-md transition-all">
      <audio
        ref={audioRef}
        onEnded={handleEnded}
        preload="auto"
      />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Playback Controls */}
        <div className="flex items-center gap-2.5">
          {/* Previous Verse Button */}
          <button
            onClick={handleSkipPrev}
            disabled={currentVerseIndex <= 0}
            className="w-9 h-9 rounded-xl bg-white dark:bg-[#15241E] disabled:opacity-25 hover:bg-gray-100 dark:hover:bg-[#1C2E27] flex items-center justify-center transition-all shadow-2xs border border-gray-200/60 dark:border-white/10"
            title={isAr ? 'الآية السابقة' : 'Previous Verse'}
          >
            <SkipBack className="w-4 h-4 text-gray-700 dark:text-gray-200" />
          </button>

          {/* Main Play / Pause Button */}
          <button
            onClick={togglePlay}
            className="w-12 h-12 rounded-2xl bg-[#0A382C] hover:bg-[#0F4C3A] dark:bg-[#F0CA50] dark:hover:bg-[#D4AF37] text-white dark:text-[#0A261E] flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md shrink-0 border border-[#C9A227]/30 dark:border-[#F0CA50]"
            title={isPlaying ? (isAr ? 'إيقاف مؤقت' : 'Pause') : (isAr ? 'تشغيل تلاوة الصفحة' : 'Play Page Recitation')}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>

          {/* Next Verse Button */}
          <button
            onClick={handleSkipNext}
            disabled={currentVerseIndex >= verses.length - 1}
            className="w-9 h-9 rounded-xl bg-white dark:bg-[#15241E] disabled:opacity-25 hover:bg-gray-100 dark:hover:bg-[#1C2E27] flex items-center justify-center transition-all shadow-2xs border border-gray-200/60 dark:border-white/10"
            title={isAr ? 'الآية التالية' : 'Next Verse'}
          >
            <SkipForward className="w-4 h-4 text-gray-700 dark:text-gray-200" />
          </button>
        </div>

        {/* Track Details with Live Waveform */}
        <div className="flex flex-col flex-1 min-w-0 text-center sm:text-start">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="text-xs sm:text-sm font-extrabold text-[#0A382C] dark:text-[#F0CA50] truncate">
              {title}
            </span>
            <span className="text-[10px] bg-[#0A382C]/10 text-[#0A382C] dark:bg-[#F0CA50]/20 dark:text-[#F0CA50] px-2.5 py-0.5 rounded-full font-bold border border-transparent dark:border-[#F0CA50]/30">
              {isAr ? `الآية ${currentVerseIndex + 1} من ${verses.length}` : `Verse ${currentVerseIndex + 1} of ${verses.length}`}
            </span>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-2 mt-1 text-[11px] text-gray-500 dark:text-gray-400">
            <span>{isAr ? 'تلاوة متتابعة: الشيخ مشاري بن راشد العفاسي' : 'Reciter: Sheikh Mishary Rashid Alafasy'}</span>
            
            {/* Animated Sound Waveform Indicator */}
            {isPlaying && (
              <div className="inline-flex items-center gap-0.5 h-4 ml-1">
                <span className="w-0.5 bg-[#F0CA50] rounded-full wave-bar-1" />
                <span className="w-0.5 bg-[#F0CA50] rounded-full wave-bar-2" />
                <span className="w-0.5 bg-[#F0CA50] rounded-full wave-bar-3" />
                <span className="w-0.5 bg-[#F0CA50] rounded-full wave-bar-4" />
              </div>
            )}
          </div>
        </div>

        {/* Speed Selector & Mute Controls */}
        <div className="flex items-center gap-2">
          {/* Speed Toggle Pill */}
          <button
            onClick={cycleSpeed}
            className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-[#15241E] hover:bg-gray-100 dark:hover:bg-[#1C2E27] text-gray-700 dark:text-gray-200 text-xs font-bold font-mono transition-all shadow-2xs border border-gray-200/60 dark:border-white/10 flex items-center gap-1"
            title={isAr ? 'سرعة التلاوة' : 'Playback Speed'}
          >
            <Gauge className="w-3.5 h-3.5 text-[#F0CA50]" />
            <span>{PLAYBACK_SPEEDS[speedIndex]}x</span>
          </button>

          {/* Mute Button */}
          <button
            onClick={toggleMute}
            className="p-2 rounded-xl bg-white dark:bg-[#15241E] hover:bg-gray-100 dark:hover:bg-[#1C2E27] text-gray-700 dark:text-gray-200 transition-all shadow-2xs border border-gray-200/60 dark:border-white/10"
            title={isMuted ? (isAr ? 'إلغاء الكتم' : 'Unmute') : (isAr ? 'كتم الصوت' : 'Mute')}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
