export interface QuestionType {
  questionId: number;
  description: string;
  choices: string[];
  percentage: number[];
  answer: number | null;
}
