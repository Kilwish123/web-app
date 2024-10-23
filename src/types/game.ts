// File: src/types/game.ts
export interface Player {
  id: string;
  name: string;
  completedCompliments: boolean;
  joinedAt: number;
}

export interface Compliment {
  from: string;
  to: string;
  message: string;
  timestamp: number;
}

export interface GameState {
  id: string;
  status: 'waiting' | 'playing' | 'results';
  players: Record<string, Player>;
  compliments: Record<string, Record<string, Compliment>>;
  currentRound: number;
  maxRounds: number;
  createdAt: number;
}