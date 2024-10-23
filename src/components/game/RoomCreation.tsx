// File: src/components/game/RoomCreation.tsx
import React, { useState, useEffect } from 'react';
import { ref, set, onValue } from 'firebase/database';
import { db } from '@/lib/firebase';
import dynamic from 'next/dynamic';

const QRCode = dynamic(() => import('qrcode.react').then(mod => mod.QRCodeSVG), { ssr: false });

interface RoomCreationProps {
  onRoomCreated: (roomId: string) => void;
}

export const RoomCreation: React.FC<RoomCreationProps> = ({ onRoomCreated }) => {
  const [roomId, setRoomId] = useState<string>('');
  const [playerCount, setPlayerCount] = useState(0);
  const [qrUrl, setQrUrl] = useState('');

  useEffect(() => {
    setRoomId(Math.random().toString(36).substring(2, 8).toUpperCase());
  }, []);

  useEffect(() => {
    if (!roomId) return;

    if (typeof window !== 'undefined') {
      const baseUrl = window.location.origin;
      setQrUrl(`${baseUrl}/join/${roomId}`);
      
      const initialGameState = {
        id: roomId,
        status: 'waiting',
        players: {},
        compliments: {},
        currentRound: 0,
        maxRounds: 3,
        createdAt: Date.now()
      };

      set(ref(db, `rooms/${roomId}`), initialGameState);

      const playersRef = ref(db, `rooms/${roomId}/players`);
      const unsubscribe = onValue(playersRef, (snapshot) => {
        if (snapshot.exists()) {
          setPlayerCount(Object.keys(snapshot.val()).length);
        }
      });

      return () => unsubscribe();
    }
  }, [roomId]);

  if (!roomId) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-red-500 to-orange-500">
        <div className="bg-white p-6 rounded-lg shadow-xl">
          <p className="text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-red-500 to-orange-500 p-4">
      <div className="bg-white rounded-lg p-8 shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-4">Swipes</h1>
        <div className="text-3xl font-bold text-center mb-8">#{roomId}</div>
        
        <div className="flex justify-center mb-8">
          {qrUrl && (
            <div className="bg-white p-4 rounded-lg">
              <QRCode 
                value={qrUrl}
                size={200}
                level="H"
                includeMargin={true}
              />
            </div>
          )}
        </div>

        <div className="text-center mb-8">
          <p className="text-lg">Players: {playerCount}</p>
          <p className="text-sm text-gray-500">Minimum 2 players needed</p>
        </div>

        <button
          onClick={() => playerCount >= 2 && onRoomCreated(roomId)}
          disabled={playerCount < 2}
          className={`
            w-full py-3 px-6 rounded-lg text-center transition-all
            ${playerCount >= 2
              ? 'bg-black text-white hover:bg-gray-800' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
          `}
        >
          {playerCount >= 2 ? 'Start Game' : 'Waiting for Players...'}
        </button>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">Share this link with friends:</p>
          <p className="text-sm font-mono mt-1 break-all">{qrUrl}</p>
        </div>
      </div>
    </div>
  );
};