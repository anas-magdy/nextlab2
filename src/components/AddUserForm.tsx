'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageUpload from './ImageUpload';
import { useTranslations } from 'next-intl';

interface AddUserFormProps {
  locale: string;
}

export default function AddUserForm({ locale }: AddUserFormProps) {
  const t = useTranslations('Users.form');
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formTouched, setFormTouched] = useState({
    name: false,
    email: false,
  });
  
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const nameError = formTouched.name && !name.trim() ? t('nameRequired') : '';
  const emailError = formTouched.email && !isValidEmail(email) ? t('emailInvalid') : '';
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched for validation
    setFormTouched({
      name: true,
      email: true,
    });
    
    // Check validation
    if (!name.trim() || !isValidEmail(email)) {
      return;
    }
    
    setIsLoading(true);
    setError('');
    setSuccess(false);
    
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        },
        body: JSON.stringify({ name, email, image }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create user');
      }
      
      // Clear form and show success message
      setName('');
      setEmail('');
      setImage('');
      setFormTouched({ name: false, email: false });
      setSuccess(true);
      
      // Invalidate cache for users list
      await fetch('/api/users', { 
        method: 'GET',
        headers: { 'Cache-Control': 'no-cache' }
      });
      
      // Navigate to users list after a short delay so users see the success message
      setTimeout(() => {
        router.push(`/${locale}/users`);
        router.refresh(); 
      }, 1500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md flex items-start">
          <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>{error}</span>
        </div>
      )}
      
      {success && (
        <div className="p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-md flex items-start">
          <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span>User created successfully! Redirecting to users list...</span>
        </div>
      )}
      
      {/* Image Upload */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {t('profileImage')}
        </label>
        <ImageUpload 
          value={image} 
          onChange={setImage} 
          username={name}
        />
        <p className="mt-2 text-sm text-gray-500">{t('imageHint')}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            {t('name')} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setFormTouched(prev => ({ ...prev, name: true }))}
            placeholder={t('name')}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all text-gray-800 ${
              nameError 
                ? 'border-red-300 focus:ring-red-200 bg-red-50' 
                : 'border-gray-300 focus:ring-blue-200 focus:border-blue-400'
            } placeholder-gray-400`}
            required
          />
          {nameError && (
            <p className="mt-1 text-sm text-red-600">{nameError}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            {t('email')} <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setFormTouched(prev => ({ ...prev, email: true }))}
            placeholder="example@email.com"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all text-gray-800 ${
              emailError 
                ? 'border-red-300 focus:ring-red-200 bg-red-50' 
                : 'border-gray-300 focus:ring-blue-200 focus:border-blue-400'
            } placeholder-gray-400`}
            required
          />
          {emailError && (
            <p className="mt-1 text-sm text-red-600">{emailError}</p>
          )}
        </div>
      </div>
      
      <div className="pt-6 border-t border-gray-200 mt-8">
        <button
          type="submit"
          disabled={isLoading || success}
          className={`w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all ${
            isLoading || success ? 'opacity-70 cursor-not-allowed' : 'hover:from-blue-600 hover:to-blue-800'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t('submitting')}
            </span>
          ) : success ? 'Success!' : t('submit')}
        </button>
      </div>
    </form>
  );
} 