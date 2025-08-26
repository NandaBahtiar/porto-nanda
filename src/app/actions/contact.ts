'use server';

import { PrismaClient } from '@/generated/prisma';
import { z } from 'zod';
import { revalidatePath } from "next/cache";
import { Resend } from 'resend';
import { NewMessageEmail } from '@/app/components/emails/NewMessageEmail';
import {EmailTemplate} from "@/app/components/emails/EmailTemplate"; // <-- Impor template email

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY); // <-- Inisialisasi Resend

// ... (skema Zod dan type ContactFormState tetap sama) ...
const contactSchema = z.object({
    name: z.string().min(3, { message: "Nama harus lebih dari 2 karakter." }),
    email: z.string().email({ message: "Format email tidak valid." }),
    message: z.string().min(5, { message: "Pesan harus lebih dari 10 karakter." }),
});

export type ContactFormState = {
    message: string | null;
    errors?: { name?: string[]; email?: string[]; message?: string[]; };
};


export async function saveContactSubmission(
    prevState: ContactFormState,
    formData: FormData
): Promise<ContactFormState> {
    const validatedFields = contactSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
    });

    if (!validatedFields.success) {
        return {
            message: "Validasi gagal, silakan perbaiki form.",
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { name, email, message } = validatedFields.data;

    try {
        // 1. Simpan data ke database (tetap sama)
        await prisma.contactSubmission.create({
            data: { name, email, message },
        });

        // 2. Kirim notifikasi email setelah berhasil menyimpan
        try {
            await resend.emails.send({
                from: 'onboarding@resend.dev', // Ganti dengan email domain Anda jika sudah diverifikasi
                to: 'nandabahtiar1@gmail.com', // << GANTI DENGAN EMAIL ANDA
                subject: `Pesan Baru dari ${name}`,
                react: EmailTemplate({ firstName: 'John' }),
            });
        } catch (emailError) {
            console.error("Gagal mengirim email:", emailError);
            // Jika email gagal, jangan gagalkan seluruh proses.
            // Cukup kembalikan pesan sukses dengan catatan.
            return { message: "Pesan berhasil terkirim, namun notifikasi email gagal dikirim.", errors: {} };
        }

        return { message: "Pesan berhasil terkirim dan notifikasi email telah dikirim!", errors: {} };

    } catch (e) {
        console.error("Error saving contact submission:", e);
        return { message: `Gagal menyimpan pesan: ${e instanceof Error ? e.message : 'Unknown error'}`, errors: {} };
    }
}


export async function deleteSubmission(id: number) {
        // Server Action untuk menghapus data berdasarkan ID
    try {
    await prisma.contactSubmission.delete({
            where: { id },
         });
      // Beritahu Next.js untuk memuat ulang data di halaman '/dashboard'
      // Ini akan memperbarui tampilan tanpa perlu me-refresh seluruh halaman
       revalidatePath('/dashboard');

      // Mengembalikan status sukses
        return { success: true, message: 'Pesan berhasil dihapus.' };

      } catch (error) {
       console.error('Gagal menghapus pesan:', error);
        // Mengembalikan status gagal
       return { success: false, message: 'Gagal menghapus pesan.' };
    }
}

// ... (fungsi lainnya tetap sama)

// Nama fungsi diperbaiki dari Chackbox -> Checkbox
export async function changeCheckboxStatus(id: number) {
    try {
        // 1. Ambil data submission saat ini untuk mengetahui status isRead
        const submission = await prisma.contactSubmission.findUnique({
            where: { id },
        });

        if (!submission) {
            return { success: false, message: 'Pesan tidak ditemukan.' };
        }

        // 2. Lakukan update dengan data baru
        await prisma.contactSubmission.update({
            where: {
                id: id,
            },
            data: {
                // 3. Ubah nilai isRead menjadi kebalikannya
                isRead: !submission.isRead,
            },
        });

        revalidatePath('/dashboard');

        // 4. Kembalikan pesan sukses yang sesuai
        return { success: true, message: 'Status pesan berhasil diperbarui.' };

    } catch (error) {
        console.error('Gagal memperbarui status pesan:', error);
        return { success: false, message: 'Gagal memperbarui status pesan.' };
    }
}