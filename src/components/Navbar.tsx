'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Scroll, Compass, Bookmark, Info, Search, Sun, Moon, Languages } from 'lucide-react';
import { useUserStore } from '@/lib/store';

interface NavbarProps {
  onOpenSearch: () => void;
}

export function Navbar({ onOpenSearch }: NavbarProps) {
  const { progress, setLanguage, setTheme } = useUserStore();
  const isAr = progress.language === 'ar';

  return (
    <header className="sticky top-0 z-40 bg-[var(--card-bg)] border-b border-[var(--border-color)] shadow-xs transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-[#0F4C3A] flex items-center justify-center text-[#C9A227] font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
                م
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-[#0F4C3A] dark:text-[#C9A227]">
                  {isAr ? 'مَعِين' : 'Maeen'}
                </span>
                <span className="text-[10px] text-gray-500 hidden sm:inline">
                  {isAr ? 'معينك اليومي من القرآن والسنة' : 'Daily Quran & Sunnah'}
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="flex items-center gap-1.5 hover:text-[#C9A227] transition-colors">
              <BookOpen className="w-4 h-4 text-[#0F4C3A] dark:text-[#C9A227]" />
              {isAr ? 'الرئيسية' : 'Home'}
            </Link>
            <Link href="/quran" className="flex items-center gap-1.5 hover:text-[#C9A227] transition-colors">
              <BookOpen className="w-4 h-4 text-[#0F4C3A] dark:text-[#C9A227]" />
              {isAr ? 'صفحة اليوم' : 'Daily Quran'}
            </Link>
            <Link href="/hadith" className="flex items-center gap-1.5 hover:text-[#C9A227] transition-colors">
              <Scroll className="w-4 h-4 text-[#0F4C3A] dark:text-[#C9A227]" />
              {isAr ? 'حديث اليوم' : 'Daily Hadith'}
            </Link>
            <Link href="/journey" className="flex items-center gap-1.5 hover:text-[#C9A227] transition-colors">
              <Compass className="w-4 h-4 text-[#0F4C3A] dark:text-[#C9A227]" />
              {isAr ? 'رحلة القرآن' : 'Quran Journey'}
            </Link>
            <Link href="/favorites" className="flex items-center gap-1.5 hover:text-[#C9A227] transition-colors">
              <Bookmark className="w-4 h-4 text-[#0F4C3A] dark:text-[#C9A227]" />
              {isAr ? 'المفضلة' : 'Bookmarks'}
            </Link>
            <Link href="/sources" className="flex items-center gap-1.5 hover:text-[#C9A227] transition-colors">
              <Info className="w-4 h-4 text-[#0F4C3A] dark:text-[#C9A227]" />
              {isAr ? 'المصادر' : 'Sources'}
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors"
              title={isAr ? 'بحث' : 'Search'}
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(isAr ? 'en' : 'ar')}
              className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-[#0F4C3A]/10 text-[#0F4C3A] dark:bg-[#C9A227]/20 dark:text-[#C9A227] hover:opacity-80 transition-opacity flex items-center gap-1"
            >
              <Languages className="w-3.5 h-3.5" />
              {isAr ? 'EN' : 'عربي'}
            </button>

            {/* Theme Switcher */}
            <button
              onClick={() => setTheme(progress.theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors"
              title={isAr ? 'تغيير المظهر' : 'Toggle Theme'}
            >
              {progress.theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
