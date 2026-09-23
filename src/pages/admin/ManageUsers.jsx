import { useEffect, useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  X,
  Users,
} from "lucide-react";

import AdminSidebar from "../../components/AdminSidebar";
import AdminNavbar from "../../components/AdminNavbar";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const API_URL = "http://localhost:5000/api/users";

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const token = getToken();

      if (!token) {
        alert("Admin login token not found. Please login again.");
        return;
      }

      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to fetch users");
        return;
      }

      setUsers(data.users || []);
    } catch (error) {
      console.error(error);
      alert("Cannot connect to backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      user.name.toLowerCase().includes(searchText) ||
      user.email.toLowerCase().includes(searchText);

    const matchesRole =
      roleFilter === "All" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const handleAddUser = () => {
    setEditingUser(null);

    setFormData({
      name: "",
      email: "",
      password: "",
      role: "student",
    });

    setShowModal(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);

    setFormData({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
    });

    setShowModal(true);
  };

  const handleDeleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = getToken();

      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to delete user");
        return;
      }

      alert("User deleted successfully");

      fetchUsers();
    } catch (error) {
      console.error(error);
      alert("Cannot connect to backend.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.role) {
      alert("Please fill all required fields.");
      return;
    }

    if (!editingUser && !formData.password) {
      alert("Password is required when creating a user.");
      return;
    }

    try {
      const token = getToken();

      let body;

      if (editingUser) {
        body = {
          name: formData.name,
          email: formData.email,
          role: formData.role,
        };

        if (formData.password) {
          body.password = formData.password;
        }
      } else {
        body = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        };
      }

      const url = editingUser
        ? `${API_URL}/${editingUser._id}`
        : API_URL;

      const method = editingUser ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Operation failed");
        return;
      }

      alert(
        editingUser
          ? "User updated successfully"
          : "User created successfully"
      );

      setShowModal(false);

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "student",
      });

      setEditingUser(null);

      fetchUsers();
    } catch (error) {
      console.error(error);
      alert("Cannot connect to backend.");
    }
  };

  const getRoleStyle = (role) => {
    if (role === "student") {
      return "bg-blue-100 text-blue-700";
    }

    if (role === "faculty") {
      return "bg-purple-100 text-purple-700";
    }

    return "bg-green-100 text-green-700";
  };

  const getRoleName = (role) => {
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <AdminSidebar />

      <div className="ml-64">
        <AdminNavbar />

        <main className="p-4 md:p-8">

          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Manage Users
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage students, faculty and administrators.
              </p>
            </div>

            <button
              onClick={handleAddUser}
              className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <Plus size={19} />
              Add User
            </button>
          </div>

          <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row">

              <div className="relative flex-1">
                <Search
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
              >
                <option value="All">All Roles</option>
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
                <option value="admin">Admin</option>
              </select>

            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

            <div className="flex items-center gap-3 border-b border-slate-200 p-5">

              <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
                <Users size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-800">
                  Users
                </h2>

                <p className="text-xs text-slate-500">
                  {filteredUsers.length} users found
                </p>
              </div>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full min-w-[700px]">

                <thead className="bg-slate-50">
                  <tr>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                      User
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                      Email
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                      Role
                    </th>

                    <th className="px-5 py-4 text-center text-xs font-semibold uppercase text-slate-500">
                      Actions
                    </th>

                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">

                  {loading ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-5 py-10 text-center text-sm text-slate-500"
                      >
                        Loading users...
                      </td>
                    </tr>
                  ) : filteredUsers.length > 0 ? (

                    filteredUsers.map((user) => (

                      <tr
                        key={user._id}
                        className="transition hover:bg-slate-50"
                      >

                        <td className="px-5 py-4">

                          <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                              {user.name.charAt(0).toUpperCase()}
                            </div>

                            <span className="text-sm font-semibold text-slate-800">
                              {user.name}
                            </span>

                          </div>

                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {user.email}
                        </td>

                        <td className="px-5 py-4">

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${getRoleStyle(
                              user.role
                            )}`}
                          >
                            {getRoleName(user.role)}
                          </span>

                        </td>

                        <td className="px-5 py-4">

                          <div className="flex justify-center gap-2">

                            <button
                              onClick={() => handleEditUser(user)}
                              className="rounded-lg p-2 text-blue-600 hover:bg-blue-100"
                              title="Edit User"
                            >
                              <Edit size={17} />
                            </button>

                            <button
                              onClick={() => handleDeleteUser(user._id)}
                              className="rounded-lg p-2 text-red-600 hover:bg-red-100"
                              title="Delete User"
                            >
                              <Trash2 size={17} />
                            </button>

                          </div>

                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>
                      <td
                        colSpan="4"
                        className="px-5 py-10 text-center text-sm text-slate-500"
                      >
                        No users found.
                      </td>
                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </div>

        </main>
      </div>

      {showModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">

            <div className="flex items-center justify-between border-b border-slate-200 p-5">

              <div>

                <h2 className="text-lg font-bold text-slate-800">
                  {editingUser ? "Edit User" : "Add New User"}
                </h2>

                <p className="text-sm text-slate-500">
                  {editingUser
                    ? "Update user information."
                    : "Create a new user account."}
                </p>

              </div>

              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-5"
            >

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={
                    editingUser
                      ? "Leave blank to keep current password"
                      : "Enter password"
                  }
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Role
                </label>

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
                >
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                  <option value="admin">Admin</option>
                </select>

              </div>

              <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  {editingUser ? "Update User" : "Add User"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default ManageUsers;