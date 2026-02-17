
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-[#0a192f] text-center px-4">
            <h1 className="text-9xl font-black text-teal-500/20 absolute animate-pulse">404</h1>
            <div className="z-10">
                <h2 className="text-4xl font-bold text-white mb-4">Oops! Page Not Found</h2>
                <p className="text-gray-400 mb-8 max-w-md">
                    The medicine you are looking for might have been moved or the link doesn't exist anymore.
                </p>
                <Link 
                    href="/" 
                    className="bg-teal-500 hover:bg-teal-400 text-[#0a192f] px-8 py-3 rounded-full font-bold transition-all shadow-lg shadow-teal-500/20"
                >
                    Back to MediStore
                </Link>
            </div>
        </div>
    );
}