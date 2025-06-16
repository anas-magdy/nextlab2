'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

/**
 * Props for the ImageUpload component
 * @property {string} value - Current image URL or data URL
 * @property {function} onChange - Callback when image changes
 * @property {string} username - Optional username to generate initials for avatar placeholder
 */
interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  username?: string;
}


export default function ImageUpload({ value, onChange, username = '' }: ImageUploadProps) {
  // State management
  const [preview, setPreview] = useState<string>(value); // Image preview URL
  const [loading, setLoading] = useState(false); // Loading state during upload
  const [dragActive, setDragActive] = useState(false); // Track if user is dragging a file
  const fileInputRef = useRef<HTMLInputElement>(null); // Reference to hidden file input
  const t = useTranslations('Users.form'); // Translations
  
  // Sync preview with external value changes
  useEffect(() => {
    if (value) {
      setPreview(value);
    }
  }, [value]);
  
  /**
   * Handle file selection from input element
   */
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    processFile(e.target.files[0]);
  };
  
  /**
   * Process the selected image file
   * Validates file type, creates preview, and handles the upload process
   */
  const processFile = async (file: File) => {
    // Validate file is an image
    if (!file.type.startsWith('image/')) {
      console.error('Please upload an image file');
      return;
    }
    
    // Convert file to data URL for preview
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      const result = fileReader.result as string;
      setPreview(result);
      onChange(result); // Pass data URL to parent component
    };
    fileReader.readAsDataURL(file);
    
    // Show loading indicator
    setLoading(true);
    
    try {
      // Simulate server upload process
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error: unknown) {
      console.error('Error uploading image:', error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };
  
  /**
   * Trigger file input click when upload area is clicked
   */
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  /**
   * Handle drag events for drag-and-drop functionality
   */
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Update UI based on drag state
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  /**
   * Process dropped file when user drops an image
   */
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    // Process the dropped file if it exists
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };
  
  /**
   * Generate user initials for avatar placeholder
   */
  const getInitials = () => {
    if (username && username.trim()) {
      return username.trim().charAt(0).toUpperCase();
    }
    return 'U'; // Default initial if no username provided
  };
  
  return (
    <div className="flex flex-col items-center">
      {/* Hidden file input element */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      
      {/* Upload area with drag-and-drop support */}
      <div 
        onClick={handleClick}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`w-40 h-40 border-2 ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-dashed border-gray-300'} rounded-full flex items-center justify-center cursor-pointer overflow-hidden relative hover:border-blue-400 transition-all shadow-sm hover:shadow-md`}
      >
        {loading ? (
          // Loading spinner during upload
          <div className="flex flex-col items-center justify-center text-gray-500 z-10 bg-white bg-opacity-80 absolute inset-0">
            <svg className="animate-spin h-10 w-10 text-blue-500 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-sm font-medium">{t('uploading') || 'Uploading...'}</span>
          </div>
        ) : preview ? (
          // Image preview when an image is selected
          <>
            <div className="relative w-full h-full">
              <Image
                src={preview}
                alt="User avatar"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-full"
                unoptimized={preview.startsWith('data:')}
              />
            </div>
            {/* Overlay with camera icon on hover */}
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 flex items-center justify-center transition-all rounded-full opacity-0 hover:opacity-100">
              <div className="bg-white rounded-full p-2 shadow-md">
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
            </div>
          </>
        ) : (
          // Default placeholder with user initials when no image
          <div className="flex flex-col items-center justify-center text-gray-500">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mb-2 text-white font-bold text-2xl">
              {getInitials()}
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-blue-500">{t('clickToUpload') || 'Click to upload'}</p>
              <p className="text-xs text-gray-500 mt-1">{t('orDragDrop') || 'or drag and drop'}</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Image action buttons (change/remove) */}
      {preview && (
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={handleClick}
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
            </svg>
            {t('changeImage') || 'Change'}
          </button>
          <button
            type="button"
            onClick={() => {
              setPreview('');
              onChange('');
              if (fileInputRef.current) {
                fileInputRef.current.value = '';
              }
            }}
            className="text-sm text-red-600 hover:text-red-800 hover:underline transition-colors flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
            {t('removeImage') || 'Remove'}
          </button>
        </div>
      )}
    </div>
  );
}