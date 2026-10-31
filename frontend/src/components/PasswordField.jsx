
import { useState } from "react";
import Icon from "./Icon";

export default function PasswordField({
  id,
  label,
  value,
  onChange,
  placeholder = "Enter your password",
  autoComplete = "current-password",
}) {
  const [visible, setVisible] = useState(false);

  return (
    <label className="auth-field" htmlFor={id}>
      <span>{label}</span>

      <div className="auth-input-wrap">
        <i>
          <Icon name="lock" size={17} />
        </i>

        <input
          id={id}
          name={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
        />

        <button
          type="button"
          aria-label={visible ? "Hide password" : "Show password"}
          className="password-toggle"
          onClick={() => setVisible((current) => !current)}
        >
          <Icon name={visible ? "eye-off" : "eye"} size={18} />
        </button>
      </div>
    </label>
  );
}
