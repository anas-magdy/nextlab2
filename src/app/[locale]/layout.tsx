import '../globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations, getMessages } from 'next-intl/server';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales } from '@/lib/i18n';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const { locale } = await Promise.resolve(params);
  const t = await getTranslations({ locale, namespace: 'Index' });
  
  return {
    title: `${t('title')}`,
    description: t('subtitle'),
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await Promise.resolve(params);
  
  // Validate locale
  if (!locales.includes(locale)) {
    notFound();
  }
  
  const messages = await getMessages({ locale });
  
  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className={`min-h-screen flex flex-col bg-slate-50 ${locale === 'ar' ? 'font-arabic' : 'font-sans'}`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Navigation />
          <main className="flex-grow container mx-auto p-6">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
} 