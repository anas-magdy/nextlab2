'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');
  const locale = useLocale();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
              Next Lab
            </h3>
            <p className="text-slate-300 text-sm max-w-md">
              {t('description')}
            </p>
          </div>
          
          <div className="flex flex-col space-y-2">
            <h4 className="text-lg font-semibold mb-2">{t('links')}</h4>
            <Link href={`/${locale}`} className="text-slate-300 hover:text-white transition-colors">
              {t('home')}
            </Link>
            <Link href={`/${locale}/users`} className="text-slate-300 hover:text-white transition-colors">
              {t('users')}
            </Link>
            <Link href={`/${locale}/about`} className="text-slate-300 hover:text-white transition-colors">
              {t('about')}
            </Link>
          </div>
        </div>
        
        <div className="border-t border-slate-700 pt-6 mt-6 text-center text-slate-400 text-sm">
          <p>{t('copyright')} © {currentYear}</p>
        </div>
      </div>
    </footer>
  );
} 