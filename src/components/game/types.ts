// src/components/game/types.ts

export interface Player {
    id: string;
    name: string;
    compliments: Compliment[];
  }
  
  export interface Compliment {
    from: string;
    to: string;
    message: string;
    timestamp: number;
  }
  
  export interface GameState {
    roomId: string;
    status: 'waiting' | 'playing' | 'loading' | 'results';
    players: Record<string, Player>;
    currentRound: number;
    maxRounds: number;
    adminId?: string;
  }
  
  export interface RoomCreationProps {
    onRoomCreated: (roomId: string) => void;
  }
  
  export interface RoomJoinProps {
    roomId: string;
    onJoined: (playerId: string) => void;
  }
  
  export interface PlayerSelectionProps {
    roomId: string;
    currentPlayerId: string;
    players: Player[];
  }
  
  export interface ResultsViewProps {
    roomId: string;
    playerId: string;
  }
  
  export interface ComplimentListProps {
    compliments: Compliment[];
  }