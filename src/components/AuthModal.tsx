'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Lock, Sparkles, CheckCircle2, Cloud, ShieldCheck, Flame, ArrowRight, ArrowLeft } from 'lucide-react';
import { useUserStore } from '@/lib/store';
import { UserProfile } from '@/lib/types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { progress, loginUser, logoutUser } = useUserStore();
  const isAr = progress.language === 'ar';

  const [mode, setMode] = useState<'quick' | 'login' | 'register'>('quick');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const handleQuickLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isQuickAuth: true, name: name || 'قارئ مَعِين', email: email || 'user@maeen.app' })
      });
      const data = await res.json();
      if (data.success) {
        loginUser(data.user);
        setSuccessMessage(isAr ? 'تم تسجيل الدخول وتفعيل قاعدة البيانات السحابية بنجاح!' : 'Logged in successfully! Cloud database activated.');
        setTimeout(() => {
          setSuccessMessage('');
          onClose();
        }, 1500);
      }
    } catch (e) {
      console.warn(e);
    }
    setLoading(false);
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const endpoint = mode === 'register' ? '/api/auth/register' : '/api/auth/login';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name || email.split('@')[0], email, password })
      });
      const data = await res.json();
      if (data.success) {
        loginUser(data.user);
        setSuccessMessage(isAr ? 'تم بنجاح! بياناتك ووردك محفوظان سحابياً الآن.' : 'Success! Your reading progress is now synced to the cloud.');
        setTimeout(() => {
          setSuccessMessage('');
          onClose();
        }, 1500);
      }
    } catch (e) {
      console.warn(e);
    }
    setLoading(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md overflow-hidden glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#C9A227]/40 dark:border-[#F0CA50]/50"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 left-5 rtl:left-auto rtl:right-5 p-2 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* If already logged in, show User Profile Dashboard */}
          {progress.user ? (
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 rounded-3xl bg-[#0A382C] text-[#F0CA50] flex items-center justify-center text-2xl font-black mx-auto shadow-md border border-[#F0CA50]/40">
                {progress.user.avatar || 'م'}
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-extrabold text-[#0A382C] dark:text-[#FFFFFF]">
                  {progress.user.name}
                </h3>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                  {progress.user.email}
                </span>
              </div>

              {/* Status Pills */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center space-y-1">
                  <div className="flex items-center justify-center gap-1 text-amber-500 font-bold text-xs">
                    <Flame className="w-4 h-4 fill-current" />
                    <span>{isAr ? 'أيام الاستمرار' : 'Streak'}</span>
                  </div>
                  <span className="text-lg font-black text-amber-600 dark:text-amber-400">
                    {progress.user.streak} {isAr ? 'أيام' : 'Days'}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-1">
                  <div className="flex items-center justify-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                    <Cloud className="w-4 h-4" />
                    <span>{isAr ? 'حالة السحابة' : 'Cloud Sync'}</span>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-300">
                    {isAr ? '🟢 متزامن ونشط' : '🟢 Active & Synced'}
                  </span>
                </div>
              </div>

              {/* Stats Summary */}
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#101915] border border-gray-200/60 dark:border-white/10 text-xs text-gray-600 dark:text-gray-300 flex items-center justify-between">
                <span>{isAr ? 'الصفحات المقروءة:' : 'Pages Read:'}</span>
                <span className="font-extrabold text-[#0A382C] dark:text-[#F0CA50]">
                  {progress.completedPages.length} / 604
                </span>
              </div>

              <button
                onClick={() => {
                  logoutUser();
                  onClose();
                }}
                className="w-full py-3.5 rounded-2xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 font-bold text-xs hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors border border-red-200 dark:border-red-800"
              >
                {isAr ? 'تسجيل الخروج' : 'Log Out'}
              </button>
            </div>
          ) : (
            /* Login / Register Interface */
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-[#0A382C] text-[#F0CA50] flex items-center justify-center mx-auto shadow-md border border-[#F0CA50]/30">
                  <User className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-extrabold text-[#0A382C] dark:text-[#FFFFFF]">
                  {isAr ? 'تسجيل الدخول والمزامنة السحابية' : 'Account Login & Cloud Sync'}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {isAr ? 'احفظ وردك، ملاحظاتك، وختمتك في قاعدة بيانات سحابية آمنة' : 'Sync your reading progress, notes, and streak securely'}
                </p>
              </div>

              {/* Mode Selector Tabs */}
              <div className="flex bg-gray-100 dark:bg-[#101915] p-1.5 rounded-2xl text-xs font-bold border border-gray-200 dark:border-white/10">
                <button
                  onClick={() => setMode('quick')}
                  className={`flex-1 py-2 rounded-xl transition-all ${
                    mode === 'quick' ? 'bg-[#0A382C] text-white dark:bg-[#F0CA50] dark:text-[#0A261E] shadow-xs' : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {isAr ? '⚡ دخول فوري سهل' : '⚡ Quick Sign In'}
                </button>
                <button
                  onClick={() => setMode('login')}
                  className={`flex-1 py-2 rounded-xl transition-all ${
                    mode === 'login' ? 'bg-[#0A382C] text-white dark:bg-[#F0CA50] dark:text-[#0A261E] shadow-xs' : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {isAr ? 'البريد وكلمة المرور' : 'Email Login'}
                </button>
              </div>

              {successMessage ? (
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 text-center space-y-2 text-emerald-800 dark:text-emerald-200">
                  <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-500 animate-bounce" />
                  <p className="text-xs font-extrabold">{successMessage}</p>
                </div>
              ) : (
                <>
                  {mode === 'quick' ? (
                    <div className="space-y-4">
                      <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-[#1A2621] border border-amber-200 dark:border-[#F0CA50]/30 space-y-2 text-xs text-gray-800 dark:text-gray-200">
                        <div className="flex items-center gap-2 font-bold text-[#0A382C] dark:text-[#F0CA50]">
                          <Sparkles className="w-4 h-4 text-[#F0CA50]" />
                          <span>{isAr ? 'تسجيل دخول فوري بضغطة زر واحدة:' : 'Instant 1-Click Access:'}</span>
                        </div>
                        <p className="leading-relaxed">
                          {isAr
                            ? 'أنشئ حسابك فورياً دون الحاجة لتعقيدات أو تأكيد بريد. سيتم إنشاء قاعدة بيانات سحابية خاصة بك لحفظ كل صفحاتك وملاحظاتك.'
                            : 'Instantly create your cloud profile without long verification. All your pages and notes will be safely synced.'}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block">
                          {isAr ? 'اسمك الكريم (اختياري):' : 'Your Name (Optional):'}
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder={isAr ? 'مثال: عبد الله / فاطمة' : 'e.g. Abdullah'}
                          className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-[#101915] border border-gray-200 dark:border-white/10 text-sm outline-none focus:border-[#F0CA50]"
                        />
                      </div>

                      <button
                        onClick={handleQuickLogin}
                        disabled={loading}
                        className="shimmer-btn w-full py-4 bg-[#F0CA50] hover:bg-[#D4AF37] text-[#0A261E] font-black text-sm rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md"
                      >
                        <Cloud className="w-4 h-4" />
                        <span>{loading ? (isAr ? 'جاري التفعيل...' : 'Activating...') : (isAr ? 'دخول فوري وتفعيل السحابة الآن' : '1-Click Sign In & Sync')}</span>
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleEmailAuth} className="space-y-3.5">
                      {mode === 'register' && (
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                            {isAr ? 'الاسم:' : 'Name:'}
                          </label>
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={isAr ? 'اسمك الكريم' : 'Your Name'}
                            className="w-full p-3 rounded-xl bg-gray-50 dark:bg-[#101915] border border-gray-200 dark:border-white/10 text-sm outline-none focus:border-[#F0CA50]"
                          />
                        </div>
                      )}

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                          {isAr ? 'البريد الإلكتروني:' : 'Email:'}
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="user@example.com"
                          className="w-full p-3 rounded-xl bg-gray-50 dark:bg-[#101915] border border-gray-200 dark:border-white/10 text-sm outline-none focus:border-[#F0CA50]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                          {isAr ? 'كلمة المرور:' : 'Password:'}
                        </label>
                        <input
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full p-3 rounded-xl bg-gray-50 dark:bg-[#101915] border border-gray-200 dark:border-white/10 text-sm outline-none focus:border-[#F0CA50]"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="shimmer-btn w-full py-3.5 bg-[#0A382C] dark:bg-[#F0CA50] text-white dark:text-[#0A261E] font-black text-sm rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md mt-2"
                      >
                        <span>{loading ? (isAr ? 'جاري المعالجة...' : 'Processing...') : (mode === 'register' ? (isAr ? 'إنشاء حساب جديد' : 'Create Account') : (isAr ? 'تسجيل الدخول' : 'Log In'))}</span>
                      </button>

                      <div className="text-center pt-1">
                        <button
                          type="button"
                          onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                          className="text-xs font-bold text-[#0A382C] dark:text-[#F0CA50] hover:underline"
                        >
                          {mode === 'login'
                            ? (isAr ? 'ليس لديك حساب؟ أنشئ حساباً جديداً' : 'No account? Create one')
                            : (isAr ? 'لديك حساب بالفعل؟ سجل دخولك' : 'Already have an account? Log in')}
                        </button>
                      </div>
                    </form>
                  )}
                </>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
