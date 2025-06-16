import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function Home({
  params
}: {
  params: { locale: string }
}) {
  // Await params before destructuring
  const { locale } = await Promise.resolve(params);
  const t = await getTranslations({ locale, namespace: 'Index' });
  
  return (
    <div className="py-10">
      <h1 className="text-4xl font-bold mb-8 text-center">{t('title')}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-black">{t('mongodb.title')}</h2>
          <p className="text-gray-600 mb-4">
            {t('mongodb.description')}
          </p>
          <Link 
            href="/users" 
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {t('mongodb.button')}
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-black">{t('layouts.title')}</h2>
          <p className="text-gray-600 mb-4">
            {t('layouts.description')}
          </p>
          <Link 
            href="/about" 
            className="inline-block px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            {t('layouts.button')}
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-black ">{t('metadata.title')}</h2>
          <p className="text-gray-600 mb-4">
            {t('metadata.description')}
          </p>
          <Link 
            href="/users" 
            className="inline-block px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            {t('metadata.button')}
          </Link>
        </div>
      </div>
    </div>
  );
} 