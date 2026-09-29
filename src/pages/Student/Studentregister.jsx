import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, User, Mail, Lock, Building2 } from "lucide-react";
import { useState } from "react";

const API_URL = "http://localhost:5000";

function StudentRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.department ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: "student",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setSuccess("Registration successful! Redirecting to login...");

      setFormData({
        name: "",
        email: "",
        department: "",
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        navigate("/student/login", { replace: true });
      }, 1200);
    } catch (err) {
      console.error("Student registration error:", err);
      setError(err.message || "Unable to connect to backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-100 px-4 py-8">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-2xl sm:p-10">

        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600 text-white">
            <GraduationCap size={30} />
          </div>

          <h1 className="mt-4 text-3xl font-bold text-slate-800">
            Create Student Account
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Register to access online assessments.
          </p>
        </div>

        {error && (
          <div className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-6 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-600">
            {success}
          </div>
        )}

        <form
          onSubmit={handleRegister}
          className="mt-8 grid gap-5 sm:grid-cols-2"
        >
          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Full Name
            </label>

            <div className="flex rounded-lg border border-slate-300 px-3">
              <User size={18} className="mt-3 text-slate-400" />

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full px-3 py-3 outline-none"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Email
            </label>

            <div className="flex rounded-lg border border-slate-300 px-3">
              <Mail size={18} className="mt-3 text-slate-400" />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="student@example.com"
                className="w-full px-3 py-3 outline-none"
                required
              />
            </div>
          </div>

          {/* Department */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Department
            </label>

            <div className="flex rounded-lg border border-slate-300 px-3">
              <Building2 size={18} className="mt-3 text-slate-400" />

              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full bg-white px-3 py-3 outline-none"
                required
              >
                <option value="">Select department</option>
                <option value="CSE">CSE</option>
                <option value="AI & DS">AI & DS</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="IT">IT</option>
              </select>
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Password
            </label>

            <div className="flex rounded-lg border border-slate-300 px-3">
              <Lock size={18} className="mt-3 text-slate-400" />

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create password"
                className="w-full px-3 py-3 outline-none"
                required
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-medium">
              Confirm Password
            </label>

            <div className="flex rounded-lg border border-slate-300 px-3">
              <Lock size={18} className="mt-3 text-slate-400" />

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="w-full px-3 py-3 outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="sm:col-span-2 rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            to="/student/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default StudentRegister;