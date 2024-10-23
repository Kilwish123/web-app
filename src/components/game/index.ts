// src/components/game/index.ts

export { default as RoomCreation } from './RoomCreation';
export { RoomJoin } from './RoomJoin';
export { PlayerSelection } from './PlayerSelection';
export { ResultsView } from './ResultsView';
export { default as ComplimentsList } from './ComplimentsList';

// Also export types if needed
export type { 
  Player,
  Compliment,
  ComplimentListProps,
  RoomCreationProps,
  RoomJoinProps
} from './types';