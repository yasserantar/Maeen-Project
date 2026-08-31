'use client';

import React, { useState } from 'react';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SearchModal } from '@/components/SearchModal';
import { useUserStore } from '@/lib/store';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { progress } = useUserStore();
  const isAr = progress.language === 'ar';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'مَعِين | Maeen',
    url: 'https://maeen.app',
    description: 'منصة إسلامية موثوقة تقدم صفحة يومية من القرآن الكريم مع التفسير المعتمد وحديثاً صحيحاً يومياً من أمهات كتب السنة النبوية.',
    inLanguage: ['ar', 'en'],
    publisher: {
      '@type': 'Organization',
      name: 'Maeen Platform'
    }
  };

  return (
    <html lang={isAr ? 'ar' : 'en'} dir={isAr ? 'rtl' : 'ltr'}>
      <head>
        <title>مَعِين | معينك اليومي من القرآن والسنة</title>
        <meta name="description" content="صفحة يومية من القرآن الكريم بتفسير موثق وحديث صحيح يومي من أمهات كتب السنة النبوية." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0F4C3A" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col justify-between">
        <div>
          <Navbar onOpenSearch={() => setIsSearchOpen(true)} />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </div>

        <Footer />
        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      </body>
    </html>
  );
}
