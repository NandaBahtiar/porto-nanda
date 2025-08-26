const DynamicInfoCard = () => {
  return (
    <div className="mt-8 p-6 bg-blue-50 border-2 border-blue-200 rounded-lg shadow-md">
      <h3 className="text-xl font-bold text-blue-800 mb-2">Informasi Tambahan</h3>
      <p className="text-blue-700">
        Komponen ini dimuat secara dinamis! Kodenya tidak diunduh
        sampai Anda mengklik tombol untuk menampilkannya. Ini membantu
        mempercepat waktu muat awal halaman.
      </p>
    </div>
  );
};

export default DynamicInfoCard;
