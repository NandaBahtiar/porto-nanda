'use client';
import React from 'react';
 import {deleteSubmission} from "@/app/actions/contact";


const ButtonDelete = ({ id }: { id: number }) => {
  const handleDelete = async () => {

    if (window.confirm('Apakah Anda yakin ingin menghapus pesan ini?')) {
      const result = await deleteSubmission(id);
      if (!result.success) {
        alert(result.message);
      }
    }
  }
  return (
    <button
        onClick={handleDelete}
      className="font-semibold text-red-500 hover:text-red-700"
    >
      Hapus
    </button>
  );
};
export default ButtonDelete;
