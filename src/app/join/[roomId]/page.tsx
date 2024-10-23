"use client";

import { useParams } from 'next/navigation';
import { RoomJoin } from '@/components/game/RoomJoin';

export default function JoinPage() {
  const params = useParams();
  const roomId = params.roomId as string;

  return (
    <main className="min-h-screen">
      <RoomJoin 
        roomId={roomId} 
        onJoined={(playerId) => {
          window.location.href = `/game/${roomId}?playerId=${playerId}`;
        }} 
      />
    </main>
  );
}