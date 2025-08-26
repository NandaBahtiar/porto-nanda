import { NextResponse } from 'next/server';
export type projek = {
    id: number;
    title: string;
    description: string;
    tech: string[];
}

const projects: projek[] = [
    { id: 1, title: 'Proyek dari 1', description: 'Deskripsi dari API.', tech: ['Next.js', 'API Routes'] },
    { id: 2, title: 'Proyek dari 2', description: 'Deskripsi dari API.', tech: ['Next.js', 'API Routes']}
];

export async function GET() {
    // Simulasi jeda jaringan
    await new Promise(resolve => setTimeout(resolve, 500));
    return NextResponse.json(projects);
}