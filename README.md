# Next.js Lab Project

This project demonstrates various Next.js features including MongoDB integration, internationalization, and more.

## Features

- MongoDB integration for user data management
- Custom API routes for handling GET and POST requests
- Different layout implementations for various sections
- Dynamic metadata generation for each page
- Static and dynamic routes
- Incremental Site Regeneration
- Internationalization (English and Arabic)
- Image uploads

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### Installation

1. Clone the repository or download the files
2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory with the following content:

```
# MongoDB Connection String
MONGODB_URI="mongodb://localhost:27017/next-lab"

# API URL (used for client-side API calls)
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

_Note: Replace the MongoDB URI with your own if you're using MongoDB Atlas or a different connection string._

### Running the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

- `/src/app` - The main application
  - `/[locale]` - Internationalized routes
    - `/users` - User management
    - `/about` - About page
- `/src/components` - Reusable components
- `/src/lib` - Utility functions and database connection
- `/src/models` - MongoDB models
- `/src/types` - TypeScript type definitions
- `/messages` - Internationalization messages (en/ar)

## Implemented Tasks

1. MongoDB integration for user data
2. Local API instead of JSONPlaceholder
3. Different layouts for different sections
4. Dynamic metadata for each page
5. Static and dynamic routes with ISR
6. Internationalization (en/ar)
7. User image upload

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
