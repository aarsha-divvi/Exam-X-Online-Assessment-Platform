import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./RoleLogin.css";

const API_URL = "http://localhost:5000";

function RoleLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  const role = location.pathname.startsWith("/admin")
    ? "admin"
    : location.pathname.startsWith("/faculty")
      ? "faculty"
      : "student";

  const roleName =
    role === "admin"
      ? "Admin"
      : role === "faculty"
        ? "Faculty"
        : "Student";

  const getContent = () => {
    if (role === "faculty") {
      return {
        title: "Faculty Login",
        subtitle: "Login to manage your assessments.",
        welcome: "Welcome to ExamX",
        description:
          "Create exams, manage questions, schedule assessments and track student performance.",
        button: "Login",
        registerText: "",
      };
    }

    if (role === "admin") {
      return {
        title: "Admin Login",
        subtitle: "Login to manage the ExamX platform.",
        welcome: "Welcome to ExamX",
        description:
          "Manage users, monitor assessments and maintain the online assessment platform.",
        button: "Login",
        registerText: "",
      };
    }

    return {
      title: "Student Login",
      subtitle: "Login to continue your assessment journey.",
      welcome: "Welcome to ExamX",
      description:
        "Take online assessments, track your performance and improve your skills.",
      button: "Login",
      registerText: "Don't have an account?",
    };
  };

  const content = getContent();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

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

      const user = data.user;
      const token = data.token || data.accessToken;

      if (!user || !token) {
        throw new Error("Invalid login response from server");
      }

      if (user.role !== role) {
        throw new Error(
          `This account is registered as ${user.role}. Please use the correct login.`
        );
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "admin") {
        navigate("/admin", { replace: true });
      } else if (user.role === "faculty") {
        navigate("/faculty", { replace: true });
      } else {
        navigate("/student/dashboard", { replace: true });
      }
    } catch (err) {
      setError(err.message || "Unable to connect to backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="role-login-page">
      <div className="role-login-card">

        {/* LEFT PANEL */}
        <div className="role-login-left">
          <div className="role-login-cap">
            <svg
              width="58"
              height="58"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 10.5 12 5l9 5.5-9 5-9-5Z" />
              <path d="M6 12.5V16c3.5 2.5 8.5 2.5 12 0v-3.5" />
              <path d="M21 10.5v5" />
            </svg>
          </div>

          <h2>{content.welcome}</h2>

          <p>{content.description}</p>
        </div>

        {/* RIGHT PANEL */}
        <div className="role-login-right">

          <h1>{content.title}</h1>

          <p className="role-login-subtitle">
            {content.subtitle}
          </p>

          {error && (
            <div className="role-login-error">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>

            {/* EMAIL */}
            <label htmlFor="email">Email</label>

            <div className="role-input-wrapper">
              <span className="role-input-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              </span>

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* PASSWORD */}
            <label htmlFor="password">Password</label>

            <div className="role-input-wrapper">
              <span className="role-input-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="4" y="10" width="16" height="10" rx="2" />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                </svg>
              </span>

              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="role-forgot">
              <button
                type="button"
                onClick={() =>
                  setError("Password reset is not implemented yet.")
                }
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="role-login-button"
              disabled={loading}
            >
              {loading ? "Logging in..." : content.button}
            </button>

            {content.registerText && (
              <p className="role-register-text">
                {content.registerText}{" "}
                <button
                  type="button"
                  onClick={() => navigate("/student/register")}
                >
                  Register
                </button>
              </p>
            )}

          </form>
        </div>
      </div>
    </div>
  );
}

export default RoleLogin;