
import Icon from "./Icon"
import CategoryBadge from "./CategoryBadge"
import { formatCurrency, formatDate } from "../data/sampleExpenses"

export default function ExpenseTable({ expenses, edit, remove, compact = false }) {
  if (!expenses.length) {
    return (
      <div className="empty-state">
        <span><Icon name="receipt" /></span>
        <h3>No expenses found</h3>
        <p>Try adjusting your filters or record a new expense.</p>
      </div>
    )
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Date</th><th>Category</th><th>Description</th><th>Amount</th>
            <th><span className="sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody>
          {expenses.slice(0, compact ? 5 : undefined).map(expense => (
            <tr key={expense.id}>
              <td>{formatDate(expense.date)}</td>
              <td><CategoryBadge category={expense.category} /></td>
              <td><strong>{expense.description}</strong><small>Personal expense</small></td>
              <td>{formatCurrency(expense.amount)}</td>
              <td>
                <div className="row-actions">
                  <button aria-label={`Edit ${expense.description}`} onClick={() => edit(expense)}>
                    <Icon name="edit" size={16} />
                  </button>
                  <button aria-label={`Delete ${expense.description}`} onClick={() => remove(expense)}>
                    <Icon name="trash" size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
