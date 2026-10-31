
import Icon from "../components/Icon"
import ExpenseForm from "../components/ExpenseForm"

export default function AddExpense({ save, cancel }) {
  return (
    <section className="add-layout">
      <div className="page-intro">
        <div>
          <span>New transaction</span>
          <h2>Add an expense</h2>
          <p>Keep your financial picture accurate and up to date.</p>
        </div>
      </div>

      <div className="form-card">
        <div className="form-card-head">
          <span><Icon name="receipt" /></span>
          <div><h3>Expense details</h3><p>Enter the information for this transaction.</p></div>
        </div>
        <ExpenseForm onCancel={cancel} onSubmit={save} />
      </div>

      <aside className="form-tip">
        <Icon name="pie" />
        <h3>Small entries, clear picture.</h3>
        <p>Recording expenses as they happen gives you the most useful monthly insights.</p>
      </aside>
    </section>
  )
}
