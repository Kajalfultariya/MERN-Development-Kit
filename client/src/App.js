import React, { useState, useEffect, useMemo } from "react";
import MernCourse from "./MernCourse";
import "./App.css"
import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import LandingPage from "./LandingPage";
import RazorPayment from "./RazorPayment";


const C = {
  bg: "#F1F5F9", surface: "#94A3B8", card: "#F1F5F9",
  border: "#1E293B ", accent: "#6366F1", accentHover: "#4F46E5",
  green: "#10B981", amber: "#F59E0B", red: "#EF4444",
  text: "#0B0F1A", sub: "#111827", muted: "#475569",
  sidebar: "#F1F5F9",
};

const App = () => {

  const [curriculum, setCurriculum] = useState([]);
  const [payForm, setPayForm] = useState({ plan: "pro" });
  const [paying, setPaying] = useState(false);
  const [projectData, setProjectData] = useState("")

  const fetchCuriculumData = async () => {
    await axios.get("https://www.merndevelopmentkit.com/api/fetch")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setCurriculum(response.data);
        } else {
          console.error("Unexpected curriculum response shape:", response.data);
          setCurriculum([]); // fail safe, don't crash the app
        }
      })
      .catch(error => {
        console.log("errr", error);
        setCurriculum([]);
      });
  }

  useEffect(() => {
    fetchCuriculumData()
  }, [])

  // Only rebuild the router when data that routes actually depend on changes.
  // Creating a new router on every render (old code) can cause react-router
  // to lose/reset internal navigation state.
  const route = useMemo(() => createBrowserRouter([
    {
      path: "/",
      element: <LandingPage
        C={C}
        CURRICULUM={curriculum}
        setPayForm={setPayForm}
      />,
    },
    {
      path: "/payment",
      element: <RazorPayment
        C={C}
        payForm={payForm}
        paying={paying}
        setPayForm={setPayForm}
        setPaying={setPaying}
      />,
    },
    {
      path: "/home",
      element: <MernCourse
        C={C}
        CURRICULUM={curriculum}
        setCurriculum={setCurriculum}
        projectData={projectData}
        setProjectData={setProjectData}
      />,
    }
  ]), [curriculum, payForm, paying, projectData]);

  return (
    <RouterProvider router={route}>
    </RouterProvider>
  )
}

export default App