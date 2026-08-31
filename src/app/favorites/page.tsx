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
          <div className="w-10 h-10 rounded-xl bg-[#0F4C3A] text-[#C9A227] flex items-center justify-center font-bold">
            <Bookmark className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#0F4C3A] dark:text-[#C9A227]">
              {isAr ? 'المحفوظات والمفضلة' : 'Bookmarks & Saved Items'}
            </h1>
            <p className="text-xs text-gray-500">
              {isAr ? 'صفحات القرآن والأحاديث المباركة التي قمت بحفظها' : 'Your saved Quran pages and Hadiths'}
            </p>
          </div>
        </div>
      </div>

      {progress.bookmarks.length === 0 ? (
        <div className="text-center py-16 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl space-y-3">
          <Bookmark className="w-10 h-10 text-gray-300 mx-auto" />
          <p className="text-sm font-semibold text-gray-500">
            {isAr ? 'لا توجد عناصر محفوظة حالياً في قائمة المفضلة.' : 'No bookmarked items yet.'}
          </p>
          <p className="text-xs text-gray-400">
            {isAr ? 'انقر على أيقونة الإشارة المرجعية أثناء قراءة القرآن أو الحديث لحفظها هنا.' : 'Click the bookmark icon while reading to save items here.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {progress.bookmarks.map((b, index) => (
            <div
              key={index}
              className="p-5 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-xs flex items-center justify-between gap-3 hover:border-[#C9A227] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0F4C3A]/10 text-[#0F4C3A] dark:bg-[#C9A227]/20 dark:text-[#C9A227] flex items-center justify-center">
                  {b.type === 'page' ? <BookOpen className="w-5 h-5" /> : <Scroll className="w-5 h-5" />}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100">{b.title}</h4>
                  <span className="text-[10px] text-gray-400">
                    تاريخ الحفظ: {new Date(b.date).toLocaleDateString(isAr ? 'ar-EG' : 'en-US')}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={b.type === 'page' ? `/quran` : `/hadith`}
                  className="px-3 py-1.5 rounded-lg bg-[#0F4C3A] text-white text-xs font-bold hover:bg-[#0a382b] transition-colors"
                >
                  الانتقال
                </Link>
                <button
                  onClick={() => toggleBookmark(b.type, b.id, b.title)}
                  className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition-colors"
                  title="حذف من المفضلة"
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
