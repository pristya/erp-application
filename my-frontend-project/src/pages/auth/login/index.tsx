import { useState } from "react";
import { AxiosCaller } from "@lib/axios-caller/AxiosCaller";
import { useRouter } from "next/router";

const LoginPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);


  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await new AxiosCaller("http://localhost:3001").call[
        "POST /login"
      ]({
        body: {
          username: form.username,
          password: form.password,
        },
      });

  console.log("Login response:", res);

    localStorage.setItem("token", res.token);
    localStorage.setItem("role", res.role);

    if (res.role === "USER") {
      router.push("/user/order");
    } else if (res.role === "ADMIN") {
      router.push("/admin/dashboard")
    }
    else {
      alert("User not valid!")
    }
  } catch (err: any) {
    alert("Login gagal, cek username/password!");
  } finally {
    setLoading(false);
  }
  };

return (
    <div className="flex justify-center items-center min-h-screen bg-center bg-cover"
          style={{ backgroundImage: `url('/bg2.jpg')` }}>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-gray-700"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Login ke Akun Anda
        </h2>

        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-3 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
        //   disabled={loading} // Tambahkan `disabled` saat loading untuk mencegah klik ganda
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300 disabled:bg-gray-400"
        >
          {loading ? "Loading..." : "Login"}
        </button>

        <p className="text-center text-gray-600 mt-4 text-sm">
          Belum punya akun?{" "}
          <a href="/auth/register" className="text-blue-500 hover:underline">
            Daftar disini
          </a>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;