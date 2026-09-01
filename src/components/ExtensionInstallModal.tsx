'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe, Download, CheckCircle2, Bell, Sparkles, FolderOpen, ArrowRight, ArrowLeft, ExternalLink, ShieldCheck, Puzzle } from 'lucide-react';
import { useUserStore } from '@/lib/store';

interface ExtensionInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExtensionInstallModal({ isOpen, onClose }: ExtensionInstallModalProps) {
  const { progress, updateNotifications } = useUserStore();
  const isAr = progress.language === 'ar';
  const [notificationStatus, setNotificationStatus] = useState<'idle' | 'granted' | 'denied'>('idle');
  const [testSent, setTestSent] = useState(false);

  if (!isOpen) return null;

  const handleEnableWebNotification = async () => {
    if (!('Notification' in window)) {
      alert(isAr ? 'المتصفح لا يدعم التنبيهات' : 'Browser does not support notifications');
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      setNotificationStatus('granted');
      updateNotifications({ browserEnabled: true });
      
      // Fire immediate welcome/confirmation notification
      try {
        new Notification(isAr ? 'مَعِين | تم تفعيل التنبيه اليومي بنجاح 🌿' : 'Maeen | Daily Reminders Activated Successfully 🌿', {
          body: isAr ? 'سيصلك تنبيه يومي بصفحة القرآن الكريم والحديث النبوي الشريف.' : 'You will receive a daily reminder for your Quran page and authentic Hadith.',
          icon: '/icon128.png'
        });
        setTestSent(true);
        setTimeout(() => setTestSent(false), 3000);
      } catch (e) {
        console.warn(e);
      }
    } else {
      setNotificationStatus('denied');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="glass-panel w-full max-w-xl rounded-3xl p-6 sm:p-8 border border-[#C9A227]/40 dark:border-[#F0CA50]/50 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto custom-scrollbar"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 left-5 rtl:left-auto rtl:right-5 p-2 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#0A382C] text-[#F0CA50] flex items-center justify-center mx-auto shadow-md border border-[#F0CA50]/30">
              <Puzzle className="w-7 h-7" />
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0A382C] dark:text-[#FFFFFF]">
              {isAr ? 'إضافة مَعِين لمتصفح Chrome & Edge' : 'Maeen Browser Extension'}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
              {isAr
                ? 'تنبيه يومي ذكي بالورد القرآني، مع عرض صفحة اليوم والحديث عند فتح تبويب جديد (New Tab).'
                : 'Smart daily Quran reminder + Beautiful New Tab view with your daily page and hadith.'}
            </p>
          </div>

          {/* Direct Download Button */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-[#0A382C]/10 via-[#F0CA50]/15 to-[#0A382C]/10 dark:from-[#152720] dark:via-[#2A2610] dark:to-[#152720] border border-[#F0CA50]/40 space-y-3 text-center">
            <div className="flex items-center justify-center gap-2 text-[#0A382C] dark:text-[#F0CA50] font-bold text-sm">
              <Sparkles className="w-4 h-4 text-[#F0CA50]" />
              <span>{isAr ? 'حزمة الإضافة جاهزة للتنزيل والتثبيت المباشر:' : 'Extension package ready for 1-click download:'}</span>
            </div>

            <a
              href="/maeen-chrome-extension.zip"
              download="maeen-chrome-extension.zip"
              className="shimmer-btn w-full py-4 bg-[#F0CA50] hover:bg-[#D4AF37] text-[#0A261E] font-black text-sm rounded-2xl flex items-center justify-center gap-2.5 shadow-md transition-all inline-block"
            >
              <Download className="w-5 h-5 inline" />
              <span>{isAr ? 'تنزيل الإضافة الآن (.zip)' : 'Download Extension (.zip)'}</span>
            </a>
          </div>

          {/* 3 Easy Installation Steps */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {isAr ? 'طريقة التثبيت في 3 خطوات بسيطة (أقل من دقيقة):' : 'Easy 3-Step Installation Guide (< 1 min):'}
            </h4>

            <div className="space-y-2.5 text-xs text-gray-700 dark:text-gray-200">
              <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-[#101915] border border-gray-200/60 dark:border-white/10 flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-[#0A382C] text-white dark:bg-[#F0CA50] dark:text-[#0A261E] flex items-center justify-center font-bold shrink-0">
                  1
                </span>
                <p className="leading-relaxed pt-0.5">
                  {isAr ? 'حمّل الملف أعلاه وفك الضغط عنه (Extract) في أي مجلد بجهازك.' : 'Download the zip file and extract it into a folder on your PC.'}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-[#101915] border border-gray-200/60 dark:border-white/10 flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-[#0A382C] text-white dark:bg-[#F0CA50] dark:text-[#0A261E] flex items-center justify-center font-bold shrink-0">
                  2
                </span>
                <p className="leading-relaxed pt-0.5">
                  {isAr ? (
                    <>
                      افتح المتصفح واذهب إلى: <code className="bg-gray-200 dark:bg-gray-800 px-1.5 py-0.5 rounded-md font-mono text-[#0A382C] dark:text-[#F0CA50]">chrome://extensions</code> ثم فعّل <strong>وضع المطور (Developer mode)</strong> في أعلى اليمين.
                    </>
                  ) : (
                    <>
                      Open your browser and navigate to: <code className="bg-gray-200 dark:bg-gray-800 px-1.5 py-0.5 rounded-md font-mono">chrome://extensions</code>, then enable <strong>Developer Mode</strong> at top right.
                    </>
                  )}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-[#101915] border border-gray-200/60 dark:border-white/10 flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-[#0A382C] text-white dark:bg-[#F0CA50] dark:text-[#0A261E] flex items-center justify-center font-bold shrink-0">
                  3
                </span>
                <p className="leading-relaxed pt-0.5">
                  {isAr ? 'اضغط على زر (Load unpacked / تحميل حزمة غير مضغوطة) واختر المجلد المستخرج.. ومبارك عليك!' : 'Click (Load Unpacked) and select the extracted folder. All set!'}
                </p>
              </div>
            </div>
          </div>

          {/* Alternative: Instant In-Browser Web Notification */}
          <div className="p-5 rounded-2xl bg-[#0A382C]/5 dark:bg-[#13231D] border border-[#0A382C]/15 dark:border-[#F0CA50]/20 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#F0CA50]" />
                <span className="font-extrabold text-xs text-[#0A382C] dark:text-[#F0CA50]">
                  {isAr ? 'أو تفعيل إشعار المتصفح اليومي المباشر:' : 'Or Enable Instant Daily Web Notification:'}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-gray-600 dark:text-gray-300 leading-relaxed">
              {isAr
                ? 'إذا كنت تفضل وصول التنبيه مباشرة في هذا المتصفح دون تثبيت إضافات، اضغط على الزر لتفعيل التنبيه اليومي التلقائي.'
                : 'Receive daily reminders directly in your browser without installing the extension.'}
            </p>

            <button
              onClick={handleEnableWebNotification}
              className="w-full py-3 bg-[#0A382C] hover:bg-[#0F4C3A] dark:bg-[#F0CA50] dark:hover:bg-[#D4AF37] text-white dark:text-[#0A261E] font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              <Bell className="w-4 h-4" />
              <span>{testSent ? (isAr ? '✓ تم إرسال إشعار تجريبي بنجاح!' : '✓ Test Notification Sent!') : (isAr ? 'تفعيل التنبيه اليومي في المتصفح الآن' : 'Enable Daily Web Notifications')}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
