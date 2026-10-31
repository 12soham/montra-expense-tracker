
export default function ExpenseForm({ expense, onSubmit, onCancel }) {
  function submit(event) {
    event.preventDefault()

    const form = new FormData(event.currentTarget)

    onSubmit({
      date: String(form.get("date")),
      category: String(form.get("category")),
      description: String(form.get("description")).trim(),
      amount: Number(form.get("amount")),
    })
  }

  // Today's date in YYYY-MM-DD format
  const today = new Date().toLocaleDateString("en-CA")

  return (
    <form className="expense-form" onSubmit={submit}>
      <div className="form-row">
        <label>
          <span>Date</span>
          <input
            defaultValue={expense?.date || expense?.expenseDate || today}
            name="date"
            required
            type="date"
          />
        </label>

        <label>
          <span>Category</span>
          <select
            defaultValue={expense?.category || "Food"}
            name="category"
          >
            {[
              "Food",
              "Transport",
              "Housing",
              "Shopping",
              "Health",
              "Entertainment",
            ].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label>
        <span>Description</span>
        <input
          defaultValue={expense?.description || ""}
          name="description"
          placeholder="What did you spend on?"
          required
        />
      </label>

      <label>
        <span>Amount</span>
        <div className="amount-field">
          <b>₹</b>
          <input
            defaultValue={expense?.amount ?? ""}
            min="0.01"
            name="amount"
            placeholder="0.00"
            required
            step="0.01"
            type="number"
          />
        </div>
      </label>

      <div className="form-actions">
        <button type="button" onClick={onCancel}>
          Cancel
        </button>

        <button className="add-btn" type="submit">
          {expense ? "Save changes" : "Record expense"}
        </button>
      </div>
    </form>
  )
}
