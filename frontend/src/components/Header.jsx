
import Icon from "./Icon"

export default function Header({ title, openMenu, setView }) {
  return (
    <header className="topbar">
      <button aria-label="Open navigation" className="menu-btn" onClick={openMenu}>
        <Icon name="menu" />
      </button>

      <div>
        <span>Personal workspace</span>
        <h1>{title}</h1>
      </div>

      <div className="top-actions">
        <button aria-label="Notifications" className="notification">
          <Icon name="bell" /><i />
        </button>
        <div className="date-chip">
          <Icon name="calendar" size={15} /> Tuesday, May 27
        </div>
        <button className="add-btn" onClick={() => setView("add")}>
          <Icon name="plus" size={17} /> Add expense
        </button>
      </div>
    </header>
  )
}
