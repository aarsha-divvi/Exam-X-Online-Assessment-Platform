import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, Mail, Lock } from "lucide-react";

const API_URL = "http://localhost:5000";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    // Validate fields
    if (!email || !newPassword || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    setLoading(true);

    try {
      // STEP 1:
      // Ask backend to create a reset token for this email.
      const forgotResponse = await fetch(
        `${API_URL}/api/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      const forgotData = await forgotResponse.json();

      if (!forgotResponse.ok) {
        throw new Error(
          forgotData.message || "Unable to process email."
        );
      }

      if (!forgotData.resetToken) {
        throw new Error(
          "Unable to reset password for this email."
        );
      }

      // STEP 2:
      // Immediately use the reset token with the new password.
      const resetResponse = await fetch(
        `${API_URL}/api/auth/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            resetToken: forgotData.resetToken,
            newPassword,
          }),
        }
      );

      const resetData = await resetResponse.json();

      if (!resetResponse.ok) {
        throw new Error(
          resetData.message || "Password reset failed."
        );
      }

      setSuccess(
        "Password reset successfully. Redirecting to login..."
      );

      // Clear fields
      setEmail("");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/student/login", {
          replace: true,
        });
      }, 1500);
    } catch (err) {
      console.error("Forgot password error:", err);

      setError(
        err.message || "Unable to connect to backend."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-2">

        {/* LEFT PANEL */}
        <div className="hidden bg-blue-600 p-10 text-white md:flex md:flex-col md:justify-center">
          <GraduationCap size={55} />

          <h1 className="mt-6 text-4xl font-bold">
            Welcome to ExamX
          </h1>

          <p className="mt-4 text-blue-100">
            Reset your password securely and continue
            your assessment journey.
          </p>
        </div>

        {/* RIGHT PANEL */}
        <div className="p-8 sm:p-10">
          <h2 className="text-3xl font-bold text-slate-800">
            Forgot Password
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Enter your email and create a new password.
          </p>

          {/* ERROR */}
          {error && (
            <div className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* SUCCESS */}
          {success && (
            <div className="mt-5 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-600">
              {success}
            </div>
          )}

          <form
            onSubmit={handleResetPassword}
            className="mt-8 space-y-5"
          >
            {/* EMAIL */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Registered Email
              </label>

              <div className="flex items-center rounded-lg border border-slate-300 px-3">
                <Mail
                  size={18}
                  className="text-slate-400"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="Enter your registered email"
                  className="w-full px-3 py-3 outline-none"
                  required
                />
              </div>
            </div>

            {/* NEW PASSWORD */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                New Password
              </label>

              <div className="flex items-center rounded-lg border border-slate-300 px-3">
                <Lock
                  size={18}
                  className="text-slate-400"
                />

                <input
                  type="password"
                  value={newPassword}
                  onChange={(event) =>
                    setNewPassword(event.target.value)
                  }
                  placeholder="Enter new password"
                  className="w-full px-3 py-3 outline-none"
                  required
                />
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Confirm Password
              </label>

              <div className="flex items-center rounded-lg border border-slate-300 px-3">
                <Lock
                  size={18}
                  className="text-slate-400"
                />

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(event.target.value)
                  }
                  placeholder="Confirm new password"
                  className="w-full px-3 py-3 outline-none"
                  required
                />
              </div>
            </div>

            {/* RESET BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Resetting Password..." : "Reset Password"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Remember your password?{" "}
            <Link
              to="/student/login"
              className="font-semibold text-blue-600 hover:underline"
            >
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;