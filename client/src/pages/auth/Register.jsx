import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";

export default function Register() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form);
      toast.success("Account created");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white shadow-lg rounded-lg p-6 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Register</h2>

        <input name="name" placeholder="Full name" value={form.name}
          onChange={handleChange} required className="w-full border rounded px-3 py-2" />
        <input name="email" type="email" placeholder="Email" value={form.email}
          onChange={handleChange} required className="w-full border rounded px-3 py-2" />
        <input name="phone" placeholder="Phone" value={form.phone}
          onChange={handleChange} className="w-full border rounded px-3 py-2" />
        <input name="password" type="password" placeholder="Password" value={form.password}
          onChange={handleChange} required minLength={6}
          className="w-full border rounded px-3 py-2" />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-400 py-2 rounded font-semibold hover:bg-yellow-300 disabled:opacity-60"
        >
          {loading ? "Please wait..." : "Create account"}
        </button>

        <p className="text-sm text-center text-gray-600">
          Already account irukka?{" "}
          <Link to="/login" className="text-blue-600 underline">Login</Link>
        </p>
      </form>
    </div>
  );
}