import React from 'react'

export interface CardProps {
    id: number;
    title: string;
    description: string;
    name: string;
    html_url: string;
    homepage: string;
}

const Card = ({ id, homepage, description, html_url, name }: CardProps) => {
    return (
        <div
            key={id}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col hover:border-blue-300 group"
        >
            {/* Header */}
            <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-200">
                    {name}
                </h3>
            </div>

            {/* Description */}
            <div className="flex-1 mb-6">
                <p className="text-gray-600 text-sm leading-relaxed">
                    {description || "Tidak ada deskripsi tersedia"}
                </p>
            </div>

            {/* Footer */}
            <div className="mt-auto">
                <div className="flex flex-wrap gap-2">
                    {/* Conditional Web Button - only show if homepage exists */}
                    {homepage && (
                        <a
                            href={homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            <svg
                                className="w-4 h-4 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                            </svg>
                            Web
                        </a>
                    )}

                    {/* GitHub Repo Button - always shown */}
                    <a
                        href={html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                        <svg
                            className="w-4 h-4 mr-2"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                        </svg>
                        Github Repo
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Card;