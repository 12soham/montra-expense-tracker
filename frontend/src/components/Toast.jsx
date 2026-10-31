
import Icon from "./Icon"

export default function Toast({ message }) {
  return (
    <div className="toast" role="status">
      <span><Icon name="check" size={16} /></span>
      {message}
    </div>
  )
}
    