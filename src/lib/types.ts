export type Language = 'ar' | 'en';

export interface Verse {
  id: number;
  verse_key: string;
  verse_number: number;
  page_number: number;
  text_uthmani: string;
  translations?: Array<{
    id: number;
    resource_id: number;
    text: string;
  }>;
  audio_url?: string;
  surah_name_ar?: string;
  surah_name_en?: string;
}

export interface TafsirData {
  id: number;
  verse_key: string;
  text: string;
  resource_name: 'Tafsir As-Sa\'di' | 'Tafsir Ibn Kathir';
}

export interface Hadith {
  id: string;
  collection: string;
  collection_ar: string;
  hadith_number: string | number;
  narrator_ar: string;
  narrator_en: string;
  text_ar: string;
  text_en: string;
  grading: string;
  grading_ar: string;
  explanation_ar: string;
  explanation_en: string;
  source_url: string;
  theme_ar?: string;
  theme_en?: string;
  life_benefit_ar?: string;
  life_benefit_en?: string;
}

export interface QuranPageData {
  page_number: number;
  surah_name_ar: string;
  surah_name_en: string;
  juz_number: number;
  verses: Verse[];
  tafsir_sadi_ar?: string;
  tafsir_ibn_kathir_ar?: string;
  tafsir_sadi_en?: string;
  tafsir_ibn_kathir_en?: string;
  benefits_ar?: string[];
  benefits_en?: string[];
  linguistic_gem_ar?: string;
  linguistic_gem_en?: string;
  scientific_miracle_ar?: string;
  scientific_miracle_en?: string;
  ai_reflection_ar?: string;
  ai_reflection_en?: string;
}

export interface NotificationSettings {
  browserEnabled: boolean;
  time: string; // e.g. "08:00"
  email?: string;
  emailEnabled: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
  streak: number;
  lastActive: string;
  isCloudSynced: boolean;
}

export interface UserProgress {
  user: UserProfile | null;
  completedPages: number[];
  currentPage: number;
  bookmarks: Array<{
    type: 'page' | 'verse' | 'hadith';
    id: string | number;
    title: string;
    date: string;
  }>;
  notes: Record<number, string>;
  language: Language;
  theme: 'light' | 'dark';
  notifications: NotificationSettings;
}
