import prisma from '@/lib/prisma';
import ButtonDelete from "@/app/components/ButtonDelete";
import Chackbox from "@/app/components/ Chackbox";
// `revalidatePath` tidak lagi dibutuhkan di file ini
// import { revalidatePath } from 'next/cache';

// Opsi A: Memberitahu Next.js untuk selalu me-render ulang halaman ini setiap ada request
export const dynamic = 'force-dynamic';

// Halaman Dashboard (Server Component)
export default async function DashboardPage() {
    const submissions = await prisma.contactSubmission.findMany({
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8">Pesan Masuk</h1>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full table-auto">
                    {/* ... sisa kode tabel Anda tidak perlu diubah ... */}
                    <tbody className="text-gray-700">
                    {submissions.map((submission) => (
                        <tr key={submission.id} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="py-3 px-4">{submission.name}</td>
                            <td className="py-3 px-4">{submission.email}</td>
                            <td className="py-3 px-4"><p className="line-clamp-2">{submission.message}</p></td>
                            <td className="py-3 px-4">{submission.createdAt.toLocaleDateString()}</td>
                            <td className="py-3 px-4">
                                <ButtonDelete  id={submission.id} />
                            </td>
                            <td>
                                <Chackbox isRead={submission.isRead} id={submission.id}/>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {submissions.length === 0 && (
                    <p className="p-4 text-center">Belum ada pesan yang masuk.</p>
                )}
            </div>
        </div>
    );
}