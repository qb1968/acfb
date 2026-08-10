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
  const [updating, setUpdating] = useState(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [currentAdminId, setCurrentAdminId] = useState(null);

  // EDIT ADMIN
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [editEmail, setEditEmail] = useState("");

  // CHANGE PASSWORD
  const [passwordAdmin, setPasswordAdmin] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
  | OPEN EDIT EMAIL
  |--------------------------------------------------------------------------
  */

  const openEditEmail = (admin) => {
    setMessage("");
    setError("");

    setEditingAdmin(admin);
    setEditEmail(admin.email || "");
  };

  /*
  |--------------------------------------------------------------------------
  | UPDATE ADMIN EMAIL
  |--------------------------------------------------------------------------
  */

  const handleUpdateEmail = async (e) => {
    e.preventDefault();

    if (!editingAdmin) {
      return;
    }

    setMessage("");
    setError("");

    const cleanEmail = editEmail.toLowerCase().trim();

    if (!cleanEmail) {
      setError("Email is required.");
      return;
    }

    try {
      setUpdating(editingAdmin.id);

      const res = await axios.put(
        `${API}/auth/admins/${editingAdmin.id}`,
        {
          email: cleanEmail,
        },
        getAuthConfig(),
      );

      setAdmins((currentAdmins) =>
        currentAdmins.map((admin) =>
          String(admin.id) === String(editingAdmin.id)
            ? {
                ...admin,
                email: res.data.admin.email,
              }
            : admin,
        ),
      );

      setMessage("Administrator email updated successfully.");

      setEditingAdmin(null);
      setEditEmail("");
    } catch (err) {
      console.error("Update email error:", err.response?.data || err.message);

      setError(
        err.response?.data?.message || "Unable to update administrator email.",
      );
    } finally {
      setUpdating(null);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | OPEN CHANGE PASSWORD
  |--------------------------------------------------------------------------
  */

  const openChangePassword = (admin) => {
    setMessage("");
    setError("");

    setPasswordAdmin(admin);
    setNewPassword("");
    setConfirmPassword("");
  };

  /*
  |--------------------------------------------------------------------------
  | CHANGE ADMIN PASSWORD
  |--------------------------------------------------------------------------
  */

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!passwordAdmin) {
      return;
    }

    setMessage("");
    setError("");

    if (!newPassword) {
      setError("Please enter a new password.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setUpdating(passwordAdmin.id);

      await axios.put(
        `${API}/auth/admins/${passwordAdmin.id}/password`,
        {
          password: newPassword,
        },
        getAuthConfig(),
      );

      setMessage(`Password changed successfully for ${passwordAdmin.email}.`);

      setPasswordAdmin(null);
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(
        "Change password error:",
        err.response?.data || err.message,
      );

      setError(
        err.response?.data?.message ||
          "Unable to change administrator password.",
      );
    } finally {
      setUpdating(null);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | DELETE ADMIN
  |--------------------------------------------------------------------------
  */

  const handleDeleteAdmin = async (id, adminEmail) => {
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

  /*
  |--------------------------------------------------------------------------
  | CLOSE MODALS
  |--------------------------------------------------------------------------
  */

  const closeEditEmail = () => {
    setEditingAdmin(null);
    setEditEmail("");
  };

  const closeChangePassword = () => {
    setPasswordAdmin(null);
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="max-w-7xl mx-auto">
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
              type="button"
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
          <div className="p-10 text-center text-gray-500">
            No administrator accounts found.
          </div>
        ) : (
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
                    lg:flex-row
                    lg:items-center
                    lg:justify-between
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
                        shrink-0
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

                  {/* ACTION BUTTONS */}

                  <div className="flex flex-wrap gap-2">
                    {/* EDIT EMAIL */}

                    <button
                      type="button"
                      onClick={() => openEditEmail(admin)}
                      className="
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        px-4
                        py-2.5
                        rounded-xl
                        font-semibold
                        transition
                      "
                    >
                      Edit Email
                    </button>

                    {/* CHANGE PASSWORD */}

                    <button
                      type="button"
                      onClick={() => openChangePassword(admin)}
                      className="
                        bg-purple-600
                        hover:bg-purple-700
                        text-white
                        px-4
                        py-2.5
                        rounded-xl
                        font-semibold
                        transition
                      "
                    >
                      Change Password
                    </button>

                    {/* DELETE */}

                    {isCurrentAdmin ? (
                      <div
                        className="
                          text-sm
                          text-gray-400
                          font-medium
                          px-4
                          py-2.5
                          flex
                          items-center
                        "
                      >
                        Current Account
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleDeleteAdmin(adminId, admin.email)}
                        disabled={deleting === adminId}
                        className="
                          bg-red-600
                          hover:bg-red-700
                          disabled:bg-gray-400
                          text-white
                          px-4
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
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* =========================================================
          EDIT EMAIL MODAL
      ========================================================== */}

      {editingAdmin && (
        <div
          className="
            fixed
            inset-0
            z-50
            bg-black/60
            flex
            items-center
            justify-center
            p-4
          "
          onClick={closeEditEmail}
        >
          <div
            className="
              bg-white
              rounded-3xl
              shadow-2xl
              w-full
              max-w-lg
              p-6
              sm:p-8
            "
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-gray-800">
              Edit Administrator Email
            </h2>

            <p className="text-gray-500 mt-2">
              Update the email address for this administrator.
            </p>

            <form onSubmit={handleUpdateEmail} className="mt-6 space-y-5">
              <div>
                <label className="block font-semibold text-gray-700 mb-2">
                  Email
                </label>

                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
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
                    focus:ring-blue-600
                  "
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={updating === editingAdmin.id}
                  className="
                    bg-blue-600
                    hover:bg-blue-700
                    disabled:bg-gray-400
                    text-white
                    px-6
                    py-3
                    rounded-xl
                    font-semibold
                  "
                >
                  {updating === editingAdmin.id ? "Saving..." : "Save Email"}
                </button>

                <button
                  type="button"
                  onClick={closeEditEmail}
                  className="
                    border
                    border-gray-300
                    px-6
                    py-3
                    rounded-xl
                    font-semibold
                    hover:bg-gray-50
                  "
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          CHANGE PASSWORD MODAL
      ========================================================== */}

      {passwordAdmin && (
        <div
          className="
            fixed
            inset-0
            z-50
            bg-black/60
            flex
            items-center
            justify-center
            p-4
          "
          onClick={closeChangePassword}
        >
          <div
            className="
              bg-white
              rounded-3xl
              shadow-2xl
              w-full
              max-w-lg
              p-6
              sm:p-8
            "
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-gray-800">
              Change Administrator Password
            </h2>

            <p className="text-gray-500 mt-2">Changing password for:</p>

            <p className="font-bold text-green-700 mt-1">
              {passwordAdmin.email}
            </p>

            <form onSubmit={handleChangePassword} className="mt-6 space-y-5">
              {/* NEW PASSWORD */}

              <div>
                <label className="block font-semibold text-gray-700 mb-2">
                  New Password
                </label>

                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  minLength={8}
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
                    focus:ring-purple-600
                  "
                />
              </div>

              {/* CONFIRM PASSWORD */}

              <div>
                <label className="block font-semibold text-gray-700 mb-2">
                  Confirm New Password
                </label>

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Enter password again"
                  minLength={8}
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
                    focus:ring-purple-600
                  "
                />
              </div>

              {/* BUTTONS */}

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={updating === passwordAdmin.id}
                  className="
                    bg-purple-600
                    hover:bg-purple-700
                    disabled:bg-gray-400
                    text-white
                    px-6
                    py-3
                    rounded-xl
                    font-semibold
                  "
                >
                  {updating === passwordAdmin.id
                    ? "Changing..."
                    : "Change Password"}
                </button>

                <button
                  type="button"
                  onClick={closeChangePassword}
                  className="
                    border
                    border-gray-300
                    px-6
                    py-3
                    rounded-xl
                    font-semibold
                    hover:bg-gray-50
                  "
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
