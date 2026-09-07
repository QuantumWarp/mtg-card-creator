export interface Puzzle {
  complexity: number;
  id: string;
  categories: string[];
  cards: PuzzleCard[];
  setup: string[];
  question: string;
  answer: string;
  explanation: string[];
}

export interface PuzzleCard {
  name: string,
  setCode: string,
  afterReveal?: boolean;
}