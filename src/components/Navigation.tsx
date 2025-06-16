'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import LocaleSwitcher from './LocaleSwitcher';
import { useState } from 'react';

export default function Navigation() {
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-lg">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href={`/${locale}`} className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Next Lab
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-md hover:bg-slate-700 focus:outline-none" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="space-x-6">
              <Link href={`/${locale}`} className="hover:text-blue-300 transition-colors font-medium">
                {t('home')}
              </Link>
              <Link href={`/${locale}/users`} className="hover:text-blue-300 transition-colors font-medium">
                {t('users')}
              </Link>
              <Link href={`/${locale}/about`} className="hover:text-blue-300 transition-colors font-medium">
                {t('about')}
              </Link>
            </div>
            <LocaleSwitcher />
          </div>
        </div>
        
        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-slate-700 mt-3">
            <div className="flex flex-col space-y-3">
              <Link 
                href={`/${locale}`} 
                className="px-3 py-2 rounded-md hover:bg-slate-700 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('home')}
              </Link>
              <Link 
                href={`/${locale}/users`} 
                className="px-3 py-2 rounded-md hover:bg-slate-700 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('users')}
              </Link>
              <Link 
                href={`/${locale}/about`} 
                className="px-3 py-2 rounded-md hover:bg-slate-700 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('about')}
              </Link>
              <div className="px-3 py-2">
                <LocaleSwitcher />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
} 