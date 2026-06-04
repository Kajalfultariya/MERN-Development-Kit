import React from "react";

const LandingPage = ({ C, setPage, setPayForm, CURRICULUM }) => {
    return (
        <div style={{ fontFamily: "'Outfit',sans-serif", background: C.bg, color: C.text, minHeight: "100vh" }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Fira+Code:wght@400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:#0B0F1A}::-webkit-scrollbar-thumb{background:#1E293B;border-radius:4px}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
        @keyframes shimmer{from{background-position:-200% 0}to{background-position:200% 0}}
        .fade{animation:fadeUp .5s ease forwards}
        .hover-card{transition:transform .2s,border-color .2s,box-shadow .2s}
        .hover-card:hover{transform:translateY(-4px);box-shadow:0 20px 40px rgba(0,0,0,.4)}
        .btn-glow:hover{box-shadow:0 8px 30px rgba(99,102,241,.45);transform:translateY(-2px)}
        .btn-glow{transition:all .2s}
        @media(max-width:768px){.land-hero{grid-template-columns:1fr!important;text-align:center}.land-hero-btns{justify-content:center!important}.feat-grid{grid-template-columns:1fr 1fr!important}.pricing-grid{grid-template-columns:1fr!important;max-width:380px!important;margin:0 auto!important}}
      `}</style>

            {/* Nav */}
            <nav style={{
                position: "sticky", top: 0, zIndex: 100,
                background: "linear-gradient(135deg,#6366F1,#8B5CF6)", backdropFilter: "blur(16px)",
                borderBottom: `1px solid ${C.border}`, padding: "0 24px"
            }}>
                <div style={{
                    maxWidth: 1200, margin: "0 auto", height: 64, display: "flex", alignItems: "center",
                    justifyContent: "space-between"
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
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
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                        <span style={{ fontSize: 13, color: "#ffffff", cursor: "pointer" }} onClick={() => setPage("payment")}>Sign In</span>
                        <button onClick={() => setPage("payment")} className="btn-glow" style={{
                            padding: "9px 22px",
                            background: "linear-gradient(135deg,#000000,grey)",
                            border: "none", borderRadius: 10, color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer"
                        }}>Enroll Now →</button>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section style={{ padding: "90px 24px 80px", maxWidth: 1200, margin: "0 auto" }}>
                <div className="land-hero" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
                    <div className="fade">
                        <div style={{
                            display: "inline-flex", alignItems: "center", gap: 8,
                            padding: "5px 14px", background: "rgba(99,102,241,.1)",
                            border: "2px solid rgba(99,102,241,.3)", borderRadius: 20, marginBottom: 24
                        }}>
                            <span style={{
                                width: 7, height: 7, borderRadius: "50%", background: "#6366F1",
                                display: "inline-block", animation: "pulse 2s infinite"
                            }} />
                            <span style={{
                                fontSize: 12, color: "#818CF8",
                                fontFamily: "'Fira Code',monospace", fontWeight: 600
                            }}>Full-Stack Course · 6 Weeks · Certificate</span>
                        </div>
                        <h1 style={{ fontSize: "clamp(36px,5.5vw,64px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-.04em", marginBottom: 20 }}>
                            Master <span style={{ background: "linear-gradient(90deg,#6366F1,#A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>MERN Stack</span> Development
                        </h1>
                        <p style={{ fontSize: "clamp(15px,2vw,18px)", color: C.sub, lineHeight: 1.75, marginBottom: 36, maxWidth: 500 }}>
                            The most complete MERN Stack course for students — 35+ lessons, real projects, code-along labs, quizzes, and a certificate of completion.
                        </p>
                        <div className="land-hero-btns" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
                            <button className="btn-glow" onClick={() => setPage("payment")} style={{
                                padding: "14px 32px", background: "linear-gradient(135deg,#6366F1,#8B5CF6)", border: "none",
                                borderRadius: 12, color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer"
                            }}>Start for ₹999 →</button>
                            <button onClick={() => setPage("course")}
                                style={{
                                    padding: "14px 26px", border: `2px solid ${C.border}`, background: "transparent",
                                    borderRadius: 12, color: C.sub, fontSize: 14, cursor: "pointer", fontWeight: 500
                                }}>Preview Course</button>
                        </div>
                        <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
                            {[["35+", "Lessons"], ["6", "Modules"], ["3", "Projects"], ["∞", "Lifetime Access"]].map(([n, l]) => (
                                <div key={l}><div style={{
                                    fontSize: "clamp(20px,3vw,26px)",
                                    fontWeight: 900, color: "#818CF8"
                                }}>{n}</div><div
                                    style={{ fontSize: 12, color: C.muted }}>{l}</div></div>
                            ))}
                        </div>
                    </div>

                    {/* Right card */}
                    <div className="hover-card" style={{ background: C.card, border: `2px solid ${C.border}`, borderRadius: 20, padding: 28, position: "relative", overflow: "hidden" }}>
                        <div style={{ position: "absolute", top: -50, right: -50, width: 180, height: 180, borderRadius: "50%", background: "radial-gradient(circle,rgba(99,102,241,.15) 0%,transparent 70%)" }} />
                        <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
                            {[["M", "#10B981"], ["E", "#F59E0B"], ["R", "#818CF8"],
                            ["N", "#06B6D4"]].map(([l, c]) => (
                                <div key={l} style={{
                                    flex: 1, minWidth: 60,
                                    background: `${c}12`, border: `2px solid ${c}30`, borderRadius: 10, padding: "12px 8px",
                                    textAlign: "center"
                                }}>
                                    <div style={{
                                        fontSize: 26, fontWeight: 900,
                                        color: c, fontFamily: "'Fira Code',monospace"
                                    }}>{l}</div>
                                    <div style={{
                                        fontSize: 10, color: `${c}BB`,
                                        fontWeight: 600, marginTop: 3
                                    }}>{({ M: "MongoDB", E: "Express", R: "React", N: "Node" })
                                    [l]}</div>
                                </div>
                            ))}
                        </div>
                        {CURRICULUM.map(mod => (
                            <div key={mod.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", background: "rgba(255,255,255,.03)", borderRadius: 8, marginBottom: 6 }}>
                                <span style={{ fontSize: 16 }}>{mod.icon}</span>
                                <span style={{ fontSize: 13, color: C.sub, flex: 1 }}>{mod.week}: {mod.title}</span>
                                <span style={{
                                    fontSize: 11, color: mod.locked ? "#475569" : "#10B981",
                                    fontFamily: "'Fira Code',monospace"
                                }}>
                                    {mod.locked ? "🔒" : "✓ open"}
                                </span>
                            </div>
                        ))}
                        {/*<div style={{
                            marginTop: 16, padding: "14px 16px",
                            background: "linear-gradient(135deg,rgba(99,102,241,.15),rgba(139,92,246,.1))",
                            borderRadius: 12, border: "2px solid rgba(99,102,241,.2)"
                        }}>
                            <div style={{ fontSize: 13, color: "#A5B4FC", fontWeight: 600, marginBottom: 4 }}>🎓 Certificate of Completion</div>
                            <div style={{ fontSize: 12, color: C.muted }}>Earn a verifiable certificate after completing all modules and projects.</div>
                        </div>*/}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section style={{ padding: "60px 24px", background: "rgba(255,255,255,.02)" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <h2 style={{ fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 800, textAlign: "center", marginBottom: 12, letterSpacing: "-.03em" }}>Everything you need to go full-stack</h2>
                    <p style={{ textAlign: "center", color: C.sub, marginBottom: 48, fontSize: 16 }}>Structured learning + real code + real projects = real skills</p>
                    <div className="feat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
                        {[
                            ["🎥", "35+ Video Lessons", "High-quality lessons with code-along exercises for every concept"],
                            ["💻", "Code Labs", "Every module has a full working code file — ready to copy, study and modify"],
                            ["🏗", "3 Real Projects", "Build a Task Manager, Auth System, and a full-stack deployed app"],
                            ["📋", "Module Quizzes", "Test your knowledge after each week with interactive quizzes"],
                            ["🚀", "Deploy Guide", "Step-by-step deployment to MongoDB Atlas, Railway & Vercel"],
                            ["🏅", "Certificate", "Earn a shareable certificate to showcase on LinkedIn & GitHub"],
                        ].map(([icon, title, desc]) => (
                            <div key={title} className="hover-card"
                                style={{ background: C.card, border: `2px solid ${C.border}`, borderRadius: 14, padding: "20px 22px" }}>
                                <div style={{ fontSize: 26, marginBottom: 12 }}>{icon}</div>
                                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6, color: C.text }}>{title}</div>
                                <div style={{ fontSize: 13, color: C.sub, lineHeight: 1.6 }}>{desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section style={{ padding: "80px 24px" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <h2 style={{ fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 800, textAlign: "center", marginBottom: 12, letterSpacing: "-.03em" }}>Simple, honest pricing</h2>
                    <p style={{ textAlign: "center", color: C.sub, marginBottom: 48, fontSize: 16 }}>One payment. Lifetime access. No subscriptions.</p>
                    <div className="pricing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20, maxWidth: 780, margin: "0 auto" }}>
                        {[
                            {
                                name: "Basic", price: "₹499", color: "#06B6D4",
                                features: ["Full 6-week curriculum", "35+ video lessons", "Code labs & files", "Community Discord"],
                                cta: "Enroll — Basic", plan: "basic"
                            },
                            {
                                name: "Pro ⭐", price: "₹999", color: "#6366F1",
                                features: ["Everything in Basic", "3 guided projects", "Module quizzes", "Certificate of Completion",
                                    "Lifetime updates", "Priority Q&A support"],
                                cta: "Enroll — Pro", plan: "pro", popular: true
                            },
                        ].map(p => (
                            <div key={p.plan} className="hover-card"
                                style={{
                                    background: p.popular ? "#fffff" : C.card,
                                    border: `2px solid ${p.popular ? "#000000" : C.border}`,
                                    borderRadius: 18, padding: "28px 26px", position: "relative",
                                    overflow: "hidden"
                                }}>
                                {p.popular && <div style={{
                                    position: "absolute", top: 16, right: 16, fontSize: 11, padding: "3px 10px",
                                    background: "rgba(99,102,241,.2)", border: "1px solid rgba(99,102,241,.4)",
                                    borderRadius: 20, color: "#818CF8", fontWeight: 700
                                }}>MOST POPULAR</div>}
                                <div style={{ fontSize: 22, fontWeight: 800, color: p.color, marginBottom: 6 }}>{p.name}</div>
                                <div style={{ fontSize: "clamp(28px,4vw,40px)", fontWeight: 900, marginBottom: 4, letterSpacing: "-.03em" }}>{p.price}</div>
                                <div style={{ fontSize: 12, color: C.muted, marginBottom: 20 }}>one-time payment · lifetime access</div>
                                <ul style={{ listStyle: "none", marginBottom: 24 }}>
                                    {p.features.map(f => <li key={f} style={{ display: "flex", gap: 8, padding: "6px 0", fontSize: 13, color: C.sub, borderBottom: `1px solid rgba(255,255,255,.04)` }}><span style={{ color: C.green }}>✓</span>{f}</li>)}
                                </ul>
                                <button className="btn-glow" onClick={() => { setPayForm(x => ({ ...x, plan: p.plan })); setPage("payment"); }} style={{ width: "100%", padding: "13px", background: p.popular ? "linear-gradient(135deg,#6366F1,#8B5CF6)" : `${p.color}22`, border: p.popular ? "none" : `1px solid ${p.color}50`, borderRadius: 11, color: p.popular ? "#fff" : p.color, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                                    {p.cta}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ borderTop: `1px solid ${C.border}`, padding: "36px 24px", textAlign: "center" }}>
                <div style={{ fontSize: 12, color: C.muted, fontFamily: "'Fira Code',monospace" }}>
                    © 2025 MERNCourse · Built for students · All rights reserved</div>
            </footer>
        </div>
    )
}

export default LandingPage