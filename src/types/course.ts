// types/course.ts

export interface Course {
  id: string;
  title: string;
  description?: string;
  image: string;
  tags: string;
  // Language can be single string, array, or undefined
  language?: string | string[];
  teacherName: string;
  teacherAvatar: string;
  rating: number;
  learners: number;
  price: number;
  modules: number;
  isNew?: boolean;
  isPremium?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
