'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw } from 'lucide-react';

interface AudioPlayerProps {
  audioUrl?: string;
  title: string;
}

export function AudioPlayer({ audioUrl, title }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [audioUrl]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(e => console.warn('Audio playback error', e));
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div className="flex items-center gap-3 bg-[#0F4C3A]/5 dark:bg-[#C9A227]/10 p-2.5 rounded-xl border border-[#0F4C3A]/10 dark:border-[#C9A227]/20">
      <audio
        ref={audioRef}
        src={audioUrl || 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3'}
        onEnded={handleEnded}
      />
      <button
        onClick={togglePlay}
        className="w-9 h-9 rounded-full bg-[#0F4C3A] text-white flex items-center justify-center hover:scale-105 transition-transform shadow-xs"
        title={isPlaying ? 'إيقاف' : 'تشغيل التلاوة'}
      >
        {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
      </button>

      <div className="flex flex-col flex-1 min-w-0">
        <span className="text-xs font-semibold text-[#0F4C3A] dark:text-[#C9A227] truncate">
          {title}
        </span>
        <span className="text-[10px] text-gray-500">
          تلاوة: الشيخ مشاري بن راشد العفاسي
        </span>
      </div>

      <button
        onClick={toggleMute}
        className="p-1.5 text-gray-500 hover:text-[#0F4C3A] dark:hover:text-[#C9A227] transition-colors"
      >
        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>
    </div>
  );
}
