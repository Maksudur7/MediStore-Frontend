
"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-[#0a192f] text-center px-4">
            <div className="bg-red-500/10 p-6 rounded-3xl border border-red-500/20">
                <h2 className="text-3xl font-bold text-red-400 mb-2">Something went wrong!</h2>
                <p className="text-gray-400 mb-6 italic">"{error?.message || "Internal Server Error"}"</p>

                <div className="flex gap-4 justify-center">
                    <button
                        onClick={() => reset()}
                        className="bg-teal-500 hover:bg-teal-400 text-[#0a192f] px-6 py-2 rounded-full font-bold transition-all"
                    >
                        Try Again
                    </button>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="bg-white/5 hover:bg-white/10 text-white px-6 py-2 rounded-full font-bold border border-white/10 transition-all"
                    >
                        Go Home
                    </button>
                </div>
            </div>
        </div>
    );
}