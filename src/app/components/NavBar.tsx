'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import AuthButton from "@/app/components/AuthButton";
import React from "react"; // Impor useSession


const Navbar = () => {
    const pathname = usePathname();
    const { data: session } = useSession(); // Dapatkan data sesi

    // Daftar link navigasi dasar
    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Projects', href: '/projects' },
        { name: 'Skills', href: '/skill' },
        { name: 'Contact', href: '/contact' },
    ];

    // Jika ada sesi (pengguna login), tambahkan link Dashboard ke daftar
    if (session) {
        navLinks.push({ name: 'Dashboard', href: '/dashboard' });
    }

    return (
        <nav className="bg-gray-800 p-4 sticky top-0 z-50">
            <div className=" flex justify-between items-center">
                <ul className="flex space-x-4">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <li key={link.name}>
                                <Link href={link.href} className={`${isActive ? 'text-blue-400 font-bold' : 'text-white'} hover:text-blue-300 transition-colors`}>
                                    {link.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
                <AuthButton/>

            </div>
        </nav>
    );
};

export default Navbar;