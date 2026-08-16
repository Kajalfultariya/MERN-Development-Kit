import { useState, useRef, useEffect } from "react";
import MainContent from "./MainContent";
import Sidebar from "./Sidebar";
import MainHeader from "./MainHeader";
import { LESSON_CONTENT } from "./lesson";
import { useNavigate } from "react-router-dom";
import axios from "axios"
/* ═══════════════════════════════════════════════
   SYNTAX HIGHLIGHT
═══════════════════════════════════════════════ */
function hl(code) {
    return code
        .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        .replace(/(\/\/.*)/g, '<span style="color:#6B7280;font-style:italic">$1</span>')
        .replace(/\b(const|let|var|function|async|await|return|try|catch|if|else|new|require|import|export|default|from|class|extends|this|throw)\b/g, '<span style="color:#93C5FD">$1</span>')
        .replace(/\b(true|false|null|undefined)\b/g, '<span style="color:#FCA5A5">$1</span>')
        .replace(/(`[^`]*`)/g, '<span style="color:#86EFAC">$1</span>')
        .replace(/('[^']*')/g, '<span style="color:#86EFAC">$1</span>')
        .replace(/("([^"]*)")/g, '<span style="color:#86EFAC">$1</span>')
        .replace(/\b(\d+)\b/g, '<span style="color:#FDE68A">$1</span>');
}

/* ═══════════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════════ */
export default function MernCourse({ C, CURRICULUM, setCurriculum, projectData, setProjectData }) {


    const navigate = useNavigate()
    const [sidebarOpen, setSidebarOpen] = useState(() =>
        typeof window === "undefined" ? true : window.innerWidth > 900
    );
    const [activeLesson, setActiveLesson] = useState("l1_1");
    const [activeModule, setActiveModule] = useState("m1");
    const [expandedModules, setExpandedModules] = useState({ m1: false, m2: false, m3: false, m4: false, m5: false, m6: false });

    const [noteText, setNoteText] = useState("");
    const [noteSaved, setNoteSaved] = useState(false);
    const [copied, setCopied] = useState(false);
    const [searchQ, setSearchQ] = useState("");
    const contentRef = useRef(null);
    const [customer, setCustomer] = useState([])

    const fetchCustomer = async () => {
        console.log("consle", localStorage.getItem("Id"))
        localStorage.getItem("Id") &&
            await axios.get(`https://merndevkitserver.vercel.app/api/fetchoneCustomer/${localStorage.getItem("Id")}`).then((response) => {
                setCustomer(response.data)
                console.log("all data mern course", response.data)
            }).catch(error => { console.log("errr", error) })
    }
    useEffect(() => {
        fetchCustomer()
    }, [])

    useEffect(() => {
        if (!localStorage.getItem("Id"))
            navigate('/')
    }, [navigate])

    const currentLesson = (() => {
        for (const mod of CURRICULUM) {
            const l = mod.lessons.find(l => l.id === activeLesson);
            if (l) return { ...l, module: mod };
        }
        return null;
    })();

    const lessonContent = LESSON_CONTENT[activeLesson] || LESSON_CONTENT.default;

    const totalLessons = CURRICULUM.reduce((a, m) => a + m.lessons.length, 0);
    const doneLessons = CURRICULUM.reduce((a, m) => a + m.lessons.filter(l => l.done).length, 0);
    const progress = Math.round((doneLessons / totalLessons) * 100);

    const markDone = (lessonId) => {
        setCurriculum(prev => prev.map(mod => ({
            ...mod,
            lessons: mod.lessons.map(l => l.id === lessonId ? { ...l, done: true } : l)
        })));
    };

    const goToLesson = (lessonId, moduleId) => {
        setActiveLesson(lessonId);
        setActiveModule(moduleId);
        setExpandedModules(p => ({ ...p, [moduleId]: true }));
        if (contentRef.current) contentRef.current.scrollTop = 0;
        if (window.innerWidth < 900) setSidebarOpen(false);
    };

    const toggleModule = (id) => setExpandedModules(p => ({ ...p, [id]: !p[id] }));



    const copyCode = () => {
        navigator.clipboard.writeText(lessonContent.code).catch(() => { });
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const saveNote = () => {
        setNoteSaved(true);
        setTimeout(() => setNoteSaved(false), 2000);
    };

    const allLessons = CURRICULUM.flatMap(m => m.lessons.map(l => ({ ...l, moduleTitle: m.title, moduleId: m.id })));
    const searchResults =
        searchQ.length > 1 ? allLessons.filter(l => l.title.toLowerCase().includes(searchQ.toLowerCase())) : [];


    return (
        <div style={{
            fontFamily: "'Outfit',sans-serif", background: C.bg, color: C.text,
            height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden"
        }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Fira+Code:wght@400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html{-webkit-text-size-adjust:100%}
        html,body,#root{overflow-x:hidden;width:100%}
        ::-webkit-scrollbar{width:4px;height:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#1E293B;border-radius:4px}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideDown{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
        .lesson-item{transition:background .18s ease,color .18s ease,transform .15s ease}
        .lesson-item:hover{background:rgba(255,255,255,.04)!important;transform:translateX(2px)}
        .sb-mod-btn{transition:background .18s ease}
        .sb-mod-btn:hover{background:rgba(255,255,255,.04)!important}
        button{-webkit-tap-highlight-color:transparent}
        img{max-width:100%}
        .content-card:hover{transform:translateY(-2px);box-shadow:0 10px 24px rgba(0,0,0,.06)}
        @media(max-width:640px){
          .content-card{padding:16px 16px!important}
        }

        /* ── Sidebar: fixed drawer under 900px ── */
        @media(max-width:900px){
          .course-sidebar{position:fixed!important;z-index:200!important;height:100vh!important;top:0!important;left:0!important;transform:translateX(-100%);transition:transform .25s ease!important;width:min(288px,82vw)!important;box-shadow:0 0 40px rgba(0,0,0,.35)}
          .course-sidebar.open{transform:translateX(0)!important}
          .sidebar-overlay.show{display:block!important;animation:fadeIn .2s ease both}
        }
        @media(min-width:901px){.sidebar-overlay{display:none!important}.mob-menu-btn{display:none!important}}
        @media(max-width:900px){.desktop-toggle-btn{display:none!important}}

        /* ── Header: tighten up on small screens ── */
        @media(max-width:700px){
          .app-header{padding:0 12px!important;gap:10px!important}
          .app-header .header-breadcrumb{display:none!important}
          .app-header .header-search{width:clamp(90px,32vw,160px)!important}
          .app-header .header-logo-text{display:none!important}
          .app-header .signout-btn{width:auto!important;padding:0 12px!important;font-size:12px!important}
        }
        @media(max-width:420px){
          .app-header .header-search{display:none!important}
        }

        /* ── Main content spacing on small screens ── */
        @media(max-width:640px){
          .main-content-inner{padding-left:16px!important;padding-right:16px!important}
        }
      `}</style>

            {/* ── TOP NAVBAR ── */}
            <MainHeader
                C={C}
                progress={progress}
                goToLesson={goToLesson}
                setSearchQ={setSearchQ}
                setSidebarOpen={setSidebarOpen}
                sidebarOpen={sidebarOpen}
                currentLesson={currentLesson}
                searchQ={searchQ}
                searchResults={searchResults}
                customer={customer}
                projectData={projectData}
                setProjectData={setProjectData}
            />


            {/* ── BODY: SIDEBAR + CONTENT ── */}
            <div style={{ flex: 1, display: "flex", overflow: "hidden", position: "relative" }}>

                {/* Overlay for mobile */}
                <div className={`sidebar-overlay${sidebarOpen ? " show" : ""}`}
                    onClick={() => setSidebarOpen(false)}
                    style={{
                        display: "none", position: "fixed",
                        inset: 0, background: "rgba(0,0,0,.6)", zIndex: 190, backdropFilter: "blur(2px)"
                    }} />

                {/* ── SIDEBAR ── */}
                <Sidebar
                    C={C}
                    activeLesson={activeLesson}
                    curriculum={CURRICULUM}
                    progress={progress}
                    toggleModule={toggleModule}
                    expandedModules={expandedModules}
                    goToLesson={goToLesson}
                    sidebarOpen={sidebarOpen}
                    doneLessons={doneLessons}
                    totalLessons={totalLessons}
                    activeModule={activeModule}
                    customer={customer}
                    projectData={projectData}
                    setProjectData={setProjectData}
                />


                {/* ── MAIN CONTENT ── */}
                <MainContent
                    contentRef={contentRef}
                    currentLesson={currentLesson}
                    C={C}
                    lessonContent={lessonContent}
                    goToLesson={goToLesson}
                    activeModule={activeModule}
                    activeLesson={activeLesson}
                    copyCode={copyCode}
                    copied={copied}
                    noteText={noteText}
                    setNoteText={setNoteText}
                    noteSaved={noteSaved}
                    markDone={markDone}
                    hl={hl}
                    saveNote={saveNote}
                    projectData={projectData}
                    setProjectData={setProjectData}
                // toggleModule={toggleModule}
                />
            </div>
        </div>
    );
}