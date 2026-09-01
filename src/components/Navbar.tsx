'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Scroll, Compass, Bookmark, Info, Search, Sun, Moon, Languages, Download, Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUserStore } from '@/lib/store';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenNotifications?: () => void;
  onInstallApp?: () => void;
  canInstall?: boolean;
}

export function Navbar({ onOpenSearch, onOpenNotifications, onInstallApp, canInstall }: NavbarProps) {
  const { progress, setLanguage, setTheme } = useUserStore();
  const isAr = progress.language === 'ar';

  return (
    <header className="sticky top-0 z-40 bg-[var(--card-glass)] dark:bg-[#0B120E]/90 backdrop-blur-xl border-b border-[var(--border-color)] shadow-xs transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <motion.div
                whileHover={{ scale: 1.08, rotate: 3 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-2xl bg-[#0A382C] flex items-center justify-center text-[#F0CA50] font-extrabold text-xl shadow-md border border-[#F0CA50]/30"
              >
                م
              </motion.div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl text-[#0A382C] dark:text-[#F0CA50]">
                  {isAr ? 'مَعِين' : 'Maeen'}
                </span>
                <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium hidden sm:inline">
                  {isAr ? 'معينك اليومي من القرآن والسنة' : 'Daily Quran & Sunnah'}
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
            <Link href="/" className="flex items-center gap-1.5 text-gray-700 dark:text-gray-200 hover:text-[#C9A227] dark:hover:text-[#F0CA50] transition-colors">
              <BookOpen className="w-4 h-4 text-[#0A382C] dark:text-[#F0CA50]" />
              {isAr ? 'الرئيسية' : 'Home'}
            </Link>
            <Link href="/quran" className="flex items-center gap-1.5 text-gray-700 dark:text-gray-200 hover:text-[#C9A227] dark:hover:text-[#F0CA50] transition-colors">
              <BookOpen className="w-4 h-4 text-[#0A382C] dark:text-[#F0CA50]" />
              {isAr ? 'صفحة اليوم' : 'Daily Quran'}
            </Link>
            <Link href="/hadith" className="flex items-center gap-1.5 text-gray-700 dark:text-gray-200 hover:text-[#C9A227] dark:hover:text-[#F0CA50] transition-colors">
              <Scroll className="w-4 h-4 text-[#0A382C] dark:text-[#F0CA50]" />
              {isAr ? 'حديث اليوم' : 'Daily Hadith'}
            </Link>
            <Link href="/journey" className="flex items-center gap-1.5 text-gray-700 dark:text-gray-200 hover:text-[#C9A227] dark:hover:text-[#F0CA50] transition-colors">
              <Compass className="w-4 h-4 text-[#0A382C] dark:text-[#F0CA50]" />
              {isAr ? 'رحلة القرآن' : 'Quran Journey'}
            </Link>
            <Link href="/favorites" className="flex items-center gap-1.5 text-gray-700 dark:text-gray-200 hover:text-[#C9A227] dark:hover:text-[#F0CA50] transition-colors">
              <Bookmark className="w-4 h-4 text-[#0A382C] dark:text-[#F0CA50]" />
              {isAr ? 'المفضلة' : 'Bookmarks'}
            </Link>
            <Link href="/sources" className="flex items-center gap-1.5 text-gray-700 dark:text-gray-200 hover:text-[#C9A227] dark:hover:text-[#F0CA50] transition-colors">
              <Info className="w-4 h-4 text-[#0A382C] dark:text-[#F0CA50]" />
              {isAr ? 'المصادر' : 'Sources'}
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Notification Settings Button */}
            {onOpenNotifications && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpenNotifications}
                className="p-2.5 rounded-xl bg-[#0A382C]/10 hover:bg-[#0A382C]/20 dark:bg-[#F0CA50]/15 dark:hover:bg-[#F0CA50]/25 text-[#0A382C] dark:text-[#F0CA50] transition-colors border border-transparent dark:border-[#F0CA50]/25"
                title={isAr ? 'تنبيهات الورد اليومي' : 'Daily Reminder Settings'}
              >
                <Bell className="w-4 h-4" />
              </motion.button>
            )}

            {/* PWA Install Button */}
            {canInstall && onInstallApp && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onInstallApp}
                className="px-3.5 py-2 text-xs font-extrabold rounded-xl bg-[#F0CA50] text-[#0A261E] hover:bg-[#D4AF37] transition-all flex items-center gap-1.5 shadow-xs"
                title={isAr ? 'تثبيت التطبيق على الشاشة' : 'Install App'}
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isAr ? 'تثبيت التطبيق' : 'Install App'}</span>
              </motion.button>
            )}

            {/* Search Trigger */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenSearch}
              className="p-2.5 rounded-xl bg-gray-100 dark:bg-[#131F1A] hover:bg-gray-200 dark:hover:bg-[#1C2E27] text-gray-700 dark:text-gray-200 transition-colors border border-gray-200/50 dark:border-white/10"
              title={isAr ? 'بحث' : 'Search'}
            >
              <Search className="w-4 h-4" />
            </motion.button>

            {/* Language Switcher */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLanguage(isAr ? 'en' : 'ar')}
              className="px-3 py-2 text-xs font-bold rounded-xl bg-[#0A382C]/10 text-[#0A382C] dark:bg-[#F0CA50]/15 dark:text-[#F0CA50] hover:opacity-80 transition-opacity flex items-center gap-1 border border-transparent dark:border-[#F0CA50]/25"
            >
              <Languages className="w-3.5 h-3.5" />
              <span>{isAr ? 'EN' : 'عربي'}</span>
            </motion.button>

            {/* Theme Switcher */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTheme(progress.theme === 'dark' ? 'light' : 'dark')}
              className="p-2.5 rounded-xl bg-gray-100 dark:bg-[#131F1A] hover:bg-gray-200 dark:hover:bg-[#1C2E27] text-gray-700 dark:text-gray-200 transition-colors border border-gray-200/50 dark:border-white/10"
              title={isAr ? 'تغيير المظهر' : 'Toggle Theme'}
            >
              {progress.theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </motion.button>
          </div>
        </div>
      </div>
    </header>
  );
}
