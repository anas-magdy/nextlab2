'use client';

import Image from 'next/image';
import { User } from '@/types/user';
import { useTranslations } from 'next-intl';

interface UserProfileCardProps {
  user: User;
  variant?: 'blue' | 'white'; // Allow different color variants
}

export default function UserProfileCard({ user, variant = 'blue' }: UserProfileCardProps) {
  const t = useTranslations('Users.profile');
  
  // Background classes based on variant
  const bgClasses = variant === 'blue' 
    ? 'bg-blue-500' 
    : 'bg-white border border-gray-200';
  
  // Text color based on variant
  const textClasses = variant === 'blue'
    ? 'text-white'
    : 'text-gray-800';
  
  // Format date
  const formattedDate = new Date(user.createdAt).toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  });
  
  return (
    <div className={`rounded-lg shadow-md overflow-hidden ${bgClasses}`}>
      <div className="p-6 flex items-center gap-5">
        {/* User Avatar */}
        {user.image ? (
          <div className="relative w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden flex-shrink-0">
            <Image
              src={user.image}
              alt={user.name}
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-full"
              unoptimized={user.image?.startsWith('data:')}
            />
          </div>
        ) : (
          <div className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold bg-white text-blue-500 border-4 border-white shadow-md flex-shrink-0`}>
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}
        
        {/* User Info */}
        <div className="flex flex-col">
          <h2 className={`text-3xl font-bold mb-1 ${textClasses}`}>{user.name}</h2>
          <div className={`flex items-center gap-2 mb-2 ${textClasses}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            <span>{user.email}</span>
          </div>
          
          <div className={`inline-block ${variant === 'blue' ? 'bg-blue-600 bg-opacity-50' : 'bg-gray-100'} rounded-full px-3 py-1 text-sm ${textClasses}`}>
            <span>{t('memberSince')} {formattedDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 