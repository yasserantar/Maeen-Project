'use client';

import React from 'react';
import { useUserStore } from '@/lib/store';
import { Bookmark, Trash2, BookOpen, Scroll } from 'lucide-react';
import Link from 'next/link';

export default function FavoritesPage() {
  const { progress, toggleBookmark } = useUserStore();
  const isAr = progress.language === 'ar';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#0A382C] text-[#F0CA50] flex items-center justify-center font-bold shadow-xs">
            <Bookmark className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-[#0A382C] dark:text-[#FFFFFF]">
              {isAr ? 'المحفوظات والمفضلة' : 'Bookmarks & Saved Items'}
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {isAr ? 'صفحات القرآن والأحاديث المباركة التي قمت بحفظها' : 'Your saved Quran pages and authentic Hadiths'}
            </p>
          </div>
        </div>
      </div>

      {progress.bookmarks.length === 0 ? (
        <div className="text-center py-16 glass-panel rounded-3xl space-y-3 border border-[var(--border-color)]">
          <Bookmark className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto" />
          <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
            {isAr ? 'لا توجد عناصر محفوظة حالياً في قائمة المفضلة.' : 'No bookmarked items yet.'}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
            {isAr ? 'انقر على أيقونة الإشارة المرجعية أثناء قراءة القرآن أو الحديث لحفظها هنا.' : 'Click the bookmark icon while reading any page or Hadith to save it here.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {progress.bookmarks.map((b, index) => (
            <div
              key={index}
              className="glow-card glass-panel p-5 rounded-3xl border border-[var(--border-color)] shadow-xs flex items-center justify-between gap-3 hover:border-[#F0CA50] transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#0A382C]/10 text-[#0A382C] dark:bg-[#F0CA50]/15 dark:text-[#F0CA50] flex items-center justify-center border border-transparent dark:border-[#F0CA50]/25">
                  {b.type === 'page' ? <BookOpen className="w-5 h-5" /> : <Scroll className="w-5 h-5" />}
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-gray-900 dark:text-[#FFFFFF]">{b.title}</h4>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400">
                    {isAr ? `تاريخ الحفظ: ${new Date(b.date).toLocaleDateString('ar-EG')}` : `Saved on: ${new Date(b.date).toLocaleDateString('en-US')}`}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={b.type === 'page' ? `/quran` : `/hadith`}
                  className="px-4 py-2 rounded-xl bg-[#0A382C] dark:bg-[#F0CA50] hover:bg-[#0F4C3A] dark:hover:bg-[#D4AF37] text-white dark:text-[#0A261E] text-xs font-extrabold transition-all shadow-xs"
                >
                  {isAr ? 'الانتقال' : 'Open'}
                </Link>
                <button
                  onClick={() => toggleBookmark(b.type, b.id, b.title)}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl transition-colors"
                  title={isAr ? 'حذف من المفضلة' : 'Remove'}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
