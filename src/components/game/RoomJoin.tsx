// File: src/components/game/RoomJoin.tsx
import React, { useState } from 'react';
import { ref, update, get } from 'firebase/database';
import { db } from '@/lib/firebase';

interface RoomJoinProps {
  roomId: string;
  onJoined: (playerId: string) => void;
}

export const RoomJoin: React.FC<RoomJoinProps> = ({ roomId, onJoined }) => {
  const [name, setName] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState('');

  const handleJoin = async () => {
    if (!name.trim() || isJoining) return;
    
    setIsJoining(true);
    setError('');
    
    try {
      const roomRef = ref(db, `rooms/${roomId}`);
      const snapshot = await get(roomRef);
      
      if (!snapshot.exists()) {
        setError('Room not found');
        setIsJoining(false);
        return;
      }

      const playerId = Math.random().toString(36).substring(2, 9);
      
      await update(ref(db, `rooms/${roomId}/players/${playerId}`), {
        id: playerId,
        name: name.trim(),
        joinedAt: Date.now(),
        completedCompliments: false
      });

      onJoined(playerId);
    } catch (error) {
      console.error('Error joining room:', error);
      setError('Failed to join room');
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gradient-to-b from-red-500 to-orange-500 min-h-screen">
      <h1 className="text-2xl font-bold text-white mb-4">Swipes</h1>
      <div className="bg-white/20 p-2 rounded-lg mb-8">
        <h2 className="text-xl text-white">Room #{roomId}</h2>
      </div>
      
      {error && (
        <div className="bg-white p-3 rounded-lg mb-4 text-red-500">
          {error}
        </div>
      )}

      <div className="w-full max-w-md">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="w-full p-3 rounded-lg mb-4"
          disabled={isJoining}
        />

        <button
          onClick={handleJoin}
          disabled={!name.trim() || isJoining}
          className={`w-full bg-black text-white p-3 rounded-lg
            ${(!name.trim() || isJoining) ? 'opacity-50' : 'hover:bg-gray-800'}
          `}
        >
          {isJoining ? 'Joining...' : 'Enter Room'}
        </button>
      </div>
    </div>
  );
};
