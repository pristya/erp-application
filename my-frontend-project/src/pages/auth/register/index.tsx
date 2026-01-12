import { useRouter } from "next/router"
import { stringify } from "querystring";
import { useState } from "react";
import { json } from "stream/consumers";

const RegisterPage = () => {
const router = useRouter();
const [form, setForm] = useState({
    nama_lengkap: "",
    username: "",
    nomor_hp: "",
    password: ""
});
const [loading, setLoading] = useState(false);

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
};

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi input form sebelum di kirim ke server
    if (!form.nama_lengkap || !form.username || !form.nomor_hp || !form.password) {
        alert("Please fill in all fields!")
        return;
    }

    setLoading(true);
    try {
        const res = await fetch("http://localhost:3001/register", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form),
        });

        if (!res.ok) {
            throw new Error("Register gagal!")
        }

        const result = await res.json();

        if (result.success) {
            alert("Register berhasil!");
            router.push("/auth/login");
        } else {
            alert("Regiter gagal: " + result.message);
        }
    } catch (err: any) {
        alert(err.message);
    }
}

    return (
        <div className="flex justify-center items-center min-h-screen bg-center bg-cover text-black"
          style={{ backgroundImage: `url('/bg2.jpg')` }}>
    <form
    onSubmit={handleSubmit}
    className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
    >
    <h1 className="text-2xl font-bold text-center mb-4">Register</h1>

    <input
        name="nama_lengkap"
        placeholder="Nama Lengkap"
        onChange={handleChange}
        value={form.nama_lengkap}
        className="w-full p-2 border border-gray-300 rounded"
    />
    <input
        name="username"
        placeholder="Username"
        onChange={handleChange}
        value={form.username}
        className="w-full p-2 border border-gray-300 rounded"
    />
    <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        value={form.password}
        className="w-full p-2 border border-gray-300 rounded"
    />
    <input
        name="nomor_hp"
        placeholder="Nomor HP"
        onChange={handleChange}
        value={form.nomor_hp}
        className="w-full p-2 border border-gray-300 rounded"
    />

    <button
        type="submit"
        onClick={() => alert(JSON.stringify(form))}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
    >
        {loading ? "Loading..." : "Register"}
    </button>

    {/* <button
        type="button"
        onClick={() => alert(JSON.stringify(form, null, 2))}
        className="w-full mt-2 bg-gray-200 p-2 rounded hover:bg-gray-300"
    >
        Test Click (Show Form State)
    </button> */}
    </form>
</div>
);
}

export default RegisterPage;