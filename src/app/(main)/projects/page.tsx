"use client";

import React, {useEffect, useState} from 'react';
// Import kedua komponen generik untuk perbandingan
import ApiDrivenList from '@/app/components/ApiDrivenList'; // Pendekatan 2
import List from '@/app/components/List'; // Pendekatan 1

import Card from '@/app/components/Card';
import SkillCard, {CardSkill} from "@/app/components/SkillCard";
import { projek } from "@/app/api/projects/route";




const Page = () => {
    const [skill,setSkill] = useState <CardSkill[]>([])
    useEffect(
        () => { // Menggunakan async IIFE (Immediately Invoked Function Expression)
            (async () => {
                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/skills`, { // Menggunakan path relatif
                        cache: 'no-store', // Selalu ambil data terbaru
                    });
                    if (!res.ok) {
                        throw new Error('Gagal mengambil data skill');
                    }
                    const data: CardSkill[] = await res.json();
                    setSkill(data);
                } catch (e) {
                    console.error("Error fetching skills:", e); // Menggunakan console.error untuk kesalahan
                }
            })();
        },
        []
    )
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Hero Section */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-6xl mx-auto px-8 py-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Portfolio & Skills
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl">
                        Showcase proyek dan keahlian teknis
                    </p>
                </div>
            </div>

            {/* Projects Section */}
            <section className="max-w-6xl mx-auto px-8 py-16">
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        Proyek Terbaru
                    </h2>
                </div>

                <ApiDrivenList<projek>
                    endpoint={`https://api.github.com/users/NandaBahtiar/repos?sort=pushed&direction=desc`}
                    renderItem={(project) => (
                        <Card

                            name={''} html_url={''} homepage={''} {...project}                            />
                    )}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                />
            </section>

            {/* Skills Section */}
            <section className="max-w-6xl mx-auto px-8 py-16 border-t border-gray-200">
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        Keahlian Teknis
                    </h2>
                </div>

                <List
                    items={skill}
                    renderItem={(skill) => <SkillCard {...skill} />}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                />
            </section>

        </div>
    );
}

export default Page;