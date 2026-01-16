import React from 'react';

const Loading = ({ message = "Loading..." }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] py-20">
            <div className="relative">
                {/* Outer spinning ring */}
                <div className="w-20 h-20 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>

                {/* Inner pulsing circle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-blue-500/20 rounded-full animate-pulse"></div>

                {/* Center dot */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full"></div>
            </div>

            <p className="mt-6 text-slate-400 font-medium animate-pulse">{message}</p>

            {/* Decorative dots */}
            <div className="flex gap-2 mt-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
        </div>
    );
};

export default Loading;
