'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

const AuthButton = () => {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <div className="w-6 h-6 bg-gray-300 animate-pulse rounded-full opacity-50"></div>;
    }

    if (session) {
        return (
            <div className="flex items-center gap-2">

                <p className="text-white hidden md:block">{session.user?.name}</p>
                <button
                    onClick={() => signOut()}
                    className="text-gray-400 hover:text-gray-600 text-xs opacity-50 hover:opacity-80 transition-all duration-200"
                    title="Sign Out"
                >
                    ×
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={() => signIn('github')}
            className="w-3 h-3 border border-gray-300 rounded-full opacity-30 hover:opacity-60 hover:border-gray-400 transition-all duration-300"
            title="Admin Login"
        >
        </button>
    );
};

export default AuthButton;