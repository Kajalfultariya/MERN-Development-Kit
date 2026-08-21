import React, { useState, useEffect, useCallback } from "react";
import LoginForm from "./LoginForm";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const LandingPage = ({ C, setPayForm, CURRICULUM }) => {

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [openPreview, setOpenPreview] = useState(false);

    const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
    const [contactSent, setContactSent] = useState(false);

    const handleContactChange = (e) => {
        const { name, value } = e.target;
        setContactForm(f => ({ ...f, [name]: value }));
    };

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        if (!contactForm.name || !contactForm.email || !contactForm.message) return;
        // TODO: wire this up to your backend / email service

        await axios.post("https://merndevkitserver.vercel.app/api/createContact", contactForm)
            .then((response) => {
                console.log("response api", response)
            }).catch(error => { console.log("errr", error) })


        console.log("Contact form submitted:", contactForm);
        setContactSent(true);
        setContactForm({ name: "", email: "", message: "" });
        setTimeout(() => setContactSent(false), 4000);
    };

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
        @keyframes heroFloat1{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(30px,-20px) scale(1.08)}}
        @keyframes heroFloat2{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-25px,25px) scale(1.05)}}
        .fade{animation:fadeUp .5s ease forwards}
        .hover-card{transition:transform .2s,border-color .2s,box-shadow .2s}
        .hover-card:hover{transform:translateY(-4px);box-shadow:0 20px 40px rgba(0,0,0,.4)}
        .btn-glow:hover{box-shadow:0 8px 30px rgba(99,102,241,.45);transform:translateY(-2px)}
        .btn-glow{transition:all .2s}
        .btn-preview{position:relative;overflow:hidden;transition:color .25s,border-color .25s,transform .2s,box-shadow .25s;z-index:0}
        .btn-preview::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,#6366F1,#8B5CF6);transform:scaleX(0);transform-origin:left;transition:transform .3s ease;z-index:-1}
        .btn-preview:hover{color:#fff!important;border-color:transparent!important;transform:translateY(-2px);box-shadow:0 8px 24px rgba(99,102,241,.35)}
        .btn-preview:hover::before{transform:scaleX(1)}
        .btn-preview:active{transform:translateY(0)}
        .btn-plan{position:relative;overflow:hidden;z-index:0}
        .btn-plan::after{content:'';position:absolute;top:0;left:-60%;width:40%;height:100%;background:linear-gradient(115deg,transparent,rgba(255,255,255,.35),transparent);transform:skewX(-20deg);transition:left .6s ease}
        .btn-plan:hover::after{left:130%}
        .plan-card{transition:transform .25s,box-shadow .25s,border-color .25s}
        .plan-card:hover{transform:translateY(-6px)}
        .contact-grid input::placeholder,
.contact-grid textarea::placeholder {
  color: #3f3c3c;
  opacity: 1;
}
        @media(max-width:768px){.land-hero{grid-template-columns:1fr!important;text-align:center}.land-hero-btns{justify-content:center!important}.feat-grid .hover-card{flex:1 1 100%!important;max-width:420px!important}
        .pricing-grid{grid-template-columns:1fr!important;max-width:380px!important;margin:0 auto!important}.contact-grid{grid-template-columns:1fr!important}}
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
                    <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
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
            <section style={{ position: "relative", padding: "90px 24px 80px", overflow: "hidden" }}>
                <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
                    <div style={{
                        position: "absolute", top: "-15%", left: "-10%", width: 480, height: 480, borderRadius: "50%",
                        background: "radial-gradient(circle,rgba(99,102,241,.35) 0%,transparent 70%)",
                        filter: "blur(10px)", animation: "heroFloat1 9s ease-in-out infinite"
                    }} />
                    <div style={{
                        position: "absolute", top: "10%", right: "-12%", width: 420, height: 420, borderRadius: "50%",
                        background: "radial-gradient(circle,rgba(139,92,246,.3) 0%,transparent 70%)",
                        filter: "blur(10px)", animation: "heroFloat2 11s ease-in-out infinite"
                    }} />
                    <div style={{
                        position: "absolute", bottom: "-20%", left: "30%", width: 360, height: 360, borderRadius: "50%",
                        background: "radial-gradient(circle,rgba(6,182,212,.22) 0%,transparent 70%)",
                        filter: "blur(10px)", animation: "heroFloat1 13s ease-in-out infinite reverse"
                    }} />
                    <div style={{
                        position: "absolute", inset: 0,
                        backgroundImage: "linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px)",
                        backgroundSize: "42px 42px",
                        maskImage: "radial-gradient(ellipse 70% 60% at 50% 30%,#000 40%,transparent 100%)",
                        WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 30%,#000 40%,transparent 100%)"
                    }} />
                </div>
                <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto" }}>
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
                                <button onClick={() => setOpenPreview(true)} className="btn-preview"
                                    style={{
                                        padding: "14px 26px", border: `2px solid ${C.border}`, background: "transparent",
                                        borderRadius: 12, color: C.sub, fontSize: 14, cursor: "pointer", fontWeight: 500
                                    }}>▶ Preview Course</button>
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

                        </div>
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
                    <div className="feat-grid" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 18 }}>
                        {[
                            ["🎥", "35+  Lessons", "lessons with code-along exercises for every concept"],
                            ["💻", "Code Labs", "Every module has a full working code file — ready to copy, study and modify"],
                            ["🏗", "3 Real Projects", "Build a Task Manager, Auth System, and a full-stack deployed app"],
                            ["📋", "Module Quizzes", "Test your knowledge after each week with interactive quizzes"],
                            ["🚀", "Deploy Guide", "Step-by-step deployment to MongoDB Atlas, Railway & Vercel"],

                        ].map(([icon, title, desc]) => (
                            <div key={title} className="hover-card"
                                style={{
                                    flex: "1 1 320px",
                                    maxWidth: 360,
                                    background: C.card, border: `2px solid ${C.border}`, borderRadius: 14, padding: "20px 22px"
                                }}>
                                <div style={{ fontSize: 26, marginBottom: 12 }}>{icon}</div>
                                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6, color: C.text }}>{title}</div>
                                <div style={{ fontSize: 13, color: C.sub, lineHeight: 1.6 }}>{desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section style={{
                position: "relative", padding: "80px 24px", overflow: "hidden",
                background: "linear-gradient(180deg,#F8FAFC 0%,#EEF2FF 45%,#F8FAFC 100%)",
                borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`
            }}>
                <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
                    <div style={{
                        position: "absolute", top: "0%", left: "-10%", width: 460, height: 460, borderRadius: "50%",
                        background: "radial-gradient(circle,rgba(99,102,241,.16) 0%,transparent 70%)",
                        filter: "blur(10px)", animation: "heroFloat1 12s ease-in-out infinite"
                    }} />
                    <div style={{
                        position: "absolute", bottom: "-10%", right: "-10%", width: 420, height: 420, borderRadius: "50%",
                        background: "radial-gradient(circle,rgba(6,182,212,.14) 0%,transparent 70%)",
                        filter: "blur(10px)", animation: "heroFloat2 14s ease-in-out infinite"
                    }} />
                    <div style={{
                        position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", width: 500, height: 300, borderRadius: "50%",
                        background: "radial-gradient(circle,rgba(139,92,246,.12) 0%,transparent 70%)",
                        filter: "blur(10px)", animation: "heroFloat1 16s ease-in-out infinite reverse"
                    }} />
                    <div style={{
                        position: "absolute", inset: 0,
                        backgroundImage: "linear-gradient(rgba(15,23,42,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(15,23,42,.04) 1px,transparent 1px)",
                        backgroundSize: "48px 48px",
                        maskImage: "radial-gradient(ellipse 65% 60% at 50% 40%,#000 40%,transparent 100%)",
                        WebkitMaskImage: "radial-gradient(ellipse 65% 60% at 50% 40%,#000 40%,transparent 100%)"
                    }} />
                </div>
                <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto" }}>
                    <h2 style={{ fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 800, textAlign: "center", marginBottom: 12, letterSpacing: "-.03em", color: "#0F172A" }}>Simple, honest pricing</h2>
                    <p style={{ textAlign: "center", color: "#475569", marginBottom: 48, fontSize: 16 }}>One payment. Lifetime access. No subscriptions.</p>
                    <div className="pricing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20, maxWidth: 780, margin: "0 auto" }}>
                        {[
                            {
                                name: "Basic", price: "₹101", color: "#06B6D4",
                                features: ["Full 6-week curriculum", "35+  lessons", "Code labs & files", "Community Discord"],
                                cta: "Enroll — Basic", plan: "basic"
                            },
                            {
                                name: "Pro ⭐", price: "₹201", color: "#6366F1",
                                features: ["Everything in Basic", "3 guided projects", "Module quizzes",
                                    "Lifetime updates", "Priority Q&A support"],
                                cta: "Enroll — Pro", plan: "pro", popular: true
                            },
                        ].map(p => (
                            <div key={p.plan} className="hover-card plan-card"
                                style={{
                                    background: p.popular
                                        ? "linear-gradient(160deg,#171B2C 0%,#0B0F1A 60%)"
                                        : "linear-gradient(160deg,#12151F 0%,#0B0F1A 60%)",
                                    border: `2px solid ${p.popular ? "rgba(99,102,241,.55)" : "rgba(255,255,255,.08)"}`,
                                    borderRadius: 18, padding: "28px 26px", position: "relative",
                                    overflow: "hidden",
                                    boxShadow: p.popular
                                        ? "0 0 0 1px rgba(99,102,241,.2),0 24px 55px -12px rgba(99,102,241,.5),0 8px 24px rgba(0,0,0,.5)"
                                        : "0 20px 45px -12px rgba(0,0,0,.55),0 4px 14px rgba(0,0,0,.4)"
                                }}>
                                <div aria-hidden="true" style={{
                                    position: "absolute", top: -70, right: -70, width: 200, height: 200, borderRadius: "50%",
                                    background: `radial-gradient(circle,${p.color}3d 0%,transparent 70%)`, filter: "blur(4px)"
                                }} />
                                <div aria-hidden="true" style={{
                                    position: "absolute", inset: 0,
                                    backgroundImage: "linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px)",
                                    backgroundSize: "20px 20px"
                                }} />
                                {p.popular && <div style={{
                                    position: "absolute", top: 16, right: 16, fontSize: 11, padding: "3px 10px",
                                    background: "rgba(99,102,241,.18)", border: "1px solid rgba(99,102,241,.45)",
                                    borderRadius: 20, color: "#A5B4FC", fontWeight: 700, letterSpacing: ".02em"
                                }}>✨ MOST POPULAR</div>}
                                <div style={{
                                    width: 44, height: 44, borderRadius: 12, marginBottom: 16, position: "relative",
                                    background: `${p.color}1f`, border: `1px solid ${p.color}55`,
                                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20
                                }}>{p.popular ? "🚀" : "⚡"}</div>
                                <div style={{ fontSize: 22, fontWeight: 800, color: p.color, marginBottom: 6, position: "relative" }}>{p.name}</div>
                                <div style={{
                                    fontSize: "clamp(28px,4vw,40px)", fontWeight: 900, marginBottom: 4, letterSpacing: "-.03em", position: "relative",
                                    background: `linear-gradient(135deg,#fff,${p.color})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
                                }}>{p.price}</div>
                                <div style={{ fontSize: 12, color: "#8B93A7", marginBottom: 20, position: "relative" }}>one-time payment · lifetime access</div>
                                <ul style={{ listStyle: "none", marginBottom: 24, position: "relative" }}>
                                    {p.features.map(f => <li key={f} style={{ display: "flex", gap: 8, padding: "6px 0", fontSize: 13, color: "#C4C9D6", borderBottom: `1px solid rgba(255,255,255,.06)` }}><span style={{ color: p.color }}>✓</span>{f}</li>)}
                                </ul>
                                <button className="btn-glow btn-plan"
                                    onClick={() => {
                                        setPayForm(x => ({ ...x, plan: p.plan }));
                                        navigate('/payment');
                                    }} style={{
                                        width: "100%", padding: "13px", background: p.popular ?
                                            "linear-gradient(135deg,#6366F1,#8B5CF6)" : `${p.color}22`,
                                        border: p.popular ? "none" : `1px solid ${p.color}70`,
                                        borderRadius: 11, color: p.popular ? "#fff" : p.color,
                                        fontSize: 14, fontWeight: 700, cursor: "pointer", position: "relative"
                                    }}>
                                    {p.cta}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Us */}
            <section style={{ padding: "80px 24px", background: "rgba(255,255,255,.02)" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <h2 style={{ fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 800, textAlign: "center", marginBottom: 12, letterSpacing: "-.03em" }}>Get in touch</h2>
                    <p style={{ textAlign: "center", color: C.sub, marginBottom: 48, fontSize: 16 }}>Questions about the course? We'd love to hear from you.</p>
                    <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 32, maxWidth: 960, margin: "0 auto", alignItems: "center" }}>
                        {/* Info */}
                        <div>
                            {[
                                /*["✉️", "Email", "support@mernstackcourse.com"],*/
                                ["💬", "Discord", "Join our community server"],
                                ["🕐", "Response Time", "Usually within 24 hours"],
                            ].map(([icon, title, desc]) => (
                                <div key={title} style={{ display: "flex", gap: 14, marginBottom: 40 }}>
                                    <div style={{
                                        width: 42, height: 42, borderRadius: 10, flexShrink: 0,
                                        background: "rgba(99,102,241,.1)", border: `2px solid rgba(99,102,241,.25)`,
                                        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18
                                    }}>{icon}</div>
                                    <div>
                                        <div style={{ fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 4 }}>{title}</div>
                                        <div style={{ fontSize: 15, color: C.sub }}>{desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Form */}
                        <form onSubmit={handleContactSubmit} className="hover-card"
                            style={{ background: C.card, border: `2px solid ${C.border}`, borderRadius: 18, padding: "28px 26px" }}>
                            <div style={{ marginBottom: 16 }}>
                                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.sub, marginBottom: 6 }}>Name</label>
                                <input
                                    type="text" name="name" value={contactForm.name} onChange={handleContactChange}
                                    placeholder="Your name" required
                                    style={{
                                        width: "100%", padding: "11px 14px", borderRadius: 10,
                                        border: `2px solid ${C.border}`, background: "rgba(255,255,255,.03)",
                                        color: C.text, fontSize: 14, fontFamily: "inherit", outline: "none"
                                    }}
                                />
                            </div>
                            <div style={{ marginBottom: 16 }}>
                                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.sub, marginBottom: 6 }}>Email</label>
                                <input
                                    type="email" name="email" value={contactForm.email} onChange={handleContactChange}
                                    placeholder="you@example.com" required
                                    style={{
                                        width: "100%", padding: "11px 14px", borderRadius: 10,
                                        border: `2px solid ${C.border}`, background: "rgba(255,255,255,.03)",
                                        color: C.text, fontSize: 14, fontFamily: "inherit", outline: "none"
                                    }}
                                />
                            </div>
                            <div style={{ marginBottom: 20 }}>
                                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.sub, marginBottom: 6 }}>Message</label>
                                <textarea
                                    name="message" value={contactForm.message} onChange={handleContactChange}
                                    placeholder="How can we help?" required rows={4}
                                    style={{
                                        width: "100%", padding: "11px 14px", borderRadius: 10,
                                        border: `2px solid ${C.border}`, background: "rgba(255,255,255,.03)",
                                        color: C.text, fontSize: 14, fontFamily: "inherit", outline: "none", resize: "vertical"
                                    }}
                                />
                            </div>
                            <button type="submit" className="btn-glow"
                                style={{
                                    width: "100%", padding: "13px", background: "linear-gradient(135deg,#6366F1,#8B5CF6)",
                                    border: "none", borderRadius: 11, color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer"
                                }}>
                                {contactSent ? "Message sent ✓" : "Send Message"}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{
                position: "relative", overflow: "hidden",
                borderTop: `1px solid ${C.border}`, padding: "18px 24px", textAlign: "center",
                background: "linear-gradient(180deg,rgba(99,102,241,.06) 0%,rgba(11,15,26,0) 60%),radial-gradient(ellipse 80% 100% at 50% 100%,rgba(139,92,246,.12) 0%,transparent 70%)"
            }}>
                <div style={{ fontSize: 11, color: C.muted, fontFamily: "'Fira Code',monospace", position: "relative", zIndex: 1 }}>
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
                    height: "min(600px, 85vh)",
                    display: "flex", flexDirection: "column",
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
                        flexShrink: 0,
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
                        <div style={{ marginBottom: 6 }}>
                            <span style={{
                                letterSpacing: "0.08em", fontSize: 36,
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
                <div style={{ padding: "1.5rem 1.75rem", flex: 1, overflowY: "auto" }}>
                    <p style={{
                        fontSize: 12, fontWeight: 600, color: "#aaa", textTransform: "uppercase",
                        letterSpacing: "0.07em", marginBottom: 10
                    }}>
                        Topics covered
                    </p>
                    <ul style={{
                        listStyle: "none", padding: 0, margin: 0, display: "flex",
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
                </div>

                {/* Nav buttons */}
                <div style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "1rem 1.75rem", borderTop: "1px solid #eee", flexShrink: 0,
                }}>
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

            <style>{`
        @keyframes slideInR { from { opacity: 0; transform: translateX(24px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideInL { from { opacity: 0; transform: translateX(-24px); } to { opacity: 1; transform: translateX(0); } }
      `}</style>
        </div>
    );
}


export default LandingPage 