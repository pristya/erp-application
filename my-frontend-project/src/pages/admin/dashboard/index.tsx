import React, { useState, useEffect } from "react";
import AdminSidebar from "src/pages/components/Sidebar";

interface Order {
  id: number;
  userName: string;
  paymentMethod: string;
  total: number;
  status: string;
  proofUrl?: string;
}

const AdminDashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Data dummy untuk testing
    setOrders([
      {
        id: 1,
        userName: "Budi Santoso",
        paymentMethod: "Transfer Bank",
        total: 150000,
        status: "Menunggu Konfirmasi",
        proofUrl: "/uploads/bukti1.jpg",
      },
      {
        id: 2,
        userName: "Siti Aminah",
        paymentMethod: "E-Wallet",
        total: 200000,
        status: "Sudah Dikonfirmasi",
        proofUrl: "/uploads/bukti2.jpg",
      },
    ]);
  }, []);

  const handleConfirm = (id: number) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: "Sudah Dikonfirmasi" } : order
      )
    );
  };

  return (
    <>
    <div className="flex">
      <AdminSidebar />
      <main className="container mx-auto p-6 bg-white rounded-lg shadow-md text-black">
        
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">ID</th>
              <th className="border border-gray-300 p-2">User</th>
              <th className="border border-gray-300 p-2">Metode</th>
              <th className="border border-gray-300 p-2">Total</th>
              <th className="border border-gray-300 p-2">Bukti</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="border border-gray-300 p-2">{order.id}</td>
                <td className="border border-gray-300 p-2">{order.userName}</td>
                <td className="border border-gray-300 p-2">{order.paymentMethod}</td>
                <td className="border border-gray-300 p-2">
                  Rp {order.total.toLocaleString()}
                </td>
                <td className="border border-gray-300 p-2">
                  {order.proofUrl ? (
                    <a
                      href={order.proofUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Lihat Bukti
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="border border-gray-300 p-2">{order.status}</td>
                <td className="border border-gray-300 p-2">
                  {order.status === "Menunggu Konfirmasi" && (
                    <button
                      onClick={() => handleConfirm(order.id)}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-500"
                    >
                      Konfirmasi
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      </div>
    </>
  );
};

export default AdminDashboard;
