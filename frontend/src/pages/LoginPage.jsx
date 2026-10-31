
import { useState } from "react";
import AuthBrand from "../components/AuthBrand";
import PasswordField from "../components/PasswordField";
import Icon from "../components/Icon";

export default function LoginPage({ onLogin, onSwitchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim() || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setSubmitting(true);

    // Temporary demo behavior.
    // Replace with your backend login API call later.
    window.setTimeout(() => {
    setSubmitting(false);
    onLogin({ email, password });
    }, 550);
  }

  return (
    <main className="auth-page">
      <section className="auth-story">
        <AuthBrand />

        <div className="auth-story-copy">
          <span className="auth-eyebrow">
            Financial clarity, every day
          </span>

          <h1>
            Know where your money goes. Build where it takes you.
          </h1>

          <p>
            Track everyday spending, understand your habits, and
            make calmer financial decisions with one clear view.
          </p>
        </div>

        <div className="auth-trust">
          <Icon name="shield" size={17} />
          <span>
            <strong>Private by design</strong>
            <small>Your financial data stays protected.</small>
          </span>
        </div>
      </section>

      <section className="auth-form-side">
        <div className="auth-mobile-brand">
          <AuthBrand />
        </div>

        <div className="auth-card">
          <div className="auth-heading">
            <span>Welcome back</span>
            <h2>Welcome back</h2>
            <p>
              Sign in to continue to your personal finance workspace.
            </p>
          </div>

          {error && (
            <div className="auth-error" role="alert">
              <span>!</span>
              <p>{error}</p>
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="auth-field" htmlFor="login-email">
              <span>Email address</span>

              <div className="auth-input-wrap">
                <i>
                  <Icon name="mail" size={17} />
                </i>

                <input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setError("");
                  }}
                  required
                />
              </div>
            </label>

            <PasswordField
              id="login-password"
              label="Password"
              value={password}
              onChange={(value) => {
                setPassword(value);
                setError("");
              }}
              autoComplete="current-password"
            />

            <button
              className="auth-submit"
              disabled={submitting}
              type="submit"
            >
              {submitting ? "Signing in..." : "Sign in"}
              <Icon name="arrow" size={17} />
            </button>
          </form>

          <p className="auth-switch">
            New to Montra?
            <button type="button" onClick={onSwitchToRegister}>
              Create an account
            </button>
          </p>

          <p className="auth-terms">
            Secure access to your personal Montra workspace.
          </p>
        </div>
      </section>
    </main>
  );
} 
