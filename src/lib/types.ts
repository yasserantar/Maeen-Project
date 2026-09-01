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
}

export interface UserProgress {
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
}
