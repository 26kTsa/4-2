export enum Dimension {
  EI = 'EI', // Extraversion (E) vs Introversion (I)
  SN = 'SN', // Sensing (S) vs Intuition (N)
  TF = 'TF', // Thinking (T) vs Feeling (F)
  JP = 'JP', // Judging (J) vs Perceiving (P)
}

export enum MBTIPole {
  E = 'E',
  I = 'I',
  S = 'S',
  N = 'N',
  T = 'T',
  F = 'F',
  J = 'J',
  P = 'P',
}

export interface Question {
  id: number;
  text: string;
  options: {
    A: { text: string; pole: MBTIPole };
    B: { text: string; pole: MBTIPole };
  };
  part: number;
}

export interface QuizResult {
  type: string;
  scores: {
    E: number;
    I: number;
    S: number;
    N: number;
    T: number;
    F: number;
    J: number;
    P: number;
  };
  percentages: {
    EI: number;
    SN: number;
    TF: number;
    JP: number;
  };
}
