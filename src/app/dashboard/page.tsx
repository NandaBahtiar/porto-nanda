import prisma from '@/lib/prisma';
import ButtonDelete from "@/app/components/ButtonDelete";
import Chackbox from "@/app/components/ Chackbox";

// Komponen Tombol Hapus (didefinisikan di file yang sama)
// Ini adalah Client Component karena menggunakan event handler `onClick`,
// namun Server Action di dalamnya berjalan di server.
// function DeleteButton({ id }: { id: number }) {
//     // Server Action untuk menghapus data berdasarkan ID
//     async function deleteSubmission() {
//         'use server';
//         try {
//             await prisma.contactSubmission.delete({
//                 where: { id },
//             });
//             // Revalidasi path untuk memuat ulang data di halaman dashboard
//             revalidatePath('/dashboard');
//         } catch (error) {
//             console.error("Gagal menghapus pesan:", error);
//         }
//     };
//
//     return (
//         <form action={deleteSubmission}>
//             <button type="submit" className="text-red-500 hover:text-red-700 font-semibold">
//                 Hapus
//             </button>
//         </form>
//     );
// }


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
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="text-left py-3 px-4 font-semibold text-sm">Nama</th>
                        <th className="text-left py-3 px-4 font-semibold text-sm">Email</th>
                        <th className="text-left py-3 px-4 font-semibold text-sm">Pesan</th>
                        <th className="text-left py-3 px-4 font-semibold text-sm">Tanggal</th>
                        <th className="text-left py-3 px-4 font-semibold text-sm">Aksi</th>
                        <th className="text-left py-3 px-4 font-semibold text-sm">telah di baca</th>
                    </tr>
                    </thead>
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