import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await Promise.resolve(params);
  const t = await getTranslations({ locale, namespace: 'About' });
  
  return {
    title: `${t('title')} - Next.js Lab Task`,
    description: t('description'),
  };
}

export default async function AboutLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await Promise.resolve(params);
  const t = await getTranslations({ locale, namespace: 'About' });
  
  return (
    <div className="bg-blue-50 rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">{t('title')}</h1>
      <div className="bg-white shadow-md rounded-lg p-6 border-l-4 border-blue-500">
        {children}
      </div>
    </div>
  );
} 