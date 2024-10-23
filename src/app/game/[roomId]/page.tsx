"use client";

import { useParams, useSearchParams } from 'next/navigation';
import Game from '@/components/Game';

export default function GamePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  
  const roomId = params.roomId as string;
  const playerId = searchParams.get('playerId');

  if (!roomId || !playerId) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-red-500 to-orange-500">
        <div className="bg-white p-6 rounded-lg shadow-xl">
          <p className="text-xl">Invalid game session</p>
        </div>
      </div>
    );
  }

  return <Game roomId={roomId} playerId={playerId} />;
}
