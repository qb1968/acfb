import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://acfb.onrender.com/api";

export default function AdminManagement() {
  const [admins, setAdmins] = useState([]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [currentAdminId, setCurrentAdminId] = useState(null);

  const getAuthConfig = () => {
    const token = localStorage.getItem("token");

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  /*
  |--------------------------------------------------------------------------
  | LOAD CURRENT ADMIN
  |--------------------------------------------------------------------------
  */

  const loadCurrentAdmin = async () => {
    try {
      const res = await axios.get(`${API}/auth/me`, getAuthConfig());

      setCurrentAdminId(res.data.id);
    } catch (err) {
      console.error("Current admin error:", err.response?.data || err.message);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | LOAD ADMINS
  |--------------------------------------------------------------------------
  */

  const loadAdmins = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(`${API}/auth/admins`, getAuthConfig());

      setAdmins(res.data);
    } catch (err) {
      console.error("Load admins error:", err.response?.data || err.message);

      setError(
        err.response?.data?.message || "Unable to load administrator accounts.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCurrentAdmin();
    loadAdmins();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | CREATE ADMIN
  |--------------------------------------------------------------------------
  */

  const handleCreateAdmin = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    const cleanEmail = email.toLowerCase().trim();

    if (!cleanEmail || !password) {
      setError("Email and password are required.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    try {
      setCreating(true);

      await axios.post(
        `${API}/auth/create-admin`,
        {
          email: cleanEmail,
          password,
        },
        getAuthConfig(),
      );

      setEmail("");
      setPassword("");

      setMessage("Administrator created successfully.");

      await loadAdmins();
    } catch (err) {
      console.error("Create admin error:", err.response?.data || err.message);

      setError(
        err.response?.data?.message || "Unable to create administrator.",
      );
    } finally {
      setCreating(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | DELETE ADMIN
  |--------------------------------------------------------------------------
  */

  const handleDeleteAdmin = async (id, adminEmail) => {
    // Prevent deleting yourself from the UI
    if (String(id) === String(currentAdminId)) {
      setError("You cannot delete your own administrator account.");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete ${adminEmail}?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(id);
      setMessage("");
      setError("");

      await axios.delete(`${API}/auth/admins/${id}`, getAuthConfig());

      setAdmins((currentAdmins) =>
        currentAdmins.filter((admin) => String(admin.id) !== String(id)),
      );

      setMessage("Administrator deleted successfully.");
    } catch (err) {
      console.error("Delete admin error:", err.response?.data || err.message);

      setError(
        err.response?.data?.message || "Unable to delete administrator.",
      );
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div>
      {/* HEADER */}

      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
          Manage Administrators
        </h1>

        <p className="mt-2 text-gray-600">
          Create and manage administrator accounts for the Farm Bureau website.
        </p>
      </div>

      {/* MESSAGES */}

      {message && (
        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-green-800">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-red-700">
          {error}
        </div>
      )}

      {/* CREATE ADMIN */}

      <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-8 mb-10">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Create Administrator
          </h2>

          <p className="text-gray-500 mt-1">
            Add a new administrator who can access the admin dashboard.
          </p>
        </div>

        <form
          onSubmit={handleCreateAdmin}
          className="grid md:grid-cols-2 gap-5"
        >
          {/* EMAIL */}

          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              className="
                w-full
                border
                border-gray-300
                rounded-xl
                px-4
                py-3
                focus:outline-none
                focus:ring-2
                focus:ring-green-600
              "
            />
          </div>

          {/* PASSWORD */}

          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              required
              minLength={8}
              className="
                w-full
                border
                border-gray-300
                rounded-xl
                px-4
                py-3
                focus:outline-none
                focus:ring-2
                focus:ring-green-600
              "
            />
          </div>

          {/* CREATE BUTTON */}

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={creating}
              className="
                bg-green-700
                hover:bg-green-800
                disabled:bg-gray-400
                text-white
                px-7
                py-3
                rounded-xl
                font-semibold
                transition
              "
            >
              {creating ? "Creating..." : "+ Create Administrator"}
            </button>
          </div>
        </form>
      </div>

      {/* ADMIN LIST */}

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* LIST HEADER */}

        <div className="p-6 sm:p-8 border-b">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Administrator Accounts
              </h2>

              <p className="text-gray-500 mt-1">
                {admins.length} administrator
                {admins.length !== 1 ? "s" : ""}
              </p>
            </div>

            <button
              onClick={loadAdmins}
              disabled={loading}
              className="
                border
                border-gray-300
                px-5
                py-2
                rounded-xl
                font-semibold
                hover:bg-gray-50
                disabled:opacity-50
                transition
              "
            >
              {loading ? "Loading..." : "Refresh"}
            </button>
          </div>
        </div>

        {/* LOADING */}

        {loading ? (
          <div className="p-10 text-center text-gray-500">
            Loading administrators...
          </div>
        ) : admins.length === 0 ? (
          /* NO ADMINS */

          <div className="p-10 text-center text-gray-500">
            No administrator accounts found.
          </div>
        ) : (
          /* ADMIN LIST */

          <div className="divide-y">
            {admins.map((admin) => {
              const adminId = admin.id || admin._id;

              const isCurrentAdmin =
                admin.isCurrentAdmin ||
                String(adminId) === String(currentAdminId);

              return (
                <div
                  key={adminId}
                  className="
                    p-6
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    gap-5
                  "
                >
                  {/* ADMIN INFORMATION */}

                  <div className="flex items-center gap-4">
                    <div
                      className="
                        w-12
                        h-12
                        rounded-full
                        bg-green-100
                        flex
                        items-center
                        justify-center
                        text-xl
                      "
                    >
                      👤
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-bold text-gray-800">{admin.email}</p>

                        {isCurrentAdmin && (
                          <span
                            className="
                              text-xs
                              bg-green-100
                              text-green-700
                              px-2
                              py-1
                              rounded-full
                              font-semibold
                            "
                          >
                            You
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-gray-500 mt-1">
                        Administrator
                      </p>

                      {admin.createdAt && (
                        <p className="text-xs text-gray-400 mt-1">
                          Created{" "}
                          {new Date(admin.createdAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* DELETE */}

                  {isCurrentAdmin ? (
                    <div
                      className="
                        text-sm
                        text-gray-400
                        font-medium
                        px-5
                        py-2.5
                      "
                    >
                      Current Account
                    </div>
                  ) : (
                    <button
                      onClick={() => handleDeleteAdmin(adminId, admin.email)}
                      disabled={deleting === adminId}
                      className="
                        bg-red-600
                        hover:bg-red-700
                        disabled:bg-gray-400
                        text-white
                        px-5
                        py-2.5
                        rounded-xl
                        font-semibold
                        transition
                      "
                    >
                      {deleting === adminId ? "Deleting..." : "Delete Admin"}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
