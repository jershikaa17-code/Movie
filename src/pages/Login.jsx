import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OtpInput from "../components/OtpInput";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [step, setStep] = useState("email");
  const [identifier, setIdentifier] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [code, setCode] = useState("");

  const isCodeComplete = /^\d{6}$/.test(code);

  const handleContinue = (e) => {
    e.preventDefault();
    const trimmed = identifier.trim();
    if (!trimmed) {
      setEmailError("Enter your email to continue.");
      return;
    }
    setIdentifier(trimmed);
    setEmailError(null);
    setStep("code");
  };

  const handleVerify = (e) => {
    e.preventDefault();
    if (!isCodeComplete) return;
    // Demo flow: any 6-digit code is accepted — there is no real OTP backend.
    setStep("success");
  };

  return (
    <div className="login">
      <header className="login__header">
        <span className="login__logo" onClick={() => navigate("/")}>
          VEL<span>ORA</span>
        </span>
      </header>

      <div className="login__stage">
        <div className="login__glow" aria-hidden="true" />
        <span className="login__watermark" aria-hidden="true">
          V
        </span>

        {step === "email" && (
          <div className="login__panel" key="email">
            <p className="login__eyebrow">Sign in</p>
            <h1 className="login__heading">Enter your email to get started</h1>
            <p className="login__subtext">
              This is a demo sign-in — enter anything you like. We&rsquo;ll send a
              verification code to confirm it&rsquo;s you.
            </p>

            <form
              className="login__form"
              onSubmit={handleContinue}
              noValidate
              autoComplete="off"
            >
              <label className="login__field-label" htmlFor="login-identifier">
                Email address
              </label>
              <input
                id="login-identifier"
                type="text"
                name="velora-identifier"
                className="login__input"
                placeholder="Email address"
                value={identifier}
                onChange={(e) => {
                  setIdentifier(e.target.value);
                  if (emailError) setEmailError(null);
                }}
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                autoFocus
                aria-label="Email address"
                aria-invalid={!!emailError}
                aria-describedby={emailError ? "login-identifier-error" : undefined}
              />
              {emailError && (
                <p className="login__field-error" id="login-identifier-error">
                  {emailError}
                </p>
              )}

              <button className="login__cta" type="submit">
                Continue
              </button>
            </form>
          </div>
        )}

        {step === "code" && (
          <div className="login__panel" key="code">
            <p className="login__eyebrow">Verification</p>
            <h1 className="login__heading">Check your code</h1>
            <p className="login__subtext">
              We sent a verification code to
              <br />
              <span className="login__identifier">{identifier}</span>
            </p>
            <button
              type="button"
              className="login__change"
              onClick={() => setStep("email")}
            >
              Change
            </button>

            <form className="login__form login__form--code" onSubmit={handleVerify}>
              <p className="login__field-label login__field-label--otp">
                Enter the 6-digit code to continue
              </p>
              <OtpInput length={6} value={code} onChange={setCode} autoFocus />

              <button className="login__cta" type="submit" disabled={!isCodeComplete}>
                Verify
              </button>
            </form>

            <p className="login__demo-note">
              Demo mode — any 6-digit code will work.
            </p>

            <button
              type="button"
              className="login__skip"
              onClick={() => navigate("/browse")}
            >
              Skip for now
            </button>
          </div>
        )}

        {step === "success" && (
          <div className="login__panel login__panel--success" key="success">
            <div className="login__success-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="30" height="30" fill="none">
                <path
                  d="M5 12.5 10 17.5 19 7"
                  stroke="#fff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h1 className="login__heading">Welcome to Velora</h1>
            <p className="login__subtext">You&rsquo;re all set.</p>

            <button className="login__cta" onClick={() => navigate("/browse")}>
              Continue to Velora
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
