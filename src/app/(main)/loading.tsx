import React from 'react'

const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[200px] space-y-4">
            {/* Spinning dots animation */}
            <div className="flex space-x-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>

            {/* Loading text with pulse animation */}
            <p className="text-gray-600 text-sm font-medium animate-pulse">
                Loading...
            </p>
        </div>
    )
}

export default Loading