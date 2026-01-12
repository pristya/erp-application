import Link from "next/link";
import Navbar from "src/pages/components/Navbar";
import Footer from "src/pages/components/Footer";

const HomePage = () => {
  return (
    <>
    <Navbar />
      <div>
        <div
          className="relative flex items-center justify-end w-full min-h-screen bg-center bg-cover"
          style={{ backgroundImage: `url('/bg.jpg')` }}
        >
          <div className=" max-w-2xl">
            <h1 className="text-5xl font-bold mb-4">
              Dari Gudang ke Cangkir, Semua Terkendali
            </h1>
            <p className="text-lg">
              Semua stok, permintaan, dan pengiriman bisa kamu pantau langsung.{" "}
              <br />
              Nggak perlu ribet, cukup hanya klik saja.
            </p>
            <br />
            <Link
              type="submit"
              href="/user/order"
              className=" px-14 py-2 font-semibold text-white  bg-orange-700 rounded hover:bg-blue-700"
            >
              Order Now!
            </Link>
          </div>
        </div>
        <div className='px-6 py-20 relative flex items-center justify-end w-full min-h-screen "'>
          <div className="grid items-center gap-12 mx-auto max-w-7xl md:grid-cols-2">
            <div>
              <Link href="/">
                <div className="bg-white text-black shadow-lg hover:scale-105 transition cursor-pointer p-4">
                  <img src="/bg1.jpg" alt="failed" />
                </div>
              </Link>
            </div>
            <div>
              <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                Tentang Sistem ERP Gudang Kopi
              </h2>
              <p className="mb-4 leading-relaxed text-white">
                Sistem ini dirancang untuk membantu pengelola gudang bahan kopi
                dalam mencatat, melacak, dan mengatur alur keluar masuk bahan
                kopi seperti green bean, roasted bean, dan lainnya secara
                real-time.
              </p>
              <p className="leading-relaxed text-white">
                Dengan antarmuka yang ramah pengguna dan dukungan role Admin &
                User, sistem ini dapat digunakan oleh tim internal maupun bagian
                operasional dalam proses permintaan dan pengelolaan stok.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
