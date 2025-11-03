export interface Puzzle {
  complexity: number;
  title: string;
  categories: string[];
  setup: string[];
  question: string;
  answer: string;
  explanation: string[];
}
