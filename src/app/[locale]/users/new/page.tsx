import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import AddUserForm from '@/components/AddUserForm';

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await Promise.resolve(params);
  const t = await getTranslations({ locale, namespace: 'Users.new' });
  
  return {
    title: `${t('title')} - Next.js Lab Task`,
    description: t('description'),
  };
}

export default async function NewUserPage({
  params
}: {
  params: { locale: string };
}) {
  const { locale } = await Promise.resolve(params);
  const t = await getTranslations({ locale, namespace: 'Users.new' });
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <Link 
          href={`/${locale}/users`} 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          {t('backToList')}
        </Link>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">{t('title')}</h1>
        <p className="text-gray-600 mb-6">{t('description')}</p>
        
        <AddUserForm locale={locale} />
      </div>
    </div>
  );
} 