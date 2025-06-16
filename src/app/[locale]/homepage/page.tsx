import { Metadata } from 'next';
import UserProfileCard from '@/components/UserProfileCard';

// Sample user data matching the image shown
const sampleUser = {
  _id: '123',
  name: 'Ahmed',
  email: 'zztamer63@gmail.com',
  createdAt: '2025-05-22T12:00:00Z', // May 22, 2025
  isAdmin: true
};

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await Promise.resolve(params);
  return {
    title: `User Profile Example - Next.js Lab Task`,
    description: `Example of user profile card component for ${locale} locale`,
  };
}

export default async function HomePage({
  params
}: {
  params: { locale: string };
}) {
  const { locale: _locale } = await Promise.resolve(params);
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">User Profile Card Example</h1>
      
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Blue Variant</h2>
          <UserProfileCard user={sampleUser} variant="blue" />
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">White Variant</h2>
          <UserProfileCard user={sampleUser} variant="white" />
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <p className="text-sm text-gray-600">
          This is an example page showcasing the UserProfileCard component with different variants.
          The sample user data has been configured to match the requirements.
        </p>
      </div>
    </div>
  );
} 