import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import Reports from "./pages/admin/Reports";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/admin/dashboard" replace />}
        />

        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/users"
          element={<ManageUsers />}
        />

        <Route
          path="/admin/reports"
          element={<Reports />}
        />

        <Route
          path="*"
          element={<Navigate to="/admin/dashboard" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;