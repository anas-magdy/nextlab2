import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import UserProfile from '@/components/UserProfile';
import DeleteUserButton from '@/components/DeleteUserButton';
import { User } from '@/types/user';

export async function generateMetadata({
  params
}: {
  params: { locale: string; id: string };
}): Promise<Metadata> {
  const { locale, id } = await Promise.resolve(params);
  const t = await getTranslations({ locale, namespace: 'Users.detail' });
  
  try {
    const user = await getUser(id);
    return {
      title: `${user.name} - ${t('title')}`,
      description: `${t('metaDescription', { name: user.name, email: user.email })}`,
    };
  } catch {
    // Ignore the error, we'll return the fallback metadata
    return {
      title: t('userNotFound'),
      description: t('userNotFoundDescription'),
    };
  }
}

async function getUser(id: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/users/${id}`, {
    next: { revalidate: 60 }
  });
  
  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }
    throw new Error('Failed to fetch user');
  }
  
  return res.json();
}

export default async function UserPage({
  params
}: {
  params: { locale: string; id: string };
}) {
  const { locale, id } = await Promise.resolve(params);
  const t = await getTranslations({ locale, namespace: 'Users.detail' });
  
  let user: User;
  try {
    user = await getUser(id);
  } catch {
    // Catch and redirect to 404 page
    notFound();
  }
  
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
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <UserProfile user={user} locale={locale} />
        
        <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
          <Link 
            href={`/${locale}/users/${id}/edit`} 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
            {t('editUser')}
          </Link>
          
          <DeleteUserButton userId={id} userName={user.name} locale={locale} />
        </div>
      </div>
    </div>
  );
} 