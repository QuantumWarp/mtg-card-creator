export interface Puzzle {
  complexity: number;
  id: string;
  categories: string[];
  setup: string[];
  question: string;
  answer: string;
  explanation: string[];
}
