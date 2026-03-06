'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

interface GameDetail {
  id: number;
  title: string;
  thumbnail: string;
  genre: string;
  platform: string;
  developer: string;
  description: string;
  game_url: string;
}

export default function GameDetails() {
  const params = useParams();
  const { id } = params; 
  const [game, setGame] = useState<GameDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/${id}`);
        setGame(response.data);
      } catch (err) {
        console.error("Error al cargar detalles:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchGameDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-10 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mb-4"></div>
        <p className="text-xl font-semibold animate-pulse">Cargando detalles del juego...</p>
      </div>
    );
  }

  if (!game) return <div className="p-10 text-white text-center">Juego no encontrado</div>;

  return (
    <main className="min-h-screen bg-gray-900 text-white p-10 font-sans">
      <Link href="/" className="inline-block mb-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors">
        ← Volver al Catálogo
      </Link>
      
      <div className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl border border-gray-700 max-w-4xl mx-auto">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={game.thumbnail} alt={game.title} className="w-full h-64 object-cover" />
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            {game.title}
          </h1>
          <div className="flex gap-4 mb-6 text-sm font-semibold">
            <span className="bg-blue-900 text-blue-300 py-1 px-3 rounded">{game.genre}</span>
            <span className="bg-gray-700 py-1 px-3 rounded">{game.platform}</span>
            <span className="bg-green-900 text-green-300 py-1 px-3 rounded">{game.developer}</span>
          </div>
          <p className="text-gray-300 leading-relaxed mb-6">{game.description}</p>
          
          <a href={game.game_url} target="_blank" rel="noopener noreferrer" className="inline-block w-full text-center bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-bold transition-colors">
            Jugar Ahora.
          </a>
        </div>
      </div>
    </main>
  );
}