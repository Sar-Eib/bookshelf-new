"use client"; 

import { useState, useEffect } from 'react';

interface BookProps {
  book: {
    id: number;
    title: string;
    author: string;
    coverUrl: string;
  };
}

export function InteractiveBook({ book }: BookProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Vi simulerer, at JavaScript og de rigtige billeddata gøres klar efter 2,5 sekunder
    const timer = setTimeout(() => {
      setIsHydrated(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Hvis isHydrated er false, bruges et default/neutralt layout. Når den er true, indlæser vi bogens rigtige cover.
  const currentCover = isHydrated && book.coverUrl ? book.coverUrl : '/covers/default.png';

  return (
    <div 
      onClick={() => isHydrated && alert(`Åbner detaljer for: "${book.title}"`)}
      className={`relative z-10 transition-all duration-300 ease-out group
        ${isHydrated ? 'hover:-translate-y-3 cursor-pointer' : 'cursor-wait pointer-events-none'}`}
    >
      {/* LILLE SPINNER I HJØRNET: Indikerer, at bogen er ved at gøre sine clientside-features klar */}
      {!isHydrated && (
        <div className="absolute top-2 right-2 z-30 bg-black/60 p-1.5 rounded-full animate-pulse">
          <div className="w-3 h-3 border border-amber-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* BOGOVERSIDE */}
      <div 
        className={`w-40 h-52 bg-stone-200 rounded-r-md shadow-xl overflow-hidden border-l-8 border-black/20 flex flex-col items-center justify-between text-center p-3 bg-cover bg-center relative transition-all duration-500
          ${!isHydrated ? 'grayscale opacity-70' : 'grayscale-0 opacity-100'}`}
        style={{ backgroundImage: `url(${currentCover})` }}
      >
        {/* Er klar fra start */}
        <div className="w-full bg-stone-100/90 rounded mt-auto p-1 border border-stone-200 z-10">
          <p className="text-[10px] md:text-xs font-serif font-bold text-stone-800 line-clamp-2 leading-tight">
            {book.title}
          </p>
          <p className="mt-1 text-stone-700 text-[10px] font-serif italic tracking-wide text-center">
            {book.author}
          </p>
        </div>
      </div>
      
      <div className={`absolute -bottom-2 left-2 right-2 h-3 bg-black/30 blur-sm rounded-full -z-10 transition-opacity 
        ${isHydrated ? 'group-hover:opacity-60' : 'opacity-40'}`}>
      </div>
    </div>
  );
}