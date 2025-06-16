'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface DeleteUserButtonProps {
  userId: string;
  userName: string;
  locale: string;
}

export default function DeleteUserButton({ userId, userName, locale }: DeleteUserButtonProps) {
  const t = useTranslations('Users.profile');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  
  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      setError(null);
      
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete user');
      }
      
      // Invalidate users list cache
      await fetch('/api/users', { 
        method: 'GET',
        headers: { 'Cache-Control': 'no-cache' }
      });
      
      // Redirect to users list after successful deletion
      router.push(`/${locale}/users`);
      router.refresh();
    } catch (err) {
      console.error('Error deleting user:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete user');
      setIsConfirmOpen(false);
    } finally {
      setIsDeleting(false);
    }
  };
  
  return (
    <>
      <button
        onClick={() => setIsConfirmOpen(true)}
        className="px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors flex items-center"
        disabled={isDeleting}
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
        </svg>
        {t('deleteUser')}
      </button>
      
      {/* Confirmation Dialog */}
      {isConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
            <h3 className="text-xl font-bold text-gray-900 mb-4">{t('confirmDelete')}</h3>
            <p className="text-gray-600 mb-6">
              {t('confirmDeleteMessage', { name: userName })}
            </p>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setIsConfirmOpen(false)}
                disabled={isDeleting}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                {t('cancel')}
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center"
              >
                {isDeleting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('deleting')}
                  </>
                ) : (
                  t('confirmButton')
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 