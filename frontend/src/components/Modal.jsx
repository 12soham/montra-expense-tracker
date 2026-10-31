
import Icon from "./Icon"

export function Modal({ title, children, close }) {
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal">
        <div className="modal-head">
          <h2>{title}</h2>
          <button aria-label="Close modal" onClick={close}>
            <Icon name="close" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export function DeleteConfirmation({ expense, close, confirm, formatCurrency }) {
  return (
    <>
      <div className="delete-copy">
        <span><Icon name="trash" /></span>
        <p>
          Are you sure you want to delete <strong>{expense.description}</strong> for {formatCurrency(expense.amount)}?
          This action cannot be undone.
        </p>
      </div>
      <div className="modal-actions">
        <button onClick={close}>Keep expense</button>
        <button className="danger-btn" onClick={confirm}>Delete expense</button>
      </div>
    </>
  )
}
