
import { useEffect, useState } from "react"
import Icon from "./Icon"

const DEFAULT_BUDGET = 10000

export default function Sidebar({
  view,
  setView,
  mobileOpen,
  close,
  onLogout,
  user,
  expenses = [],
}) {
  const navigate = (next) => {
    setView(next)
    close()
  }

  const userName = user?.name || "User"
  const userEmail = user?.email || ""

  const userInitials = userName
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  // Separate budget for each user
  const budgetKey = `montra_budget_${user?.id || "guest"}`

  const [monthlyBudget, setMonthlyBudget] = useState(() => {
    const savedBudget = localStorage.getItem(budgetKey)
    return savedBudget ? Number(savedBudget) : DEFAULT_BUDGET
  })

  // Load the correct budget when the logged-in user changes
  useEffect(() => {
    const savedBudget = localStorage.getItem(budgetKey)
    setMonthlyBudget(
      savedBudget ? Number(savedBudget) : DEFAULT_BUDGET
    )
  }, [budgetKey])

  // Save budget in localStorage
  const handleBudgetChange = (value) => {
    const amount = Number(value)

    if (!Number.isFinite(amount) || amount < 0) return

    setMonthlyBudget(amount)
    localStorage.setItem(budgetKey, String(amount))
  }

  // Calculate current month's expenses
  const now = new Date()
  const currentMonth = `${now.getFullYear()}-${String(
    now.getMonth() + 1
  ).padStart(2, "0")}`

  const monthlySpent = expenses.reduce((total, expense) => {
    const date = expense.expenseDate || expense.date || ""

    if (String(date).slice(0, 7) !== currentMonth) {
      return total
    }

    return total + Number(expense.amount || 0)
  }, 0)

  const remainingBudget = monthlyBudget - monthlySpent

  const budgetPercentage =
    monthlyBudget > 0
      ? (monthlySpent / monthlyBudget) * 100
      : monthlySpent > 0
        ? 100
        : 0

  const progressWidth = Math.min(budgetPercentage, 100)

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)

  return (
    <>
      {mobileOpen && (
        <button
          aria-label="Close navigation"
          className="nav-scrim"
          onClick={close}
        />
      )}

      <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="brand">
          <span className="brand-mark">
            <Icon name="wallet" size={22} />
          </span>

          <span>
            <strong>Montra</strong>
            <small>Personal finance</small>
          </span>

          <button
            aria-label="Close navigation"
            className="close-nav"
            onClick={close}
          >
            <Icon name="close" />
          </button>
        </div>

        <nav aria-label="Main navigation">
          <p>Workspace</p>

          <button
            className={view === "dashboard" ? "active" : ""}
            onClick={() => navigate("dashboard")}
          >
            <Icon name="dashboard" />
            <span>Overview</span>
          </button>

          <button
            className={view === "expenses" ? "active" : ""}
            onClick={() => navigate("expenses")}
          >
            <Icon name="receipt" />
            <span>Transactions</span>
          </button>

          <button
            className={view === "add" ? "active" : ""}
            onClick={() => navigate("add")}
          >
            <Icon name="plus" />
            <span>Add expense</span>
          </button>
        </nav>

        {/* Dynamic Monthly Budget */}
        <div className="budget-card">
          <div>
            <span>Monthly budget</span>
            <strong>
              {Math.round(budgetPercentage)}%
            </strong>
          </div>

          <div className="progress">
            <i
              style={{
                width: `${progressWidth}%`,
                background:
                  budgetPercentage > 100
                    ? "#ef4444"
                    : undefined,
              }}
            />
          </div>

          <p>
            <b>{formatCurrency(monthlySpent)}</b>
            {" "}spent of{" "}
            {formatCurrency(monthlyBudget)}
          </p>

          <p>
            {remainingBudget >= 0
              ? `${formatCurrency(remainingBudget)} remaining`
              : `${formatCurrency(Math.abs(remainingBudget))} over budget`}
          </p>

          <label className="budget-input-label">
            Change monthly budget
            <input
              type="number"
              min="0"
              step="100"
              value={monthlyBudget}
              onChange={(e) => handleBudgetChange(e.target.value)}
            />
          </label>
        </div>

        <div className="profile">
          <span className="avatar">
            {userInitials || "U"}
          </span>

          <span>
            <strong>{userName}</strong>
            <small>{userEmail}</small>
          </span>

          <button
            aria-label="Log out"
            title="Log out"
            onClick={onLogout}
          >
            <Icon name="logout" size={18} />
          </button>
        </div>
      </aside>
    </>
  )
}
