// import Greeting from './components/Greeting';
// import Bio from "@/app/components/Bio";

const HomePage = () => {
  return (
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="flex min-h-screen flex-col items-center justify-center px-6 py-24">
          {/* Main Content */}
          <div className="text-center max-w-4xl mx-auto">
            {/* Welcome Message */}
            <div className="mb-8">
              <h2 className="text-xl text-gray-600 mb-4">
                Halo, Saya
              </h2>
              <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 leading-tight">
                Nanda Bahtiar Bashori
              </h1>
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-8">
                Full Stack Developer
              </h3>
            </div>

            {/* Main Description */}
            <div className="mb-12 max-w-3xl mx-auto">
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Saya adalah seorang developer yang berfokus pada pembuatan aplikasi web modern dan responsif.
                Dengan pengalaman dalam teknologi frontend dan backend, saya menciptakan solusi digital yang
                tidak hanya fungsional, tetapi juga memberikan pengalaman pengguna yang luar biasa.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Mari berkolaborasi untuk mewujudkan ide-ide inovatif menjadi kenyataan digital!
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Lihat Project
              </button>
              <button className="px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors duration-200">
                Hubungi Saya
              </button>
              <button className="px-8 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition-colors duration-200">
                Download CV
              </button>
            </div>


          </div>
        </div>
      </main>
  );
};

export default HomePage;