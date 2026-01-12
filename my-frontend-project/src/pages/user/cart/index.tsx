import { useEffect, useState } from "react";
import Navbar from "src/pages/components/Navbar";
import Footer from "src/pages/components/Footer";
import { useRouter } from "next/router";

interface Product {
  id: number;
  img: string;
  nama: string;
  deskripsi: string;
  unit: string;
  quantity: number;
  harga: number;
  stok: number;
}

const CartPage = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const updateQuantity = (id: number, type: "plus" | "minus") => {
    const newCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: type === "plus" ? item.quantity + 1 : Math.max(1, item.quantity - 1) }
        : item
    );
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const removeFromCart = (id: number) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const getTotal = () => cart.reduce((acc, item) => acc + item.harga * item.quantity, 0);

  const checkout = () => {
    if (cart.length === 0) {
      alert("Keranjang kosong!");
      return;
    }
    // Arahkan ke halaman payment
    router.push("/user/payment");
  };

  return (
    <>
      <Navbar />
      <main className="container mx-auto my-14 p-6 text-black">
        <h1 className="text-3xl font-bold mb-6 text-white">Keranjang Belanja</h1>

        {cart.length === 0 ? (
          <p className="text-gray-600">Keranjang masih kosong.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* List produk */}
            <div className="md:col-span-2 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center bg-white shadow rounded-lg p-4">
                  <img src={item.img} alt={item.nama} className="w-24 h-24 object-cover rounded" />
                  <div className="ml-4 flex-1">
                    <h2 className="text-lg font-semibold">{item.nama}</h2>
                    <p className="text-gray-600">
                      Rp {(Number(item.harga || 0) * item.quantity).toLocaleString()}
                    </p>
                    <div className="flex items-center mt-2">
                      <button className="px-3 py-1 bg-orange-600 text-white rounded-l" onClick={() => updateQuantity(item.id, "minus")}>-</button>
                      <span className="px-4">{item.quantity}</span>
                      <button className="px-3 py-1 bg-orange-600 text-white rounded-r" onClick={() => updateQuantity(item.id, "plus")}>+</button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-black">
                      Rp {(item.harga * item.quantity).toLocaleString()}
                    </p>
                    <button className="mt-2 text-red-600 hover:underline" onClick={() => removeFromCart(item.id)}>Hapus</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Ringkasan belanja */}
            <div className="bg-white shadow rounded-lg p-6 h-fit">
              <h2 className="text-xl font-bold mb-4">Ringkasan Belanja</h2>
              <p className="flex justify-between text-gray-700 mb-2">
                <span>Total Item</span>
                <span>{cart.reduce((acc, i) => acc + i.quantity, 0)}</span>
              </p>
              <p className="flex justify-between text-gray-700 mb-4">
                <span>Total Harga</span>
                <span>Rp {getTotal().toLocaleString()}</span>
              </p>
              <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600" onClick={checkout}>Checkout</button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default CartPage;
