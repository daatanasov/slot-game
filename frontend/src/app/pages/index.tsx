import Link from 'next/link';

export default function GameHome() {
	  return (
		      <div className="flex flex-col items-center justify-center min-h-screen">
		            <h1 className="text-4xl font-bold">Welcome to Slot Game</h1>
			          <Link className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md" href="/game">
				          Play Now
					        </Link>
						    </div>
						      );
}

