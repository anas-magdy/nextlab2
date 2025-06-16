import { getTranslations } from 'next-intl/server';

export default async function About({
  params
}: {
  params: { locale: string }
}) {
  const { locale } = await Promise.resolve(params);
  const t = await getTranslations({ locale, namespace: 'About' });
  const features = await getTranslations({ locale, namespace: 'About.features.list' });
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-sm mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          {t('title')}
        </h1>
        <p className="text-lg text-slate-700 leading-relaxed">
          {t('description')}
        </p>
      </div>
      
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center text-black">
          <span className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </span>
          {t('features.title')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 transform hover:scale-[1.01]">
            <div className="flex">
              <div className="bg-blue-500 rounded-full p-2 mr-4 text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">{features('mongodb')}</h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 transform hover:scale-[1.01]">
            <div className="flex">
              <div className="bg-green-500 rounded-full p-2 mr-4 text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">{features('api')}</h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 transform hover:scale-[1.01]">
            <div className="flex">
              <div className="bg-purple-500 rounded-full p-2 mr-4 text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 8a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zm12 0a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">{features('layouts')}</h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 transform hover:scale-[1.01]">
            <div className="flex">
              <div className="bg-yellow-500 rounded-full p-2 mr-4 text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">{features('metadata')}</h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 transform hover:scale-[1.01]">
            <div className="flex">
              <div className="bg-red-500 rounded-full p-2 mr-4 text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">{features('routes')}</h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 transform hover:scale-[1.01]">
            <div className="flex">
              <div className="bg-indigo-500 rounded-full p-2 mr-4 text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">{features('isr')}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center text-black">
          <span className="bg-purple-100 text-purple-600 p-2 rounded-lg mr-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
            </svg>
          </span>
          {t('technologies.title')}
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg text-blue-700 font-medium text-center shadow-sm transform transition-all duration-300 hover:scale-105 hover:shadow">
            Next.js
          </div>
          <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg text-green-700 font-medium text-center shadow-sm transform transition-all duration-300 hover:scale-105 hover:shadow">
            MongoDB
          </div>
          <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg text-purple-700 font-medium text-center shadow-sm transform transition-all duration-300 hover:scale-105 hover:shadow">
            TypeScript
          </div>
          <div className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg text-yellow-700 font-medium text-center shadow-sm transform transition-all duration-300 hover:scale-105 hover:shadow">
            Tailwind CSS
          </div>
          <div className="p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-lg text-red-700 font-medium text-center shadow-sm transform transition-all duration-300 hover:scale-105 hover:shadow">
            React
          </div>
          <div className="p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg text-indigo-700 font-medium text-center shadow-sm transform transition-all duration-300 hover:scale-105 hover:shadow">
            Mongoose
          </div>
        </div>
      </div>
    </div>
  );
} 