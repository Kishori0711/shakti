type Course = {
  id: string;
  title: string;
  image: string;
  modules: number;
  teacherName: string;
  teacherAvatar: string;
  rating: number;
  learners: number;
  price: number;
  tags?: string;
  language?: string[];
};