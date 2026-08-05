import React from "react";

const Payment = ({ handlePay, payForm, payDone, paying, setPayForm, setPage, C }) => {
    return (
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
                        onClick={() => setPage("landing")}>
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

            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
                {payDone ? (
                    <div className="fade" style={{ textAlign: "center", maxWidth: 420 }}>
                        <div style={{ fontSize: 64, marginBottom: 20 }}>🎉</div>
                        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12, letterSpacing: "-.02em" }}>
                            Payment Successful!</h2>
                        <p style={{ color: C.sub, fontSize: 15, marginBottom: 28, lineHeight: 1.7 }}>
                            Welcome to MERNPro! Your account is ready. Let's start building.</p>
                        <button onClick={() => setPage("course")} style={{
                            padding: "14px 36px",
                            background: "linear-gradient(135deg,#6366F1,#8B5CF6)", border: "none",
                            borderRadius: 12, color: "#fff", fontSize: 15, fontWeight: 700,
                            cursor: "pointer", width: "100%"
                        }}>
                            Go to My Course →
                        </button>
                    </div>
                ) : (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 28, maxWidth: 900, width: "100%" }}>
                        {/* Order summary */}
                        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 18, padding: "28px" }}>
                            <div style={{ fontSize: 14, fontWeight: 700, color: C.sub, marginBottom: 20, textTransform: "uppercase", letterSpacing: ".08em" }}>Order Summary</div>
                            <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px", background: "rgba(99,102,241,.06)", border: "1px solid rgba(99,102,241,.15)", borderRadius: 12, marginBottom: 20 }}>
                                <div style={{ width: 44, height: 44, borderRadius: 10, background: "linear-gradient(135deg,#6366F1,#8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>⚛</div>
                                <div>
                                    <div style={{ fontSize: 14, fontWeight: 700 }}>MERN Stack {payForm.plan === "pro" ? "Pro" : "Basic"}</div>
                                    <div style={{ fontSize: 12, color: C.sub }}>6 Weeks · {payForm.plan === "pro" ? "35+" : "35"} Lessons · Lifetime Access</div>
                                </div>
                            </div>
                            {(payForm.plan === "pro" ? ["35+  lessons", "3 guided projects", "Lifetime updates", "Priority Q&A"] :
                                ["Full 6-week curriculum", "35+  lessons", "Code labs & files", "Community Discord"]).map(f => (
                                    <div key={f} style={{ display: "flex", gap: 8, padding: "7px 0", fontSize: 13, color: C.sub, borderBottom: `1px solid rgba(255,255,255,.04)` }}><span style={{ color: C.green }}>✓</span>{f}</div>
                                ))}
                            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20, paddingTop: 16, borderTop: `1px solid ${C.border}` }}>
                                <span style={{ fontSize: 14, color: C.sub }}>Total</span>
                                <span style={{ fontSize: 22, fontWeight: 900, color: "#818CF8" }}>{payForm.plan === "pro" ? "501" : "₹201"}</span>
                            </div>
                        </div>

                        {/* Payment form */}
                        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 18, padding: "28px" }}>
                            <div style={{ fontSize: 14, fontWeight: 700, color: C.sub, marginBottom: 20, textTransform: "uppercase", letterSpacing: ".08em" }}>Payment Details</div>
                            <form onSubmit={handlePay}>
                                {[
                                    ["Full Name", "name", "text", "Priya Sharma"],
                                    ["Email Address", "email", "email", "priya@college.edu"],
                                ].map(([label, key, type, placeholder]) => (
                                    <div key={key} style={{ marginBottom: 14 }}>
                                        <label style={{ fontSize: 12, color: C.sub, display: "block", marginBottom: 6, fontWeight: 500 }}>{label}</label>
                                        <input type={type} placeholder={placeholder} value={payForm[key]} onChange={e => setPayForm(p => ({ ...p, [key]: e.target.value }))} required style={{ width: "100%", padding: "11px 14px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 9, color: C.text, fontSize: 14, outline: "none", fontFamily: "'Outfit',sans-serif" }} />
                                    </div>
                                ))}
                                <div style={{ marginBottom: 14 }}>
                                    <label style={{ fontSize: 12, color: C.sub, display: "block", marginBottom: 6, fontWeight: 500 }}>Card Number</label>
                                    <input placeholder="4242 4242 4242 4242" value={payForm.card} onChange={e => setPayForm(p => ({ ...p, card: e.target.value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim() }))} required style={{ width: "100%", padding: "11px 14px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 9, color: C.text, fontSize: 14, outline: "none", fontFamily: "'Fira Code',monospace", letterSpacing: "2px" }} />
                                </div>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                                    {[["Expiry", "expiry", "MM/YY"], ["CVV", "cvv", "•••"]].map(([label, key, placeholder]) => (
                                        <div key={key}>
                                            <label style={{ fontSize: 12, color: C.sub, display: "block", marginBottom: 6, fontWeight: 500 }}>{label}</label>
                                            <input placeholder={placeholder} value={payForm[key]} onChange={e => setPayForm(p => ({ ...p, [key]: e.target.value }))} required style={{ width: "100%", padding: "11px 14px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 9, color: C.text, fontSize: 14, outline: "none", fontFamily: "'Fira Code',monospace" }} />
                                        </div>
                                    ))}
                                </div>
                                <button type="submit" disabled={paying}
                                    style={{ width: "100%", padding: "14px", background: paying ? "rgba(99,102,241,.5)" : "linear-gradient(135deg,#6366F1,#8B5CF6)", border: "none", borderRadius: 11, color: "#fff", fontSize: 15, fontWeight: 700, cursor: paying ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                                    {paying ? <><span style={{
                                        width: 16, height: 16, border: "2px solid rgba(255,255,255,.3)",
                                        borderTopColor: "#fff", borderRadius: "50%", display: "inline-block",
                                        animation: "spin .7s linear infinite"
                                    }} />
                                        Processing...</> : `Pay ${payForm.plan === "pro" ? "₹501" : "₹201"} →`}
                                </button>
                                <div style={{ textAlign: "center", marginTop: 12, fontSize: 12, color: C.muted }}>🔒 256-bit SSL encryption · Secure payment</div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
export default Payment;