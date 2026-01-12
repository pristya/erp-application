// src/pages/user/invoice.tsx
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useRouter } from "next/router";
import { AxiosCaller } from "@lib/axios-caller/AxiosCaller";

interface Product {
  id: number;
  nama: string;
  harga: string;
  stok: string;
  img: string;
}

interface TransactionItem {
  id: number;
  qty: string;
  status?: string;
  otm_product_id: Product;
  otm_transaction_id: { id: number };
  created_at: string;
}

const StatusPage: React.FC = () => {
  const [transactions, setTransactions] = useState<TransactionItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const authToken = localStorage.getItem("token");
    if (!authToken) {
      router.push("/login");
      return;
    }

    const fetchTransactions = async () => {
      try {
        const res = await new AxiosCaller("http://localhost:3001").call[
          "GET /transaction-list"
        ]({
          headers: { authorization: "Bearer " + authToken },
          query: {},
        });

        const mapped: TransactionItem[] = (res as any[]).map((item) => ({
          id: item.id,
          qty: item.qty,
          status: item.status || "pending",
          otm_product_id: item.otm_product_id,
          otm_transaction_id: { id: item.otm_transaction_id.id },
          created_at: item.created_at,
        }));

        setTransactions(mapped);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      }
    };

    fetchTransactions();
  }, [router]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-700 border border-green-400";
      case "cancelled":
        return "bg-red-100 text-red-700 border border-red-400";
      default:
        return "bg-yellow-100 text-yellow-700 border border-yellow-400";
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-black bg-gray-50">
      <Navbar />
      <main className="flex-1 container mx-auto px-6 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Daftar Transaksi
        </h1>
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wide">
              <tr>
                <th className="px-6 py-4 text-left">Produk</th>
                <th className="px-6 py-4 text-center">Qty</th>
                <th className="px-6 py-4 text-center">Harga</th>
                <th className="px-6 py-4 text-center">Tanggal</th>
                <th className="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((item) => (
                <tr
                  key={item.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img
                      src={item.otm_product_id.img}
                      alt={item.otm_product_id.nama}
                      className="w-12 h-12 object-cover rounded-lg shadow"
                    />
                    <span className="font-medium">
                      {item.otm_product_id.nama}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {Number(item.qty)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    Rp {Number(item.otm_product_id.harga).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {new Date(item.created_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        item.status || "pending"
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {transactions.length === 0 && (
            <p className="text-center text-gray-500 py-6">
              Belum ada transaksi.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StatusPage;
