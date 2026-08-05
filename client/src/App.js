import React, { useState, useEffect } from "react";
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
    await axios.get("http://localhost:8000/api/fetch").then((response) => {
      setCurriculum(response.data)
      console.log("all data", response.data)
    }).catch(error => { console.log("errr", error) })
  }


  useEffect(() => {
    fetchCuriculumData()

  }, [])


  const route = createBrowserRouter([
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
        setpaying={setPaying}

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

  ])

  return (
    <RouterProvider router={route}>
    </RouterProvider>

  )
}

export default App