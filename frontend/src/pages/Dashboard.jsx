
import { useState } from "react"
import Icon from "../components/Icon"
import ExpenseTable from "../components/ExpenseTable"

import {
  DonutChart,
  TrendChart,
  SpendingMetrics,
} from "../components/Charts"

export default function Dashboard({
  expenses = [],
  setView,
  edit,
  remove,
  user,
}) {
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date()

    return `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}`
  })

  // Get the authenticated user's first name
  const firstName =
    user?.name?.trim()?.split(/\s+/)[0] || "there"

  // Dynamic greeting
  const hour = new Date().getHours()

  const greeting =
    hour < 12
      ? "Good morning"
      : hour < 18
        ? "Good afternoon"
        : "Good evening"

  const hasExpenses = expenses.length > 0

  return (
    <>
      {/* Welcome section */}
      <section className="welcome">
        <div>
          <span>
            {new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>

          <h2>
            {greeting}, {firstName}.
          </h2>

          <p>
            {hasExpenses
              ? "Here’s where your money went this month."
              : "Your financial journey starts here. Add your first expense to get started."}
          </p>
        </div>

        <label className="month-picker">
          <Icon name="calendar" size={17} />

          <span>Reporting period</span>

          <input
            aria-label="Reporting period"
            type="month"
            value={selectedMonth}
            onChange={(event) =>
              setSelectedMonth(event.target.value)
            }
          />
        </label>
      </section>

      {/* Spending metrics */}
      <SpendingMetrics
        expenses={expenses}
        selectedMonth={selectedMonth}
      />

      {/* Charts */}
      <section className="chart-grid">
        <article className="panel">
          <div className="panel-head">
            <div>
              <span>Breakdown</span>
              <h3>Spending by category</h3>
            </div>
          </div>

          {hasExpenses ? (
            <DonutChart
              expenses={expenses}
              selectedMonth={selectedMonth}
            />
          ) : (
            <p>No expenses to display yet.</p>
          )}
        </article>

        <article className="panel">
          <div className="panel-head">
            <div>
              <span>Last 6 months</span>
              <h3>Spending trend</h3>
            </div>

            <div className="chart-key">
              <i /> Monthly total
            </div>
          </div>

          {hasExpenses ? (
            <TrendChart
              expenses={expenses}
              selectedMonth={selectedMonth}
            />
          ) : (
            <p>
              Add expenses to start seeing your spending trends.
            </p>
          )}
        </article>
      </section>

      {/* Recent expenses */}
      <section className="panel recent-panel">
        <div className="panel-head">
          <div>
            <span>Latest activity</span>
            <h3>Recent expenses</h3>
          </div>

          <button
            className="view-all"
            onClick={() => setView("expenses")}
          >
            View all <Icon name="arrow" size={15} />
          </button>
        </div>

        {hasExpenses ? (
          <ExpenseTable
            compact
            expenses={expenses}
            edit={edit}
            remove={remove}
          />
        ) : (
          <div className="empty-state">
            <p>You haven't added any expenses yet.</p>

            <button onClick={() => setView("add")}>
              Add your first expense
            </button>
          </div>
        )}
      </section>
    </>
  )
}
