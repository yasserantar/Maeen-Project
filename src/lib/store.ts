'use client';

import { useState, useEffect } from 'react';
import { UserProgress, Language, NotificationSettings } from './types';

const STORAGE_KEY = 'maeen_user_progress_v2';

const defaultNotifications: NotificationSettings = {
  browserEnabled: false,
  time: '08:00',
  email: '',
  emailEnabled: false
};

const defaultState: UserProgress = {
  completedPages: [],
  currentPage: 1,
  bookmarks: [
    { type: 'page', id: 1, title: 'سورة الفاتحة - صفحة 1', date: new Date().toISOString() }
  ],
  notes: {},
  language: 'ar',
  theme: 'light',
  notifications: defaultNotifications
};

export function useUserStore() {
  const [progress, setProgress] = useState<UserProgress>(defaultState);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setProgress({
          ...defaultState,
          ...parsed,
          notifications: {
            ...defaultNotifications,
            ...(parsed.notifications || {})
          }
        });
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

  const updateNotifications = (settings: Partial<NotificationSettings>) => {
    saveProgress({
      ...progress,
      notifications: {
        ...progress.notifications,
        ...settings
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
    updateNotifications,
    saveProgress
  };
}
