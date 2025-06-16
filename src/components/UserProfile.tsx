import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { User } from '@/types/user';

interface UserProfileProps {
  user: User;
  locale: string;
}

export default function UserProfile({ user, locale }: UserProfileProps) {
  const t = useTranslations('Users.detail');
  
  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="relative">
          {user.image ? (
            <div className="relative w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden">
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
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold border-4 border-white shadow-lg">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        
        <div className="md:flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-800 mb-1">{user.name}</h1>
          <p className="text-gray-500 flex items-center justify-center md:justify-start gap-2 mb-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            {user.email}
          </p>
          
          <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
            {user.isAdmin && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                {t('adminRole')}
              </span>
            )}
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
              {t('active')}
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500 mb-1">{t('userRole')}</h3>
          <p className="text-gray-900">
            {user.isAdmin ? t('adminRole') : t('standardRole')}
          </p>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500 mb-1">{t('bio')}</h3>
          <p className="text-gray-900">
            {user.bio || t('noBio')}
          </p>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500 mb-1">{t('createdAt')}</h3>
          <p className="text-gray-900">
            {user.createdAt ? new Date(user.createdAt).toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }) : t('unknown')}
          </p>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500 mb-1">{t('accountStatus')}</h3>
          <p className="text-gray-900">
            <span className="inline-flex items-center">
              <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
              {t('active')}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
} 