
import { useState } from "react";
import AuthBrand from "../components/AuthBrand";
import PasswordField from "../components/PasswordField";
import Icon from "../components/Icon";

export default function RegisterPage({ onRegister, onSwitchToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  
async function handleSubmit(event) {
  event.preventDefault();

  if (!name.trim()) {
    setError("Please enter your full name.");
    return;
  }

  if (!email.trim() || !password || !confirmPassword) {
    setError("Please fill in all required fields.");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError("Please enter a valid email address.");
    return;
  }

  if (password.length < 6) {
    setError("Password must be at least 6 characters long.");
    return;
  }

  if (password !== confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  setError("");
  setSubmitting(true);

  try {
    await onRegister({
      name: name.trim(),
      email: email.trim(),
      password,
    });
  } catch (error) {
    setError(error.message || "Registration failed. Please try again.");
  } finally {
    setSubmitting(false);
  }
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
            <span>Start your journey</span>
            <h2>Create your account</h2>
            <p>
              Set up your profile and start tracking your daily expenses.
            </p>
          </div>

          {error && (
            <div className="auth-error" role="alert">
              <span>!</span>
              <p>{error}</p>
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="auth-field" htmlFor="register-name">
              <span>Full name</span>

              <div className="auth-input-wrap">
                <i>
                  <Icon name="user" size={17} />
                </i>

                <input
                  id="register-name"
                  name="name"
                  autoComplete="name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                    setError("");
                  }}
                  required
                />
              </div>
            </label>

            <label className="auth-field" htmlFor="register-email">
              <span>Email address</span>

              <div className="auth-input-wrap">
                <i>
                  <Icon name="mail" size={17} />
                </i>

                <input
                  id="register-email"
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
              id="register-password"
              label="Password (min. 6 characters)"
              value={password}
              onChange={(value) => {
                setPassword(value);
                setError("");
              }}
              autoComplete="new-password"
            />

            <PasswordField
              id="register-confirm-password"
              label="Confirm password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(value) => {
                setConfirmPassword(value);
                setError("");
              }}
              autoComplete="new-password"
            />

            <button
              className="auth-submit"
              disabled={submitting}
              type="submit"
            >
              {submitting ? "Creating account..." : "Create account"}
              <Icon name="arrow" size={17} />
            </button>
          </form>

          <p className="auth-switch">
            Already have an account?
            <button type="button" onClick={onSwitchToLogin}>
              Sign in
            </button>
          </p>

          <p className="auth-terms">
            By creating an account, you agree to Montra’s Terms and
            Privacy Policy.
          </p>
        </div>
      </section>
    </main>
  );
}
