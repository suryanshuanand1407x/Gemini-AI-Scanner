export interface JobDetails {
  company: string;
  title: string;
  type: string;
  description: string;
  responsibilities: string;
}

export interface Question {
  type: 'experience' | 'technical' | 'critical_thinking' | 'cultural' | 'motivation';
  question: string;
  evaluation_criteria: string[];
  time_limit: number;
}

export interface ScreeningQuestions {
  questions: Question[];
}