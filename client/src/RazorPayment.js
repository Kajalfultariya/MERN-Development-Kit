import { useState } from "react";
import axios from "axios";
import { styles } from "./RazorStyle";
import { useNavigate } from "react-router-dom";

/* ─────────────────────────────────────────────
   ICONS
───────────────────────────────────────────── */
const Icon = ({ d, size = 16, stroke = "currentColor", fill = "none", sw = 1.8 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke}
        strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <path d={d} />
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

const icons = {
    user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",
    mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
    phone: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.08 6.08l1.86-1.85a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
    credit: "M1 4h22v4H1zM1 4h22v16H1zM1 12h22",
    lock: "M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4",
    shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    check: "M20 6L9 17l-5-5",
    upi: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    bank: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
    card: "M21 4H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM1 10h22",
};

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */


function randomTxn() {
    return "pay_" + Math.random().toString(36).slice(2, 12).toUpperCase();
}


/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function RazorPayment({ payForm, paying, setPaying, setPayForm, C }) {

    const navigate = useNavigate()
    const [success, setSuccess] = useState(false);
    const [txnId, setTxnId] = useState("");
    const [id, setId] = useState("")
    /* CUSTOMER */
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [showPw, setShowPw] = useState(false);

    /* ERRORS */
    const [err, setErr] = useState({});


    /* ── VALIDATION ── */
    const validate = () => {
        const e = {};
        if (!name.trim()) e.name = "Full name required";
        if (!email || !/\S+@\S+\.\S+/.test(email)) e.email = "Valid email required";
        if (!password) e.password = "Valid password required";
        if (!phone || phone.replace(/\D/, "").length < 10) e.phone = "10-digit phone required";

        return e;
    };
    const initializeRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";

            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };

            document.body.appendChild(script);
        });
    };
    /* ── PAY HANDLER ── */
    const handlePay = async () => {
        const res = await initializeRazorpay();

        if (!res) {
            alert("Razorpay SDK Failed to load");
            return;
        }
        const errors = validate();
        setErr(errors);
        if (Object.keys(errors).length) return;
        // Try actual Razorpay SDK if loaded 
        if (window.Razorpay) {
            const options = {
                key: "rzp_live_TQWCV2QEQzdUch",
                amount: payForm.plan === "pro" ? 501  : 201 ,
                currency: "INR",
                name: "MERN Development Kit",
                description: "Order #ORD-2024-001",
                prefill: { name: "Kajal Patel", email: "kajlfultariya@gmail.com", contact: 9687606592 },
                theme: { color: "#3395FF" },
                handler: async (response) => {
                   
                    const newData = {
                        "name": name,
                        "email": email,
                        "phone": phone,
                        "amount": payForm.plan === "pro" ? 501 : 201,
                        "password": password,
                        "txnId": response.razorpay_payment_id || randomTxn(),


                    }
                    await axios.post("https://merndevkitserver.vercel.app/api/createCustomer", newData)
                        .then((response) => {
                            console.log("response api", response)
                            setId(response.data._id)
                             setSuccess(true);
                        }).catch(error => { console.log("errr", error) })

                    setTxnId(response.razorpay_payment_id || randomTxn());
                   
                },
                //modal: { ondismiss: () => setLoading(false) },
            };

            try {
                const rzp = new window.Razorpay(options);
                rzp.open();
                return;
            }
            catch (err) { console.log("errror", err) }

        }


    };


    if (success) return (
        <>
            <style>{styles}</style>
            <div className="pay-page">
                <div style={{ width: "100%", maxWidth: 480, animation: "wrapIn .55s cubic-bezier(.22,1,.36,1) both" }}>
                    <div className="card">
                        <div className="modal-bar" style={{ height: 4, background: "linear-gradient(90deg,#10b981,#059669,#3395ff)" }} />
                        <div className="success-screen">
                            <div className="success-ring">
                                <Icon d={icons.check} size={32} stroke="#fff" sw={3} />
                            </div>
                            <h2 className="success-title">Payment Successful! 🎉</h2>
                            <p className="success-msg">
                                Your payment of <strong>₹{payForm.plan === "pro" ? 501 : 201}</strong> has been received.<br />
                                A confirmation has been sent to <strong>{email}</strong>
                            </p>
                            <div className="success-txn">TXN ID: {txnId}</div>
                            <div className="success-detail">
                                <div className="detail-box">
                                    <div className="detail-label">Amount Paid</div>
                                    <div className="detail-val">₹
                                        {payForm.plan === "pro" ? 501 : 201}
                                    </div>
                                </div>
                                <div className="detail-box">
                                    <div className="detail-label">Status</div>
                                    <div className="detail-val" style={{ color: "#10b981" }}>✓ Confirmed</div>
                                </div>
                                <div className="detail-box">
                                    <div className="detail-label">Customer</div>
                                    <div className="detail-val">{name}</div>
                                </div>
                            </div>
                            <button className="btn-done"
                                onClick={() => {
                                    localStorage.setItem("Id", id)
                                    navigate("/home")

                                    setSuccess(false);
                                    setPassword("")
                                    setName(""); setEmail("");
                                    setPhone("");
                                }}>
                                Go To Home
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <>
            <div style={{
                fontFamily: "'Outfit',sans-serif", background: C.bg, color: C.text,
                minHeight: "100vh", display: "flex", flexDirection: "column"
            }}>
                <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Fira+Code:wght@400;500&display=swap');*{box-sizing:border-box;margin:0;padding:0}@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}.fade{animation:fadeUp .4s ease forwards}`}</style>

                {/* Nav */}

                <nav style={{
                    background: "linear-gradient(135deg,#6366F1,#8B5CF6)", backdropFilter: "blur(16px)",
                    borderBottom: `1px solid ${C.border}`, padding: "0 24px", position: "sticky", top: 0, zIndex: 100
                }}>
                    <div style={{
                        maxWidth: 1200, margin: "0 auto", height: 60, display: "flex",
                        alignItems: "center", justifyContent: "space-between"
                    }}>

                        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
                            onClick={() => navigate('/')}
                        >
                            <div style={{
                                width: 36, height: 36, borderRadius: 9,
                                background: "#ffffff",
                                display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 16
                            }}>M</div>
                            <span style={{ fontWeight: 800, fontSize: 17, letterSpacing: "-.02em", color: "#ffffff" }}>
                                MERN
                                <span style={{ color: "#000000", paddingLeft: "2px", fontSize: "19px" }}> Stack</span>
                                <span style={{ color: "#ffffff", paddingLeft: "3px", fontSize: "15px" }}> Course</span></span>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 17, color: "#5af874" }}>
                            <span>🔒</span> Secure Checkout
                        </div>
                    </div>
                </nav>

                <div style={{
                    flex: 1, display: "flex", alignItems: "center",
                    justifyContent: "center", padding: "10px 10px"
                }}>

                    <style>{styles}</style>
                    <div className="pay-page">
                        <div className="pay-wrapper">

                            {/* ── ORDER SUMMARY ── */}
                            <div className="order-col" style={{
                                display: "flex", justifyContent: "center",
                                alignItems: "center", height: "100%", alignContent: "center"
                            }}>

                                <div className="card" >
                                    <div className="order-header" >

                                        <div className="order-badge">🛒 Order Summary</div>
                                        <div style={{
                                            display: "flex", alignItems: "center", gap: 14, padding: "14px",
                                            background: "rgba(234, 234, 242, 0.06)",
                                            border: "1px solid rgba(99,102,241,.15)", borderRadius: 12, marginBottom: 20
                                        }}>
                                            <div style={{
                                                width: 44, height: 44, borderRadius: 10,
                                                background: "white",
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                fontSize: 40
                                            }}>⚛</div>
                                            <div>
                                                <div style={{ fontSize: 14, fontWeight: 700, color: "white" }}>
                                                    MERN Stack {payForm.plan === "pro" ? "Pro" : "Basic"}</div>
                                                <div style={{ fontSize: 12, color: "white" }}>
                                                    6 Weeks · {payForm.plan === "pro" ? "35+" : "35"} Lessons · Lifetime Access
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="order-body">
                                        {(payForm.plan === "pro" ? ["35+  lessons", "3 guided projects", "Lifetime updates",
                                            "Priority Q&A"] :
                                            ["Full 6-week curriculum", "35+  lessons", "Code labs & files", "Community Discord"]).map(f => (
                                                <div key={f} style={{ display: "flex", gap: 8, padding: "7px 0", fontSize: 13, color: C.sub, borderBottom: `1px solid rgba(255,255,255,.04)` }}><span style={{ color: C.green }}>✓</span>{f}</div>
                                            ))}
                                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20, paddingTop: 16, borderTop: `1px solid ${C.border}` }}>
                                            <span style={{ fontSize: 14, color: C.sub }}>Total</span>
                                            <span style={{ fontSize: 22, fontWeight: 900, color: "#101d92" }}>
                                                {payForm.plan === "pro" ? "501" : "₹201"}</span>
                                        </div>
                                        <div className="secure-note">
                                            <Icon d={icons.shield} size={13} stroke="#94a3b8" />
                                            Secured by Razorpay · 256-bit SSL encryption
                                        </div>

                                    </div>
                                </div>
                            </div>

                            {/* ── PAYMENT FORM ── */}
                            <div className="form-col">
                                <div className="card">
                                    <div className="form-topbar">
                                        <span className="form-heading">Checkout</span>
                                        <div className="rzp-logo">
                                            <span className="rzp-logo-mark">Rₐ</span>
                                            Razorpay
                                        </div>
                                    </div>

                                    <div className="form-body">

                                        <div className="field-row" style={{ marginBottom: 18 }}>
                                            <div className="field">
                                                <label className="field-label">Full Name</label>
                                                <div className="field-wrap">
                                                    <span className="field-icon"><Icon d={icons.user} size={15} /></span>
                                                    <input className={`field-input${err.name ? " error" : ""}`}
                                                        placeholder="Doe" value={name}
                                                        onChange={e => {
                                                            setName(e.target.value);
                                                            setErr(p => ({ ...p, name: "" }));
                                                        }} />
                                                </div>
                                                {err.name && <span className="field-err">⚠ {err.name}</span>}
                                            </div>
                                            <div className="field">
                                                <label className="field-label">Phone</label>
                                                <div className="field-wrap">
                                                    <span className="field-icon"><Icon d={icons.phone} size={15} /></span>
                                                    <input className={`field-input${err.phone ? " error" : ""}`}
                                                        placeholder="9876543210" maxLength={10} value={phone} onChange={e => { setPhone(e.target.value.replace(/\D/, "")); setErr(p => ({ ...p, phone: "" })); }} />
                                                </div>
                                                {err.phone && <span className="field-err">⚠ {err.phone}</span>}
                                            </div>
                                            <div className="field">
                                                <label className="field-label">Email</label>
                                                <div className="field-wrap">
                                                    <span className="field-icon"><Icon d={icons.mail} size={15} /></span>
                                                    <input className={`field-input${err.email ? " error" : ""}`}
                                                        type="email" placeholder="you@email.com" value={email}
                                                        onChange={e => { setEmail(e.target.value); setErr(p => ({ ...p, email: "" })); }} />
                                                </div>
                                                {err.email && <span className="field-err">⚠ {err.email}</span>}
                                            </div>
                                            <div className="field">

                                                <label className="field-label">Password
                                                </label>
                                                <div className="field-wrap">

                                                    <span className="field-icon"><LockIcon size={15} /></span>
                                                    <input
                                                        className={`field-input${err.password ? " has-error" : ""}`}
                                                        type={showPw ? "text" : "password"}
                                                        placeholder="••••••••"
                                                        value={password}
                                                        onChange={e => {
                                                            setPassword(e.target.value); setErr(p =>
                                                                ({ ...p, password: "" }));
                                                        }}
                                                        style={{ paddingRight: 44 }}
                                                    />
                                                    <button className="pass-toggle" onClick={() => setShowPw(s => !s)}
                                                        tabIndex={-1}>
                                                        <EyeIcon closed={showPw} />
                                                    </button>

                                                </div>
                                                {err.password && <span className="field-err">⚠ {err.password}</span>}
                                            </div>

                                        </div>
                                        <center>
                                            <span style={{ fontSize: "12px", textTransform: "none", color: "orange" }}>
                                                (For Further Logging)</span>
                                        </center>
                                        <button disabled={paying} onClick={handlePay} className="btn-glow"
                                            style={{
                                                width: "100%", padding: "10px",
                                                background: paying ? "rgba(99,102,241,.5)" : "linear-gradient(135deg,#6366F1,#8B5CF6)",
                                                border: "none", borderRadius: 11, color: "#fff", fontSize: 15,
                                                fontWeight: 700, cursor: paying ? "not-allowed" : "pointer", marginTop: "10px",
                                                display: "flex", alignItems: "center", justifyContent: "center", gap: 8
                                            }}
                                        >
                                            {paying ? <><span style={{
                                                width: 16, height: 16, border: "2px solid rgba(255,255,255,.3)",
                                                borderTopColor: "#fff", borderRadius: "50%", display: "inline-block",
                                                animation: "spin .7s linear infinite"
                                            }} />
                                                Processing...</> : `Pay ${payForm.plan === "pro" ? "₹501" : "₹201"} →`}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
