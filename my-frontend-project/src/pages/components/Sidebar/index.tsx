import React from "react";
import { useRouter } from "next/router";


const menuItems = [
  { name: "Dashboard", path: "/admin/dashboard" },
  { name: "Pesanan", path: "/admin/product" },
  { name: "User", path: "/admin/user" },
  { name: "Pembayaran", path: "/admin/payments" },
  { name: "Pengaturan", path: "/admin/settings" },
];

const AdminSidebar = () => {
  const router = useRouter();

  const handleLogout = () => {
    // logika logout, hapus token/session
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  return (
    <aside className="bg-gray-900 text-white w-64 min-h-screen flex flex-col">
      {/* Header */}
      <div className="p-4 text-center text-xl font-bold border-b border-gray-700">
        Admin Panel
      </div>

      {/* Menu */}
      <nav className="flex-1">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => router.push(item.path)}
            className={`flex items-center w-full px-4 py-3 text-left hover:bg-gray-800 transition ${
              router.pathname === item.path ? "bg-gray-800" : ""
            }`}
          >
            {item.name}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-left hover:bg-red-600 transition"
        >
          Keluar
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
