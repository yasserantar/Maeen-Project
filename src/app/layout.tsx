'use client';

import React, { useState, useEffect } from 'react';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SearchModal } from '@/components/SearchModal';
import { NotificationSettingsModal } from '@/components/NotificationSettingsModal';
import { UserStoreProvider, useUserStore } from '@/lib/store';

function MainLayoutContent({ children }: { children: React.ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const { progress } = useUserStore();
  const isAr = progress.language === 'ar';

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => console.log('SW registered', reg))
        .catch((err) => console.warn('SW reg error', err));
    }

    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallClick = () => {
    if (installPrompt) {
      installPrompt.prompt();
      installPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          setInstallPrompt(null);
        }
      });
    }
  };

  return (
    <div className="antialiased min-h-screen flex flex-col justify-between">
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenNotifications={() => setIsNotificationOpen(true)}
        onInstallApp={handleInstallClick}
        canInstall={Boolean(installPrompt)}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {children}
      </main>

      <Footer />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <NotificationSettingsModal isOpen={isNotificationOpen} onClose={() => setIsNotificationOpen(false)} />
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <title>مَعِين | معينك اليومي من القرآن والسنة</title>
        <meta name="description" content="منصة إسلامية موثوقة تقدم صفحة يومية من القرآن الكريم مع التفسير المعتمد وتلاوة متواصلة، مع حديث نبوي صحيح وأثره في حياتنا اليومية." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0A382C" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="مَعِين" />

        {/* OpenGraph / Social Media Card Metadata for LinkedIn, Facebook, WhatsApp */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://maeen-app-five.vercel.app" />
        <meta property="og:title" content="مَعِين | معينك اليومي من القرآن والسنة" />
        <meta property="og:description" content="صفحة يومية من القرآن الكريم برسم مصحف المدينة بتفسيرها وتلاوتها، مع حديث نبوي صحيح وأثره العملي في حياتنا." />
        <meta property="og:image" content="https://maeen-app-five.vercel.app/opengraph-image" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="منصة مَعِين" />

        {/* Twitter Card Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://maeen-app-five.vercel.app" />
        <meta name="twitter:title" content="مَعِين | معينك اليومي من القرآن والسنة" />
        <meta name="twitter:description" content="صفحة يومية من القرآن الكريم بتفسيرها وتلاوتها، مع حديث نبوي صحيح وأثره العملي." />
        <meta name="twitter:image" content="https://maeen-app-five.vercel.app/opengraph-image" />
      </head>
      <body>
        <UserStoreProvider>
          <MainLayoutContent>{children}</MainLayoutContent>
        </UserStoreProvider>
      </body>
    </html>
  );
}
