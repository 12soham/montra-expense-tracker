
const API_BASE_URL = import.meta.env.PROD
  ? "https://montra-backend-rbye.onrender.com/api"
  : "http://localhost:8080/api";
  
// Common function for all backend API requests
export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("montra_token");

  const headers = {
    ...(options.body
      ? { "Content-Type": "application/json" }
      : {}),
    ...options.headers,
  };

  // Attach JWT token for authenticated requests
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Read backend response
  const contentType = response.headers.get("content-type");

  const data = contentType?.includes("application/json")
    ? await response.json()
    : null;

  // Handle errors
  if (!response.ok) {
    throw new Error(
      data?.message ||
      data?.error ||
      `Request failed with status ${response.status}`
    );
  }

  return data;
}

// Authentication APIs
export const authApi = {
  // Login user
  login: (credentials) =>
    apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),

  // Register new user
  register: (user) =>
    apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify(user),
    }),

  // Get currently authenticated user
  me: () => apiRequest("/auth/me"),
};

// Expense APIs
export const expenseApi = {
  // Get expenses of the logged-in user
  getAll: async () => {
    const response = await apiRequest(
      "/expenses?page=0&size=100&sortBy=expenseDate&sortDirection=DESC"
    );

    return response?.content || [];
  },

  // Add new expense
  create: (expense) =>
    apiRequest("/expenses", {
      method: "POST",
      body: JSON.stringify(expense),
    }),

  // Update existing expense
  update: (id, expense) =>
    apiRequest(`/expenses/${id}`, {
      method: "PUT",
      body: JSON.stringify(expense),
    }),

  // Delete expense
  remove: (id) =>
    apiRequest(`/expenses/${id}`, {
      method: "DELETE",
    }),
};
