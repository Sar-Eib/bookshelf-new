import Link from 'next/link';
import { InteractiveBook } from '../ui/InteractiveBook'; // Vi importerer vores klientside-ø!

interface Book {
  id: number;
  title: string;
  author: string;
  coverUrl: string;
}

async function getSSRBooks(): Promise<Book[]> {
  return [
    { id: 1, title: 'Harry Potter & De Vises Sten', author: 'J.K. Rowling', coverUrl: '/covers/harrypotter.jpg' },
    { id: 2, title: 'Hobbitten', author: 'J.R.R. Tolkien', coverUrl: '/covers/thehobbit.png' },
    { id: 3, title: 'Baskervillehunden', author: 'A. Conan Doyle', coverUrl: '/covers/baskerville.png' },
    { id: 4, title: 'Da Vinci Mysteriet', author: 'Dan Brown', coverUrl: '/covers/davinci.png' },
    { id: 5, title: 'Alkemisten', author: 'Paulo Coelho', coverUrl: '' },
    { id: 6, title: '1984', author: 'George Orwell', coverUrl: '' },
    { id: 7, title: 'Eventyret om Ringen', author: 'J.R.R. Tolkien', coverUrl: '/covers/lotr.png' },
    { id: 8, title: 'Den Lille Prins', author: 'A. de Saint-Exupéry', coverUrl: '/covers/prins.png' },
    { id: 9, title: 'Frankenstein', author: 'Mary Shelley', coverUrl: '/covers/frankenstein.png' },
    { id: 10, title: 'Moby Dick', author: 'Herman Melville', coverUrl: '' }
  ];
}

export default async function BogreolSSR() {
  const books = await getSSRBooks();

  return (
    <div className="min-h-screen p-6 md:p-12 font-sans relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/5 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <Link href="/" className="text-sm text-teal-900 hover:underline font-semibold bg-white/60 px-3 py-1.5 rounded-full shadow-sm transition-all hover:bg-white">
          ⬅️ Gå tilbage til forsiden
        </Link>
        
        <div className="mt-6 mb-16 text-center md:text-left">
          <span className="bg-teal-800 text-teal-50 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
            Hybrid Architecture (SSR + Client Islands)
          </span>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mt-3 mb-2">
            Min iBooks Bogreol (Hybrid)
          </h1>
          <p className="text-stone-700 text-sm md:text-base max-w-xl">
            Selve reolen og bøgernes tekster sendes som færdig HTML fra serveren (SEO). Men de enkelte bøger med JavaScript dukker først op, så snart de er hydrerede i browseren!
          </p>
        </div>
        
        {/* SELVE BOGREOLEN */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-24 mt-12 px-4">
          {books.map((book) => (
            <div key={book.id} className="relative flex flex-col items-center">
              
              {/* HER INDSÆTTER VI VORES INTERAKTIVE BOG-Ø */}
              <InteractiveBook book={book} />

              {/* HYLDEN (Bliver 100% statisk på serveren - ingen JavaScript spildt her) */}
              <div className="absolute bottom-[-16px] left-[-16px] right-[-16px] h-6 z-0 pointer-events-none">
                <div className="h-2 bg-[#543d2b] rounded-t-sm shadow-inner border-b border-black/10"></div>
                <div className="h-4 bg-[#3a281a] rounded-b-sm shadow-2xl border-t border-white/5"></div>
                <div className="h-3 w-full bg-black/25 blur-md rounded-b-md"></div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}