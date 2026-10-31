
import { useState, useEffect, useCallback } from "react"

import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import ExpenseForm from "./components/ExpenseForm"
import { Modal, DeleteConfirmation } from "./components/Modal"
import Toast from "./components/Toast"

import Dashboard from "./pages/Dashboard"
import Expenses from "./pages/Expenses"
import AddExpense from "./pages/AddExpense"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"

import { authApi, expenseApi } from "./services/api"

// Currency formatter
const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(amount || 0))

// Keep the date property compatible with frontend components
function normalizeExpense(expense) {
  return {
    ...expense,
    date: expense.expenseDate || expense.date,
  }
}

// Convert frontend form data into the backend DTO format
function prepareExpenseData(data) {
  return {
    amount: Number(data.amount),
    category: data.category,
    description: data.description || "",
    expenseDate: data.expenseDate || data.date,
  }
}

export default function App() {
  const [authScreen, setAuthScreen] = useState("login")
  const [user, setUser] = useState(null)
  const [authChecking, setAuthChecking] = useState(true)

  const [view, setView] = useState("dashboard")
  const [expenses, setExpenses] = useState([])
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [toast, setToast] = useState("")

  // Show notifications
  const notify = useCallback((message) => {
    setToast(message)
    window.setTimeout(() => setToast(""), 2400)
  }, [])

  // Load expenses belonging to the authenticated user
  const loadExpenses = useCallback(async () => {
    try {
      const data = await expenseApi.getAll()

      setExpenses(
        Array.isArray(data)
          ? data.map(normalizeExpense)
          : []
      )
    } catch (error) {
      notify(error.message || "Unable to load expenses")
    }
  }, [notify])

  // Restore login session when the page is refreshed
  useEffect(() => {
    async function restoreSession() {
      const token = localStorage.getItem("montra_token")

      if (!token) {
        setAuthChecking(false)
        return
      }

      try {
        const currentUser = await authApi.me()

        setUser({
          id: currentUser.id,
          name: currentUser.name,
          email: currentUser.email,
        })

        setAuthScreen("app")
        await loadExpenses()
      } catch (error) {
        localStorage.removeItem("montra_token")
        setUser(null)
        setExpenses([])
        setAuthScreen("login")
      } finally {
        setAuthChecking(false)
      }
    }

    restoreSession()
  }, [loadExpenses])

  // Complete login or registration using the backend response
  async function completeAuthentication(response) {
    if (!response?.token) {
      throw new Error("Authentication token was not received")
    }

    localStorage.setItem("montra_token", response.token)

    setUser({
      id: response.id,
      name: response.name,
      email: response.email,
    })

    setView("dashboard")
    setAuthScreen("app")

    await loadExpenses()
  }

  // Login with backend API
  async function handleLogin(credentials) {
    const response = await authApi.login(credentials)
    await completeAuthentication(response)
  }

  // Register with backend API
  async function handleRegister(userData) {
    const response = await authApi.register(userData)
    await completeAuthentication(response)

    notify("Account created successfully")
  }

  // Logout
  function logout() {
    localStorage.removeItem("montra_token")

    setUser(null)
    setExpenses([])
    setEditing(null)
    setDeleting(null)
    setMobileOpen(false)
    setView("dashboard")
    setAuthScreen("login")

    notify("You have been logged out")
  }

  // Add expense to PostgreSQL
  async function addExpense(data) {
    try {
      const payload = prepareExpenseData(data)
      const savedExpense = await expenseApi.create(payload)

      setExpenses((items) => [
        normalizeExpense(savedExpense),
        ...items,
      ])

      setView("dashboard")
      notify("Expense recorded successfully")
    } catch (error) {
      notify(error.message || "Unable to add expense")
    }
  }

  // Update expense in PostgreSQL
  async function updateExpense(data) {
    if (!editing) return

    try {
      const payload = prepareExpenseData(data)

      const updatedExpense = await expenseApi.update(
        editing.id,
        payload
      )

      setExpenses((items) =>
        items.map((item) =>
          item.id === editing.id
            ? normalizeExpense(updatedExpense)
            : item
        )
      )

      setEditing(null)
      notify("Expense updated successfully")
    } catch (error) {
      notify(error.message || "Unable to update expense")
    }
  }

  // Delete expense from PostgreSQL
  async function deleteExpense() {
    if (!deleting) return

    try {
      await expenseApi.remove(deleting.id)

      setExpenses((items) =>
        items.filter((item) => item.id !== deleting.id)
      )

      setDeleting(null)
      notify("Expense deleted successfully")
    } catch (error) {
      notify(error.message || "Unable to delete expense")
    }
  }

  const titles = {
    dashboard: "Overview",
    expenses: "Transactions",
    add: "Add expense",
  }

  // Check the saved login session first
  if (authChecking) {
    return <div className="auth-loading">Loading Montra...</div>
  }

  // Login screen
  if (authScreen === "login") {
    return (
      <LoginPage
        onLogin={handleLogin}
        onSwitchToRegister={() => setAuthScreen("register")}
      />
    )
  }

  // Registration screen
  if (authScreen === "register") {
    return (
      <RegisterPage
        onRegister={handleRegister}
        onSwitchToLogin={() => setAuthScreen("login")}
      />
    )
  }

  // Main expense tracker
  return (
    <div className="app-shell">
      <Sidebar
        close={() => setMobileOpen(false)}
        mobileOpen={mobileOpen}
        setView={setView}
        view={view}
        user={user}
        expenses={expenses}
        onLogout={logout}
      />

      <main className="main">
        <Header
          openMenu={() => setMobileOpen(true)}
          setView={setView}
          title={titles[view]}
        />

        <div className="content">
          {view === "dashboard" && (
            <Dashboard
              expenses={expenses}
              user={user}
              setView={setView}
              edit={setEditing}
              remove={setDeleting}
            />
          )}

          {view === "expenses" && (
            <Expenses
              expenses={expenses}
              edit={setEditing}
              remove={setDeleting}
              setView={setView}
            />
          )}

          {view === "add" && (
            <AddExpense
              cancel={() => setView("dashboard")}
              save={addExpense}
            />
          )}
        </div>
      </main>

      {/* Edit expense modal */}
      {editing && (
        <Modal
          close={() => setEditing(null)}
          title="Edit expense"
        >
          <ExpenseForm
            key={editing.id}
            expense={editing}
            onCancel={() => setEditing(null)}
            onSubmit={updateExpense}
          />
        </Modal>
      )}

      {/* Delete confirmation modal */}
      {deleting && (
        <Modal
          close={() => setDeleting(null)}
          title="Delete expense"
        >
          <DeleteConfirmation
            expense={deleting}
            close={() => setDeleting(null)}
            confirm={deleteExpense}
            formatCurrency={formatCurrency}
          />
        </Modal>
      )}

      {toast && <Toast message={toast} />}
    </div>
  )
}
