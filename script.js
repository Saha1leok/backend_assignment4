// ── Shared frontend utilities ───────────────
// This file is included across all HTML pages.

// ✅ Base URL for API calls (ВАЖНО: backend работает на 5001)
const API_BASE = "http://localhost:5001/api";

/**
 * Returns headers with Authorization token if available.
 */
function getAuthHeaders() {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json"
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

/**
 * Checks if the current user is logged in as admin.
 * Returns true/false.
 */
function isAdmin() {
  return localStorage.getItem("role") === "admin";
}

/**
 * Checks if a token exists (user is logged in).
 */
function isLoggedIn() {
  return Boolean(localStorage.getItem("token"));
}

/**
 * Clears token and role from localStorage.
 */
function clearSession() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
}

/**
 * Helper to handle fetch + JSON safely
 * (защищает от "Unexpected end of JSON input")
 */
async function apiFetch(url, options = {}) {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: getAuthHeaders(),
    ...options
  });

  // если backend вернул 401 / 403
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.status);
  }

  return res.json();
}
