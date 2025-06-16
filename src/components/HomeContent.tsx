'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

type Props = {
    locale: string;
};

export default function HomeContent({ locale }: Props) {
    const t = useTranslations('Home');
    const currentLocale = useLocale();
    const isRTL = currentLocale === 'ar';

    return (
        <main className="min-h-screen bg-gray-50" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Hero Section */}
            <section className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                    {t('hero.title')}
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    {t('hero.subtitle')}
                </p>
            </section>

            {/* Features Grid */}
            <section className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Development Tools Card */}
                    <div className="bg-white border border-gray-200 rounded-2xl hover:shadow-lg transition-all duration-300 overflow-hidden group">
                        <div className="p-8">
                            <div className={`w-14 h-14 rounded-xl bg-blue-500 flex items-center justify-center mb-6 ${isRTL ? 'ml-auto' : 'mr-auto'}`}>
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                            </div>
                            <h3 className={`text-xl font-semibold mb-4 text-gray-900 ${isRTL ? 'text-right' : 'text-left'}`}>
                                {t('cards.development.title')}
                            </h3>
                            <p className={`text-gray-600 mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                                {t('cards.development.description')}
                            </p>
                            <div className={`flex ${isRTL ? 'justify-start' : 'justify-end'}`}>
                                <Link
                                    href={`/${currentLocale}/about`}
                                    className={`inline-flex items-center px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 ${isRTL ? 'flex-row-reverse' : ''}`}
                                >
                                    {t('cards.development.button')}
                                    <svg className={`w-5 h-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Learning Resources Card */}
                    <div className="bg-white border border-gray-200 rounded-2xl hover:shadow-lg transition-all duration-300 overflow-hidden group">
                        <div className="p-8">
                            <div className={`w-14 h-14 rounded-xl bg-purple-500 flex items-center justify-center mb-6 ${isRTL ? 'ml-auto' : 'mr-auto'}`}>
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className={`text-xl font-semibold mb-4 text-gray-900 ${isRTL ? 'text-right' : 'text-left'}`}>
                                {t('cards.learning.title')}
                            </h3>
                            <p className={`text-gray-600 mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                                {t('cards.learning.description')}
                            </p>
                            <div className={`flex ${isRTL ? 'justify-start' : 'justify-end'}`}>
                                <Link
                                    href={`/${currentLocale}/users`}
                                    className={`inline-flex items-center px-6 py-2.5 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 ${isRTL ? 'flex-row-reverse' : ''}`}
                                >
                                    {t('cards.learning.button')}
                                    <svg className={`w-5 h-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Community Hub Card */}
                    <div className="bg-white border border-gray-200 rounded-2xl hover:shadow-lg transition-all duration-300 overflow-hidden group">
                        <div className="p-8">
                            <div className={`w-14 h-14 rounded-xl bg-green-500 flex items-center justify-center mb-6 ${isRTL ? 'ml-auto' : 'mr-auto'}`}>
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className={`text-xl font-semibold mb-4 text-gray-900 ${isRTL ? 'text-right' : 'text-left'}`}>
                                {t('cards.community.title')}
                            </h3>
                            <p className={`text-gray-600 mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                                {t('cards.community.description')}
                            </p>
                            <div className={`flex ${isRTL ? 'justify-start' : 'justify-end'}`}>
                                <Link
                                    href={`/${currentLocale}/about`}
                                    className={`inline-flex items-center px-6 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 ${isRTL ? 'flex-row-reverse' : ''}`}
                                >
                                    {t('cards.community.button')}
                                    <svg className={`w-5 h-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
} 