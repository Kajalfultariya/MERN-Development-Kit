import React from "react";

const MainContent = ({ contentRef,
    currentLesson, C, lessonContent, goToLesson, activeModule, activeLesson,
    copyCode, copied, noteText, setNoteText, noteSaved, markDone, hl, saveNote,toggleModule
}) => {
    return (
        <main ref={contentRef} style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", minWidth: 0 }}>

            {/* Lesson title bar */}
            <div style={{ padding: "20px 28px 0", flexShrink: 0 }}>
                <div style={{
                    display: "flex", alignItems: "flex-start",
                    justifyContent: "space-between", gap: 16,
                    flexWrap: "wrap", marginBottom: 20
                }}>
                    <div>
                        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8, flexWrap: "wrap" }}>
                            <span style={{
                                fontSize: 11, padding: "2px 9px", borderRadius: 20,
                                background: `${currentLesson?.module?.color}15`,
                                color: currentLesson?.module?.color, border: `1px solid ${currentLesson?.module?.color}30`,
                                fontFamily: "'Fira Code',monospace", fontWeight: 600
                            }}>{currentLesson?.module?.week}</span>
                            <span style={{
                                fontSize: 11, padding: "2px 9px", borderRadius: 20, background: "rgba(255,255,255,.05)",
                                color: C.sub, border: `1px solid ${C.border}`
                            }}>
                                {currentLesson?.doctype === "queans" ? "📋 Question - Answer" : currentLesson?.doctype === "project" ? "🏗 Project" :
                                    "🎥 Document"}</span>
                            {/*} <span style={{ fontSize: 11, color: C.muted }}>{currentLesson?.duration}</span>*/}
                            {/*currentLesson?.done && <span style={{ fontSize: 11, padding: "2px 9px", borderRadius: 20,
                                 background: "rgba(16,185,129,.1)", color: "#10B981", border: "1px solid rgba(16,185,129,.25)" }}>
                                    ✓ Completed</span>*/}
                        </div>
                        <h1 style={{ fontSize: "clamp(20px,3.5vw,30px)", fontWeight: 800, letterSpacing: "-.02em", lineHeight: 1.2 }}>{lessonContent.title}</h1>
                    </div>
                    <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                        {!currentLesson?.done && (
                            <button onClick={() => markDone(activeLesson)}
                                style={{ padding: "9px 18px", background: "rgba(16,185,129,.1)", border: "1px solid rgba(16,185,129,.3)", borderRadius: 9, color: "#10B981", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                                ✓ Mark Complete
                            </button>
                        )}
                       
                        {lessonContent.nextLesson && (
                            <button onClick={() => { goToLesson(lessonContent.nextLesson, activeModule) 
                               // toggleModule(currentLesson.module.id)
                            }
                            } style={{ padding: "9px 18px", background: "linear-gradient(135deg,#6366F1,#8B5CF6)", border: "none", borderRadius: 9, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                                Next Lesson →
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Scrollable content */}
            <div style={{ flex: 1, padding: "0 28px 40px", display: "flex", flexDirection: "column", gap: 20 }}>

                {/* Description */}
                {lessonContent.description &&
                    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "20px 22px" }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: C.sub, textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 10 }}>About this lesson</div>
                        <p style={{ fontSize: 15, color: C.sub, lineHeight: 1.8 }}>{lessonContent.description}</p>
                    </div>
                }
                {/* Objectives */}
                {lessonContent.objectives &&
                    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "20px 22px" }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: C.sub, textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 14 }}>🎯 Learning Objectives</div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10 }}>
                            {lessonContent.objectives.map((obj, i) => (
                                <div key={i} style={{ display: "flex", gap: 10, padding: "10px 14px", background: "rgba(99,102,241,.05)", border: "1px solid rgba(99,102,241,.12)", borderRadius: 10 }}>
                                    <span style={{ color: "#818CF8", fontWeight: 700, flexShrink: 0, fontFamily: "'Fira Code',monospace", fontSize: 12 }}>{String(i + 1).padStart(2, "0")}</span>
                                    <span style={{ fontSize: 13, color: C.sub, lineHeight: 1.5 }}>{obj}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                }
                {/* Code */}
                {lessonContent.code &&
                    <div style={{ background: "#0D1117", border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
                        <div style={{
                            background: "#111827", padding: "10px 18px", display: "flex",
                            alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${C.border}`
                        }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                {["#FF5F57", "#FEBC2E", "#28C840"].map(c => <div key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c }} />)}
                                <span style={{ marginLeft: 8, fontSize: 12, color: C.muted, fontFamily: "'Fira Code',monospace" }}>
                                    code-lab.js</span>
                            </div>
                            <button onClick={copyCode} style={{
                                padding: "4px 12px",
                                borderRadius: 6, border: `1px solid ${C.border}`,
                                background: copied ? "rgba(16,185,129,.12)" : C.surface, color: copied ? "#10B981" : C.muted,
                                fontSize: 11, cursor: "pointer", fontFamily: "'Fira Code',monospace", transition: "all .2s"
                            }}>
                                {copied ? "✓ copied!" : "copy"}
                            </button>
                        </div>
                        <div style={{
                            padding: "20px 24px", fontFamily: "'Fira Code',monospace",
                            fontSize: "clamp(11.5px,1.5vw,13px)", lineHeight: 1.9, overflowX: "auto", color: "white"
                        }}>
                            <pre style={{ margin: 0 }}><code dangerouslySetInnerHTML={{ __html: lessonContent.code }} /></pre>
                        </div>
                    </div>
                }
                {/* Notes */}
                {lessonContent.notes &&
                    <div style={{ background: C.card, border: `1px solid rgba(251,191,36,.2)`, borderRadius: 14, padding: "20px 22px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                            <span>📌</span>
                            <div style={{ fontSize: 13, fontWeight: 700, color: "#FCD34D", textTransform: "uppercase", letterSpacing: ".07em" }}>Instructor Note</div>
                        </div>
                        <p style={{ fontSize: 14, color: C.sub, lineHeight: 1.75 }}>{lessonContent.notes}</p>
                    </div>
                }
                {/* Your notes 
                <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "20px 22px" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.sub, textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 12 }}>📝 My Notes</div>
                    <textarea value={noteText} onChange={e => setNoteText(e.target.value)} placeholder="Write your own notes for this lesson..." style={{ width: "100%", minHeight: 100, padding: "12px 14px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 9, color: C.text, fontSize: 14, resize: "vertical", outline: "none", fontFamily: "'Outfit',sans-serif", lineHeight: 1.7 }} />
                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
                        <button onClick={saveNote} style={{ padding: "8px 18px", background: noteSaved ? "rgba(16,185,129,.12)" : "rgba(99,102,241,.1)", border: `1px solid ${noteSaved ? "rgba(16,185,129,.3)" : "rgba(99,102,241,.25)"}`, borderRadius: 8, color: noteSaved ? "#10B981" : "#818CF8", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all .2s" }}>
                            {noteSaved ? "✓ Saved!" : "Save Notes"}
                        </button>
                    </div>
                </div>*/}

                {/* Module lessons quick nav */}
                <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "20px 22px" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.sub, textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 14 }}>📚 All Lessons in {currentLesson?.module?.week}</div>
                    {currentLesson?.module?.lessons.map((lesson, i) => (
                        <div key={lesson.id} onClick={() => goToLesson(lesson.id, currentLesson.module.id)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 9, cursor: "pointer", marginBottom: 4, background: lesson.id === activeLesson ? "rgba(99,102,241,.1)" : "transparent", border: lesson.id === activeLesson ? "1px solid rgba(99,102,241,.25)" : "1px solid transparent", transition: "background .15s" }}>
                            <span style={{ fontFamily: "'Fira Code',monospace", fontSize: 11, fontWeight: 700, color: "#818CF8", minWidth: 20 }}>{String(i + 1).padStart(2, "0")}</span>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 13, color: lesson.id === activeLesson ? C.text : C.sub, fontWeight: lesson.id === activeLesson ? 600 : 400 }}>{lesson.title}</div>
                                {/*}  <div style={{ fontSize: 11, color: C.muted }}>{lesson.duration}</div>*/}
                            </div>
                            {lesson.done && <span style={{ fontSize: 12, color: "#10B981" }}>✓</span>}
                            {lesson.id === activeLesson && <span style={{ fontSize: 11, color: "#818CF8", fontFamily: "'Fira Code',monospace" }}>▶ now</span>}
                        </div>
                    ))}
                </div>

            </div>
        </main>
    )
}

export default MainContent;