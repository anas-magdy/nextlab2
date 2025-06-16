export interface User {
  _id: string;
  name: string;
  email: string;
  image?: string;
  bio?: string;
  createdAt: string;
  isAdmin?: boolean;
  updatedAt?: string;
}
