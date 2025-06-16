'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Helper for displaying language names
  const languageNames: Record<string, { name: string, nativeName: string, flag: string }> = {
    en: { 
      name: 'English', 
      nativeName: 'English',
      flag: '🇺🇸'
    },
    ar: { 
      name: 'Arabic', 
      nativeName: 'العربية',
      flag: '🇦🇪'
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const switchToLocale = (newLocale: string) => {
    // Find current locale in path and replace it
    const patternToReplace = new RegExp(`^/(${locale})(/|$)`);
    const newPath = pathname.replace(patternToReplace, `/${newLocale}$2`);
    
    // Navigate to the new localized page
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-opacity-20 bg-black-400 backdrop-blur-sm text-white border border-slate-600 rounded-md px-3 py-2 font-medium transition-all hover:border-blue-400 hover:bg-opacity-30 focus:outline-none"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="mr-1">{languageNames[locale].flag}</span>
        <span>{languageNames[locale].nativeName}</span>
        <svg className="h-4 w-4 fill-current ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 animate-fadeIn">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {Object.entries(languageNames).map(([key, value]) => (
              <button
                key={key}
                onClick={() => switchToLocale(key)}
                className={`${
                  locale === key ? 'bg-slate-100 text-slate-900' : 'text-slate-700'
                } flex items-center w-full text-left px-4 py-2 text-sm hover:bg-slate-100 transition-colors`}
                role="menuitem"
              >
                <span className="mr-2">{value.flag}</span>
                <span>{value.nativeName}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 