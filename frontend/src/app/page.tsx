import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">Welcome to Slot Game</h1>
      <Link href="/game">
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
          Play Now
        </button>
      </Link>
    </div>
  );
}
