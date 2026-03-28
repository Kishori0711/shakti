// // types/course.ts

// // ✅ Base fields - dono pages mein common
// export interface BaseCourse {
//   id: string;
//   title: string;
//   image: string;
//   modules: number;
//   teacherName: string;
//   teacherAvatar: string;
//   tags?: string;
//   language?: string | string[];
// }

// // ✅ Explore page ke extra fields
// export interface ExploreCourse extends BaseCourse {
//   rating: number;
//   learners: number;
//   price: number;
//   originalPrice?: number;
//   isNew?: boolean;
// }

// // ✅ My Courses page ke extra fields
// export interface EnrolledCourse extends BaseCourse {
//   progress: number;           // 0-100
//   completedLessons: number;
//   totalLessons: number;
// }

// // ✅ Combined type for the Card component
// export type CourseCardData = ExploreCourse | EnrolledCourse;

// // ✅ Card variant
// export type CardVariant = "explore" | "enrolled";


// types/courses.ts

// export interface BaseCourse {
//   id: string;
//   title: string;
//   image: string;
//   modules: number;
//   teacherName: string;
//   teacherAvatar: string;
//   tags?: string;
//   language?: string | string[];
// }

// export interface ExploreCourse extends BaseCourse {
//   rating: number;
//   learners: number;
//   price: number;
//   originalPrice?: number;
//   isNew?: boolean;
// }

// export interface EnrolledCourse extends BaseCourse {
//   progress: number;
//   completedLessons: number;
//   totalLessons: number;
// }

// export type CourseCardData = ExploreCourse | EnrolledCourse;
// export type CardVariant = "explore" | "enrolled";

// // ✅ NEW — Lesson types
// export interface Lecture {
//   id: string;
//   title: string;
//   duration: number;
//   isVideo?: boolean;
//   videoUrl?: string;
//   description?: string;
//   isCompleted?: boolean;
//   isLocked?: boolean;
// }

// export interface CurriculumWeek {
//   id: string;
//   title: string;
//   lectures: Lecture[];
//   totalDuration: number;
// }

// export interface LessonResource {
//   id: string;
//   title: string;
//   type: string;
//   size: string;
//   downloadUrl: string;
// }

// // ✅ Full course detail type
// export interface CourseDetail extends BaseCourse {
//   rating: number;
//   learners: number;
//   price: number;
//   originalPrice?: number;
//   isNew?: boolean;
//   specialty?: string;
//   videoUrl?: string;
//   description?: string;

//   // Progress
//   progress?: number;
//   completedLessons?: number;
//   totalLessons?: number;
//   lastWatchedLessonId?: string;
//   lastWatchedTime?: number; // seconds

//   // Detail info
//   totalDuration?: string;
//   downloadableResources?: number;
//   certificate?: string;
//   courseStartDate?: string;

//   // Content
//   overview?: {
//     leftTitle: string;
//     leftItems: string[];
//     rightTitle?: string;
//     rightItems?: string[];
//   };
//   curriculum?: CurriculumWeek[];
//   resources?: LessonResource[];
// }


// types/courses.ts

export interface BaseCourse {
  id: string;
  title: string;
  image: string;
  modules: number;
  teacherName: string;
  teacherAvatar: string;
  tags?: string;
  language?: string | string[];
}

export interface ExploreCourse extends BaseCourse {
  rating: number;
  learners: number;
  price: number;
  originalPrice?: number;
  isNew?: boolean;
}

export interface EnrolledCourse extends BaseCourse {
  progress: number;
  completedLessons: number;
  totalLessons: number;
}

export type CourseCardData = ExploreCourse | EnrolledCourse;
export type CardVariant = "explore" | "enrolled";

// ✅ Lecture — NO isLocked (purchased course = all open)
export interface Lecture {
  id: string;
  title: string;
  duration: string;       // "5:45", "8:35" format
  isVideo?: boolean;
  isDocument?: boolean;    // PDF/document type lecture
  videoUrl?: string;
  description?: string;
  isCompleted?: boolean;   // ✅ completed or not
}

export interface CurriculumWeek {
  id: string;
  title: string;
  lectures: Lecture[];
  lectureCount: number;
  totalDuration: string;   // "20 min" format
}

export interface LessonResource {
  id: string;
  title: string;
  type: string;
  size: string;
  downloadUrl: string;
}

// AI Chat message
export interface AIChatMessage {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp?: string;
  attachment?: {
    name: string;
    size: string;
    type: string;
    url: string;
  };
}

export interface CourseDetail extends BaseCourse {
  rating: number;
  learners: number;
  price: number;
  originalPrice?: number;
  isNew?: boolean;
  specialty?: string;
  videoUrl?: string;
  description?: string;
  progress?: number;
  completedLessons?: number;
  totalLessons?: number;
  lastWatchedLessonId?: string;
  lastWatchedTime?: number;
  totalDuration?: string;
  downloadableResources?: number;
  certificate?: string;
  courseStartDate?: string;
  overview?: {
    leftTitle: string;
    leftItems: string[];
    rightTitle?: string;
    rightItems?: string[];
  };
  curriculum?: CurriculumWeek[];
  resources?: LessonResource[];
}