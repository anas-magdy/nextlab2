import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { User } from '@/types/user';
import SeedDatabaseButton from '@/components/SeedDatabaseButton';

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await Promise.resolve(params);
  const t = await getTranslations({ locale, namespace: 'Users.list' });
  
  return {
    title: `${t('title')} - Next.js Lab Task`,
    description: 'View all users in our Next.js application',
  };
}

async function getUsers() {
  try {
    // Using the absolute URL to our API
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/users`, {
      next: { revalidate: 60 } // ISR - revalidate every 60 seconds
    });
    
    if (!res.ok && res.status !== 200) {
      console.error('API responded with status:', res.status);
      return { users: [] }; // Return empty array on error
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    return { users: [] }; // Return empty array on error
  }
}

interface UsersResponse {
  users: User[];
}

export default async function Users({
  params
}: {
  params: { locale: string };
}) {
  // Get translations using getTranslations instead of useTranslations
  const { locale } = await Promise.resolve(params);
  const t = await getTranslations({ locale, namespace: 'Users.list' });
  const data = await getUsers() as UsersResponse;
  const users = data.users || [];
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600 mb-2">
            {t('title')}
          </h2>
          <p className="text-slate-500">{t('subtitle')}</p>
        </div>
        <Link
          href={`/${locale}/users/new`}
          className="px-5 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          {t('addNew')}
        </Link>
      </div>
      
      {users.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <svg className="w-16 h-16 mx-auto text-slate-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
          </svg>
          <h3 className="text-xl font-medium text-slate-700 mb-2">{t('empty')}</h3>
          <p className="text-slate-500 mb-6">{t('emptyDescription')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/users/new`}
              className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              {t('addFirst')}
            </Link>
            
            <SeedDatabaseButton locale={locale} />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user: User) => (
            <Link key={user._id} href={`/${locale}/users/${user._id}`} className="block">
              <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] hover:border-blue-100">
                <div className="flex items-center space-x-4">
                  {user.image ? (
                    <div className="relative w-14 h-14 rounded-full border-2 border-slate-200 overflow-hidden">
                      <Image
                        src={user.image}
                        alt={user.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="rounded-full"
                        unoptimized={user.image.startsWith('data:')}
                      />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xl font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-lg text-slate-800">{user.name}</h3>
                    <p className="text-slate-500 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                      {user.email}
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <span className="text-sm text-slate-500 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    {t('viewDetails')}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
} 
