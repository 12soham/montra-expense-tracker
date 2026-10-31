
import { useMemo, useState } from "react"
import Icon from "../components/Icon"
import ExpenseTable from "../components/ExpenseTable"
import { categories } from "../data/sampleExpenses"

export default function Expenses({ expenses, edit, remove, setView }) {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("All")

  const filtered = useMemo(() => expenses.filter(item =>
    (category === "All" || item.category === category) &&
    `${item.description} ${item.category}`.toLowerCase().includes(query.toLowerCase())
  ), [category, expenses, query])

  return (
    <>
      <section className="page-intro">
        <div>
          <span>Expense history</span>
          <h2>Transactions</h2>
          <p>Review, filter, and manage all your recorded spending.</p>
        </div>
        <button className="add-btn" onClick={() => setView("add")}>
          <Icon name="plus" size={17} /> Add expense
        </button>
      </section>

      <section className="panel transactions-panel">
        <div className="filters">
          <label className="search-field">
            <Icon name="search" size={17} />
            <input aria-label="Search expenses" placeholder="Search transactions..." value={query} onChange={event => setQuery(event.target.value)} />
          </label>

          <label>
            <Icon name="filter" size={16} />
            <select aria-label="Filter by category" value={category} onChange={event => setCategory(event.target.value)}>
              <option>All</option>
              {Object.keys(categories).map(item => <option key={item}>{item}</option>)}
            </select>
          </label>

          <label>
            <Icon name="calendar" size={16} />
            <input aria-label="Filter by month" defaultValue="2026-05" type="month" />
          </label>
          <span>{filtered.length} results</span>
        </div>

        <ExpenseTable expenses={filtered} edit={edit} remove={remove} />

        <div className="pagination">
          <span>Showing 1–{filtered.length} of {filtered.length}</span>
          <div><button disabled>Previous</button><button className="active">1</button><button disabled>Next</button></div>
        </div>
      </section>
    </>
  )
}
