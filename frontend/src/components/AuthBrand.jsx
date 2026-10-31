
import Icon from "./Icon";

export default function AuthBrand() {
  return (
    <div className="auth-brand">
      <span className="auth-brand-mark">
        <Icon name="wallet" size={23} />
      </span>

      <span>
        <strong>Montra</strong>
        <small>Personal finance</small>
      </span>
    </div>
  );
}
