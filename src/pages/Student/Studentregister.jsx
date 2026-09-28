import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, User, Mail, Lock, Building2 } from "lucide-react";
import { useState } from "react";

function StudentRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.department ||
      !formData.password
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    alert("Registration successful!");
    navigate("/student/login");
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

        <form onSubmit={handleRegister} className="mt-8 grid gap-5 sm:grid-cols-2">
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
              />
            </div>
          </div>

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
              />
            </div>
          </div>

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
              />
            </div>
          </div>

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
              />
            </div>
          </div>

          <button
            type="submit"
            className="sm:col-span-2 rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Create Account
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