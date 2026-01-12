import { useEffect, useState } from "react";

import { AxiosCaller } from "@lib/axios-caller/AxiosCaller";
import AdminSidebar from "src/pages/components/Sidebar";

const ProductPage = () => {

    interface product {
      id: number
      img: string
      nama: string
      deskripsi: string
      unit: string
      harga: number
      stok: number
      is_active: boolean
      created_at: Date
      quantity?: number
    }
    
    const [product, setProduct] = useState<product[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [newProduct, setNewProduct] = useState ({
                    deskripsi: "",
                    harga: 0,
                    img: "",
                    nama: "",
                    stok: 0,
                    unit: ""
                  })
    
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3001/product-list", {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token") || "" ,
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
                  stok:
                    type === "plus"
                    ? p.stok + 1
                    : p.stok > 0
                    ? p.stok - 1
                    : 0,
                  }
                  : p
                )
              );
            };
            
      const addProduct = async () => {
        try {
          console.log("token", localStorage.getItem("token"));
          const res = await new AxiosCaller("http://localhost:3001").call["POST /add-product"] ({
            headers: {
                        authorization: "Bearer " + localStorage.getItem("token") || "" ,
                    },
                  body: newProduct
          })
          alert(res);
          await fetchProducts();
          setShowModal(false);
    
          // Reset state newProduct biar form kosong lagi
          setNewProduct({
            deskripsi: "",
            harga: 0,
            img: "",
            nama: "",
            stok: 0,
            unit: ""
          })

        } catch(err) {
          console.log("gagal fetch product")
        }
      }
      const addToCart = (product: product) => {
        const user = localStorage.getItem("user");
    
        if (!user) {
          alert(
            "Silakan login terlebih dahulu sebelum menambahkan ke keranjang."
          );
          window.location.href = "/auth/login"; // Redirect ke halaman login
          return;
        }
    
        if (product.stok > 0) {
          const cart = JSON.parse(localStorage.getItem("cart") || "[]");
          const existingIndex = cart.findIndex(
            (item: product) => item.id === product.id
          );
          if (existingIndex >= 0) {
            cart[existingIndex].quantity += product.stok;
          } else {
            cart.push(product);
          }
          localStorage.setItem("cart", JSON.stringify(cart));
          alert(
            `Berhasil menambahkan ${product.stok} ${product.nama} ke keranjang!`
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
        <div className="flex">
        <AdminSidebar />
          <main className="container mx-auto my-14 p-6 m-10">
            <h1 className="text-3xl font-bold mb-6">Order Produk</h1>
            <button onClick={() => setShowModal(true)} className="bg-orange-200 mb-5 p-2 text-black rounded-xl hover:bg-orange-400 hover:font-bold">Tambah Produk</button>
             {/* Modal */}
            {showModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-black">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                  <h2 className="text-xl font-bold mb-4">Tambah Produk Baru</h2>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Nama Produk"
                      className="w-full border p-2 rounded text-black"
                      value={newProduct.nama}
                      onChange={(e) => setNewProduct({ ...newProduct, nama: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="Deskripsi"
                      className="w-full border p-2 rounded text-black"
                      value={newProduct.deskripsi}
                      onChange={(e) => setNewProduct({ ...newProduct, deskripsi: e.target.value })}
                    />
                    <input
                      type="number"
                      placeholder="Harga"
                      className="w-full border p-2 rounded"
                      value={newProduct.harga}
                      onChange={(e) => setNewProduct({ ...newProduct, harga: Number(e.target.value) })}
                    />
                    <input
                      type="text"
                      placeholder="URL Gambar"
                      className="w-full border p-2 rounded"
                      value={newProduct.img}
                      onChange={(e) => setNewProduct({ ...newProduct, img: e.target.value })}
                    />
                    <input
                      type="number"
                      placeholder="Stok"
                      className="w-full border p-2 rounded"
                      value={newProduct.stok}
                      onChange={(e) => setNewProduct({ ...newProduct, stok: Number(e.target.value) })}
                    />
                    <input
                      type="text"
                      placeholder="Satuan (ex: /kg)"
                      className="w-full border p-2 rounded"
                      value={newProduct.unit}
                      onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
                    />
                  </div>
    
                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                    >
                      Batal
                    </button>
                    <button
                      onClick={addProduct}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Simpan
                    </button>
                  </div>
                </div>
              </div>
            )}
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
                    <div className="flex items-center mt-2">
                      <span className="px-4 py-1 bg-orange-400 rounded-xl text-black">Stok: {product.stok}</span>
                    </div>
                     
                  </div>
                </div>
              ))}
            </div>
          </main>
          </div>
        </>
        
      );
    
}

export default ProductPage;