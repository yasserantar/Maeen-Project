'use client';

import { useState, useEffect } from 'react';
import { UserProgress, Language } from './types';

const STORAGE_KEY = 'maeen_user_progress_v1';

const defaultState: UserProgress = {
  completedPages: [],
  currentPage: 1,
  bookmarks: [
    { type: 'page', id: 1, title: 'سورة الفاتحة - صفحة 1', date: new Date().toISOString() }
  ],
  notes: {},
  language: 'ar',
  theme: 'light'
};

export function useUserStore() {
  const [progress, setProgress] = useState<UserProgress>(defaultState);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setProgress(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
    setIsLoaded(true);
  }, []);

  const saveProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
    } catch (e) {
      console.warn('LocalStorage save error', e);
    }
  };

  const togglePageCompletion = (pageNumber: number) => {
    const isCompleted = progress.completedPages.includes(pageNumber);
    const updatedPages = isCompleted
      ? progress.completedPages.filter(p => p !== pageNumber)
      : [...progress.completedPages, pageNumber];
    
    saveProgress({
      ...progress,
      completedPages: updatedPages
    });
  };

  const setLanguage = (lang: Language) => {
    saveProgress({
      ...progress,
      language: lang
    });
  };

  const setTheme = (theme: 'light' | 'dark') => {
    document.documentElement.setAttribute('data-theme', theme);
    saveProgress({
      ...progress,
      theme
    });
  };

  const toggleBookmark = (type: 'page' | 'verse' | 'hadith', id: string | number, title: string) => {
    const exists = progress.bookmarks.some(b => b.id === id && b.type === type);
    const updated = exists
      ? progress.bookmarks.filter(b => !(b.id === id && b.type === type))
      : [...progress.bookmarks, { type, id, title, date: new Date().toISOString() }];

    saveProgress({
      ...progress,
      bookmarks: updated
    });
  };

  const saveNote = (pageNumber: number, note: string) => {
    saveProgress({
      ...progress,
      notes: {
        ...progress.notes,
        [pageNumber]: note
      }
    });
  };

  return {
    progress,
    isLoaded,
    togglePageCompletion,
    setLanguage,
    setTheme,
    toggleBookmark,
    saveNote,
    saveProgress
  };
}
