import { useState, useEffect } from "react";
import Navbar from "src/pages/components/Navbar";
import Footer from "src/pages/components/Footer";
import { useRouter } from "next/router";
import { AxiosCaller } from "@lib/axios-caller/AxiosCaller";

const MetodePembayaran = [
  {
    nama: "Bank BRI",
    instruksi: "Transfer ke 1234-5678-9012 a.n PT Stokin Aja",
    qr: "/qr/bri.png",
  },
  {
    nama: "Bank BCA",
    instruksi: "Transfer ke 9876-5432-1098 a.n PT Stokin Aja",
    qr: "/qr/bca.png",
  },
  {
    nama: "GoPay",
    instruksi: "Scan QR GoPay atau transfer ke 0812-3456-7890",
    qr: "/qr/gopay.png",
  },
  {
    nama: "Dana",
    instruksi: "Transfer ke 0812-2222-3333 (Dana)",
    qr: "/qr/dana.png",
  },
  {
    nama: "OVO",
    instruksi: "Transfer ke 0812-1111-4444 (OVO)",
    qr: "/qr/ovo.png",
  },
  {
    nama: "ShopeePay",
    instruksi: "Transfer ke 0812-7777-8888 (ShopeePay)",
    qr: "/qr/shopeepay.png",
  },
];

const PaymentPage = () => {
  const [cart, setCart] = useState<any[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<
    (typeof MetodePembayaran)[0] | null
  >(null);
  const router = useRouter();

  const confirmPayment = async () => {
    if (!selectedMethod) return alert("Pilih metode pembayaran!");
    if (cart.length === 0) return alert("Keranjang kosong!");

    try {
      const authToken = localStorage.getItem("token");
      if (!authToken) {
        alert("Anda belum login");
        return;
      }

      const item = cart[0];
      const qty = Number(item.qty || item.quantity);
      if (!qty) {
        alert("Qty tidak valid!");
        return;
      }

      console.log("token", localStorage.getItem("token"));
      const res = await new AxiosCaller("http://localhost:3001").call[
        "POST /add-transaction"
      ]({
        headers: {
          authorization: "Bearer" + localStorage.getItem("token") || "",
        },
        body: {
          product_id: Number(item.id),
          qty,
        },
      });

      const trx = Array.isArray(res) ? res[0] : res;

      localStorage.removeItem("cart");
      router.push(`/user/status`);
    } catch (error: any) {
      console.error("❌ Error pembayaran:", error);
      alert(
        error.response?.data?.message ||
          error.message ||
          "Gagal melakukan pembayaran!"
      );
    }
  };

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  return (
    <>
      <Navbar />
      <main className="container mx-auto my-14 p-6 text-black">
        <h1 className="text-3xl font-bold mb-6 text-center">Pembayaran</h1>

        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg mx-auto space-y-6">
          {/* Metode Pembayaran */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Pilih Metode Pembayaran</h2>
            <div className="space-y-3">
              {MetodePembayaran.map((m, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedMethod(m)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    selectedMethod?.nama === m.nama
                      ? "bg-green-50 border-green-500 shadow-md"
                      : "hover:bg-gray-50 border-gray-300"
                  }`}
                >
                  <p className="font-semibold text-gray-800">{m.nama}</p>
                  <p className="text-sm text-gray-600">{m.instruksi}</p>
                </button>
              ))}
            </div>
          </div>

          {/* QR Code */}
          {selectedMethod && (
            <div className="text-center border-t pt-6">
              <p className="font-semibold mb-2">
                Scan QR untuk {selectedMethod.nama}
              </p>
              <img
                src={selectedMethod.qr}
                alt={`QR ${selectedMethod.nama}`}
                className="w-48 h-48 mx-auto rounded-lg shadow-md"
              />
            </div>
          )}

          {/* Tombol Aksi */}
          <div className="flex justify-between gap-3 pt-4">
            <button
              className="flex-1 px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
              onClick={() => router.push("/user/cart")}
            >
              Batal
            </button>
            <button
              className="flex-1 px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 shadow transition"
              onClick={confirmPayment}
            >
              Konfirmasi
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PaymentPage;
