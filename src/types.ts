export interface UserProfile {
  uid: string;
  email?: string;
  displayName?: string;
  role: 'student' | 'admin';
  onboarded?: boolean;
  targetPercentage?: string;
  hardSubjects?: string[];
  studyHours?: string;
  learningPreference?: string;
  examDate?: string;
  streak?: number;
  lastStudyDate?: string;
  points?: number;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
}

export interface Chapter {
  id: string;
  subjectId: string;
  title: string;
  description?: string;
  videoUrl?: string;
  pdfUrl?: string;
  notes?: string;
  order: number;
  features?: {
    video: boolean;
    pdf: boolean;
    test: boolean;
    notes: boolean;
  };
}

export interface Progress {
  userId: string;
  chapterId: string;
  subjectId: string;
  completed: boolean;
  testScore?: number;
  lastUpdated: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Quiz {
  chapterId: string;
  questions: QuizQuestion[];
}
