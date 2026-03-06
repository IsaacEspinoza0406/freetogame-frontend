'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link'; 

interface Game {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  genre: string;
  platform: string;
}

export default function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        // Aquí lo que se hace es consumir el proxy, y no consumir directamente la API externa, para evitar problemas de CORS
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL as string);
        setGames(response.data.slice(0, 12)); 
      } catch (err) {
        console.error("Error al consumir el proxy:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
        <div className="text-center p-8 border border-red-500 rounded-lg bg-red-900/50">
          <h2 className="text-3xl font-bold mb-4">Algo salió mal, intenté de nuevo</h2>
          <p>No pudimos conectar con el servidor de juegos.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-10">
        <h1 className="text-4xl font-bold mb-10 text-center">Catálogo de Juegos</h1>
        <p className="text-center mt-8 text-xl font-semibold animate-bounce">Cargando catálogo...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white p-10 font-sans">
      <h1 className="text-4xl font-bold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
        Catálogo FreeToGame
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {games.map((game) => (
          <Link href={`/game/${game.id}`} key={game.id}>
            <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:scale-105 transition-transform duration-300 cursor-pointer h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={game.thumbnail} alt={game.title} className="w-full h-40 object-cover" />
              <div className="p-5">
                <h2 className="text-xl font-bold mb-2 truncate">{game.title}</h2>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">{game.short_description}</p>
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="bg-blue-900 text-blue-300 py-1 px-2 rounded">{game.genre}</span>
                  <span className="bg-gray-700 py-1 px-2 rounded">{game.platform}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}