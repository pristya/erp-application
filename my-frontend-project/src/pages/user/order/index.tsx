import { useEffect, useState } from "react";
import Navbar from "src/pages/components/Navbar";
import Footer from "src/pages/components/Footer";
import { AxiosCaller } from "@lib/axios-caller/AxiosCaller";
import { useRouter } from "next/router";

const OrderPage = () => {

interface product {
  id: number
  img: string
  nama: string
  deskripsi: string
  unit: string
  quantity: number
  harga: number
  stok: number
  is_active: boolean
  created_at: Date
}

const [product, setProduct] = useState<product[]>([]);
const [loading, setLoading] = useState(true);

const fetchProducts = async () => {
  try {
    const res = await fetch("http://localhost:3001/product-list", {
      headers: {
        authorization: "Bearer" + localStorage.getItem("token") || "" ,
      },
    });
    const data = await res.json();

        // tambahin field quantity biar bisa dipake frontend
        const productsWithQty = data.map((p: product) => ({
            ...p,
            quantity: 0,
        }));

        setProduct(productsWithQty);

    } catch (err) {
      console.log("Gagal fetch produk:", err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchProducts();
  }, []);

  const updateQuantity = (id: number, type: "plus" | "minus") => {
    setProduct((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              quantity:
                type === "plus"
                ? p.quantity + 1
                : p.quantity > 0
                ? p.quantity - 1
                : 0,
              }
              : p
            )
          );
        };
        

  const addToCart = (product: product) => {
    const user = localStorage.getItem("user");

    // if (!user) {
    //   alert(
    //     "Silakan login terlebih dahulu sebelum menambahkan ke keranjang."
    //   );
    //   window.location.href = "/auth/login"; // Redirect ke halaman login
    //   return;
    // }

    if (product.quantity > 0) {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const existingIndex = cart.findIndex(
        (item: product) => item.id === product.id
      );
      if (existingIndex >= 0) {
        cart[existingIndex].quantity += product.quantity;
      } else {
        cart.push({
          ...product,
          harga: Number(product.harga),
        });
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(
        `Berhasil menambahkan ${product.quantity} ${product.nama} ke keranjang!`
      );

      // ✅ Reset quantity setelah masuk cart
    setProduct((prev) =>
      prev.map((p) =>
        p.id === product.id ? { ...p, quantity: 0 } : p
      )
    );

    } else {
      alert("Quantity masih 0, silakan tambah dulu.");
    }
  };
 

    return (
    <>
      <Navbar />
      <main className="container mx-auto my-14 p-6 m-10">
        <h1 className="text-3xl font-bold mb-6">Order Produk</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {product.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow rounded-lg overflow-hidden"
            >
              <img
                src={product.img}
                alt={product.nama}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-black">
                   {product.nama}
                </h2>
                <p className="text-sm text-gray-600">{product.deskripsi}</p>
                <p className="text-black mt-2">
                  Rp {product.harga.toLocaleString()}{" "}
                  <span className="text-gray-500">{product.unit}</span>
                </p>
                <div className="flex items-center mt-4">
                  <span className="px-4 text-gray-800">{product.stok}</span>
                  <button
                    className="px-3 py-1 bg-orange-600 text-white rounded-l"
                    onClick={() => updateQuantity(product.id, "minus")}
                  >
                    -
                  </button>
                  <span className="px-4 text-gray-800">{product.quantity}</span>
                  <button
                    className="px-3 py-1 bg-orange-600 text-white rounded-r"
                    onClick={() => updateQuantity(product.id, "plus")}
                  >
                    +
                  </button>
                </div>
                <button
                  className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                  onClick={() => addToCart(product)}
                >
                  Tambah ke Keranjang
                </button>  
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );

}

export default OrderPage;