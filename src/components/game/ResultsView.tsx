import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '@/lib/firebase';

interface ResultsViewProps {
  roomId: string;
  playerId: string;
}

export const ResultsView: React.FC<ResultsViewProps> = ({ roomId, playerId }) => {
  const [compliments, setCompliments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCompliments, setVisibleCompliments] = useState<number>(0);

  useEffect(() => {
    const complimentsRef = ref(db, `rooms/${roomId}/compliments/${playerId}`);
    const unsubscribe = onValue(complimentsRef, (snapshot) => {
      if (snapshot.exists()) {
        setCompliments(Object.values(snapshot.val()));
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [roomId, playerId]);

  useEffect(() => {
    if (!loading && compliments.length > 0) {
      const timer = setInterval(() => {
        setVisibleCompliments(prev => {
          if (prev < compliments.length) {
            return prev + 1;
          }
          clearInterval(timer);
          return prev;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [loading, compliments.length]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-red-500 to-orange-500">
        <h2 className="text-2xl text-white mb-4">loading it for you.....</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4 bg-gradient-to-b from-red-500 to-orange-500 min-h-screen">
      <h2 className="text-2xl text-white text-center mb-6">
        See what your Friends like about you
      </h2>
      
      <div className="space-y-4">
        {compliments.slice(0, visibleCompliments).map((compliment, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-lg animate-fade-in"
          >
            <p className="text-center">{compliment.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};