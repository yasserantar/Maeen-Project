'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { UserProgress, Language, NotificationSettings } from './types';

const STORAGE_KEY = 'maeen_user_progress_v5';

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

interface UserStoreContextType {
  progress: UserProgress;
  isLoaded: boolean;
  togglePageCompletion: (pageNumber: number) => void;
  setLanguage: (lang: Language) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  toggleBookmark: (type: 'page' | 'verse' | 'hadith', id: string | number, title: string) => void;
  saveNote: (pageNumber: number, note: string) => void;
  updateNotifications: (settings: Partial<NotificationSettings>) => void;
  saveProgress: (newProgress: UserProgress) => void;
}

const UserStoreContext = createContext<UserStoreContextType | null>(null);

function applyThemeAndLang(theme: 'light' | 'dark', lang: Language) {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
}

export function UserStoreProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(defaultState);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const merged: UserProgress = {
          ...defaultState,
          ...parsed,
          notifications: {
            ...defaultNotifications,
            ...(parsed.notifications || {})
          }
        };
        setProgress(merged);
        applyThemeAndLang(merged.theme, merged.language);
      } else {
        applyThemeAndLang('light', 'ar');
      }
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
    setIsLoaded(true);
  }, []);

  const saveProgress = useCallback((newProgress: UserProgress) => {
    setProgress(newProgress);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
    } catch (e) {
      console.warn('LocalStorage save error', e);
    }
  }, []);

  const togglePageCompletion = useCallback((pageNumber: number) => {
    setProgress((prev) => {
      const isCompleted = prev.completedPages.includes(pageNumber);
      const updatedPages = isCompleted
        ? prev.completedPages.filter(p => p !== pageNumber)
        : [...prev.completedPages, pageNumber];
      
      const updated = { ...prev, completedPages: updatedPages };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setProgress((prev) => {
      const updated = { ...prev, language: lang };
      applyThemeAndLang(prev.theme, lang);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });
  }, []);

  const setTheme = useCallback((theme: 'light' | 'dark') => {
    setProgress((prev) => {
      const updated = { ...prev, theme };
      applyThemeAndLang(theme, prev.language);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });
  }, []);

  const toggleBookmark = useCallback((type: 'page' | 'verse' | 'hadith', id: string | number, title: string) => {
    setProgress((prev) => {
      const exists = prev.bookmarks.some(b => b.id === id && b.type === type);
      const updatedBookmarks = exists
        ? prev.bookmarks.filter(b => !(b.id === id && b.type === type))
        : [...prev.bookmarks, { type, id, title, date: new Date().toISOString() }];

      const updated = { ...prev, bookmarks: updatedBookmarks };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });
  }, []);

  const saveNote = useCallback((pageNumber: number, note: string) => {
    setProgress((prev) => {
      const updated = {
        ...prev,
        notes: {
          ...prev.notes,
          [pageNumber]: note
        }
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });
  }, []);

  const updateNotifications = useCallback((settings: Partial<NotificationSettings>) => {
    setProgress((prev) => {
      const updated = {
        ...prev,
        notifications: {
          ...prev.notifications,
          ...settings
        }
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });
  }, []);

  return (
    <UserStoreContext.Provider
      value={{
        progress,
        isLoaded,
        togglePageCompletion,
        setLanguage,
        setTheme,
        toggleBookmark,
        saveNote,
        updateNotifications,
        saveProgress
      }}
    >
      {children}
    </UserStoreContext.Provider>
  );
}

export function useUserStore() {
  const context = useContext(UserStoreContext);
  if (!context) {
    return {
      progress: defaultState,
      isLoaded: true,
      togglePageCompletion: () => {},
      setLanguage: () => {},
      setTheme: () => {},
      toggleBookmark: () => {},
      saveNote: () => {},
      updateNotifications: () => {},
      saveProgress: () => {}
    };
  }
  return context;
}
