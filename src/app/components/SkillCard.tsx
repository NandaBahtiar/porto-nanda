import React from 'react';
import Image from 'next/image'; // <-- Impor Image

export interface CardSkill {
    id: number;
    skillName: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    imageUrl: string; // <-- Tambahkan imageUrl ke interface
}

const SkillCard = ({ skillName, level, imageUrl }: CardSkill) => { // <-- Terima imageUrl
    // ... (fungsi getLevelColor dan getLevelIcon tetap sama) ...
    const getLevelColor = (level: string) => {
        switch (level) {
            case 'Advanced':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'Intermediate':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Beginner':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200 p-4 flex items-center gap-4">
            {/* Tampilkan Gambar */}
            <div className="relative w-16 h-16 flex-shrink-0">
                <Image
                    src={imageUrl}
                    alt={`Ikon untuk ${skillName}`}
                    fill
                    className="object-contain"
                />
            </div>

            <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {skillName}
                </h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getLevelColor(level)}`}>
                    {level}
                </span>
            </div>
        </div>
    );
};

export default SkillCard;
