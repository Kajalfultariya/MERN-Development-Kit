import React, { useState, useEffect, useCallback } from "react";
import LoginForm from "./LoginForm";
import { useNavigate } from 'react-router-dom';

const LandingPage = ({ C, setPayForm, CURRICULUM }) => {

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [openPreview, setOpenPreview] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

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
            <SlideModal isOpen={openPreview} onClose={() => setOpenPreview(false)} CURRICULUM={CURRICULUM} />
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
                        <span style={{ fontSize: 13, color: "#ffffff", cursor: "pointer" }}
                            onClick={() => {
                                setOpen(true)
                            }}>Sign In</span>
                        <button onClick={() => navigate('/payment')} className="btn-glow" style={{
                            padding: "9px 22px",
                            background: "linear-gradient(135deg,#000000,grey)",
                            border: "none", borderRadius: 10, color: "#fff", fontSize: 14,
                            fontWeight: 700, cursor: "pointer"
                        }}>Enroll Now →</button>
                    </div>
                </div>
            </nav>
            {open &&
                <LoginForm
                    open={open}
                    setOpen={setOpen}
                />
            }
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
                            }}>Full-Stack Course · 6 Weeks </span>
                        </div>
                        <h1 style={{ fontSize: "clamp(36px,5.5vw,64px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-.04em", marginBottom: 20 }}>
                            Master <span style={{ background: "linear-gradient(90deg,#6366F1,#A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>MERN Stack</span> Development
                        </h1>
                        <p style={{ fontSize: "clamp(15px,2vw,18px)", color: C.sub, lineHeight: 1.75, marginBottom: 36, maxWidth: 500 }}>
                            The most complete MERN Stack course for students — 35+ lessons, real projects, code-along labs, quizzes, and a certificate of completion.
                        </p>
                        <div className="land-hero-btns" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
                            <button className="btn-glow" onClick={() => navigate('/payment')}
                                style={{
                                    padding: "14px 32px", background: "linear-gradient(135deg,#6366F1,#8B5CF6)", border: "none",
                                    borderRadius: 12, color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer"
                                }}>Start for pro →</button>
                            <button onClick={() => setOpenPreview(true)}
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
                    <h2 style={{
                        fontSize: "clamp(24px,3.5vw,38px)",
                        fontWeight: 800, textAlign: "center", marginBottom: 12, letterSpacing: "-.03em"
                    }}>
                        Everything you need to go full-stack</h2>
                    <p style={{ textAlign: "center", color: C.sub, marginBottom: 48, fontSize: 16 }}>
                        Structured learning + real code + real projects = real skills</p>
                    <div className="feat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
                        {[
                            ["🎥", "35+  Lessons", "lessons with code-along exercises for every concept"],
                            ["💻", "Code Labs", "Every module has a full working code file — ready to copy, study and modify"],
                            ["🏗", "3 Real Projects", "Build a Task Manager, Auth System, and a full-stack deployed app"],
                            ["📋", "Module Quizzes", "Test your knowledge after each week with interactive quizzes"],
                            ["🚀", "Deploy Guide", "Step-by-step deployment to MongoDB Atlas, Railway & Vercel"],
                            ,

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
                                name: "Basic", price: "₹201", color: "#06B6D4",
                                features: ["Full 6-week curriculum", "35+  lessons", "Code labs & files", "Community Discord"],
                                cta: "Enroll — Basic", plan: "basic"
                            },
                            {
                                name: "Pro ⭐", price: "501", color: "#6366F1",
                                features: ["Everything in Basic", "3 guided projects", "Module quizzes",
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
                                }}>MOST POPULAR </div>}
                                <div style={{ fontSize: 22, fontWeight: 800, color: p.color, marginBottom: 6 }}>{p.name}</div>
                                <div style={{ fontSize: "clamp(28px,4vw,40px)", fontWeight: 900, marginBottom: 4, letterSpacing: "-.03em" }}>{p.price}</div>
                                <div style={{ fontSize: 12, color: C.muted, marginBottom: 20 }}>one-time payment · lifetime access</div>
                                <ul style={{ listStyle: "none", marginBottom: 24 }}>
                                    {p.features.map(f => <li key={f} style={{ display: "flex", gap: 8, padding: "6px 0", fontSize: 13, color: C.sub, borderBottom: `1px solid rgba(255,255,255,.04)` }}><span style={{ color: C.green }}>✓</span>{f}</li>)}
                                </ul>
                                <button className="btn-glow"
                                    onClick={() => {
                                        setPayForm(x => ({ ...x, plan: p.plan }));
                                        navigate('/payment');
                                    }} style={{
                                        width: "100%", padding: "13px", background: p.popular ?
                                            "linear-gradient(135deg,#6366F1,#8B5CF6)" : `${p.color}22`,
                                        border: p.popular ? "none" : `1px solid ${p.color}50`, 
                                        borderRadius: 11, color: p.popular ? "#fff" : p.color,
                                        fontSize: 14, fontWeight: 700, cursor: "pointer"
                                    }}>
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
                    © 2026 MERNCourse · All rights reserved</div>
            </footer>
        </div>
    )
}



