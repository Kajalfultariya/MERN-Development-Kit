import React from "react";

const Sidebar = ({ C, activeLesson, curriculum,
    progress, expandedModules, toggleModule, goToLesson,
    sidebarOpen, doneLessons, totalLessons, activeModule }) => {
    return (
        <aside className={`course-sidebar${sidebarOpen ? " open" : ""}`} style={{
            width: 288, flexShrink: 0, background: C.sidebar, borderRight: `1px solid ${C.border}`,
            display: "flex", flexDirection: "column", overflowY: "auto", transition: "width .25s ease",
            ...(sidebarOpen ? {} : { width: 0, overflow: "hidden" }),
        }}>
            {/* Sidebar header */}
            <div style={{ padding: "16px 18px 12px", borderBottom: `2px solid ${C.border}`, flexShrink: 0, background: "#000000" }}>
                <div style={{
                    fontSize: 12, fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: ".08em", marginBottom: 10, color: "#ffffff"
                }}>Course Content  --  {totalLessons}</div>
                {/*<div style={{
                    height: 4, background: "#ffffff",
                    borderRadius: 4, overflow: "hidden"
                }}>
                    <div style={{
                        height: "100%", width: `${progress}%`,
                        background: "linear-gradient(90deg,#6366F1,#A78BFA)",
                        borderRadius: 4, transition: "width .5s"
                    }} />
                </div>
                <div style={{
                    display: "flex", justifyContent: "space-between",
                    marginTop: 6, fontSize: 11, color: "#ffffff"
                }}>
                    <span>{doneLessons} of {totalLessons} complete</span>
                    <span style={{ color: "#818CF8" }}>{progress}%</span>
                </div>*/}
            </div>

            {/* Modules */}
            <div style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
                {curriculum.map(mod => (
                    <div key={mod.id}>
                        {/* Module header */}
                        <button className="sb-mod-btn"
                            onClick={() => toggleModule(mod.id)}
                            style={{
                                width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 18px",
                                background: activeModule === mod.id ? "rgba(99,102,241,.06)" : "transparent",
                                border: "none", cursor: "pointer", textAlign: "left"
                            }}> 
                            <span style={{ fontSize: 16, flexShrink: 0 }}>{mod.icon}</span>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: 11, color: mod.color, fontFamily: "'Fira Code',monospace", fontWeight: 600 }}>{mod.week}</div>
                                <div style={{ fontSize: 13, fontWeight: 600, color: C.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{mod.title}</div>
                            </div>
                            <span style={{ color: C.muted, fontSize: 14, transition: "transform .2s", transform: expandedModules[mod.id] ? "rotate(180deg)" : "none", flexShrink: 0 }}>⌄</span>
                            {mod.locked && <span style={{ fontSize: 12, flexShrink: 0 }}>🔒</span>}
                        </button>

                        {/* Lessons */}
                        {expandedModules[mod.id] && (
                            <div>
                                {mod.lessons.map(lesson => (
                                    <div key={lesson.id} className="lesson-item"
                                        onClick={() => !mod.locked && goToLesson(lesson.id, mod.id)}
                                        style={{
                                            display: "flex", alignItems: "center", gap: 10, padding: "8px 18px 8px 42px",
                                            cursor: mod.locked ? "default" : "pointer",
                                            background: activeLesson === lesson.id ? "rgba(99,102,241,.12)" : "transparent",
                                            borderLeft: activeLesson === lesson.id ? "2px solid #6366F1" : "2px solid transparent",
                                            opacity: mod.locked ? .5 : 1,
                                        }}>
                                        <div style={{
                                            width: 12, height: 12, borderRadius: 5,
                                            border: `1.5px solid ${lesson.done ? "#10B981" :
                                                activeLesson === lesson.id ? "#6366F1" : "rgba(255,255,255,.15)"}`,
                                            background: lesson.done ? "rgba(16,185,129,.15)" :
                                                activeLesson === lesson.id ? "rgba(99,102,241,.15)" : "transparent",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            fontSize: 5, color: lesson.done ? "#10B981" : "transparent",
                                            flexShrink: 0
                                        }}>{"✓"}
                                            {/*lesson.done ? "✓" : ""*/}
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{
                                                fontSize: 12.5, color: activeLesson === lesson.id ?
                                                    "#A5B4FC" : C.sub, fontWeight: activeLesson === lesson.id ? 600 : 400,
                                                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                                                lineHeight: 1.4
                                            }}>{lesson.title}</div>
                                            <div style={{ display: "flex", gap: 6, marginTop: 2 }}>
                                                {/*<span style={{ fontSize: 10, color: C.muted }}>{lesson.duration}</span>
                                                {lesson.type !== "video" &&
                                                    <span style={{
                                                        fontSize: 10, padding: "1px 5px",
                                                        borderRadius: 3, background: lesson.type === "quiz" ?
                                                            "rgba(251,191,36,.1)" : "rgba(99,102,241,.1)",
                                                        color: lesson.type === "quiz" ? "#FCD34D" : "#A5B4FC"
                                                    }}>{lesson.type}</span>}*/}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </aside>

    )
}

export default Sidebar;