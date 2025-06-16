'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

const languageNames = {
  en: {
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸'
  },
  ar: {
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇸🇦'
  }
};

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div className="flex items-center space-x-2">
      {Object.entries(languageNames).map(([code, { flag, nativeName }]) => (
        <button
          key={code}
          onClick={() => handleLocaleChange(code)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1.5
            ${locale === code 
              ? 'bg-indigo-100 text-indigo-700 ring-2 ring-indigo-500/20' 
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          aria-label={`Switch to ${nativeName}`}
        >
          <span className="text-base">{flag}</span>
          <span>{code.toUpperCase()}</span>
        </button>
      ))}
    </div>
  );
} 