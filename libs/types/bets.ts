export interface QuestionType {
  questionId: number;
  description: string;
  choices: string[];
  percentage: number[];
  answer: number | null;
}

export interface APIQuestionInterface {
  questionId: number;
  realAnswer: number | null;
  description: string;
  choices: string[];
  percentage: number[];
}

export interface APIBetInterface {
  questionId: number;
  myAnswer: number | null;
}
