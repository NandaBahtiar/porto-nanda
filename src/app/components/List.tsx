
import React from 'react';

// 1. Mendefinisikan props untuk komponen List
//    Menggunakan <T> untuk menandakan bahwa ini adalah tipe generik.
interface ListProps<T> {
  // `items` adalah array dari tipe T
  items: T[];
  // `renderItem` adalah fungsi yang menerima satu `item` bertipe T
  // dan mengembalikan elemen React untuk di-render.
  renderItem: (item: T) => React.ReactNode;
  // className opsional untuk styling
  className?: string;
}

// 2. Membuat komponen List generik
//    <T extends { id: any }> adalah "constraint" atau batasan.
//    Ini memastikan bahwa objek apa pun (T) yang kita masukkan ke dalam list ini
//    HARUS memiliki properti `id` agar bisa digunakan sebagai `key` oleh React.
const List = <T extends { id: number | string }>({ 
  items,
  renderItem,
  className,
}: ListProps<T>) => {
  return (
    <div className={className}>
      {items.map((item) => (
        // Kita menggunakan item.id sebagai key unik
        <div key={item.id}>{renderItem(item)}</div>
      ))}
    </div>
  );
};

export default List;
