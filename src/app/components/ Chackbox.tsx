"use client"
import React from 'react'
import { changeCheckboxStatus } from "@/app/actions/contact";
import { useTransition } from 'react';

// Komponen sekarang menerima id dan status isRead
const Checkbox = ({ id, isRead }: { id: number, isRead: boolean }) => {
    // useTransition untuk mengelola state loading tanpa memblokir UI
    const [isPending, startTransition] = useTransition();

    const handleChange = () => {
        // Jalankan server action di dalam startTransition
        startTransition(() => {
            changeCheckboxStatus(id);
        });
    }

    return (
        <div>
            <input
                type="checkbox"
                className="h-5 w-5"
                checked={isRead} // Gunakan `checked` untuk controlled component
                onChange={handleChange}
                disabled={isPending} // Nonaktifkan checkbox saat proses update
            />
        </div>
    )
}
export default Checkbox