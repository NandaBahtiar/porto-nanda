// Menandai komponen ini sebagai Client Component karena menggunakan hooks (useState, useEffect).
"use client";

import React, { useState, useEffect } from 'react';
import Loading from '@/app/(main)/loading';

// Mendefinisikan tipe data untuk props yang akan diterima komponen ApiDrivenList.
// Penggunaan <T> menjadikannya generik, artinya bisa bekerja dengan tipe data apa pun.
interface ApiDrivenListProps<T> {
  // URL endpoint API untuk mengambil data.
  endpoint: string;
  // Fungsi yang akan digunakan untuk me-render setiap item dalam daftar.
  // Ini adalah pola "render prop", mendelegasikan logika render ke komponen induk.
  renderItem: (item: T) => React.ReactNode;
  // Kelas CSS opsional untuk styling kontainer daftar.
  className?: string;
  // Opsional: jumlah item yang ingin ditampilkan per halaman.
  itemsPerPage?: number;
}

// Ini adalah komponen generik kita.
// Batasan generik `<T extends { id: number | string }>` memastikan bahwa
// tipe data `T` apa pun yang digunakan HARUS memiliki properti `id`.
// Ini penting untuk prop `key` di React demi optimisasi render daftar.
const ApiDrivenList = <T extends { id: number | string }>({
  endpoint,
  renderItem,
  className,
  itemsPerPage = 10, // Nilai default 10 item per halaman jika tidak disediakan.
}: ApiDrivenListProps<T>) => {
  // State untuk menyimpan array item yang diambil dari API.
  const [items, setItems] = useState<T[]>([]);
  // State untuk melacak nomor halaman saat ini untuk paginasi.
  const [page, setPage] = useState(1);
  // State untuk mengelola status loading (apakah sedang mengambil data atau tidak).
  const [isLoading, setIsLoading] = useState(true);
  // State untuk mengetahui apakah kita berada di halaman terakhir, untuk menonaktifkan tombol "Berikutnya".
  const [isLastPage, setIsLastPage] = useState(false);

  // Hook useEffect untuk mengambil data saat komponen pertama kali dimuat atau saat dependensi berubah.
  // Akan berjalan setiap kali `endpoint`, `page`, atau `itemsPerPage` berubah.
  useEffect(() => {
    // Fungsi async untuk mengambil data dari API.
    const fetchData = async () => {
      // Set loading menjadi true sebelum memulai proses fetch.
      setIsLoading(true);
      try {
        // Membangun URL dengan parameter paginasi.
        const url = `${endpoint}${endpoint.includes('?') ? '&' : '?'}per_page=${itemsPerPage}&page=${page}`;
        // Mengambil data dari API. `cache: 'no-store'` memastikan data yang didapat selalu yang terbaru.
        const res = await fetch(url, { cache: 'no-store' });

        // Jika respons tidak berhasil (misal: error 404 atau 500), lemparkan error.
        if (!res.ok) {
          throw new Error(`Gagal mengambil data dari ${url}`);
        }

        // Mengubah respons JSON menjadi tipe data generik `T[]` yang ditentukan.
        const data: T[] = await res.json();
        // Memperbarui state `items` dengan data yang baru diambil.
        setItems(data);

        // Logika sederhana untuk mendeteksi halaman terakhir.
        // Jika jumlah item yang kembali kurang dari jumlah yang diminta,
        // kita asumsikan ini adalah halaman terakhir.
        if (data.length < itemsPerPage) {
          setIsLastPage(true);
        } else {
          setIsLastPage(false);
        }

      } catch (error) {
        // Menampilkan error di konsol jika terjadi masalah.
        console.error(error);
        // Mengosongkan item jika terjadi error.
        setItems([]);
      } finally {
        // Set loading menjadi false setelah proses fetch selesai (baik berhasil maupun gagal).
        setIsLoading(false);
      }
    };

    // Memanggil fungsi fetchData.
    fetchData();
  }, [endpoint, page, itemsPerPage]); // Array dependensi untuk hook useEffect.

  // Tampilan kondisional: Jika sedang loading, tampilkan indikator loading.
  if (isLoading) {
    return (
        <div className="flex items-center justify-center py-12">
            <Loading />
        </div>
    );
  }

  // Tampilan kondisional: Jika tidak loading dan tidak ada item, tampilkan pesan.
  if (items.length === 0) {
    return <p>Tidak ada data untuk ditampilkan.</p>;
  }

  // Jika data sudah dimuat dan tidak kosong, render daftar dan kontrol paginasi.
  return (
    <div>
      {/* Kontainer untuk daftar item. */}
      <div className={className}>
        {/* Melakukan iterasi (map) pada array `items` untuk me-render setiap item. */}
        {items.map((item) => (
          // Menggunakan `renderItem` prop untuk me-render komponen item yang sebenarnya.
          // Prop `key` sangat penting untuk performa React.
          <div key={item.id}>{renderItem(item)}</div>
        ))}
      </div>

      {/* Kontrol Paginasi */}
      <div className="flex justify-center items-center mt-8 space-x-4">
        {/* Tombol "Sebelumnya" */}
        <button
          // Pindah ke halaman sebelumnya saat diklik.
          onClick={() => setPage(page - 1)}
          // Nonaktifkan tombol jika di halaman pertama atau sedang loading.
          disabled={page === 1 || isLoading}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Sebelumnya
        </button>
        {/* Menampilkan nomor halaman saat ini. */}
        <span className="text-lg font-medium">{page}</span>
        {/* Tombol "Berikutnya" */}
        <button
          // Pindah ke halaman berikutnya saat diklik.
          onClick={() => setPage(page + 1)}
          // Nonaktifkan tombol jika di halaman terakhir atau sedang loading.
          disabled={isLastPage || isLoading}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Berikutnya
        </button>
      </div>
    </div>
  );
};

export default ApiDrivenList;
