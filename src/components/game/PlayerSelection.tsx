import React, { useState } from 'react';
import { ref, update, get } from 'firebase/database';
import { db } from '@/lib/firebase';
import { getRandomCompliment } from '@/components/utils/compliments';

interface PlayerSelectionProps {
  roomId: string;
  playerId: string;
  players: any[];
}

export const PlayerSelection: React.FC<PlayerSelectionProps> = ({
  roomId,
  playerId,
  players,
}) => {
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [compliment] = useState(getRandomCompliment);
  const [sending, setSending] = useState(false);

  const sendCompliment = async () => {
    if (!selectedPlayer || sending) return;
    setSending(true);

    try {
      const complimentData = {
        from: playerId,
        to: selectedPlayer,
        message: compliment,
        timestamp: Date.now()
      };

      await update(ref(db, `rooms/${roomId}/compliments/${selectedPlayer}`), {
        [playerId]: complimentData
      });

      const snapshot = await get(ref(db, `rooms/${roomId}/compliments`));
      const compliments = snapshot.val() || {};
      const sentCount = Object.values(compliments).reduce((count: number, receivers: any) => {
        return count + (receivers[playerId] ? 1 : 0);
      }, 0);

      if (sentCount >= 3) {
        await update(ref(db, `rooms/${roomId}/players/${playerId}`), {
          completedCompliments: true
        });
      }

    } catch (error) {
      console.error('Error sending compliment:', error);
    } finally {
      setSending(false);
      setSelectedPlayer(null);
    }
  };

  return (
    <div className="flex flex-col p-4 min-h-screen bg-gradient-to-b from-red-500 to-orange-500">
      <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
        <p className="text-center text-lg font-semibold">{compliment}</p>
      </div>

      <div className="space-y-4 mb-4">
        {players
          .filter(p => p.id !== playerId)
          .map(player => (
            <button
              key={player.id}
              onClick={() => setSelectedPlayer(player.id)}
              className={`w-full p-4 rounded-lg transition-all
                ${selectedPlayer === player.id ? 'bg-yellow-300' : 'bg-white'}
              `}
            >
              {player.name}
            </button>
          ))
        }
      </div>

      {selectedPlayer && (
        <button
          onClick={sendCompliment}
          disabled={sending}
          className={`mt-auto p-4 rounded-lg bg-black text-white
            ${sending ? 'opacity-50' : 'hover:bg-gray-800'}
          `}
        >
          {sending ? 'Sending...' : 'Send Compliment'}
        </button>
      )}
    </div>
  );
};