function SlideModal({ isOpen, onClose, CURRICULUM }) {
    const [current, setCurrent] = useState(0);
    const [dir, setDir] = useState(null); // "left" | "right"
    const [animKey, setAnimKey] = useState(0);

    const total = CURRICULUM.length;
    const slide = CURRICULUM[current];
    console.log("curriculum", current)
    // console.log("slides",slides[current])

    const go = useCallback(
        (delta) => {
            const next = (current + delta + total) % total;
            setDir(delta > 0 ? "right" : "left");
            setAnimKey((k) => k + 1);
            setCurrent(next);
        },
        [current, total]
    );

    useEffect(() => {
        if (!isOpen) return;
        const handler = (e) => {
            if (e.key === "ArrowRight") go(1);
            if (e.key === "ArrowLeft") go(-1);
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [isOpen, go, onClose]);

    if (!isOpen) return null;

    return (
        <div
            onClick={onClose}
            style={{
                position: "fixed", inset: 0,
                background: "rgba(0,0,0,0.5)",
                display: "flex", alignItems: "center", justifyContent: "center",
                zIndex: 1000, padding: "1rem",
            }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    background: "#fff",
                    borderRadius: 16,
                    width: "100%", maxWidth: 560,
                    overflow: "hidden",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
                }}
            >
                {/* Header */}
                <div
                    style={{
                        background: slide.color,
                        padding: "1.75rem 1.75rem 1.25rem",
                        position: "relative",
                        transition: "background 0.35s",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                        <span style={{
                            fontSize: 11, fontWeight: 600, letterSpacing: "0.08em",
                            textTransform: "uppercase", color: slide.color,
                            background: "rgba(255,255,255,0.6)", borderRadius: 99,
                            padding: "3px 12px",
                        }}>Module <span>
                                {current + 1}</span>
                        </span>
                        <button
                            onClick={onClose}
                            aria-label="Close"
                            style={{
                                background: "rgba(255,255,255,0.6)", border: "none",
                                borderRadius: "50%", width: 30, height: 30,
                                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: 16, color: slide.color, lineHeight: 1,
                            }}
                        >
                            ✕
                        </button>
                    </div>

                    <div
                        key={animKey}
                        style={{
                            animation: `slideIn${dir === "right" ? "R" : "L"} 0.28s ease`,
                        }}
                    >
                        <div style={{  marginBottom: 6 }}>
                            <span style={{
                               letterSpacing: "0.08em",fontSize: 36,
                                textTransform: "uppercase",
                                background: "rgba(255,255,255,0.6)", borderRadius: 99,
                                padding: "3px 5px",
                            }}>{slide.icon}
                            </span> </div>
                        <h2 style={{ fontSize: 22, fontWeight: 600, color: "#111", margin: 0 }}>
                            {slide.title}
                        </h2>
                    </div>

                    {/* Progress dots */}
                    <div style={{ display: "flex", gap: 5, marginTop: 14 }}>
                        {CURRICULUM.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => {
                                    setDir(i > current ? "right" : "left");
                                    setAnimKey(k => k + 1); setCurrent(i);
                                }}
                                aria-label={`Go to slide ${i + 1}`}
                                style={{
                                    width: i === current ? 20 : 7, height: 7,
                                    borderRadius: 99, border: "none", cursor: "pointer",
                                    background: i === current ? "white" : "rgba(0,0,0,0.15)",
                                    transition: "all 0.25s", padding: 0,
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Body */}
                <div style={{ padding: "1.5rem 1.75rem" }}>
                    <p style={{
                        fontSize: 12, fontWeight: 600, color: "#aaa", textTransform: "uppercase",
                        letterSpacing: "0.07em", marginBottom: 10
                    }}>
                        Topics covered
                    </p>
                    <ul style={{
                        listStyle: "none", padding: 0, margin: "0 0 1.25rem", display: "flex",
                        flexDirection: "column", gap: 8
                    }}>
                        {slide && slide.lessons.map((t, i) => (
                            <li key={i} style={{
                                display: "flex", alignItems: "center",
                                gap: 10, fontSize: 14, color: "#333"
                            }}>
                                <span style={{
                                    width: 22, height: 22, borderRadius: "50%",
                                    background: slide.color, color: "white",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: 11, fontWeight: 700, flexShrink: 0,
                                }}>
                                    {i + 1}
                                </span>
                                {t.title}
                            </li>
                        ))}
                    </ul>


                    {/* Nav buttons */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <button
                            onClick={() => go(-1)}
                            style={{
                                display: "flex", alignItems: "center", gap: 6,
                                background: "transparent", border: "1px solid #ddd",
                                borderRadius: 8, padding: "8px 16px",
                                fontSize: 13, color: "#555", cursor: "pointer",
                            }}
                        >
                            ← Previous
                        </button>
                        <span style={{ fontSize: 12, color: "#aaa" }}>
                            {current + 1} / {total}
                        </span>
                        <button
                            onClick={() => go(1)}
                            style={{
                                display: "flex", alignItems: "center", gap: 6,
                                background: slide.color, border: "none",
                                borderRadius: 8, padding: "8px 16px",
                                fontSize: 13, color: "#fff", cursor: "pointer",
                            }}
                        >
                            Next →
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes slideInR { from { opacity: 0; transform: translateX(24px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideInL { from { opacity: 0; transform: translateX(-24px); } to { opacity: 1; transform: translateX(0); } }
      `}</style>
        </div>
    );
}


export default LandingPage