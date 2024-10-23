// File: src/app/page.tsx
"use client";

import { RoomCreation } from '@/components/game/RoomCreation';

export default function Home() {
  return (
    <main className="min-h-screen">
      <RoomCreation 
        onRoomCreated={(roomId) => {
          window.location.href = `/join/${roomId}`;
        }}
      />
    </main>
  );
}