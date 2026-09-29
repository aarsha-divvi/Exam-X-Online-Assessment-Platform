import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, Mail, Lock } from "lucide-react";
import { useState } from "react";

const API_URL = "http://localhost:5000";

function StudentLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      if (!data.user || !data.token) {
        throw new Error("Invalid login response from server.");
      }

      if (data.user.role !== "student") {
        throw new Error(
          `This account is registered as ${data.user.role}, not student.`
        );
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/student/dashboard", { replace: true });
    } catch (err) {
      console.error("Student login error:", err);
      setError(err.message || "Unable to connect to backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-2">

        {/* LEFT */}
        <div className="hidden bg-blue-600 p-10 text-white md:flex md:flex-col md:justify-center">
          <GraduationCap size={55} />

          <h1 className="mt-6 text-4xl font-bold">
            Welcome to ExamX
          </h1>

          <p className="mt-4 text-blue-100">
            Take online assessments, track your performance and improve your
            skills.
          </p>
        </div>

        {/* RIGHT */}
        <div className="p-8 sm:p-10">
          <h2 className="text-3xl font-bold text-slate-800">
            Student Login
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Login to continue your assessment journey.
          </p>

          {error && (
            <div className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="mt-8 space-y-5">

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email
              </label>

              <div className="flex items-center rounded-lg border border-slate-300 px-3">
                <Mail size={18} className="text-slate-400" />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3 py-3 outline-none"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Password
              </label>

              <div className="flex items-center rounded-lg border border-slate-300 px-3">
                <Lock size={18} className="text-slate-400" />

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-3 py-3 outline-none"
                  required
                />
              </div>
            </div>

            <div className="text-right">
              <button
                type="button"
                className="text-sm font-medium text-blue-600 hover:underline"
                onClick={() => setError("Password reset is not implemented yet.")}
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link
              to="/student/register"
              className="font-semibold text-blue-600 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default StudentLogin;