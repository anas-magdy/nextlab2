'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface SeedDatabaseButtonProps {
  locale: string; // Keeping this for future use but marking it intentionally unused
}

export default function SeedDatabaseButton({ locale: _locale }: SeedDatabaseButtonProps) {
  const t = useTranslations('Users.list');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  
  async function seedDatabase() {
    try {
      setIsLoading(true);
      setMessage(null);
      
      const res = await fetch('/api/seed', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache' // Ensure we don't get cached response
        }
      });
      
      // Check if response is JSON
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('API returned non-JSON response:', await res.text());
        setMessage(t('seedError'));
        return;
      }
      
      const data = await res.json();
      
      if (data.success) {
        // Success! Refresh the page to show the new users
        setMessage(t('seedSuccess'));
        
        // Force a cache invalidation and refresh
        await fetch('/api/users', { 
          method: 'GET',
          headers: { 'Cache-Control': 'no-cache' }
        });
        
        router.refresh();
      } else {
        // Show message to user
        setMessage(data.error || data.message || t('seedError'));
      }
    } catch (error) {
      console.error('Error seeding database:', error);
      setMessage(t('seedError'));
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <div>
      <button
        onClick={seedDatabase}
        disabled={isLoading}
        className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg font-medium hover:bg-emerald-200 transition-colors inline-flex items-center gap-2 disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-4 w-4 text-emerald-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {t('seeding')}
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path>
            </svg>
            {t('seedDatabase')}
          </>
        )}
      </button>
      
      {message && (
        <p className={`mt-2 text-sm ${message === t('seedSuccess') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
} 