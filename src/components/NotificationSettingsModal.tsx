'use client';

import React, { useState } from 'react';
import { Bell, Calendar, Mail, CheckCircle2, Clock, X, Sparkles, ExternalLink, Download } from 'lucide-react';
import { useUserStore } from '@/lib/store';

interface NotificationSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationSettingsModal({ isOpen, onClose }: NotificationSettingsModalProps) {
  const { progress, updateNotifications } = useUserStore();
  const isAr = progress.language === 'ar';

  const [selectedTime, setSelectedTime] = useState(progress.notifications?.time || '08:00');
  const [emailInput, setEmailInput] = useState(progress.notifications?.email || '');
  const [browserAllowed, setBrowserAllowed] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  if (!isOpen) return null;

  const handleRequestBrowserPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setBrowserAllowed(true);
        updateNotifications({ browserEnabled: true, time: selectedTime });
        new Notification(isAr ? 'مَعِين | تم تفعيل التنبيه اليومي' : 'Maeen | Daily Reminder Enabled', {
          body: isAr
            ? `سيصلك تنبيهك اليومي للقرآن والحديث الشريف يومياً في تمام الساعة ${selectedTime} بإذن الله.`
            : `Your daily Quran and Hadith reminder is set for ${selectedTime}.`,
          icon: '/manifest.json'
        });
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 4000);
      } else {
        alert(isAr ? 'يرجى السماح بالإشعارات من إعدادات المتصفح.' : 'Please allow notifications in browser settings.');
      }
    } else {
      alert(isAr ? 'المتصفح الحالي لا يدعم إشعارات الويب.' : 'Web notifications are not supported on this browser.');
    }
  };

  const handleSaveEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      updateNotifications({
        email: emailInput.trim(),
        emailEnabled: true,
        time: selectedTime
      });
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 4000);
    }
  };

  // Generate Google Calendar Link
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(isAr ? 'مَعِين | ورد القرآن والحديث اليومي' : 'Maeen | Daily Quran & Hadith Reminder');
    const details = encodeURIComponent(isAr
      ? 'وقت قراءة صفحة اليوم من القرآن الكريم مع التفسير والحديث الصحيح عبر منصة مَعِين: https://maeen-app-five.vercel.app/'
      : 'Your daily time for reading today\'s Quran page and authentic Hadith on Maeen: https://maeen-app-five.vercel.app/');
    const location = encodeURIComponent('https://maeen-app-five.vercel.app/');
    
    // Recurring daily event
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&recur=RRULE:FREQ=DAILY`;
  };

  // Generate iCal (.ics) download
  const handleDownloadICS = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Maeen Platform//Daily Reminder//AR
BEGIN:VEVENT
SUMMARY:${isAr ? 'مَعِين - ورد اليوم من القرآن والسنة' : 'Maeen - Daily Quran & Sunnah'}
DESCRIPTION:${isAr ? 'صفحة يومية من القرآن مع التفسير وحديث صحيح: https://maeen-app-five.vercel.app' : 'Daily Quran Page & Hadith: https://maeen-app-five.vercel.app'}
URL:https://maeen-app-five.vercel.app/
RRULE:FREQ=DAILY
BEGIN:VALARM
TRIGGER:-PT10M
ACTION:DISPLAY
DESCRIPTION:تذكير مَعِين اليومي
END:VALARM
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'maeen-daily-reminder.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 rtl:left-auto rtl:right-5 p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#0F4C3A] text-[#C9A227] flex items-center justify-center font-bold shadow-md">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#0F4C3A] dark:text-[#C9A227]">
              {isAr ? 'إعداد تنبيهات الورد اليومي' : 'Daily Reminder Settings'}
            </h2>
            <p className="text-xs text-gray-500">
              {isAr ? 'اختر الطريقة والوقت المفضل لتذكيرك بورودك اليومي' : 'Choose your preferred channel and time for daily reminders'}
            </p>
          </div>
        </div>

        {showSuccessMessage && (
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs sm:text-sm flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{isAr ? 'تم ضبط وحفظ إعدادات التنبيه بنجاح!' : 'Notification settings saved successfully!'}</span>
          </div>
        )}

        {/* Preferred Time Selector */}
        <div className="space-y-2 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0F4C3A] dark:text-[#C9A227]">
              <Clock className="w-4 h-4" />
              <span>{isAr ? 'وقت التنبيه اليومي المفضل' : 'Preferred Daily Time'}</span>
            </div>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-sm font-bold outline-none"
            />
          </div>
          <span className="text-[11px] text-gray-500 block">
            {isAr ? 'سيتم إرسال التنبيه في هذا التوقيت يومياً ليذكرك بالصفحة والتفسير والحديث' : 'Reminder will trigger daily at this time.'}
          </span>
        </div>

        {/* Channel 1: Browser Web Push Notifications */}
        <div className="p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 font-bold text-sm text-gray-800 dark:text-gray-200">
              <Bell className="w-4 h-4 text-[#0F4C3A] dark:text-[#C9A227]" />
              <span>{isAr ? 'إشعارات المتصفح والهاتف' : 'Browser & Mobile Push'}</span>
            </div>
            <button
              onClick={handleRequestBrowserPermission}
              className="px-3.5 py-1.5 rounded-xl bg-[#0F4C3A] hover:bg-[#0a382b] text-white text-xs font-bold transition-all shadow-xs"
            >
              {isAr ? 'تفعيل الإشعار' : 'Enable Push'}
            </button>
          </div>
          <p className="text-xs text-gray-500">
            {isAr ? 'يصلك إشعار مباشر على شاشة جهازك أو هاتفك بالصفحة والحديث دون الحاجة لفتح المتصفح.' : 'Direct notification on your device screen at the scheduled time.'}
          </p>
        </div>

        {/* Channel 2: Google Calendar & iCal Integration */}
        <div className="p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] space-y-3">
          <div className="flex items-center gap-2.5 font-bold text-sm text-gray-800 dark:text-gray-200">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span>{isAr ? 'تقويم جوجل وتطبيقات التقويم (Calendar)' : 'Google Calendar & iCal'}</span>
          </div>
          <p className="text-xs text-gray-500">
            {isAr ? 'أضف تذكيراً يومياً متكرراً في تقويم جوجل أو تقويم الهاتف مع الرابط المباشر للورد اليومي.' : 'Add a daily recurring reminder to your calendar with direct page links.'}
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <a
              href={getGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{isAr ? 'إضافة إلى تقويم جوجل (Google Calendar)' : 'Add to Google Calendar'}</span>
            </a>

            <button
              onClick={handleDownloadICS}
              className="px-3.5 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isAr ? 'تحميل ملف التقويم (.ics)' : 'Download iCal (.ics)'}</span>
            </button>
          </div>
        </div>

        {/* Channel 3: Email Subscription */}
        <div className="p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] space-y-3">
          <div className="flex items-center gap-2.5 font-bold text-sm text-gray-800 dark:text-gray-200">
            <Mail className="w-4 h-4 text-amber-600" />
            <span>{isAr ? 'التنبيه عبر البريد الإلكتروني' : 'Email Daily Digest'}</span>
          </div>
          <form onSubmit={handleSaveEmail} className="flex gap-2">
            <input
              type="email"
              required
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder={isAr ? 'أدخل بريدك الإلكتروني...' : 'Enter your email...'}
              className="flex-1 px-3.5 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs text-gray-900 dark:text-gray-100 outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#C9A227] hover:bg-[#a8851c] text-[#0F4C3A] text-xs font-bold transition-all shadow-xs shrink-0"
            >
              {isAr ? 'حفظ البريد' : 'Save Email'}
            </button>
          </form>
        </div>

        {/* Footer Done Button */}
        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-3 bg-[#0F4C3A] hover:bg-[#0a382b] text-white font-bold text-sm rounded-xl transition-colors shadow-xs"
          >
            {isAr ? 'إغلاق' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
}
