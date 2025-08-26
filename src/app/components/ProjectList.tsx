
import Card from '@/app/components/Card';
// Pastikan tipe 'projek' diekspor dari file route Anda
import { projek } from "@/app/api/projects/route";


// Fungsi untuk mengambil data proyek
async function getProjects(): Promise<projek[]> {
  // URL API Anda
  const apiUrl = `${process.env.APP_URL}/api/projects`;
  
  try {
    const res = await fetch(apiUrl, {
      cache: 'no-store', 
    });

    if (!res.ok) {
      throw new Error('Gagal mengambil data proyek');
    }
    
    // Simulasi jeda 2 detik agar loading terlihat
    // await new Promise(resolve => setTimeout(resolve, 2000));

    return res.json();
  } catch (error) {
    console.error(error);
    return []; 
  }
}

// React Server Component untuk menampilkan daftar proyek
const ProjectList = async () => {
  const projects = await getProjects();

  if (projects.length === 0) {
    return <p>Tidak ada proyek yang dapat ditampilkan.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {projects.map((project) => (
        // Pastikan komponen Card Anda menerima props seperti ini
        <Card name={''} html_url={''} homepage={''} key={project.title} {...project} />
      ))}
    </div>
  );
};

export default ProjectList;
