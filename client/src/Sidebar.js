import React from "react";

const projectBtnStyle = (isActive) => ({
    width: "100%",
    padding: "14px 14px",
    marginBottom: "12px",
    border: "none",
    borderRadius: "14px",
    background: isActive
        ? "linear-gradient(135deg,#F59E0B,#EF4444)"
        : "linear-gradient(135deg,#4F46E5,#7C3AED)",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "600",
    letterSpacing: ".5px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    boxShadow: isActive
        ? "0 10px 25px rgba(239,68,68,.45)"
        : "0 8px 18px rgba(79,70,229,.35)",
    transition: "all .3s ease",
    transform: isActive ? "scale(1.03)" : "scale(1)",
});

const Sidebar = ({ C, activeLesson, curriculum, customer, projectData, setProjectData,
    progress, expandedModules, toggleModule, goToLesson,
    sidebarOpen, doneLessons, totalLessons, activeModule }) => {
    return (
        <aside className={`course-sidebar${sidebarOpen ? " open" : ""}`} style={{
            width: 288, maxWidth: "82vw", flexShrink: 0, background: C.sidebar, borderRight: `1px solid ${C.border}`,
            display: "flex", flexDirection: "column", overflowY: sidebarOpen ? "auto" : "hidden", overflowX: "hidden",
            transition: "width .25s ease",
            ...(sidebarOpen ? {} : { width: 0 }),
        }}>
            {/* Sidebar header */}
            <div style={{
                padding: "16px 18px 12px", borderBottom: `2px solid ${C.border}`,
                flexShrink: 0, background: "#000000"
            }}>
                <div style={{
                    fontSize: 12, fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: ".08em", color: "#ffffff"
                }}>Course Content  --  {totalLessons}</div>

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
                                <div style={{
                                    fontSize: 11, color: mod.color,
                                    fontFamily: "'Fira Code',monospace", fontWeight: 600
                                }}>{mod.week}</div>
                                <div style={{
                                    fontSize: 13, fontWeight: 600,
                                    color: C.text, overflow: "hidden", textOverflow: "ellipsis",
                                    whiteSpace: "nowrap"
                                }}>{mod.title}</div>
                            </div>
                            <span style={{
                                color: C.muted, fontSize: 14, transition: "transform .2s",
                                transform: expandedModules[mod.id] ? "rotate(180deg)" : "none", flexShrink: 0
                            }}>⌄</span>
                            {mod.locked && <span style={{ fontSize: 12, flexShrink: 0 }}>🔒</span>}
                        </button>

                        {/* Lessons */}
                        {expandedModules[mod.id] && (
                            <div>
                                {mod.lessons.map(lesson => (
                                    <div key={lesson.id} className="lesson-item"
                                        onClick={() => {
                                            !mod.locked && goToLesson(lesson.id, mod.id)
                                            setProjectData("")
                                        }
                                        }
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

                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>
                ))}
            </div>
            {customer.amount && customer.amount === 201 &&
                <div style={{
                    padding: "16px 16px 2px 12px", borderBottom: `2px solid ${C.border}`,
                    flexShrink: 0
                }}>
                    <div><button style={projectBtnStyle(projectData === "Project1")}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-3px)";
                            e.currentTarget.style.boxShadow =
                                "0 15px 30px rgba(79,70,229,.45)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform =
                                projectData === "Project1"
                                    ? "scale(1.03)"
                                    : "scale(1)";
                            e.currentTarget.style.boxShadow =
                                projectData === "Project1"
                                    ? "0 10px 25px rgba(239,68,68,.45)"
                                    : "0 8px 18px rgba(79,70,229,.35)";
                        }}
                        onClick={() => setProjectData("Project1")}
                    >Projects - 1</button>
                    </div>
                    <div><button style={projectBtnStyle(projectData === "Project2")}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-3px)";
                            e.currentTarget.style.boxShadow =
                                "0 15px 30px rgba(79,70,229,.45)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform =
                                projectData === "Project1"
                                    ? "scale(1.03)"
                                    : "scale(1)";
                            e.currentTarget.style.boxShadow =
                                projectData === "Project1"
                                    ? "0 10px 25px rgba(239,68,68,.45)"
                                    : "0 8px 18px rgba(79,70,229,.35)";
                        }}
                        onClick={() => setProjectData("Project2")}
                    >Projects - 2</button></div>
                    <div><button style={projectBtnStyle(projectData === "Project3")}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-3px)";
                            e.currentTarget.style.boxShadow =
                                "0 15px 30px rgba(79,70,229,.45)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform =
                                projectData === "Project1"
                                    ? "scale(1.03)"
                                    : "scale(1)";
                            e.currentTarget.style.boxShadow =
                                projectData === "Project1"
                                    ? "0 10px 25px rgba(239,68,68,.45)"
                                    : "0 8px 18px rgba(79,70,229,.35)";
                        }}
                        onClick={() => setProjectData("Project3")}
                    >Projects - 3</button></div>

                </div>
            }
        </aside>

    )
}

export default Sidebar;