
import MetricCard from "./MetricCard"

const categoryColors = {
  Food: "#F97362",
  Transport: "#5798F2",
  Housing: "#9270DB",
  Shopping: "#E9AE45",
  Health: "#35B99A",
  Entertainment: "#D978B5",
  Utilities: "#7795A8",
  Education: "#6C7AE0",
  Other: "#94A3B8",
}

const getCategoryColor = (category) =>
  categoryColors[category] || categoryColors.Other

// Format amounts in Indian Rupees
const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(amount) || 0)

const getAmount = (expense) => Number(expense.amount) || 0

const getDate = (expense) =>
  expense.expenseDate || expense.date || ""

const getCurrentMonth = () => {
  const now = new Date()

  return `${now.getFullYear()}-${String(
    now.getMonth() + 1
  ).padStart(2, "0")}`
}

const getMonth = (expense) => getDate(expense).slice(0, 7)

const filterByMonth = (expenses, selectedMonth) =>
  expenses.filter(
    (expense) =>
      getMonth(expense) === (selectedMonth || getCurrentMonth())
  )

export function DonutChart({
  expenses = [],
  selectedMonth,
}) {
  const monthlyExpenses = filterByMonth(expenses, selectedMonth)

  const grouped = Object.entries(
    monthlyExpenses.reduce((acc, expense) => {
      const category = expense.category || "Other"
      acc[category] = (acc[category] || 0) + getAmount(expense)
      return acc
    }, {})
  ).sort((a, b) => b[1] - a[1])

  const total = monthlyExpenses.reduce(
    (sum, expense) => sum + getAmount(expense),
    0
  )

  let offset = 0

  const gradient = grouped
    .map(([category, amount]) => {
      const start = offset
      offset += total > 0 ? (amount / total) * 100 : 0

      return `${getCategoryColor(category)} ${start}% ${offset}%`
    })
    .join(", ")

  return (
    <div className="donut-layout">
      <div
        className="donut"
        style={{
          background:
            total > 0
              ? `conic-gradient(${gradient})`
              : "#E5E7EB",
        }}
      >
        <div>
          <strong>{formatCurrency(total)}</strong>
          <span>Total spent</span>
        </div>
      </div>

      <div className="legend">
        {grouped.slice(0, 5).map(([category, amount]) => (
          <div key={category}>
            <i style={{ background: getCategoryColor(category) }} />
            <span>{category}</span>
            <b>
              {total > 0
                ? Math.round((amount / total) * 100)
                : 0}%
            </b>
          </div>
        ))}

        {grouped.length === 0 && (
          <p>No expenses for this month.</p>
        )}
      </div>
    </div>
  )
}

export function TrendChart({
  expenses = [],
  selectedMonth,
}) {
  const month = selectedMonth || getCurrentMonth()
  const [year, monthNumber] = month.split("-").map(Number)

  const months = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(
      year,
      monthNumber - 1 - 5 + index,
      1
    )

    return {
      key: `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`,
      label: date.toLocaleDateString("en-IN", {
        month: "short",
      }),
    }
  })

  const trend = months.map((item) => ({
    ...item,
    value: expenses
      .filter((expense) => getMonth(expense) === item.key)
      .reduce((sum, expense) => sum + getAmount(expense), 0),
  }))

  const max = Math.max(...trend.map((item) => item.value), 1)

  return (
    <div className="trend-chart">
      <div className="y-labels">
        {[1, 0.75, 0.5, 0.25, 0].map((ratio) => (
          <span key={ratio}>
            {formatCurrency(max * ratio)}
          </span>
        ))}
      </div>

      <div className="bars">
        {trend.map((item, index) => (
          <div className="bar-column" key={item.key}>
            <span className="bar-value">
              {formatCurrency(item.value)}
            </span>

            <div
              className={`bar ${
                index === trend.length - 1 ? "current" : ""
              }`}
              style={{
                height: `${(item.value / max) * 88}%`,
              }}
            />

            <small>{item.label}</small>
          </div>
        ))}
      </div>
    </div>
  )
}

export function SpendingMetrics({
  expenses = [],
  selectedMonth,
}) {
  const month = selectedMonth || getCurrentMonth()
  const monthlyExpenses = filterByMonth(expenses, month)

  const total = monthlyExpenses.reduce(
    (sum, expense) => sum + getAmount(expense),
    0
  )

  const today = new Date()
  const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-")

  const todayTotal = expenses
    .filter((expense) => getDate(expense) === todayString)
    .reduce((sum, expense) => sum + getAmount(expense), 0)

  const [year, monthNumber] = month.split("-").map(Number)
  const daysInMonth = new Date(year, monthNumber, 0).getDate()

  const elapsedDays =
    month < getCurrentMonth()
      ? daysInMonth
      : month === getCurrentMonth()
        ? today.getDate()
        : 0

  const average = elapsedDays > 0 ? total / elapsedDays : 0

  const largest = monthlyExpenses.reduce(
    (max, expense) =>
      getAmount(expense) > getAmount(max) ? expense : max,
    { amount: 0 }
  )

  return (
    <section className="metrics">
      <MetricCard
        label="Total spending"
        value={formatCurrency(total)}
        note={`${monthlyExpenses.length} transactions`}
        icon="dollar"
        tone="coral"
      />

      <MetricCard
        label="Today's spending"
        value={formatCurrency(todayTotal)}
        note="Today's expenses"
        icon="calendar"
        tone="blue"
      />

      <MetricCard
        label="Daily average"
        value={formatCurrency(average)}
        note={`Across ${elapsedDays} days`}
        icon="trend"
        tone="green"
      />

      <MetricCard
        label="Largest expense"
        value={formatCurrency(getAmount(largest))}
        note={largest.category || "No expenses"}
        icon="count"
        tone="purple"
      />
    </section>
  )
}
