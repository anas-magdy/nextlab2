import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await Promise.resolve(params);
  const t = await getTranslations({ locale, namespace: 'Users' });
  
  return {
    title: `${t('title')} - Next.js Lab Task`,
    description: 'View and manage users in Next.js application',
  };
}

export default async function UsersLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await Promise.resolve(params);
  const t = await getTranslations({ locale, namespace: 'Users' });
  
  return (
    <div className="bg-slate-100 rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-6 text-slate-800">{t('title')}</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        {children}
      </div>
    </div>
  );
} 