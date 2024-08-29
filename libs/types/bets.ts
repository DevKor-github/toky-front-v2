export interface QuestionType {
  questionId: number;
  description: string;
  choices: string[];
  percentage: number[];
  myAnswer: number | null;
  realAnswer: number | null;
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
