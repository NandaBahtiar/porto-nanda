import { CardSkill } from "@/app/components/SkillCard";

const skills: CardSkill[] = [
    // Tambahkan properti imageUrl di sini
    {
        id: 1,
        skillName: 'Next.js',
        level: 'Advanced' as const,
        imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg'
    },
    {
        id: 2,
        skillName: 'TypeScript',
        level: 'Intermediate' as const,
        imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg'
    },
    {
        id: 3,
        skillName: 'React',
        level: 'Advanced' as const,
        imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
    },
    {
        id: 4,
        skillName: 'JavaScript',
        level: 'Advanced' as const,
        imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
    },
];

export async function GET() {
    // Hapus timeout agar lebih cepat saat development
    // await new Promise(resolve => { setTimeout(resolve, 5000) });
    return new Response(JSON.stringify(skills));
}
