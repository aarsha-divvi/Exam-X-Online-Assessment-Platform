import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000";

function RoleLogin({ role }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const roleName =
    role === "admin"
      ? "Admin"
      : role === "faculty"
      ? "Faculty"
      : "Student";

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

      // Make sure the account belongs to the portal being used.
      if (user.role !== role) {
        throw new Error(
          `This account is a ${user.role} account. Please use the correct login.`
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
    } catch (error) {
      setError(error.message || "Unable to connect to backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f7fb",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: "100%",
          maxWidth: "450px",
          background: "#ffffff",
          padding: "32px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        }}
      >
        <h1>{roleName} Login</h1>

        <p style={{ color: "#666", marginBottom: "25px" }}>
          Sign in to the Exam-X {roleName} portal.
        </p>

        {error && (
          <div
            style={{
              color: "#b00020",
              background: "#ffe8e8",
              padding: "10px",
              borderRadius: "6px",
              marginBottom: "16px",
            }}
          >
            {error}
          </div>
        )}

        <label htmlFor="email">Email</label>

        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          style={{
            display: "block",
            width: "100%",
            padding: "12px",
            marginTop: "8px",
            marginBottom: "18px",
            boxSizing: "border-box",
          }}
        />

        <label htmlFor="password">Password</label>

        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          style={{
            display: "block",
            width: "100%",
            padding: "12px",
            marginTop: "8px",
            marginBottom: "20px",
            boxSizing: "border-box",
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Signing in..." : `Login as ${roleName}`}
        </button>
      </form>
    </div>
  );
}

export default RoleLogin;