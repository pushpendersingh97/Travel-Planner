'use client';

import Search from './components/Search';
import Header from './components/Header';

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white">
        <Header showSearchInHeader={false} />
        <div className="flex flex-col md:flex-row">
          <main className="flex-1">
            <div className="flex flex-col items-center justify-start px-4 py-10 md:py-4">
              <Search isInline={false} />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
