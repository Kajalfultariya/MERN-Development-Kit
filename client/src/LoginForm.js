import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { styles } from "./styles";


// ─── ICONS ─────────────────────────────────────────────
const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="2" y="4" width="20" height="16" rx="3" />
    <path d="m22 7-10 7L2 7" />
  </svg>
);

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="11" width="18" height="11" rx="2.5" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EyeIcon = ({ closed }) => closed ? (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
) : (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const CheckIcon = ({ size = 10 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const SparkleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
  </svg>
);

const GoogleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#24292e">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

// ─── PASSWORD STRENGTH ──────────────────────────────────
function getStrength(pw) {
  if (!pw) return { score: 0, label: "", color: "" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { score: 1, label: "Weak", color: "weak" };
  if (score === 2) return { score: 2, label: "Fair", color: "fair" };
  return { score: 3, label: "Strong", color: "strong" };
}

// ─── MODAL ──────────────────────────────────────────────
function Modal({ onClose }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [closing, setClosing] = useState(false);
  const [customersData, setCustomersData] = useState([])
  const [loginError, setLoginError] = useState("")
  const strength = getStrength(password);

  const close = () => {
    setClosing(true);
    setTimeout(onClose, 5000);
  };

  const validate = () => {
    const e = {};
    if (!email) e.email = "Email address is required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Please enter a valid email";
    if (!password) e.password = "Password is required";
    else if (password.length < 6) e.password = "Minimum 6 characters";
    return e;
  };

  const fetchCustomerData = async () => {
    await axios.get("http://localhost:8000/api/fetchCustomer").then((response) => {
      //setNextId(response.data.length)
      setCustomersData(response.data)
    }).catch(error => { console.log("errr", error) })
  }
  useEffect(() => {
    fetchCustomerData()
  }, [])

  const handleSubmit = async () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1600))
    customersData.length > 0 ?
      (customersData.map((item) => (
        (email === item.email && password === item.password) ?
          (
            localStorage.setItem("Id", item._id),
            setLoading(false),
            setSuccess(true)
          )
          :
          (
            setLoading(false),
            setLoginError("Please Enter a valid Details")
          )

      )))
      :(       
        setLoginError("Not Valid Details")
      ) 

  };

  return (
    <div className={`overlay${closing ? " closing" : ""}`}
      onClick={e => e.target === e.currentTarget && close()}>
      <div className={`modal${closing ? " closing" : ""}`}>
        <div className="modal-bar" />

        {success ? (
          <div className="success-body">
            <div className="success-ring">
              <CheckIcon size={26} />
            </div>
            <h2 className="success-title">You're signed in!</h2>
            <p className="success-msg">
              Welcome back. Your workspace<br />is ready for you.
            </p>
            <button className="success-close" onClick={() => navigate('/home')}>
              Continue →
            </button>
          </div>
        ) : (
          <>
            <div className="modal-header">
              <button className="modal-close" onClick={() => onClose()}><CloseIcon /></button>
              <div className="modal-logo"><SparkleIcon /></div>
              <h2 className="modal-title">Welcome back</h2>
              <p className="modal-sub">
                Don't have an account?{" "}
                <a href="#" onClick={() => navigate('/payment')}>Enroll Now</a>
              </p>
            </div>

            <div className="modal-body">
              {/* Email */}
              <div className="field">
                <div className="field-label">
                  <span className="label-text">Email</span>
                </div>
                <div className="input-wrap">
                  <span className="field-icon"><MailIcon /></span>
                  <input
                    className={`field-input${errors.email ? " has-error" : ""}`}
                    type="email"
                    placeholder="hello@example.com"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: "" })); }}
                  />
                </div>
                {errors.email && <p className="field-error">⚠ {errors.email}</p>}
              </div>

              {/* Password */}
              <div className="field">
                <div className="field-label">
                  <span className="label-text">Password</span>
               
                </div>
                <div className="input-wrap">
                  <span className="field-icon"><LockIcon /></span>
                  <input
                    className={`field-input${errors.password ? " has-error" : ""}`}
                    type={showPw ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={e => { setPassword(e.target.value); setErrors(p => ({ ...p, password: "" })); }}
                    style={{ paddingRight: 44 }}
                  />
                  <button className="pass-toggle" onClick={() => setShowPw(s => !s)} tabIndex={-1}>
                    <EyeIcon closed={showPw} />
                  </button>
                </div>
                {errors.password && <p className="field-error">⚠ {errors.password}</p>}

                {/* Strength meter */}
                {password && (
                  <>
                    <div className="strength-bar">
                      {[1, 2, 3].map(n => (
                        <div
                          key={n}
                          className={`strength-seg${strength.score >= n ? ` active-${strength.color}` : ""}`}
                        />
                      ))}
                    </div>
                    <p className="strength-label" style={{
                      color: strength.color === "weak" ? "#f43f5e" : strength.color === "fair" ? "#f59e0b" : "#10b981"
                    }}>
                      {strength.label} password
                    </p>
                  </>
                )}
              </div>

              {/* Options
              <div className="options-row">
                <label className="check-label" onClick={() => setRemember(r => !r)}>
                  <div className={`check-box${remember ? " on" : ""}`}>
                    {remember && <CheckIcon />}
                  </div>
                  Keep me signed in
                </label>
              </div> */}
              <div className="options-row">
                {loginError && <p className="field-error">⚠ {loginError}</p>}
              </div>
              {/* Submit */}
              <button className="btn-submit" onClick={handleSubmit} disabled={loading}>
                <span className="btn-inner">
                  {loading && <span className="spinner" />}
                  {loading ? "Signing in…" : "Sign In"}
                </span>
              </button>

              {/* Divider 
              <div className="divider">
                <div className="div-line" />
                <span className="div-text">or</span>
                <div className="div-line" />
              </div>

              {/* Social 
              <div className="social-grid">
                <button className="btn-social"><GoogleIcon /> Google</button>
                <button className="btn-social"><GitHubIcon /> GitHub</button>
              </div>*/}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── APP ────────────────────────────────────────────────
export default function LoginForm({ open, setOpen }) {


  return (
    <>
      <style>{styles}</style>
      <div className="page">

        {open && <Modal
          onClose={() => setOpen(false)}
        />}
      </div>
    </>
  );
}
