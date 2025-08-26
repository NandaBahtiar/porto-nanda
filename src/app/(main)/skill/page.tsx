'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import SkillCard, { CardSkill } from "@/app/components/SkillCard";
import List from "@/app/components/List";

const DynamicInfoCard = dynamic(() => import('@/app/components/DynamicInfoCard'), { ssr: false });

const SkillPage = () => {
    const [skills, setSkills] = useState<CardSkill[]>([]);
    const [showDynamicCard, setShowDynamicCard] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // ... (logika useEffect tetap sama)
        const getSkills = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/skills`, { cache: 'no-store' });
                if (!res.ok) throw new Error('Gagal mengambil data keahlian');
                const data = await res.json();
                setSkills(data);
            } catch (error) {
                console.error("Gagal mengambil data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        getSkills();
    }, []);

    return (
        <section className="p-8 md:p-16">
            {/* Ganti ikon dengan banner yang lebih besar */}
            <div className="relative w-full h-48 mb-8 rounded-lg overflow-hidden">
                <Image
                    src="/skill-banner.png" // 1. Gunakan gambar raster
                    alt="Banner Keahlian"
                    fill // 2. 'fill' membuat gambar mengisi kontainer
                    style={{ objectFit: 'cover' }} // 3. Pastikan gambar menutupi area tanpa distorsi
                    quality={75} // 4. Atur kualitas kompresi (1-100)
                    priority // 5. 'priority' untuk memuat gambar ini lebih dulu (jika di atas)
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <h2 className="text-4xl font-bold text-white">Keahlian Saya</h2>
                </div>
            </div>

            <div className="mb-8">
                <button
                    onClick={() => setShowDynamicCard(!showDynamicCard)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    {showDynamicCard ? 'Sembunyikan' : 'Tampilkan'} Info Optimisasi
                </button>
                {showDynamicCard && <DynamicInfoCard />}
            </div>

            {isLoading ? (
                <p>Memuat data keahlian...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <List items={skills} renderItem={(skill) => (
                       <SkillCard id={skill.id} skillName={skill.skillName} level={skill.level} imageUrl={skill.imageUrl}/>
                   )} />
                </div>
            )}
        </section>
    );
};

export default SkillPage;