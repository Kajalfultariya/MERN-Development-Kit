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
    await axios.get("https://www.merndevelopmentkit.com/api/fetchCustomer").then((response) => {
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
      : (
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
                <a href="/payment">Enroll Now</a>
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