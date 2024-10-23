// File: src/components/Game.tsx
import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '@/lib/firebase';
import { PlayerSelection } from './game/PlayerSelection';
import { ResultsView } from './game/ResultsView';
import { RoomCreation } from './game/RoomCreation';
import { RoomJoin } from './game/RoomJoin';
import type { GameState } from '@/types/game';

interface GameProps {
  roomId?: string;
  playerId?: string;
  isAdmin?: boolean;
}

const Game: React.FC<GameProps> = ({ roomId, playerId, isAdmin = false }) => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!roomId) {
      setLoading(false);
      return;
    }

    const gameRef = ref(db, `rooms/${roomId}`);
    const unsubscribe = onValue(gameRef, (snapshot) => {
      if (snapshot.exists()) {
        setGameState(snapshot.val());
      } else {
        setError('Room not found');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [roomId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-red-500 to-orange-500">
        <div className="bg-white p-6 rounded-lg shadow-xl">
          <p className="text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-red-500 to-orange-500">
        <div className="bg-white p-6 rounded-lg shadow-xl">
          <p className="text-xl text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  if (isAdmin) {
    return <RoomCreation onRoomCreated={(newRoomId) => {
      window.location.href = `/join/${newRoomId}`;
    }} />;
  }

  if (!playerId && roomId) {
    return <RoomJoin roomId={roomId} onJoined={(newPlayerId) => {
      window.location.href = `/game/${roomId}?playerId=${newPlayerId}`;
    }} />;
  }

  if (!gameState) return null;

  switch (gameState.status) {
    case 'playing':
      return playerId ? (
        <PlayerSelection
          roomId={roomId!}
          playerId={playerId}
          players={Object.values(gameState.players)}
        />
      ) : null;
    
    case 'results':
      return playerId ? (
        <ResultsView
          roomId={roomId!}
          playerId={playerId}
        />
      ) : null;
    
    default:
      return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-red-500 to-orange-500">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-2xl mb-4">Waiting Room</h2>
            <p className="text-gray-600">Players: {Object.keys(gameState.players || {}).length}</p>
          </div>
        </div>
      );
  }
};

export default Game;