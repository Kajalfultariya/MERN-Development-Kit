import React from "react";

const MainHeader = ({ C, progress, goToLesson, setSearchQ,
    setSidebarOpen, sidebarOpen, setPage, currentLesson, searchQ, searchResults
}) => {
    return (
        <header style={{
            background: "linear-gradient(135deg,#6366F1,#8B5CF6)",
            backdropFilter: "blur(16px)",
            borderBottom: `2px solid ${C.border}`, height: 56,
            display: "flex", alignItems: "center", padding: "0 20px",
            gap: 16, zIndex: 150, flexShrink: 0
        }}>
            {/* hamburger */}
            <button className="mob-menu-btn"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                style={{
                    border: "none", background: "transparent",
                    color: C.sub, cursor: "pointer", fontSize: 20, padding: 4,
                    flexShrink: 0
                }}>☰</button>

            {/* sidebar toggle (desktop) */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                style={{
                    border: "none", background: "transparent",
                    color: C.sub, cursor: "pointer", fontSize: 25, padding: 4,
                    flexShrink: 0, display: "flex", alignItems: "center"
                }} title="Toggle sidebar">⇄</button>

            {/* Logo */}
            <div style={{
                display: "flex", alignItems: "center",
                gap: 8, marginRight: 16, cursor: "pointer"
            }} onClick={() => setPage("landing")}>
                <div style={{
                    width: 30, height: 30,
                    borderRadius: 7, background: "#ffffff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 900, fontSize: 13
                }}>M</div>
                <span style={{ fontWeight: 800, fontSize: 15, letterSpacing: "-.01em", color: "#ffffff" }}>MERN
                    <span style={{ color: "#000000", paddingLeft: "2px", fontSize: "16px" }}> Stack</span>
                    <span style={{ color: "#ffffff", paddingLeft: "3px", fontSize: "14px" }}> Course</span>
                </span>
            </div>

            {/* breadcrumb */}
            <div style={{
                fontSize: 13,
                fontWeight: 600,
                color: C.muted, overflow: "hidden",
                textOverflow: "ellipsis", whiteSpace: "nowrap",
                flex: 1, minWidth: 0
            }}>
                <span style={{ color: C.sub }}>{currentLesson?.module?.week}</span>
                <span style={{ margin: "0 6px", color: C.muted }}>›</span>
                <span style={{ color: C.text }}>{currentLesson?.title}</span>
            </div>

            {/* Search */}
            <div style={{ position: "relative", flexShrink: 0 }}>
                <input value={searchQ}
                    onChange={e => setSearchQ(e.target.value)}
                    placeholder="🔍 Search lessons..."
                    style={{
                        padding: "7px 14px",
                        background: "rgba(255,255,255,.05)", border: `2px solid ${C.border}`, borderRadius: 9,
                        color: "white", fontSize: 13, outline: "none", width: "clamp(120px,16vw,200px)",
                        fontFamily: "'Outfit',sans-serif"
                    }} />
                {searchResults.length > 0 && (
                    <div style={{
                        position: "absolute",
                        top: "calc(100% + 6px)", right: 0, background: C.card,
                        border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden",
                        zIndex: 300, width: 280, boxShadow: "0 20px 40px rgba(0,0,0,.5)"
                    }}>
                        {searchResults.slice(0, 6).map(l => (
                            <div key={l.id} onClick={() => { goToLesson(l.id, l.moduleId); setSearchQ(""); }} style={{ padding: "10px 14px", cursor: "pointer", borderBottom: `1px solid rgba(255,255,255,.04)`, fontSize: 13, color: C.sub }} className="lesson-item">
                                <div style={{ color: C.text, fontWeight: 500 }}>{l.title}</div>
                                <div style={{ fontSize: 11, color: C.muted }}>{l.moduleTitle} · {l.duration}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Progress pill */}
            {/*<div style={{
                display: "flex", alignItems: "center",
                gap: 8, padding: "5px 12px", background: "rgba(99,102,241,.1)",
                border: "2px solid rgba(99,102,241,.25)", borderRadius: 20, flexShrink: 0
            }}>
                <div style={{
                    width: 44, height: 5,
                    background: "#000000",
                    borderRadius: 4, overflow: "hidden"
                }}>
                    <div style={{
                        height: "100%", width: `${progress}%`,
                        background: "white",
                        borderRadius: 4, transition: "width .5s"
                    }} />
                </div>
                <span style={{
                    fontSize: 12, color: "#ffffff",
                    fontFamily: "'Fira Code',monospace", whiteSpace: "nowrap"
                }}>{progress}%</span>
            </div>
*/}
            {/* Avatar */}
            <div style={{
                width: 34, height: 34,
                borderRadius: "50%", background: "#000000",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, fontWeight: 700, flexShrink: 0, color: "#ffffff"
            }}>P</div>
        </header>

    )
}

export default MainHeader