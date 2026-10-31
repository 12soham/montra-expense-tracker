
export const categories = {
  Food: { color: "#e86a4f", soft: "#fff0ec" },
  Transport: { color: "#5575de", soft: "#eef2ff" },
  Housing: { color: "#8a63d2", soft: "#f4efff" },
  Shopping: { color: "#dd9a32", soft: "#fff7e6" },
  Health: { color: "#3aa884", soft: "#eaf9f4" },
  Entertainment: { color: "#dc5c8b", soft: "#fff0f5" },
}

export const initialExpenses = [
  { id: 1, date: "2026-05-27", category: "Food", description: "Weekly groceries", amount: 126.45 },
  { id: 2, date: "2026-05-26", category: "Transport", description: "Monthly metro pass", amount: 84 },
  { id: 3, date: "2026-05-25", category: "Housing", description: "Internet and utilities", amount: 192.8 },
  { id: 4, date: "2026-05-24", category: "Shopping", description: "Desk accessories", amount: 68.5 },
  { id: 5, date: "2026-05-22", category: "Health", description: "Pharmacy", amount: 42.3 },
  { id: 6, date: "2026-05-20", category: "Entertainment", description: "Cinema and dinner", amount: 76.2 },
  { id: 7, date: "2026-05-18", category: "Food", description: "Lunch with team", amount: 58.75 },
  { id: 8, date: "2026-05-16", category: "Housing", description: "Apartment rent", amount: 1450 },
]

export const monthTrend = [
  { month: "Dec", value: 1840 },
  { month: "Jan", value: 2190 },
  { month: "Feb", value: 1780 },
  { month: "Mar", value: 2420 },
  { month: "Apr", value: 2050 },
  { month: "May", value: 2099 },
]

export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

export function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`))
}
